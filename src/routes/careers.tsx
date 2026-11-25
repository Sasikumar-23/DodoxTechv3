import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Breadcrumbs, PageGlow, Reveal } from "@/components/site/ui";
import { company } from "@/content/site";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () =>
    pageHead({
      title: "Careers at DodoX Tech — Software & AI Jobs in Coimbatore",
      description:
        "Join DodoX Tech in Coimbatore. We're growing a team of developers, automation engineers and AI builders. Send us your profile to hear about openings.",
      path: "/careers",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]),
      ],
    }),
});

const roles = [
  "Automation & AI engineers (n8n, Python, LLMs)",
  "Full-stack developers (React / Node.js)",
  "Mobile developers (React Native)",
  "ERPNext / Frappe developers",
  "Interns & freshers with strong fundamentals",
];

function CareersPage() {
  const mail = `mailto:${company.email}?subject=${encodeURIComponent("Careers — DodoX Tech")}`;
  return (
    <section className="relative pb-24 pt-32 sm:pt-40">
      <PageGlow />
      <div className="container-x max-w-4xl">
        <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Careers" }]} />
        <p className="eyebrow">Careers</p>
        <h1 className="h-section mt-5 text-platinum">
          Build useful software <span className="serif-accent text-silver-glow">with us.</span>
        </h1>
        <p className="lead mt-6 max-w-2xl">
          {company.name} is a growing software studio in {company.city}. We don't have open
          positions listed right now, but we're always happy to hear from people who love building
          practical systems that save real businesses time.
        </p>

        <Reveal className="card mt-12 p-7 sm:p-9">
          <h2 className="text-lg font-semibold text-white">Profiles we're interested in</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {roles.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm text-white/70">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#67e8f9]"
                  aria-hidden="true"
                />{" "}
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mail} className="btn-primary">
              <Mail className="h-4 w-4" aria-hidden="true" /> Send your profile
            </a>
            <Link to="/about" className="btn-ghost">
              About DodoX <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
