import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "About | Calculation Station",
  description:
    "About Calculation Station — a fast, modular collection of practical online calculators for conversions, finance, health estimates, and electronics basics.",
};

export default function AboutPage() {
  return (
    <LegalPage
      title="About"
      subtitle="Calculation Station is a fast, modular collection of practical calculators — built to be simple, readable, and easy to extend."
      updated="February 16, 2026"
    >
      <h2>What you’ll find here</h2>
      <p>
        Calculation Station is designed for quick answers without the clutter.
        You’ll find calculators for everyday math, unit conversions, personal finance,
        health estimates, and common electronics formulas.
      </p>

      <h2>How accurate are the results?</h2>
      <p>
        We use standard formulas and well-known constants where applicable.
        That said, calculators are tools — not guarantees. If you’re making a decision
        that really matters (money, health, safety), double-check important results
        and consult a professional when needed.
      </p>

      <h2>Feedback and requests</h2>
      <p>
        If you find an issue or want a new calculator added, you can reach out and include
        the calculator name + what you expected to see.
      </p>

      <p>
        Contact: <strong>odderonlab@protonmail.com</strong>
      </p>
    </LegalPage>
  );
}
