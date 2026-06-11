"use client";

import { useEffect, useState } from "react";
import { ShareButton } from "@/components/ui";

interface CalculatorClientProps {
  slug: string;
  meta: {
    title: string;
    description: string;
    category: string;
    keywords?: string[];
  };
}

function slugToExportName(slug: string): string {
  return slug
    .split("-")
    .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export default function CalculatorClient({ slug, meta }: CalculatorClientProps) {
  const [CalculatorComponent, setCalculatorComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCalculator() {
      try {
        setLoading(true);
        
        // Import the module
        const module = await import(`@/calculators/${slug}`);
        const exportName = slugToExportName(slug);
        
        const calculator = module[slugToExportName(slug)];
        
        if (!cancelled) {
          if (calculator) {
            setCalculatorComponent(calculator.Calculator);
          } else {
            setError(`Calculator "${slug}" not found (tried export "${slugToExportName(slug)}")`);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(`Failed to load calculator: ${err instanceof Error ? err.message : String(err)}`);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCalculator();

    return () => {
      cancelled = true;
    };
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

  if (!CalculatorComponent) return null;

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