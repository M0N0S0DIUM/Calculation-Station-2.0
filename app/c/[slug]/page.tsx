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

  return {
    title: `${title} | Calculation Station`,
    description: `${description} Free, no login required.`,
    keywords: keywords?.join(", "),
    openGraph: {
      title: `${title} | Calculation Station`,
      description: `${description} Free, no login required.`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} | Calculation Station`,
      description: `${description} Free, no login required.`,
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
      category,
    },
  };
}

function CalculatorStructuredData({ calc }: { calc: { title: string; description: string; slug: string; schema?: any } }) {
  const schema = calc.schema;
  
  if (!schema) {
    // Fallback to SoftwareApplication for calculators without schema
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

  // Build Calculator schema for rich snippets
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "Calculator",
    name: calc.title,
    description: calc.description,
    url: `https://calculationstation.org/c/${calc.slug}`,
    calculatorType: schema.calculatorType,
    formula: schema.formula,
    input: schema.inputs.map((input: any) => ({
      "@type": "PropertyValueSpecification",
      name: input.name,
      description: input.description,
      unitText: input.unitText,
      minValue: input.minValue,
      maxValue: input.maxValue,
      valueRequired: input.required,
    })),
    output: schema.outputs.map((output: any) => ({
      "@type": "PropertyValue",
      name: output.name,
      description: output.description,
      unitText: output.unitText,
    })),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(calculatorSchema),
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