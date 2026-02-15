"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { getCalculator } from "@/lib/calculators";

export default function CalculatorPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const mod = useMemo(() => getCalculator(slug), [slug]);
  if (!mod) return <p>Calculator not found.</p>;

  return (
    <div>
      <a href="/" style={{ opacity: 0.8 }}>← Back</a>
      <h2 style={{ marginBottom: 6, marginTop: 10 }}>{mod.meta.title}</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>{mod.meta.description}</p>
      <div style={{ marginTop: 14 }}>
        <mod.Calculator />
      </div>
    </div>
  );
}
