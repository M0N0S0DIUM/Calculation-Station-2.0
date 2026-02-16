import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "Calculation Station",
    template: "%s | Calculation Station",
  },
  description:
    "50 modular calculators: basic, finance, health, conversion, electronics, time.",
  metadataBase: new URL("https://calculationstation.org"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://calculationstation.org",
    title: "Calculation Station",
    description:
      "Fast modular calculators for everyday math, finance, health estimates, conversions, and electronics.",
    siteName: "Calculation Station",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Calculation Station" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculation Station",
    description:
      "Fast modular calculators for everyday math, finance, health estimates, conversions, and electronics.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

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
      <body>
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

        {/* ✅ PropellerAds Multitag Script */}
<script src="https://3nbf4.com/act/files/tag.min.js?z=10618095" data-cfasync="false" async></script>
        <Analytics />
      </body>
    </html>
  );
}
