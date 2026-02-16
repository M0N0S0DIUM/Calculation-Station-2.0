import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Service | Calculation Station",
  description:
    "Terms of service for Calculation Station. Use of calculators is provided as-is, without warranties. Not financial/medical/legal advice.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="By using this website, you agree to these terms. If you do not agree, please do not use the site."
      updated="February 16, 2026"
    >
      <h2>1) Use of the site</h2>
      <p>
        Calculation Station provides calculators and reference tools for general informational use.
        You agree to use the site lawfully and not attempt to disrupt, scrape excessively, or abuse
        the service.
      </p>

      <h2>2) No warranties</h2>
      <p>
        The site and calculators are provided <strong>“as is”</strong> and <strong>“as available”</strong>.
        We make no warranties regarding accuracy, reliability, availability, or fitness for a particular purpose.
      </p>

      <h2>3) Not professional advice</h2>
      <p>
        Results may be approximate and depend on your inputs. Nothing on this site constitutes
        financial, medical, legal, or engineering advice. If you need advice, consult a qualified professional.
      </p>

      <h2>4) Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Calculation Station and its operators will not be liable
        for any damages arising from your use of the site or reliance on results (including direct, indirect,
        incidental, or consequential damages).
      </p>

      <h2>5) Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the site means you accept the updated terms.
      </p>

      <h2>6) Contact</h2>
      <p>
        Questions about these terms: <strong>odderonlab@protonmail.com</strong>
      </p>
    </LegalPage>
  );
}
