import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy | Calculation Station",
  description:
    "Privacy policy for Calculation Station. Learn what data we collect, how analytics work, and how to contact us about privacy questions.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="This page explains what we collect, what we don’t, and how third-party services may process data."
      updated="February 16, 2026"
    >
      <h2>Summary</h2>
      <p>
        We aim to collect as little personal information as possible. Some basic
        technical data may be processed by hosting/analytics providers to keep the
        site reliable and understand traffic trends.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Basic usage data (analytics):</strong> page views, device/browser type,
          and approximate location (e.g., city/region) may be collected by analytics tools.
        </li>
        <li>
          <strong>Operational logs:</strong> IP address and request details may be processed
          temporarily for security, rate limiting, and debugging.
        </li>
      </ul>

      <h2>Information we do not collect</h2>
      <ul>
        <li>We do not ask for accounts or passwords.</li>
        <li>We do not intentionally collect sensitive personal information.</li>
        <li>We do not sell personal information.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Some services (analytics and ads, if enabled) may use cookies or similar technologies.
        You can usually control cookies in your browser settings.
      </p>

      <h2>Third-party services</h2>
      <p>
        The site may rely on third-party providers for hosting, performance, analytics, or ads.
        Those providers may process limited data as described above under their own policies.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as the site evolves. The “Last updated” date at the top
        reflects the most recent revision.
      </p>

      <h2>Contact</h2>
      <p>
        If you have privacy questions, contact: <strong>odderonlab@protonmail.com</strong>
      </p>
    </LegalPage>
  );
}
