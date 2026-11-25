import { createFileRoute } from "@tanstack/react-router";
import { ContactChannels, FaqSection } from "@/components/site/sections";
import { LeadForm } from "@/components/site/LeadForm";
import { Breadcrumbs, PageGlow, Reveal } from "@/components/site/ui";
import { InstagramIcon } from "@/components/site/InstagramIcon";
import { company, homeFaqs, process } from "@/content/site";
import { breadcrumbSchema, contactPageSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    pageHead({
      title: "Contact DodoX Tech — Free Consultation & Project Estimate",
      description:
        "Tell us about your project and get a free consultation and estimate within 24 hours. Call or WhatsApp +91 75488 72118, or email dodoxtechstudio@gmail.com.",
      path: "/contact",
      jsonLd: [
        contactPageSchema(),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
});

function ContactPage() {
  return (
    <>
      <section className="relative pb-10 pt-32 sm:pt-40">
        <PageGlow />
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Contact" }]} />
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Free consultation</p>
              <h1 className="h-section mt-5 text-platinum">
                Get a free project estimate{" "}
                <span className="serif-accent text-silver-glow">within 24 hours.</span>
              </h1>
              <p className="lead mt-5">
                Tell us what you want to build or automate. A real person — not a bot — will reply
                with honest advice, a rough estimate and a time for a free call.
              </p>

              <div className="mt-8">
                <ContactChannels />
              </div>

              <a
                href={company.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-4 text-sm text-white/55 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" /> Follow @dodox_tech
              </a>

              <Reveal className="card mt-10 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                  What happens next
                </h2>
                <ol className="mt-5 space-y-4">
                  {process.slice(0, 3).map((p) => (
                    <li key={p.n} className="flex gap-4">
                      <span className="font-serif text-xl italic text-[#67e8f9]/80">{p.n}</span>
                      <span>
                        <span className="block text-sm font-medium text-white">{p.title}</span>
                        <span className="block text-sm leading-relaxed text-white/50">
                          {p.desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="card p-6 sm:p-10">
                <h2 className="mb-6 text-xl font-semibold text-white">
                  Tell us about your project
                </h2>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FaqSection faqs={homeFaqs} />
    </>
  );
}
