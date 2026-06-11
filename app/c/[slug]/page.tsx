import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const rawSlug = (await params)?.slug;
  if (!rawSlug || typeof rawSlug !== "string") return { title: "Calculator | Calculation Station" };
  
  const slug = rawSlug.split("?")[0];
  
  const { getCalculatorMeta } = await import("@/lib/metadata/calculators");
  const meta = getCalculatorMeta(slug);
  if (!meta) return { title: "Calculator Not Found" };

  const { title, description, category, keywords } = meta;

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

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const rawSlug = (await params)?.slug;
  if (!rawSlug || typeof rawSlug !== "string") return <div>Calculator not found.</div>;
  
  const slug = rawSlug.split("?")[0];
  
  return <CalculatorClient slug={slug} />;
}