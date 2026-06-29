import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Calculation Station — Free Online Calculators",
    template: "%s | Calculation Station",
  },
  description:
    "Free online calculators for fitness, finance, math, and conversions. One rep max, plate loading, BMI, mortgage, compound interest, and 80+ more tools.",
  metadataBase: new URL("https://calculationstation.org"),
  // Removed root canonical - each page defines its own
  openGraph: {
    type: "website",
    url: "https://calculationstation.org",
    title: "Calculation Station",
    description:
      "Fast modular calculators for everyday math, finance, health estimates, conversions, and electronics.",
    siteName: "Calculation Station",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculation Station",
    description:
      "Fast modular calculators for everyday math, finance, health estimates, conversions, and electronics.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  other: {
    "application-name": "Calculation Station",
  },
};

function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Calculation Station",
          description:
            "79+ free modular calculators for math, finance, health, conversions, electronics, and time calculations.",
          url: "https://calculationstation.org",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Basic Math (arithmetic, percentages, fractions, geometry)",
            "Financial (loans, mortgages, investments, ROI, interest)",
            "Health (BMI, BMR/TDEE, macros, heart rate zones, running pace)",
            "Conversions (length, mass, temperature, speed, pressure, energy, volume, angles)",
            "Electronics (Ohm's Law, resistor dividers, LED resistors, RC filters, battery runtime)",
            "Time (date differences, epoch converter)",
          ],
        }),
      }}
    />
  );
}

function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-JY1MF9B8W4"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JY1MF9B8W4', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm text-neutral-400 hover:text-white transition hover:underline underline-offset-4 decoration-neutral-700"
    >
      {children}
    </a>
  );
}

function LogoMark() {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800
                 bg-neutral-900/40 shadow-sm transition group-hover:border-neutral-700
                 group-hover:bg-neutral-900/60 overflow-hidden"
      aria-hidden="true"
    >
      <Image src="/icon.svg" alt="Calculation Station logo" width={22} height={22} priority />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body>
        <GoogleAnalytics />
        <div className="min-h-screen">
          {/* subtle background */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.035),transparent_60%)]" />

          <header className="sticky top-0 z-30 border-b border-neutral-900 bg-neutral-950/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <a href="/" className="group flex items-center gap-3">
                <LogoMark />
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-tight text-white">
                    Calculation Station
                  </div>
                  <div className="text-xs text-neutral-500">Fast modular calculators</div>
                </div>
              </a>

              <nav className="flex items-center gap-6">
                <NavLink href="/#all">All</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/privacy">Privacy</NavLink>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

          <footer className="mx-auto max-w-6xl px-6 pb-10 pt-8 text-sm text-neutral-400">
            <div className="border-t border-neutral-900 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <a className="hover:text-white transition" href="/about">About</a>
                  <a className="hover:text-white transition" href="/privacy">Privacy</a>
                  <a className="hover:text-white transition" href="/terms">Terms</a>
                </div>
                <div className="text-xs text-neutral-500">
                  © {new Date().getFullYear()} Calculation Station • Built for speed • Results may be approximate
                </div>
              </div>
            </div>
          </footer>
        </div>

        <Analytics />
        <SpeedInsights />
        <Script id="kofi-widget" strategy="afterInteractive">
          {`
            (function() {
              var s = document.createElement('script');
              s.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
              s.onload = function() {
                kofiWidgetOverlay.draw('odderonlab', {
                  'type': 'floating-chat',
                  'floating-chat.donateButton.text': 'Support me',
                  'floating-chat.donateButton.background-color': '#323842',
                  'floating-chat.donateButton.text-color': '#fff'
                });
              };
              document.body.appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
