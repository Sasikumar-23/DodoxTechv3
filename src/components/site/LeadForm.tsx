import { useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import { budgets, company, services, whatsappLink } from "@/content/site";
import { sendContactEmail } from "@/lib/mail";
import { WhatsAppIcon } from "./WhatsAppIcon";

function friendlyError(err: unknown) {
  const msg = err instanceof Error ? err.message : "";
  // Zod errors arrive as a JSON array — show a plain message instead.
  if (!msg || msg.trim().startsWith("[") || msg.trim().startsWith("{")) {
    return "Please check the form — name, a valid email and a short project description are required.";
  }
  return msg;
}

export function LeadForm({
  defaultService = "",
  compact = false,
}: {
  defaultService?: string;
  compact?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const page = useRouterState({ select: (s) => s.location.pathname });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setStatus("sending");
    setError(null);
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    try {
      await sendContactEmail({
        data: {
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          company: get("company"),
          service: get("service"),
          budget: get("budget"),
          details: get("details"),
          website: get("website"),
          page,
        },
      });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setError(friendlyError(err));
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="flex min-h-[420px] flex-col items-center justify-center text-center"
        role="status"
        aria-live="polite"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full border border-[#67e8f9]/40 bg-[#67e8f9]/10 shadow-[0_0_40px_rgba(103,232,249,0.25)]">
          <CheckCircle2 className="h-7 w-7 text-[#67e8f9]" aria-hidden="true" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">Thanks — your enquiry is in.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
          We've emailed you a confirmation. A real person will reply {company.responseTime} with
          next steps and a time for your free consultation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink("Hi DodoX Tech! I just sent an enquiry from your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon className="h-4 w-4" /> Need it faster? WhatsApp us
          </a>
          <button type="button" className="btn-ghost" onClick={() => setStatus("idle")}>
            Send another
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="lf-name" className="field-label">
            Your name *
          </label>
          <input
            id="lf-name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className="field"
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="lf-email" className="field-label">
            Work email *
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="field"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="lf-phone" className="field-label">
            Phone / WhatsApp
          </label>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            inputMode="tel"
            className="field"
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label htmlFor="lf-company" className="field-label">
            Company
          </label>
          <input
            id="lf-company"
            name="company"
            maxLength={150}
            autoComplete="organization"
            className="field"
            placeholder="Business name"
          />
        </div>
        <div>
          <label htmlFor="lf-service" className="field-label">
            What do you need?
          </label>
          <select
            id="lf-service"
            name="service"
            defaultValue={defaultService}
            className="field appearance-none bg-[#0b0f19]"
          >
            <option value="">Not sure yet — advise me</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lf-budget" className="field-label">
            Budget
          </label>
          <select
            id="lf-budget"
            name="budget"
            defaultValue=""
            className="field appearance-none bg-[#0b0f19]"
          >
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lf-details" className="field-label">
          Project details *
        </label>
        <textarea
          id="lf-details"
          name="details"
          required
          minLength={10}
          maxLength={5000}
          rows={compact ? 4 : 5}
          className="field resize-y"
          placeholder="What would you like to build or automate? What's slowing your team down today?"
        />
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="lf-website">Website</label>
        <input id="lf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-white/40">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Confidential. Reply{" "}
          {company.responseTime}. No spam, ever.
        </p>
        <button
          type="submit"
          disabled={sending}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Get my free estimate <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
