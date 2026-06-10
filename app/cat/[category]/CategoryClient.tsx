"use client";

import Link from "next/link";
import CalculatorCard from "@/components/CalculatorCard";
import type { CalculatorMeta } from "@/lib/types";

interface CategoryClientProps {
  category: string;
  calculators: CalculatorMeta[];
}

const CATEGORY_INFO: Record<string, { description: string; icon: string }> = {
  Basic: {
    description: "Fundamental math tools for everyday calculations — arithmetic, percentages, fractions, geometry, and number theory.",
    icon: "🔢",
  },
  Financial: {
    description: "Money calculators for loans, mortgages, investments, interest, ROI, and business metrics.",
    icon: "💰",
  },
  Health: {
    description: "Fitness and wellness estimators — BMI, calories, macros, heart rate zones, body fat, and hydration.",
    icon: "❤️",
  },
  Conversion: {
    description: "Unit converters for length, mass, temperature, speed, pressure, energy, volume, and angles.",
    icon: "🔄",
  },
  Electronics: {
    description: "Circuit calculators for Ohm's law, resistor dividers, LEDs, RC filters, capacitors, and battery runtime.",
    icon: "⚡",
  },
  Time: {
    description: "Date and timestamp utilities — difference between dates, Unix epoch conversion.",
    icon: "⏱️",
  },
};

export default function CategoryClient({ category, calculators }: CategoryClientProps) {
  const info = CATEGORY_INFO[category];
  if (!info) return <p>Category not found.</p>;

  return (
    <div>
      <Link href="/" className="inline-block mb-6 text-sm text-neutral-400 hover:text-white transition">
        ← All calculators
      </Link>

      <header className="mb-8">
        <div className="text-3xl mb-2" aria-hidden="true">{info.icon}</div>
        <h1 className="text-3xl font-semibold tracking-tight">{category}</h1>
        <p className="mt-2 text-neutral-400 max-w-2xl">{info.description}</p>
        <p className="mt-4 text-sm text-neutral-500">{calculators.length} calculator{calculators.length !== 1 ? "s" : ""}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {calculators.map((c) => (
          <CalculatorCard key={c.slug} calc={{ meta: c, Calculator: () => null }} />
        ))}
      </div>
    </div>
  );
}