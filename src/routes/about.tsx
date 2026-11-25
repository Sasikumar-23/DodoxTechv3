import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Lightbulb, ShieldCheck, Target } from "lucide-react";
import {
  ContactSection,
  IndustriesSection,
  ProcessSection,
  StatsBar,
  TechMarquee,
} from "@/components/site/sections";
import { Breadcrumbs, PageGlow, Reveal, SectionHeader } from "@/components/site/ui";
import { company } from "@/content/site";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    pageHead({
      title: "About DodoX Tech — Software Studio in Coimbatore",
      description:
        "DodoX Tech is a Coimbatore software studio building AI automation, custom software and web and mobile apps. Learn how we work and what we believe in.",
      path: "/about",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
});

const values = [
  {
    Icon: Target,
    title: "Outcomes over output",
    desc: "We measure success in hours saved and errors removed — not in features shipped or lines of code.",
  },
  {
    Icon: Lightbulb,
    title: "Simplest thing that works",
    desc: "If a spreadsheet tweak or an off-the-shelf tool solves it, we'll tell you. We build custom only when it pays off.",
  },
  {
    Icon: ShieldCheck,
    title: "Built to last",
    desc: "Clean, documented, maintainable code on proven open technologies — no lock-in, no black boxes.",
  },
  {
    Icon: Handshake,
    title: "Straight talk",
    desc: "Fixed written quotes, weekly progress, and honest answers. You always know where your project stands.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="relative pt-32 sm:pt-40">
        <PageGlow />
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "About" }]} />
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader
                as="h1"
                eyebrow="About us"
                title="We build the systems"
                accent="behind growing businesses."
              />
            </div>
            <Reveal className="prose-dodo space-y-5 lg:col-span-5 lg:pt-16">
              <p>
                {company.name} ({company.legalName}) is a software and AI automation studio based in{" "}
                {company.city}, {company.region}. We help small and mid-sized businesses replace
                manual, repetitive work with reliable software — AI automations, custom software,
                web and mobile apps, and the business systems they connect to.
              </p>
              <p>
                Most of our clients come to us with the same problem: the business has grown, but
                the way it runs hasn't. Orders live in WhatsApp, stock in Excel and reports in
                someone's head. We fix that by understanding the workflow first, then building the
                simplest system that removes the bottleneck.
              </p>
              <p>
                We work with clients across Tamil Nadu, India and abroad — in English or Tamil — and
                stay with them after launch with support, monitoring and improvements.
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-16">
            <StatsBar />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="What we believe"
            title="How we work"
            accent="with every client."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06} className="card p-7">
                <Icon className="h-6 w-6 text-[#67e8f9]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{desc}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <TechMarquee />
          </div>
        </div>
      </section>

      <ProcessSection />
      <IndustriesSection />
      <ContactSection title="Let's build something useful together." />
    </>
  );
}
