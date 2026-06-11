"use client";

import type { CalculatorMeta } from "@/lib/types";
import { ShareButton } from "@/components/ui";

interface CalculatorClientProps {
  Calculator: React.ComponentType;
  meta: CalculatorMeta;
  slug: string;
}

export default function CalculatorClient({ Calculator, meta, slug }: CalculatorClientProps) {
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
        <Calculator />
      </div>
    </div>
  );
}