import { createFileRoute } from "@tanstack/react-router";
import { caseStudies, services } from "@/content/site";
import { absUrl, CONTENT_UPDATED } from "@/lib/seo";

/**
 * Generated from the same content as the pages, so new services / case studies
 * appear automatically. Per Google guidance: canonical URLs only, <lastmod> only
 * (priority & changefreq are ignored by Google, so they're omitted).
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          "/",
          "/services",
          ...services.map((s) => `/services/${s.slug}`),
          "/work",
          ...caseStudies.map((c) => `/work/${c.slug}`),
          "/about",
          "/contact",
          "/careers",
          "/privacy",
          "/terms",
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${absUrl(p)}</loc><lastmod>${CONTENT_UPDATED}</lastmod></url>`).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
