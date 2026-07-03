import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms-of-use")({
  component: TermsOfUsePage,
  head: () => ({
    meta: [
      { title: "Terms of Use | KAM ALMIGHTY PROPERTY SERVICES" },
      {
        name: "description",
        content:
          "Terms and conditions for using the KAM Almighty Property Services website and requesting estimates.",
      },
    ],
  }),
});

function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use" updated="July 2, 2026">
      <p>
        These Terms of Use ("Terms") govern your use of the website operated by KAM Almighty
        Property Services LLC ("KAM Almighty," "we," "us," or "our"). By accessing or using this
        website, you agree to these Terms.
      </p>

      <LegalSection title="Use of This Website">
        <p>
          This website is provided to share information about our general contracting services and
          to let visitors request free estimates. You agree to use the site only for lawful purposes
          and not to submit false, misleading, or fraudulent information through our forms.
        </p>
      </LegalSection>

      <LegalSection title="Estimates & Quotes">
        <p>
          Information submitted through our estimate request form is used to schedule a free,
          no-obligation assessment. Any pricing shown on the website (including "fixed price" or
          promotional language) is general and informational only — actual pricing for any project
          is confirmed in writing after an on-site assessment and is not binding until agreed to by
          both parties in a signed proposal or contract.
        </p>
      </LegalSection>

      <LegalSection title="No Professional Advice">
        <p>
          Content on this website (including descriptions of services, timelines, and general
          project information) is provided for general informational purposes only and does not
          constitute a guarantee of specific results, timelines, or costs for your particular
          project.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All text, graphics, logos, and images on this website are the property of KAM Almighty
          Property Services LLC or its licensors and may not be copied, reproduced, or used without
          our prior written permission, except as necessary to view the site in a standard web
          browser.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links">
        <p>
          Our website may link to third-party sites (for example, review platforms). We are not
          responsible for the content, accuracy, or practices of third-party websites.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, KAM Almighty Property Services LLC is not liable
          for any indirect, incidental, or consequential damages arising from your use of this
          website. This website and its content are provided "as is" without warranties of any kind.
          Nothing in this section limits any warranty we separately provide in a signed contract for
          construction or remodeling work.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of the State of Washington, without regard to its
          conflict-of-law principles, given our primary place of business in Vancouver, WA.
        </p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. The "Last updated" date above reflects the
          most recent revision. Continued use of the website after changes are posted constitutes
          acceptance of the updated Terms.
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
