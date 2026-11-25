import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { company, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/* Illustrative mock of a typical DodoX build: an AI assistant + custom dashboard. */
const FLOW = [
  {
    Icon: MessageSquare,
    title: "New enquiry on WhatsApp",
    meta: "“Need an app for my academy…”",
    tone: "text-white/70",
  },
  {
    Icon: Sparkles,
    title: "AI understands & qualifies it",
    meta: "Mobile app · ₹1L–₹5L · high intent",
    tone: "text-[#67e8f9]",
  },
  {
    Icon: Send,
    title: "Instant, personal reply sent",
    meta: "Answer shared · call booked",
    tone: "text-white/70",
  },
  {
    Icon: LayoutDashboard,
    title: "Logged in your custom dashboard",
    meta: "Lead created · sales team notified",
    tone: "text-white/70",
  },
];

const BARS = [38, 52, 44, 66, 58, 80, 72, 94];

function AutomationVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] sm:mb-12" aria-hidden="true">
      {/* halo */}
      <div className="absolute -inset-10 rounded-full bg-[#67e8f9]/[0.07] blur-3xl" />
      <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full border border-dashed border-white/10 animate-spin-slow" />

      <div className="glass-strong ambient-halo relative rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#67e8f9]/10 text-[#67e8f9]">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-white">AI sales assistant</p>
              <p className="text-[11px] text-white/40">Custom-built by DodoX · runs 24/7</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse-soft" /> Live
          </span>
        </div>

        <ol className="relative mt-5 space-y-3">
          <span className="absolute bottom-6 left-[31px] top-6 w-px overflow-hidden bg-white/[0.08]">
            <span className="animate-flow-dot absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-[#67e8f9] to-transparent" />
          </span>
          {FLOW.map(({ Icon, title, meta, tone }, i) => (
            <li
              key={title}
              className="relative flex items-center gap-3.5 rounded-2xl bg-white/[0.025] p-3 ring-1 ring-white/[0.06]"
            >
              <span
                className={`relative z-10 grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl bg-[#0b1120] ring-1 ring-white/10 ${tone}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white/90">{title}</p>
                <p className="truncate text-[11px] text-white/40">{meta}</p>
              </div>
              <CheckCircle2
                className={`h-4 w-4 shrink-0 ${i === FLOW.length - 1 ? "text-emerald-300" : "text-white/25"}`}
              />
            </li>
          ))}
        </ol>

        {/* mini custom-dashboard strip */}
        <div className="mt-5 flex items-end justify-between gap-6 border-t border-white/[0.07] pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/35">Your dashboard</p>
            <p className="mt-1 text-sm font-medium text-white/85">Enquiries this week</p>
          </div>
          <div className="flex h-10 flex-1 items-end justify-end gap-1.5">
            {BARS.map((h, i) => (
              <span
                key={i}
                className={`w-2.5 rounded-sm ${i === BARS.length - 1 ? "bg-[#67e8f9]" : "bg-white/15"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* floating badge — sits below the card so it never covers content */}
      <div className="glass-strong animate-float absolute -bottom-12 -left-4 hidden items-center gap-2.5 rounded-2xl px-4 py-3 shadow-2xl sm:flex">
        <span className="text-2xl font-semibold text-platinum">72%</span>
        <span className="text-[11px] leading-tight text-white/50">
          less manual
          <br />
          work
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-mask absolute inset-0 opacity-50" />
        <div className="absolute left-[15%] top-24 h-[480px] w-[480px] rounded-full bg-[#67e8f9]/[0.05] blur-[140px]" />
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-white/[0.03] blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="chip !normal-case !tracking-normal !text-xs">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#67e8f9] animate-pulse-soft" />
            Software &amp; AI automation studio · {company.city}, India
          </p>

          <h1 className="h-display mt-7 text-platinum">
            Still running your business{" "}
            <span className="serif-accent text-silver-glow">manually?</span>
          </h1>

          <p className="lead mt-7 max-w-xl">
            {company.name} builds{" "}
            <strong className="font-medium text-white/85">AI automation</strong>,{" "}
            <strong className="font-medium text-white/85">custom software</strong> and web &amp;
            mobile apps that take repetitive work off your team — so you spend less time on
            spreadsheets and more time growing.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="btn-primary">
              Get a free project estimate <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink("Hi DodoX Tech! I'd like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
            {[
              "Free consultation",
              "Fixed quote before we start",
              `Reply ${company.responseTime}`,
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#67e8f9]/80" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <AutomationVisual />
        </div>
      </div>
    </section>
  );
}
