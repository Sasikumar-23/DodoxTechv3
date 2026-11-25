import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageSquarePlus,
  Phone,
  Quote,
} from "lucide-react";
import {
  caseStudies,
  company,
  industries,
  process,
  services,
  stats,
  techStack,
  testimonials,
  whatsappLink,
  type CaseStudy,
  type Service,
} from "@/content/site";
import { useOpenFeedback } from "@/lib/feedback-context";
import { LeadForm } from "./LeadForm";
import { Reveal, SectionHeader, ServiceIcon } from "./ui";
import { WhatsAppIcon } from "./WhatsAppIcon";

/* ─── Cards ─────────────────────────────────────────────────────────────── */

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  return (
    <Reveal delay={i * 0.06} as="article" className="h-full">
      <Link
        to="/services/$slug"
        params={{ slug: s.slug }}
        className="card card-hover group flex h-full flex-col p-6 sm:p-7"
      >
        <div className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#67e8f9]/10 text-[#67e8f9] ring-1 ring-[#67e8f9]/20">
            <ServiceIcon icon={s.icon} />
          </span>
          <ArrowUpRight
            className="h-5 w-5 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#67e8f9]"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-6 text-lg font-semibold text-white">{s.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{s.short}</p>
        <ul className="mt-5 space-y-1.5 text-[13px] text-white/50">
          {s.deliverables.slice(0, 3).map((d) => (
            <li key={d.title} className="flex gap-2">
              <span
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#67e8f9]/70"
                aria-hidden="true"
              />
              {d.title}
            </li>
          ))}
        </ul>
        <span className="mt-auto pt-6 text-sm font-medium text-white/70 group-hover:text-white">
          Learn more →
        </span>
      </Link>
    </Reveal>
  );
}

export function CaseStudyCard({
  c,
  i = 0,
  priority = false,
}: {
  c: CaseStudy;
  i?: number;
  priority?: boolean;
}) {
  return (
    <Reveal delay={i * 0.06} as="article" className="h-full">
      <Link
        to="/work/$slug"
        params={{ slug: c.slug }}
        className="card card-hover group flex h-full flex-col overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0f19]">
          <img
            src={c.cover}
            alt={`${c.title} — ${c.type} project by DodoX Tech`}
            width={1400}
            height={875}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent" />
          <span className="chip absolute bottom-4 left-4 !bg-[#030712]/80 backdrop-blur">
            {c.type}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#67e8f9]/80">
            {c.industry} · {c.year}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{c.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{c.summary}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-white/70 group-hover:text-white">
            Read case study{" "}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ─── Sections ──────────────────────────────────────────────────────────── */

export function StatsBar() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06] md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-[#050a17] px-5 py-6 sm:px-7">
          <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">{s.label}</dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-platinum sm:text-4xl">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TechMarquee() {
  const row = [...techStack, ...techStack];
  return (
    <div
      className="pause-on-hover mask-fade-x overflow-hidden"
      aria-label="Technologies we work with"
    >
      <ul className="animate-marquee flex w-max gap-3">
        {row.map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= techStack.length}
            className="chip whitespace-nowrap !px-4 !py-2 !text-[11px]"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="services" className="section">
      <div className="container-x">
        {heading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="What we do"
              title="Five ways we take work"
              accent="off your plate."
              lead="Pick one, or combine them. Most clients start with a single painful process and grow from there."
            />
            <Reveal>
              <Link to="/services" className="btn-ghost">
                All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        )}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} s={s} i={i} />
          ))}
          <Reveal delay={0.3} className="h-full">
            <div className="card flex h-full flex-col justify-between overflow-hidden p-7">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#67e8f9]/10 blur-3xl"
              />
              <div className="relative">
                <p className="text-lg font-semibold text-white">Not sure what you need?</p>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  Tell us what's slowing your team down. We'll recommend the simplest fix — even if
                  it isn't custom software.
                </p>
              </div>
              <Link to="/contact" className="btn-primary relative mt-6 self-start">
                Book a free call <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WorkSection({ limit = 3, title }: { limit?: number; title?: string }) {
  const list = caseStudies.slice(0, limit);
  return (
    <section id="work" className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected work"
            title={title ?? "Real systems,"}
            accent={title ? undefined : "running real businesses."}
            lead="AI automation, apps and business systems we've shipped for manufacturers, e-commerce teams, academies and schools."
          />
          <Reveal>
            <Link to="/work" className="btn-ghost">
              All case studies <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <CaseStudyCard key={c.slug} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="How we work"
          title="From first call to launch —"
          accent="no surprises."
          lead="A simple, transparent process. You always know what's being built, what it costs and when it ships."
        />
        <ol className="mt-14 grid gap-4 md:grid-cols-5">
          {process.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 0.07} className="card relative p-6">
              <span className="font-serif text-4xl italic text-[#67e8f9]/80">{p.n}</span>
              <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Industries"
            title="Built for the way"
            accent="your industry works."
            lead="We've solved real operational problems across 12+ industries. A few where we do our best work:"
          />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} as="li" delay={i * 0.05} className="card p-5">
              <p className="font-medium text-white">{ind.name}</p>
              <p className="mt-1 text-sm text-white/50">{ind.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const openFeedback = useOpenFeedback();
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="section overflow-hidden">
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Client words"
          title="Trusted by teams that"
          accent="care about the details."
        />
        <Reveal>
          <button type="button" onClick={openFeedback} className="btn-ghost">
            <MessageSquarePlus className="h-4 w-4 text-[#67e8f9]" aria-hidden="true" /> Share your
            experience
          </button>
        </Reveal>
      </div>
      <div className="pause-on-hover mask-fade-x mt-12">
        <ul className="animate-marquee flex w-max gap-5">
          {loop.map((t, i) => (
            <li key={i} aria-hidden={i >= testimonials.length} className="w-[300px] sm:w-[400px]">
              <figure className="card h-full p-7">
                <Quote className="h-5 w-5 text-[#67e8f9]" aria-hidden="true" />
                <blockquote className="mt-4 leading-relaxed text-white/85">“{t.q}”</blockquote>
                <figcaption className="mt-6 border-t border-white/[0.08] pt-4">
                  <span className="block text-sm font-medium text-white">{t.a}</span>
                  <span className="block text-xs text-white/45">{t.r}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Visible Q&A (not an accordion) so answers are always in the HTML and on screen. */
export function FaqSection({
  faqs,
  title = "Questions clients",
  accent = "ask us first.",
}: {
  faqs: { q: string; a: string }[];
  title?: string;
  accent?: string;
}) {
  return (
    <section id="faq" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="FAQ" title={title} accent={accent} />
          <Reveal className="mt-8">
            <p className="text-sm text-white/50">Still have a question?</p>
            <a
              href={whatsappLink("Hi DodoX Tech, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#67e8f9] hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" /> Ask us on WhatsApp
            </a>
          </Reveal>
        </div>
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <dt className="text-base font-semibold text-white">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/55">{f.a}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function ContactChannels() {
  const items = [
    {
      href: whatsappLink("Hi DodoX Tech! I'd like to discuss a project."),
      label: "WhatsApp (fastest)",
      value: company.phone,
      Icon: WhatsAppIcon,
      external: true,
    },
    { href: `tel:${company.phoneE164}`, label: "Call", value: company.phone, Icon: Phone },
    { href: `mailto:${company.email}`, label: "Email", value: company.email, Icon: Mail },
  ];
  return (
    <ul className="space-y-3">
      {items.map(({ href, label, value, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="card card-hover flex items-center gap-4 p-4"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#67e8f9]/10 text-[#67e8f9]">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.18em] text-white/40">
                {label}
              </span>
              <span className="block truncate text-sm font-medium text-white/90">{value}</span>
            </span>
          </a>
        </li>
      ))}
      <li className="flex items-center gap-4 px-4 pt-2 text-sm text-white/50">
        <MapPin className="h-4 w-4 text-white/35" aria-hidden="true" /> {company.city},{" "}
        {company.region} · working with clients across India &amp; worldwide
      </li>
      <li className="flex items-center gap-4 px-4 text-sm text-white/50">
        <Clock className="h-4 w-4 text-white/35" aria-hidden="true" /> We reply{" "}
        {company.responseTime}
      </li>
    </ul>
  );
}

export function ContactSection({
  defaultService,
  title = "Tell us what's slowing you down.",
  lead = "Share a few details and we'll come back within 24 hours with honest advice, a rough estimate and a time for a free consultation call.",
}: {
  defaultService?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="card overflow-hidden p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#67e8f9]/[0.07] blur-3xl"
          />
          <div className="relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Free consultation</p>
              <h2 className="h-section mt-5 text-platinum">{title}</h2>
              <p className="lead mt-5">{lead}</p>
              <div className="mt-8">
                <ContactChannels />
              </div>
            </div>
            <div className="lg:col-span-7">
              <LeadForm defaultService={defaultService} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
