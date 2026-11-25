import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { company } from "@/content/site";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    pageHead({
      title: "Terms of Use — Website & Enquiry Terms | DodoX Tech",
      description:
        "Terms governing use of the DodoX Tech website, including content ownership, project enquiries, third-party links and limitation of liability.",
      path: "/terms",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of use", path: "/terms" },
        ]),
      ],
    }),
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="18 November 2026">
      <p>
        These terms govern your use of dodoxtechs.in, operated by {company.name} (
        {company.legalName}), {company.city}, {company.region}, {company.country}. By using the site
        you agree to them.
      </p>
      <div>
        <h2>Use of the website</h2>
        <p>
          You may browse the site and contact us for legitimate business purposes. Please don't
          misuse the site, attempt to disrupt it, or submit false or spam enquiries.
        </p>
      </div>
      <div>
        <h2>Content &amp; intellectual property</h2>
        <p>
          The text, design, logos and images on this site belong to {company.name} or are used with
          permission. Case study screenshots are shown to illustrate our work. Please don't copy or
          reuse them without our written consent.
        </p>
      </div>
      <div>
        <h2>Enquiries, estimates &amp; projects</h2>
        <p>
          Information on this site, and any estimate shared in response to an enquiry, is for
          guidance only. Project scope, pricing, timelines, ownership of deliverables and support
          are agreed in a separate written proposal or contract, which takes precedence over these
          terms.
        </p>
      </div>
      <div>
        <h2>Third-party links</h2>
        <p>
          The site links to third-party services such as WhatsApp, LinkedIn and Instagram. We aren't
          responsible for their content or privacy practices.
        </p>
      </div>
      <div>
        <h2>Limitation of liability</h2>
        <p>
          The website is provided "as is". To the extent permitted by law, we are not liable for any
          loss arising from your use of the site or reliance on its content.
        </p>
      </div>
      <div>
        <h2>Changes &amp; governing law</h2>
        <p>
          We may update these terms from time to time; the date above shows the latest version.
          These terms are governed by the laws of India, with courts in {company.city},{" "}
          {company.region} having jurisdiction.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Questions? Email <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
          <a href={`tel:${company.phoneE164}`}>{company.phone}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
