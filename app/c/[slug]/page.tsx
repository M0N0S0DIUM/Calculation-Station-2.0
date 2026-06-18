import type { Metadata } from "next";
import { getCalculatorMeta, getAllCalculatorSlugs, CATEGORY_INFO } from "@/lib/registry";
import { Suspense } from "react";

export async function generateStaticParams() {
  const slugs = getAllCalculatorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const rawSlug = (await params)?.slug;
  if (!rawSlug || typeof rawSlug !== "string")
    return { title: "Calculator | Calculation Station" };

  const slug = rawSlug.split("?")[0];

  const calc = getCalculatorMeta(slug);
  if (!calc) return { title: "Calculator Not Found" };

  const { title, description, category, keywords } = calc;
  const catInfo = CATEGORY_INFO[category];

  return {
    title: `${title} | Calculation Station`,
    description: `${description} Free online ${title.toLowerCase()} calculator.`,
    keywords: keywords?.join(", "),
    openGraph: {
      title: `${title} | Calculation Station`,
      description: `${description} Free online ${title.toLowerCase()} calculator.`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} | Calculation Station`,
      description: `${description} Free online ${title.toLowerCase()} calculator.`,
    },
    alternates: {
      canonical: `/c/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "application-name": "Calculation Station",
      "category": category,
    },
  };
}

function CalculatorStructuredData({ calc }: { calc: { title: string; description: string; slug: string } }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: calc.title,
          description: calc.description,
          url: `https://calculationstation.org/c/${calc.slug}`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }),
      }}
    />
  );
}

import CalculatorClient from "./CalculatorClient";

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const rawSlug = (await params)?.slug;
  if (!rawSlug || typeof rawSlug !== "string")
    return <div>Calculator not found.</div>;

  const slug = rawSlug.split("?")[0];

  const calc = getCalculatorMeta(slug);
  if (!calc) return <div>Calculator not found.</div>;

  return (
    <Suspense fallback={<div className="animate-pulse h-64" />}>
      <CalculatorStructuredData calc={calc} />
      <CalculatorClient slug={slug} meta={calc} />
    </Suspense>
  );
}