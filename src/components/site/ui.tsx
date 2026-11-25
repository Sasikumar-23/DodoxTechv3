import { Link } from "@tanstack/react-router";
import { Brain, ChevronRight, Database, Globe, Server, Smartphone } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Service } from "@/content/site";

/* One shared IntersectionObserver for every <Reveal>. */
const revealCallbacks = new WeakMap<Element, () => void>();
let revealObserver: IntersectionObserver | null = null;
function observeReveal(el: Element, onShow: () => void) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          revealCallbacks.get(e.target)?.();
          revealCallbacks.delete(e.target);
          revealObserver?.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  }
  revealCallbacks.set(el, onShow);
  revealObserver.observe(el);
  return () => {
    revealCallbacks.delete(el);
    revealObserver?.unobserve(el);
  };
}

/**
 * Fades/slides content in on scroll. Server HTML is always fully visible (good
 * for crawlers & no-JS); only elements that start below the fold after
 * hydration are hidden and then revealed. State lives in React, so there are
 * no hydration mismatches.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already visible
    setState("armed");
    return observeReveal(el, () => setState("shown"));
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal={state}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  as: H = "h2",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <H className={`${H === "h1" ? "h-display" : "h-section"} mt-5 text-platinum`}>
        {title}
        {accent && (
          <>
            {" "}
            <span className="serif-accent text-silver-glow">{accent}</span>
          </>
        )}
      </H>
      {lead && <p className={`lead mt-6 ${center ? "mx-auto" : ""} max-w-2xl`}>{lead}</p>}
    </Reveal>
  );
}

const ICONS = {
  brain: Brain,
  database: Database,
  globe: Globe,
  smartphone: Smartphone,
  server: Server,
};

export function ServiceIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: Service["icon"];
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />;
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; to?: string; params?: Record<string, string> }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/45">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3 text-white/25" aria-hidden="true" />}
            {it.to ? (
              <Link
                to={it.to}
                params={it.params as never}
                className="hover:text-white transition-colors"
              >
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-white/70">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Dark ambient backdrop used at the top of inner pages. */
export function PageGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden"
    >
      <div className="grid-mask absolute inset-0 opacity-50" />
      <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-[#67e8f9]/[0.05] blur-[120px]" />
      <div className="absolute right-0 top-10 h-[360px] w-[360px] rounded-full bg-white/[0.03] blur-[120px]" />
    </div>
  );
}
