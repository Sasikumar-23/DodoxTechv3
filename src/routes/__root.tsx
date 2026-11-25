import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState } from "react";
import { MotionConfig } from "framer-motion";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FeedbackModal } from "@/components/site/FeedbackModal";
import { MobileCtaBar, WhatsAppFab } from "@/components/site/SiteChrome";
import { FeedbackContext } from "@/lib/feedback-context";
import { ldJson, organizationSchema, pageHead } from "@/lib/seo";
import { services } from "@/content/site";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Instrument+Serif:ital@0;1&display=swap";

function NotFoundComponent() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="eyebrow justify-center">Error 404</p>
      <h1 className="h-section mt-5 text-platinum">
        This page <span className="serif-accent">doesn't exist.</span>
      </h1>
      <p className="lead mt-5 max-w-md">The page may have moved. Try one of these instead:</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Go home
        </Link>
        <Link to="/services" className="btn-ghost">
          Our services
        </Link>
        <Link to="/contact" className="btn-ghost">
          Contact us
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <h1 className="h-section text-platinum">This page didn't load</h1>
      <p className="lead mt-4 max-w-md">
        Something went wrong on our end. Try again, or head back home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </button>
        <a href="/" className="btn-ghost">
          Go home
        </a>
      </div>
    </section>
  );
}

const defaults = pageHead({
  title: "DodoX Tech — Software & AI Automation Studio in Coimbatore",
  description:
    "DodoX Tech builds AI automation, custom software, web and mobile apps that remove manual work for growing businesses in Coimbatore and across India.",
  path: "/",
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#030712" },
      { name: "author", content: "DodoX Tech" },
      { name: "format-detection", content: "telephone=yes" },
      ...defaults.meta,
      ldJson(organizationSchema(services)),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <FeedbackContext.Provider value={{ open: () => setFeedbackOpen(true) }}>
          <Navbar />
          <main id="main">
            <Outlet />
          </main>
          <Footer />
          <MobileCtaBar />
          <WhatsAppFab />
          <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
        </FeedbackContext.Provider>
      </MotionConfig>
    </QueryClientProvider>
  );
}
