import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Sticky bottom bar on phones: the two highest-intent actions, always one tap away. */
export function MobileCtaBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="glass-strong flex gap-2 rounded-2xl p-2 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.8)]">
        <a
          href={whatsappLink("Hi DodoX Tech! I'd like to discuss a project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex-1 !px-3 !py-3"
        >
          <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
        </a>
        <Link to="/contact" className="btn-primary flex-[1.3] !px-3 !py-3">
          Free estimate <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/** Desktop floating WhatsApp button. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi DodoX Tech! I'd like to discuss a project.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DodoX Tech on WhatsApp"
      className="glass-strong fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full text-[#25D366] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.9)] transition-transform hover:-translate-y-1 md:grid"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
