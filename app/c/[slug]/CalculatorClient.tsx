"use client";

import { CalculatorModule } from "@/lib/types";

interface CalculatorClientProps {
  mod: CalculatorModule;
}

export default function CalculatorClient({ mod }: CalculatorClientProps) {
  return (
    <div>
      <a href="/" className="inline-block mb-4 text-sm text-neutral-400 hover:text-white transition">
        ← Back
      </a>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{mod.meta.title}</h2>
      <p className="mt-1 text-neutral-400">{mod.meta.description}</p>
      <div className="mt-6">
        <mod.Calculator />
      </div>
    </div>
  );
}