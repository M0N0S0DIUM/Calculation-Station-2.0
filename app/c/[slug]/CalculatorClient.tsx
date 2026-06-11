"use client";

import { useEffect, useState, useMemo } from "react";
import type { CalculatorModule } from "@/lib/types";
import { ShareButton } from "@/components/ui";

interface CalculatorClientProps {
  slug: string;
}

export default function CalculatorClient({ slug }: CalculatorClientProps) {
  const [mod, setMod] = useState<CalculatorModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCalculator() {
      try {
        setLoading(true);
        const module = await import(`@/calculators/${slug}`);
        const calculator = module[slug];
        if (calculator) {
          setMod(calculator);
        } else {
          setError("Calculator not found");
        }
      } catch {
        setError("Failed to load calculator");
      } finally {
        setLoading(false);
      }
    }
    loadCalculator();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-neutral-400">{error}</div>;
  }

  if (!mod) return null;

  const shareParams = useMemo(() => ({}), [slug]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <a href="/" className="inline-block mb-4 text-sm text-neutral-400 hover:text-white transition">
          ← Back
        </a>
        <ShareButton slug={slug} params={shareParams} />
      </div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{mod.meta.title}</h2>
      <p className="mt-1 text-neutral-400">{mod.meta.description}</p>
      <div className="mt-6">
        <mod.Calculator />
      </div>
    </div>
  );
}