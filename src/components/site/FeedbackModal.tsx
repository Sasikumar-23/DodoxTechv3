import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, Star, X } from "lucide-react";
import { sendFeedbackEmail } from "@/lib/mail";

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? value;
  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(null)}
          className="p-0.5"
        >
          <Star
            className={`h-6 w-6 transition-colors ${n <= shown ? "fill-[var(--cyan-soft)] text-[var(--cyan-soft)]" : "text-white/20"}`}
          />
        </button>
      ))}
    </div>
  );
}

function FeedbackForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    setError(null);

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name") as string,
      email: (formData.get("email") as string) || "",
      rating,
      message: formData.get("message") as string,
    };

    try {
      await sendFeedbackEmail({ data });
      setSent(true);
      formRef.current.reset();
      setRating(5);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg && !/^\s*[[{]/.test(msg)
          ? msg
          : "Please add your name and a short message, then try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-10 gap-4"
      >
        <div className="h-14 w-14 rounded-full border border-[var(--cyan-soft)]/40 bg-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(103,232,249,0.25)]">
          <svg
            className="h-6 w-6 text-[var(--cyan-soft)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">Thanks for the feedback!</h4>
          <p className="text-sm text-white/50 mt-1 max-w-xs">
            We read every message — we'll be in touch if it needs a reply.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-sm font-bold text-[#030712] silver-gradient"
        >
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[9px] uppercase tracking-[0.28em] mb-1.5 font-bold text-white/50">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full bg-transparent border-0 border-b border-white/15 focus:border-white/50 text-white/90 placeholder:text-white/20 py-2 text-sm font-light outline-none transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-[9px] uppercase tracking-[0.28em] mb-1.5 font-bold text-white/50">
            Email (optional)
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            className="w-full bg-transparent border-0 border-b border-white/15 focus:border-white/50 text-white/90 placeholder:text-white/20 py-2 text-sm font-light outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] mb-2 font-bold text-white/50">
          Rating
        </label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block text-[9px] uppercase tracking-[0.28em] mb-1.5 font-bold text-white/50">
          Your feedback
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="What was your experience working with us?"
          className="w-full bg-transparent border-0 border-b border-white/15 focus:border-white/50 text-white/90 placeholder:text-white/20 py-2 text-sm font-light outline-none transition-all duration-200 resize-none"
        />
      </div>

      {error && (
        <div className="text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex justify-end pt-1">
        <motion.button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-[#030712] silver-gradient disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" /> Send Feedback
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

// Rendered once near the app root (see __root.tsx). Its open/close state is
// lifted up to FeedbackContext so any component — the footer's "Feedback"
// link, the Testimonials section CTA — can trigger this same single instance
// instead of each owning a duplicate modal.
export function FeedbackModal({ open, onClose }: FeedbackModalProps) {
  // Lock background scroll while the popup is open
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Share your feedback"
            className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto overscroll-contain rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-7"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1 pr-6">Share your feedback</h3>
            <p className="text-xs text-white/40 mb-5">
              Working with us? We'd love to hear how it went.
            </p>

            <FeedbackForm onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
