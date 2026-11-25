import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, TrendingUp } from "lucide-react";
import { CaseStudyCard, ContactSection } from "@/components/site/sections";
import { Breadcrumbs, PageGlow, Reveal, ServiceIcon } from "@/components/site/ui";
import { caseStudies, getCaseStudy, getService } from "@/content/site";
import { breadcrumbSchema, caseStudySchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const c = loaderData.study;
    return pageHead({
      title:
        `${c.title} — Case Study | DodoX Tech`.length <= 60
          ? `${c.title} — Case Study | DodoX Tech`
          : `${c.title} | DodoX Tech`,
      description: c.metaDescription,
      path: `/work/${c.slug}`,
      image: c.cover,
      imageAlt: c.title,
      type: "article",
      jsonLd: [
        caseStudySchema(c),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/work" },
          { name: c.title, path: `/work/${c.slug}` },
        ]),
      ],
    });
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study: c } = Route.useLoaderData();
  const relatedServices = c.services.map(getService).filter((s) => !!s);
  const more = caseStudies.filter((o) => o.slug !== c.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative pt-32 sm:pt-40">
          <PageGlow />
          <div className="container-x">
            <Breadcrumbs
              items={[
                { name: "Home", to: "/" },
                { name: "Case studies", to: "/work" },
                { name: c.title },
              ]}
            />
            <p className="eyebrow">Case study · {c.type}</p>
            <h1 className="h-display mt-5 max-w-4xl !text-[clamp(2.25rem,5vw,4.25rem)] text-platinum">
              {c.title}
            </h1>
            <p className="lead mt-6 max-w-3xl">{c.summary}</p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.06] md:grid-cols-4">
              {[
                ["Client", c.client],
                ["Industry", c.industry],
                ["Year", c.year],
                ["Stack", c.tech.slice(0, 3).join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#050a17] px-5 py-5">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">{k}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-white/85">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="card mt-10 aspect-[16/10] overflow-hidden bg-[#0b0f19]">
              <img
                src={c.cover}
                alt={`${c.title} — interface overview`}
                width={1400}
                height={875}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="section">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="space-y-14 lg:col-span-8">
              <Reveal>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">The challenge</h2>
                <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
                  {c.challenge}
                </p>
              </Reveal>
              <Reveal>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">What we built</h2>
                <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
                  {c.solution}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {c.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-white/75">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]"
                        aria-hidden="true"
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
              {c.gallery.length > 0 && (
                <Reveal className={c.gallery.length > 1 ? "grid gap-4 sm:grid-cols-2" : "max-w-xl"}>
                  {c.gallery.map((g, i) => (
                    <div key={g} className="card overflow-hidden">
                      <img
                        src={g}
                        alt={`${c.title} — screen ${i + 2}`}
                        width={1000}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="w-full"
                      />
                    </div>
                  ))}
                </Reveal>
              )}
              <Reveal>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">The results</h2>
                <ul className="mt-6 space-y-3">
                  {c.results.map((r) => (
                    <li key={r} className="card flex gap-3 p-5 text-white/85">
                      <TrendingUp
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#67e8f9]"
                        aria-hidden="true"
                      />{" "}
                      {r}
                    </li>
                  ))}
                </ul>
              </Reveal>
              {c.quote && (
                <Reveal as="div" className="card p-8 sm:p-10">
                  <blockquote className="serif-accent text-2xl leading-snug text-white/90 sm:text-3xl">
                    “{c.quote.text}”
                  </blockquote>
                  <p className="mt-5 text-sm text-white/50">
                    {c.quote.author}, {c.quote.role}
                  </p>
                </Reveal>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="card p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                    Technology
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                    Services used
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {relatedServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="flex items-center gap-2.5 rounded-lg py-1.5 text-sm text-white/75 hover:text-white"
                        >
                          <ServiceIcon icon={s.icon} className="h-4 w-4 text-[#67e8f9]" /> {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6">
                  <p className="font-semibold text-white">Have a similar problem?</p>
                  <p className="mt-2 text-sm text-white/55">
                    Get a free consultation and a fixed quote within days.
                  </p>
                  <a href="#contact" className="btn-primary mt-5 w-full">
                    Get a free estimate <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="section pt-0">
        <div className="container-x">
          <h2 className="h-section text-platinum">More case studies</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {more.map((m, i) => (
              <CaseStudyCard key={m.slug} c={m} i={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        defaultService={relatedServices[0]?.name}
        title="Want a system like this?"
        lead="Tell us about your workflow. We'll reply within 24 hours with honest advice and a rough estimate — the first call is free."
      />
    </>
  );
}
