"use client";

import { useMemo, useState } from "react";
import { CALCULATORS } from "@/lib/calculators";
import CalculatorCard from "@/components/CalculatorCard";

export default function HomePage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CALCULATORS;
    return CALCULATORS.filter((c) => {
      const m = c.meta;
      return (
        m.title.toLowerCase().includes(s) ||
        m.description.toLowerCase().includes(s) ||
        m.slug.toLowerCase().includes(s) ||
        (m.keywords ?? []).some((k) => k.toLowerCase().includes(s))
      );
    });
  }, [q]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof CALCULATORS>();
    for (const c of filtered) {
      const k = c.meta.category;
      map.set(k, [...(map.get(k) ?? []), c]);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <p style={{ marginTop: 6, opacity: 0.8 }}>
        50 Calculators With More to Come.
      </p>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search: loan, bmi, resistor, date, convert, roi..."
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #999",
          marginTop: 10,
          background: "transparent",
        }}
      />

      <h2 id="all" style={{ marginTop: 22 }}>All calculators</h2>

      {[...grouped.entries()].map(([cat, items]) => (
        <section key={cat} style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 10 }}>{cat}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
            {items.map((c) => <CalculatorCard key={c.meta.slug} calc={c} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
