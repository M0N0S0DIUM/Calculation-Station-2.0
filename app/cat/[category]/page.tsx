import type { Category } from "@/lib/types";
import type { Metadata } from "next";
import CategoryClient from "./CategoryClient";
import { CATEGORY_INFO, getCalculatorsByCategory } from "@/lib/metadata/calculators";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const category = (await params)?.category as Category | undefined;
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
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = (await params)?.category as Category | undefined;
  if (!category) return <div>Category not found.</div>;

  const info = CATEGORY_INFO[category];
  if (!info) return <div>Category not found.</div>;

  const calculators = getCalculatorsByCategory(category);

  return <CategoryClient category={category} calculators={calculators} />;
}