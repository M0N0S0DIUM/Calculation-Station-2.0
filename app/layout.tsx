import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Calculation Station",
  description: "50 modular calculators: basic, finance, health, conversion, electronics, time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          {/* soft background */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_60%)]" />

          <header className="sticky top-0 z-20 border-b border-neutral-900 bg-neutral-950/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <a href="/" className="text-lg font-semibold tracking-tight">
                Calculation Station
              </a>
              <nav className="flex gap-6 text-sm text-neutral-400">
                <a href="/#all" className="hover:text-white transition">
                  All
                </a>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
