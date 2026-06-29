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
        <div className="text-4xl mb-3" aria-hidden="true">{info.icon}</div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">{category} Calculators</h1>
        {info.longDescription && (
          <p className="mt-2 text-neutral-300 text-lg max-w-3xl leading-relaxed">{info.longDescription}</p>
        )}
        <p className="mt-4 text-sm text-neutral-500">{modules.length} calculator{modules.length !== 1 ? "s" : ""} in this category</p>
      </header>

      <div className="grid gap-4 mb-12" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {modules.map((c) => (
          <CalculatorCard key={c.meta.slug} calc={c} />
        ))}
      </div>

      {/* Popular Use Cases */}
      {info.useCases && info.useCases.length > 0 && (
        <section className="mb-12 bg-gray-800/30 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Popular Use Cases</h2>
          <ul className="space-y-3">
            {info.useCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">✓</span>
                <span className="text-neutral-300">{useCase}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SEO Keywords */}
      {info.keywords && info.keywords.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-neutral-400">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {info.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-neutral-400"
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}