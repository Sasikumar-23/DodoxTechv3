import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import {
  CaseStudyCard,
  ContactSection,
  FaqSection,
  ProcessSection,
} from "@/components/site/sections";
import { Breadcrumbs, PageGlow, Reveal, SectionHeader, ServiceIcon } from "@/components/site/ui";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { caseStudies, getService, services, testimonials, whatsappLink } from "@/content/site";
import { breadcrumbSchema, pageHead, serviceSchema } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const s = loaderData.service;
    return pageHead({
      title: s.metaTitle,
      description: s.metaDescription,
      path: `/services/${s.slug}`,
      jsonLd: [
        serviceSchema(s),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
        ]),
      ],
    });
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const related = s.workSlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c) => !!c);
  const quote = related.find((c) => c.quote)?.quote ?? null;
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 sm:pt-40">
        <PageGlow />
        <div className="container-x">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              { name: "Services", to: "/services" },
              { name: s.name },
            ]}
          />
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#67e8f9]/10 text-[#67e8f9] ring-1 ring-[#67e8f9]/20">
                <ServiceIcon icon={s.icon} className="h-6 w-6" />
              </span>
              <h1 className="h-display mt-6 !text-[clamp(2.25rem,5vw,4.25rem)] text-platinum">
                {s.h1}
              </h1>
              <p className="lead mt-6 max-w-2xl">{s.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary">
                  Get a free estimate <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={whatsappLink(`Hi DodoX Tech! I'm interested in ${s.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Discuss on WhatsApp
                </a>
              </div>
            </div>
            <aside className="lg:col-span-5">
              <div className="card p-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                  Sound familiar?
                </h2>
                <ul className="mt-5 space-y-4">
                  {s.problems.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#67e8f9]"
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/[0.07] pt-5 text-sm text-white/55">
                  If you nodded at any of these, we can help — and the first conversation is free.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="What we deliver"
            title="What's included"
            accent={`in ${s.name}.`}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05} className="card p-6">
                <Check className="h-5 w-5 text-[#67e8f9]" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{d.desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal className="card p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                Technology we use
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06} className="card p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                Ideal for
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-3">
                {s.idealFor.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]" aria-hidden="true" />{" "}
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Proof */}
      {related.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeader eyebrow="Related work" title="Case studies" accent={`in ${s.label}.`} />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {related.map((c, i) => (
                <CaseStudyCard key={c.slug} c={c} i={i} />
              ))}
            </div>
            {(quote ?? testimonials[3]) && (
              <Reveal className="card mx-auto mt-12 max-w-3xl p-8 text-center sm:p-10">
                <blockquote className="serif-accent text-2xl leading-snug text-white/90 sm:text-3xl">
                  “{(quote ?? { text: testimonials[3].q }).text}”
                </blockquote>
                <p className="mt-5 text-sm text-white/50">
                  {quote
                    ? `${quote.author}, ${quote.role}`
                    : `${testimonials[3].a}, ${testimonials[3].r}`}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <ProcessSection />

      <FaqSection faqs={s.faqs} title="Common questions" accent={`about ${s.label}.`} />

      {/* Other services — internal links */}
      <section className="pb-6">
        <div className="container-x">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
            Other services
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: o.slug }}
                  className="btn-ghost !py-2.5 !text-sm"
                >
                  <ServiceIcon icon={o.icon} className="h-4 w-4 text-[#67e8f9]" /> {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection defaultService={s.name} title={`Let's talk about your ${s.label} project.`} />
    </>
  );
}
