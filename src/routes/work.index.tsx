import { createFileRoute } from "@tanstack/react-router";
import { CaseStudyCard, ContactSection, TestimonialsSection } from "@/components/site/sections";
import { Breadcrumbs, PageGlow, SectionHeader } from "@/components/site/ui";
import { caseStudies } from "@/content/site";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  component: WorkPage,
  head: () =>
    pageHead({
      title: "Case Studies — AI Automation & App Projects | DodoX Tech",
      description:
        "See how DodoX Tech automated document processing with AI, built a Chrome extension and mobile apps, and delivered business systems for real clients.",
      path: "/work",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/work" },
        ]),
      ],
    }),
});

function WorkPage() {
  return (
    <>
      <section className="relative pt-32 sm:pt-40">
        <PageGlow />
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Case studies" }]} />
          <SectionHeader
            as="h1"
            eyebrow="Our work"
            title="Case studies:"
            accent="systems that run real businesses."
            lead="AI automations, custom tools, mobile apps and business systems we've designed and shipped — what the problem was, what we built and what changed."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <CaseStudyCard key={c.slug} c={c} i={i} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <ContactSection title="Want results like these?" />
    </>
  );
}
