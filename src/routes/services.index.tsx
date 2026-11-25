import { createFileRoute } from "@tanstack/react-router";
import {
  ContactSection,
  FaqSection,
  ProcessSection,
  ServiceCard,
  TechMarquee,
} from "@/components/site/sections";
import { Breadcrumbs, PageGlow, SectionHeader } from "@/components/site/ui";
import { homeFaqs, services } from "@/content/site";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () =>
    pageHead({
      title: "AI Automation & Custom Software Services | DodoX Tech",
      description:
        "AI automation, custom software, web and mobile app development, ERP and DevOps services from DodoX Tech in Coimbatore. Free consultation and fixed quotes.",
      path: "/services",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ],
    }),
});

function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 sm:pt-40">
        <PageGlow />
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Services" }]} />
          <SectionHeader
            as="h1"
            eyebrow="Services"
            title="Software & automation services"
            accent="for growing businesses."
            lead="DodoX Tech designs, builds and runs the systems behind your operations — from AI automations and custom software to mobile apps, business systems and the cloud they run on. Every project starts with a free consultation and a fixed written quote."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} s={s} i={i} />
            ))}
          </div>
          <div className="mt-16">
            <TechMarquee />
          </div>
        </div>
      </section>
      <ProcessSection />
      <FaqSection faqs={homeFaqs} />
      <ContactSection />
    </>
  );
}
