import { createFileRoute } from "@tanstack/react-router";
import { caseStudies, company, services } from "@/content/site";
import { absUrl } from "@/lib/seo";

/** llms.txt — optional, low-cost summary for AI assistants (Google ignores it). */
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => {
        const body = `# ${company.name}

> ${company.description}

- Location: ${company.city}, ${company.region}, ${company.country} (serves clients across India and worldwide, remotely)
- Phone / WhatsApp: ${company.phone}
- Email: ${company.email}
- Languages: ${company.languages.join(", ")}
- Response time: ${company.responseTime}

## Services
${services.map((s) => `- [${s.name}](${absUrl(`/services/${s.slug}`)}): ${s.short}`).join("\n")}

## Case studies
${caseStudies.map((c) => `- [${c.title}](${absUrl(`/work/${c.slug}`)}): ${c.summary}`).join("\n")}

## Company
- [About](${absUrl("/about")})
- [Contact & free consultation](${absUrl("/contact")})
`;
        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
