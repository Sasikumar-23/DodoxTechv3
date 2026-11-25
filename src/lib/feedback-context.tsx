import { createContext, useContext } from "react";

// Lets any component (Footer's "Feedback" link, the Testimonials section CTA)
// open the single shared FeedbackModal instance rendered once at the root,
// instead of every trigger owning its own modal/open-state.
export const FeedbackContext = createContext<{ open: () => void } | null>(null);

export function useOpenFeedback() {
  const ctx = useContext(FeedbackContext);
  return ctx?.open ?? (() => {});
}
