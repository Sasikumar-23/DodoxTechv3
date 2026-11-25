import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import {
  ContactSection,
  FaqSection,
  IndustriesSection,
  ProcessSection,
  ServicesSection,
  StatsBar,
  TechMarquee,
  TestimonialsSection,
  WorkSection,
} from "@/components/site/sections";
import { Reveal, SectionHeader } from "@/components/site/ui";
import { engagementModels, homeFaqs, outcomes } from "@/content/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () =>
    pageHead({
      title: "DodoX Tech — Software & AI Automation Studio in Coimbatore",
      description:
        "DodoX Tech builds AI automation, custom software, web and mobile apps that remove manual work for growing businesses in Coimbatore and across India.",
      path: "/",
    }),
});

const beforeAfter = [
  [
    "Staff re-type invoices and orders into spreadsheets",
    "Documents are read by AI and entered automatically",
  ],
  ["Stock, sales and accounts never match", "One connected system with real-time numbers"],
  ["Reports take days to compile", "Live dashboards, always up to date"],
  ["Follow-ups and approvals slip through the cracks", "Automated reminders, approvals and alerts"],
];

function Index() {
  return (
    <>
      <Hero />

      {/* Proof strip */}
      <section aria-label="DodoX Tech at a glance" className="pb-6">
        <div className="container-x space-y-10">
          <Reveal>
            <StatsBar />
          </Reveal>
          <TechMarquee />
        </div>
      </section>

      {/* Problem → outcome */}
      <section id="about" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Why DodoX"
              title="Every business has a problem."
              accent="We build the fix."
              lead="DodoX Tech is a software studio that replaces manual, repetitive work with reliable systems. We start from your bottleneck — not from a technology — and build only what moves the needle."
            />
            <Reveal className="mt-8">
              <Link to="/about" className="btn-ghost">
                About DodoX Tech <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="card overflow-hidden">
              <div className="grid grid-cols-2 border-b border-white/[0.07] text-[11px] font-semibold uppercase tracking-[0.2em]">
                <p className="px-5 py-4 text-white/40 sm:px-6">Before</p>
                <p className="border-l border-white/[0.07] px-5 py-4 text-[#67e8f9] sm:px-6">
                  With DodoX
                </p>
              </div>
              <ul>
                {beforeAfter.map(([before, after]) => (
                  <li
                    key={before}
                    className="grid grid-cols-2 border-b border-white/[0.05] last:border-0"
                  >
                    <p className="flex gap-2.5 px-5 py-5 text-sm leading-relaxed text-white/45 sm:px-6">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-white/25" aria-hidden="true" />{" "}
                      {before}
                    </p>
                    <p className="flex gap-2.5 border-l border-white/[0.07] bg-[#67e8f9]/[0.025] px-5 py-5 text-sm leading-relaxed text-white/85 sm:px-6">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]"
                        aria-hidden="true"
                      />{" "}
                      {after}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <ServicesSection />

      <WorkSection limit={3} />

      {/* Outcomes */}
      <section className="section">
        <div
          aria-hidden="true"
          className="grid-mask pointer-events-none absolute inset-0 -z-10 opacity-40"
        />
        <div className="container-x">
          <SectionHeader
            eyebrow="Outcomes"
            title="Measured in hours saved,"
            accent="not lines of code."
            align="center"
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.06} className="card p-7">
                <p className="text-5xl font-semibold tracking-tight text-platinum">
                  {o.value}
                  <span className="text-[#67e8f9]">{o.suffix}</span>
                </p>
                <p className="mt-4 font-medium text-white">{o.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">{o.desc}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/35">
            Typical results across client projects; your numbers depend on your workflows.
          </p>
        </div>
      </section>

      <ProcessSection />

      <IndustriesSection />

      {/* Engagement models */}
      <section className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow="Ways to work together"
            title="Start small."
            accent="Scale when it works."
            lead="Every engagement starts with a free consultation and a written, fixed quote — so you know exactly what you'll get and what it costs."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {engagementModels.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06} className="card flex flex-col p-7">
                <h3 className="text-lg font-semibold text-white">{m.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{m.desc}</p>
                <p className="mt-auto pt-6 text-xs uppercase tracking-[0.16em] text-[#67e8f9]/80">
                  {m.best}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FaqSection faqs={homeFaqs} />

      <ContactSection />
    </>
  );
}
