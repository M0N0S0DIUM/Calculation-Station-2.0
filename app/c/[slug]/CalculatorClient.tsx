"use client";

import { ShareButton } from "@/components/ui";
import { getCalculator } from "@/lib/registry-client";

interface CalculatorClientProps {
  slug: string;
  meta: {
    title: string;
    description: string;
    category: string;
    keywords?: string[];
  };
}

export default function CalculatorClient({ slug, meta }: CalculatorClientProps) {
  // Synchronous lookup - all modules statically imported in registry-client.ts
  const calculatorModule = getCalculator(slug);
  const CalculatorComponent = calculatorModule?.Calculator ?? null;
  const error = calculatorModule ? null : `Calculator "${slug}" not found`;

  if (!CalculatorComponent) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <a href="/" className="inline-block mb-4 text-sm text-neutral-400 hover:text-white transition">
            ← Back
          </a>
          <ShareButton slug={slug} params={{}} />
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{meta.title}</h2>
        <p className="mt-1 text-neutral-400">{meta.description}</p>
        <div className="mt-6 text-center py-12 text-neutral-400">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <a href="/" className="inline-block mb-4 text-sm text-neutral-400 hover:text-white transition">
          ← Back
        </a>
        <ShareButton slug={slug} params={{}} />
      </div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{meta.title}</h2>
      <p className="mt-1 text-neutral-400">{meta.description}</p>
      <div className="mt-6">
        <CalculatorComponent />
      </div>
    </div>
  );
}