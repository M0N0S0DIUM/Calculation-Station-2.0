"use client";

import Link from "next/link";
import CalculatorCard from "@/components/CalculatorCard";
import type { CalculatorModule, CalculatorMeta, Category } from "@/lib/types";
import { CATEGORY_INFO, getCalculator } from "@/lib/registry-client";

interface CategoryClientProps {
  category: Category;
  calculators: CalculatorMeta[];
}

export default function CategoryClient({ category, calculators }: CategoryClientProps) {
  const info = CATEGORY_INFO[category];
  if (!info) return <p>Category not found.</p>;

  // Look up full modules (with components) from client registry
  const modules = calculators.map((meta) => getCalculator(meta.slug)!).filter(Boolean);

  return (
    <div>
      <Link href="/" className="inline-block mb-6 text-sm text-neutral-400 hover:text-white transition">
        ← All calculators
      </Link>

      <header className="mb-8">
        <div className="text-3xl mb-2" aria-hidden="true">{info.icon}</div>
        <h1 className="text-3xl font-semibold tracking-tight">{category}</h1>
        <p className="mt-2 text-neutral-400 max-w-2xl">{info.description}</p>
        <p className="mt-4 text-sm text-neutral-500">{modules.length} calculator{modules.length !== 1 ? "s" : ""}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {modules.map((c) => (
          <CalculatorCard key={c.meta.slug} calc={c} />
        ))}
      </div>
    </div>
  );
}