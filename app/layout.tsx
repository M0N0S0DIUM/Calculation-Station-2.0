import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "Calculation Station",
    template: "%s | Calculation Station",
  },
  description:
    "50 modular calculators: basic, finance, health, conversion, electronics, time.",
  metadataBase: new URL("https://calculationstation.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://calculationstation.org",
    title: "Calculation Station",
    description:
      "Fast modular calculators for everyday math, finance, health estimates, conversions, and electronics.",
    siteName: "Calculation Station",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Calculation Station",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculation Station",
    description:
      "Fast modular calculators for everyday math, finance, health estimates, conversions, and electronics.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm text-neutral-400 hover:text-white transition
                 hover:underline underline-offset-4 decoration-neutral-700"
    >
      {children}
    </a>
  );
}

function LogoMark() {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800
                 bg-neutral-900/40 shadow-sm transition
                 group-hover:border-neutral-700 group-hover:bg-neutral-900/60"
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          className="text-white"
        />
        <path
          d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="text-white"
        />
      </svg>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense (Auto ads) */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8679343864914295"
          crossOrigin="anonymous"
        />
      </head>

      <body>
        <div className="min-h-screen">
          {/* subtle background (premium, not loud) */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.035),transparent_60%)]" />

          <header className="sticky top-0 z-30 border-b border-neutral-900 bg-neutral-950/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <a href="/" className="group flex items-center gap-3">
                <LogoMark />
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-tight text-white">
                    Calculation Station
                  </div>
                  <div className="text-xs text-neutral-500">
                    Fast modular calculators
                  </div>
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
                  <a className="hover:text-white transition" href="/about">
                    About
                  </a>
                  <a className="hover:text-white transition" href="/privacy">
                    Privacy
                  </a>
                  <a className="hover:text-white transition" href="/terms">
                    Terms
                  </a>
                </div>

                <div className="text-xs text-neutral-500">
                  © {new Date().getFullYear()} Calculation Station • Built for speed • Results may be approximate
                </div>
              </div>
            </div>
          </footer>
        </div>

        <Analytics />
      </body>
    </html>
  );
}
