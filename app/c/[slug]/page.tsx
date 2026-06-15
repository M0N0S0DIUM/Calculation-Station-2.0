import type { Metadata } from "next";
import { getCalculatorMeta, getAllCalculatorSlugs, CATEGORY_INFO } from "@/lib/registry";

export const dynamic = "force-dynamic";

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
    description: `${description} Free online ${title.toLowerCase()} calculator.`,
    keywords: keywords?.join(", "),
    openGraph: {
      title: `${title} | Calculation Station`,
      description: `${description} Free online ${title.toLowerCase()} calculator.`,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Calculation Station`,
      description: `${description} Free online ${title.toLowerCase()} calculator.`,
      images: ["/og.png"],
    },
    alternates: {
      canonical: `/c/${slug}`,
    },
  };
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

  return <CalculatorClient slug={slug} meta={calc} />;
}