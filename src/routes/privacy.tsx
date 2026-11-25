import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { company } from "@/content/site";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead({
      title: "Privacy Policy — How We Handle Your Data | DodoX Tech",
      description:
        "How DodoX Tech collects, uses and protects the information you share through our website, contact form, email and WhatsApp.",
      path: "/privacy",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
        ]),
      ],
    }),
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="18 November 2026">
      <p>
        This policy explains how {company.name} ("we", "us") handles personal information collected
        through dodoxtechs.in and when you contact us. We keep it simple: we only collect what we
        need to reply to you and deliver our services.
      </p>
      <div>
        <h2>Information we collect</h2>
        <ul>
          <li>
            Details you submit in our contact or feedback forms: name, email, phone/WhatsApp number,
            company, service of interest, budget range and your message.
          </li>
          <li>Messages you send us by email, phone or WhatsApp.</li>
          <li>
            Basic technical data your browser sends automatically (such as IP address and browser
            type) in our hosting provider's server logs.
          </li>
        </ul>
      </div>
      <div>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiry, prepare proposals and deliver the services you request.</li>
          <li>To send you a confirmation email when you submit a form.</li>
          <li>To keep the website secure and working properly.</li>
        </ul>
        <p className="mt-3">
          We do not sell your personal information, and we do not use it for unrelated marketing
          without your consent.
        </p>
      </div>
      <div>
        <h2>Who we share it with</h2>
        <p>
          We use trusted service providers to operate the site and our communications — for example
          our email provider (Google) to receive form submissions, and our hosting provider to serve
          the website. They process data only to provide those services. We may disclose information
          if required by law.
        </p>
      </div>
      <div>
        <h2>How long we keep it</h2>
        <p>
          We keep enquiry information for as long as needed to respond and for our business records,
          and delete it when it is no longer required.
        </p>
      </div>
      <div>
        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete the personal information we hold about you at
          any time by emailing <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          {company.name}, {company.city}, {company.region}, {company.country} ·{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a> ·{" "}
          <a href={`tel:${company.phoneE164}`}>{company.phone}</a>
        </p>
      </div>
    </LegalPage>
  );
}
