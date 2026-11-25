import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, MessageSquarePlus, Phone } from "lucide-react";
import footerLogo from "@/assets/dodoxtechs_logo_black.png";
import { company, services } from "@/content/site";
import { useOpenFeedback } from "@/lib/feedback-context";
import { InstagramIcon } from "./InstagramIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const openFeedback = useOpenFeedback();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200/60 bg-slate-50 text-slate-900">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + NAP */}
          <div className="md:col-span-4">
            <Link to="/" aria-label="DodoX Tech — home" className="inline-block">
              <img
                src={footerLogo}
                alt="DodoXtechs Studio"
                width={300}
                height={80}
                className="h-20 w-auto -ml-2"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {company.name} is a software &amp; AI automation studio in {company.city},{" "}
              {company.region}. We build AI automation, custom software and web &amp; mobile apps
              for growing businesses across India and beyond.
            </p>
            <address className="mt-5 space-y-2 text-sm not-italic text-slate-600">
              <a
                href={`tel:${company.phoneE164}`}
                className="flex items-center gap-2.5 hover:text-cyan-700"
              >
                <Phone className="h-4 w-4 text-slate-400" aria-hidden="true" /> {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2.5 break-all hover:text-cyan-700"
              >
                <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />{" "}
                {company.email}
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" /> {company.city},{" "}
                {company.region}, {company.country}
              </span>
            </address>
            <div className="mt-5 flex gap-2">
              {[
                { href: company.whatsappSales, label: "WhatsApp", Icon: WhatsAppIcon },
                { href: company.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: company.socials.instagram, label: "Instagram", Icon: InstagramIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${company.name} on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300/60 bg-white text-slate-500 transition-colors hover:border-slate-400 hover:text-slate-900"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services" className="md:col-span-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-sm text-slate-600 hover:text-cyan-700"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link to="/about" className="hover:text-cyan-700">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-cyan-700">
                  Case studies
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-cyan-700">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-700">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Talk to us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Free consultation. We reply {company.responseTime}.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={company.whatsappSales}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp sales
              </a>
              <a
                href={company.whatsappSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400"
              >
                Existing client support
              </a>
              <button
                type="button"
                onClick={openFeedback}
                className="inline-flex items-center justify-center gap-1.5 py-1 text-xs text-slate-500 hover:text-slate-900"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden="true" /> Share feedback
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row">
          <p>
            © {year} {company.name} ({company.legalName}). All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-slate-900">
              Privacy policy
            </Link>
            <Link to="/terms" className="hover:text-slate-900">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
