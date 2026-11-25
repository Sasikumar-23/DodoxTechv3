import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import fullLogo from "@/assets/logo-full-white-transparent.svg";
import { services } from "@/content/site";
import { ServiceIcon } from "./ui";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${solid ? "py-2" : "py-3 sm:py-4"}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <div className="container-x">
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl px-3 py-2 sm:px-4 transition-all duration-300 ${
            solid
              ? "glass-strong shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
              : "border border-transparent"
          }`}
        >
          <Link to="/" aria-label="DodoX Tech — home" className="flex shrink-0 items-center">
            <img
              src={fullLogo}
              alt="DodoX Tech"
              width={172}
              height={40}
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <div className="group relative">
              <Link
                to="/services"
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
                activeProps={{ className: "text-white" }}
              >
                Services{" "}
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                />
              </Link>
              <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="glass-strong grid grid-cols-2 gap-1 rounded-2xl p-2 shadow-2xl">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#67e8f9]/10 text-[#67e8f9]">
                        <ServiceIcon icon={s.icon} className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-white">{s.name}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-white/45 line-clamp-2">
                          {s.short}
                        </span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="flex items-center justify-center gap-1.5 rounded-xl p-3 text-sm text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    All services <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
                activeProps={{ className: "text-white" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link to="/contact" className="btn-primary !px-4 !py-2.5 !text-[13px] sm:!px-5">
              <span className="hidden sm:inline">Get a free estimate</span>
              <span className="sm:hidden">Get estimate</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-xl glass text-white md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-0 -z-10 overflow-y-auto bg-[#030712]/97 px-5 pb-10 pt-24 backdrop-blur-2xl md:hidden"
        >
          <p className="eyebrow mb-3">Services</p>
          <ul className="mb-6 space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="flex items-center gap-3 rounded-xl px-2 py-3 text-base text-white/85"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#67e8f9]/10 text-[#67e8f9]">
                    <ServiceIcon icon={s.icon} className="h-4 w-4" />
                  </span>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="border-t border-white/[0.08] pt-4">
            {[
              { to: "/services", label: "All services" },
              ...links,
              { to: "/careers", label: "Careers" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block border-b border-white/[0.06] px-2 py-4 text-lg font-medium text-white/85"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
