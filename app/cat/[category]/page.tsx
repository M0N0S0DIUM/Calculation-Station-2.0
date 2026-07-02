import type { Category } from "@/lib/types";
import type { Metadata } from "next";
import CategoryClient from "./CategoryClient";
import { CATEGORY_INFO, getCalculatorsByCategory, CATEGORIES, CALCULATOR_META } from "@/lib/registry";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const categoryParam = (await params)?.category;
  // Normalize to capitalized to match CATEGORY_INFO keys
  const category = (categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase() : undefined) as Category | undefined;
  if (!category) return { title: "Category Calculators | Calculation Station" };

  const info = CATEGORY_INFO[category];
  if (!info) return { title: "Category Not Found" };

  const calculators = getCalculatorsByCategory(category);
  const titles = calculators.map((c) => c.title).join(", ");

  return {
    title: `${category} Calculators | Calculation Station`,
    description: `${info.description} Includes: ${titles}.`,
    openGraph: {
      title: `${category} Calculators | Calculation Station`,
      description: `${info.description} Includes: ${titles}.`,
      type: "website",
    },
    alternates: {
      canonical: `/cat/${category}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const categoryParam = (await params)?.category;
  // Normalize to capitalized to match CATEGORY_INFO keys
  const category = (categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase() : undefined) as Category | undefined;
  if (!category) return <div>Category not found.</div>;

  const info = CATEGORY_INFO[category];
  if (!info) return <div>Category not found.</div>;

  // Pass metadata only - client component will look up full modules
  const calculators = getCalculatorsByCategory(category);

  return <CategoryClient category={category} calculators={calculators} />;
}