"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ShareButton } from "@/components/ui";
import { getCalculator } from "@/lib/registry-client";
import type { ShareParams, OnStateChange } from "@/lib/types";

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
  const calculatorModule = getCalculator(slug);
  const CalculatorComponent = calculatorModule?.Calculator ?? null;
  const error = calculatorModule ? null : `Calculator "${slug}" not found`;
  const searchParams = useSearchParams();

  const [shareParams, setShareParams] = useState<ShareParams>({});
  const [initialized, setInitialized] = useState(false);

  // Convert URLSearchParams to ShareParams
  const currentParams: ShareParams = {};
  searchParams.forEach((value, key) => {
    const num = Number(value);
    currentParams[key] = Number.isNaN(num) ? value : num;
  });

  // Callback passed to calculator to receive state updates
  const handleStateChange: OnStateChange = useCallback((params: ShareParams) => {
    setShareParams(params);
    setInitialized(true);
  }, []);

  // Update share params when URL params change (e.g., user navigates with new URL)
  useEffect(() => {
    if (!initialized) {
      setShareParams(currentParams);
    }
  }, [currentParams, initialized]);

  if (!CalculatorComponent) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <a href="/" className="inline-block mb-4 text-sm text-neutral-400 hover:text-white transition">
            ← Back
          </a>
          <ShareButton slug={slug} params={currentParams} />
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
        <ShareButton slug={slug} params={initialized ? shareParams : currentParams} />
      </div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{meta.title}</h2>
      <p className="mt-1 text-neutral-400">{meta.description}</p>
      <div className="mt-6">
        {/* Pass current URL params as initialParams */}
        <CalculatorComponent initialParams={currentParams} onStateChange={handleStateChange} />
      </div>
    </div>
  );
}