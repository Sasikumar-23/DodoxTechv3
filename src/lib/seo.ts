import { SITE_URL, company, type Service, type CaseStudy } from "@/content/site";

/** Last significant content update — used for sitemap <lastmod> and Article dateModified. */
export const CONTENT_UPDATED = "2026-11-18";

export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/icon-512.png`;

export const absUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

type JsonLd = Record<string, unknown>;
type MetaTag = import("react").ComponentProps<"meta">;

/**
 * TanStack's HeadContent renders `{ "script:ld+json": data }` meta entries as
 * <script type="application/ld+json"> (escaped), but its types don't declare it.
 */
export const ldJson = (data: JsonLd) => ({ "script:ld+json": data }) as unknown as MetaTag;

/**
 * Builds the per-route head: unique title + description, self-referencing
 * canonical (og:url always equals it), OG + Twitter cards and optional JSON-LD.
 */
export function pageHead({
  title,
  description,
  path,
  image = OG_IMAGE,
  imageAlt = `${company.name} — ${company.tagline}`,
  type = "website",
  noindex = false,
  jsonLd = [],
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd[];
}) {
  const url = absUrl(path);
  const img = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
      },
      { property: "og:type", content: type },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      ...jsonLd.map(ldJson),
    ] as MetaTag[],
    links: [{ rel: "canonical", href: url }],
  };
}

/* ─── JSON-LD builders ──────────────────────────────────────────────────── */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: company.city,
  addressRegion: company.region,
  addressCountry: company.countryCode,
};

const areaServed = [
  { "@type": "City", name: "Coimbatore", sameAs: "https://en.wikipedia.org/wiki/Coimbatore" },
  { "@type": "State", name: "Tamil Nadu", sameAs: "https://en.wikipedia.org/wiki/Tamil_Nadu" },
  { "@type": "Country", name: "India", sameAs: "https://en.wikipedia.org/wiki/India" },
];

/** Site-wide graph: Organization + ProfessionalService (service-area business) + WebSite. */
export function organizationSchema(services: Service[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: company.name,
        alternateName: company.legalName,
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
        image: OG_IMAGE,
        description: company.description,
        slogan: company.tagline,
        email: company.email,
        telephone: company.phoneE164,
        address: postalAddress,
        areaServed,
        knowsLanguage: company.languages,
        sameAs: Object.values(company.socials),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: company.phoneE164,
            email: company.email,
            areaServed: "IN",
            availableLanguage: company.languages,
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: company.supportPhoneE164,
            areaServed: "IN",
            availableLanguage: company.languages,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software & automation services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": `${SITE_URL}/services/${s.slug}#service`,
              name: s.name,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: company.name,
        alternateName: company.legalName,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function serviceSchema(s: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${s.slug}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: absUrl(`/services/${s.slug}`),
    provider: { "@id": ORG_ID },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.name,
      itemListElement: s.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d.title, description: d.desc },
      })),
    },
  };
}

export function caseStudySchema(c: CaseStudy): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.metaDescription,
    image: absUrl(c.cover),
    datePublished: CONTENT_UPDATED,
    dateModified: CONTENT_UPDATED,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absUrl(`/work/${c.slug}`),
    about: c.tech.map((t) => ({ "@type": "Thing", name: t })),
  };
}

export function contactPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absUrl("/contact"),
    name: `Contact ${company.name}`,
    about: { "@id": ORG_ID },
  };
}
