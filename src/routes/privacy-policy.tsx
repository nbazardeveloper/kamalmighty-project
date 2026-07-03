import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy | KAM ALMIGHTY PROPERTY SERVICES" },
      {
        name: "description",
        content:
          "How KAM Almighty Property Services LLC collects, uses, and protects your information.",
      },
    ],
  }),
});

function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2, 2026">
      <p>
        KAM Almighty Property Services LLC ("KAM Almighty," "we," "us," or "our") respects your
        privacy. This Privacy Policy explains what information we collect through our website and
        estimate request forms, how we use it, and the choices you have.
      </p>

      <LegalSection title="Information We Collect">
        <p>When you request a free estimate or otherwise contact us, we may collect:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Contact details you provide — name, phone number, email address, and mailing/job-site
            address.
          </li>
          <li>
            Project details you provide — a description of the work you're requesting and the
            service category selected.
          </li>
          <li>
            Standard technical information collected automatically, such as browser type, device
            type, and pages viewed, used to keep the site secure and working correctly.
          </li>
        </ul>
        <p>We do not knowingly collect payment card information through this website.</p>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>To respond to your estimate request and schedule an on-site assessment.</li>
          <li>To communicate with you about your project, quote, or scheduled work.</li>
          <li>To maintain internal records of leads and completed projects.</li>
          <li>To improve our website and services.</li>
          <li>To comply with legal, licensing, and insurance obligations.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </LegalSection>

      <LegalSection title="Sharing Your Information">
        <p>We may share information with:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Service providers who help us operate our business (for example, hosting, database, and
            form-processing providers), bound to use the data only to perform services for us.
          </li>
          <li>
            Subcontractors or suppliers directly involved in fulfilling your requested project,
            where necessary.
          </li>
          <li>Government or regulatory authorities, when required by law.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Data Retention & Security">
        <p>
          We retain lead and project information for as long as reasonably necessary for business,
          accounting, warranty, and legal purposes. We use reasonable administrative and technical
          safeguards to protect your information, but no method of electronic storage or
          transmission is 100% secure.
        </p>
      </LegalSection>

      <LegalSection title="Cookies & Analytics">
        <p>
          Our website may use basic cookies or similar technologies to remember preferences and
          understand how visitors use the site. You can control cookies through your browser
          settings; disabling them may affect some site functionality.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices">
        <p>
          You may ask us to update, correct, or delete the personal information we hold about you by
          contacting us at{" "}
          <a
            href="mailto:help@kamalmighty.com"
            className="font-semibold text-brand-charcoal underline"
          >
            help@kamalmighty.com
          </a>{" "}
          or (564) 888-0755. We will respond within a reasonable time, subject to any records we are
          required to keep by law.
        </p>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>
          Our website and services are directed at adults seeking construction and remodeling
          services. We do not knowingly collect information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The "Last updated" date above
          reflects the most recent revision. Continued use of our website after changes are posted
          constitutes acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          KAM Almighty Property Services LLC
          <br />
          6168 NE Highway 99, Ste 201, Vancouver, WA 98665
          <br />
          Email:{" "}
          <a
            href="mailto:help@kamalmighty.com"
            className="font-semibold text-brand-charcoal underline"
          >
            help@kamalmighty.com
          </a>
          <br />
          Phone:{" "}
          <a href="tel:+15648880755" className="font-semibold text-brand-charcoal underline">
            (564) 888-0755
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
