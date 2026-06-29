"use client";

import { useMemo, useState } from "react";
import { CALCULATOR_MODULES, CATEGORIES, CATEGORY_INFO } from "@/lib/registry-client";
import CalculatorCard from "@/components/CalculatorCard";

export default function HomePage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CALCULATOR_MODULES;
    return CALCULATOR_MODULES.filter((c) => {
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
    const map = new Map<string, typeof filtered>();
    for (const c of filtered) {
      const k = c.meta.category;
      map.set(k, [...(map.get(k) ?? []), c]);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <p style={{ marginTop: 6, opacity: 0.8 }}>
        Financial, Health, Conversion & Math Calculators
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

      <h2 id="all" style={{ marginTop: 22 }}>
        All calculators
      </h2>

      {CATEGORIES.map((cat) => {
        const items = grouped.get(cat) ?? [];
        if (items.length === 0) return null;
        const info = CATEGORY_INFO[cat];
        return (
          <section key={cat} style={{ marginTop: 18 }}>
            <h3 style={{ marginBottom: 10 }}>
              <a 
                href={`/cat/${cat}`}
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/cat/${cat}`;
                }}
              >
                {info?.icon} {cat}
              </a>
              <span style={{ fontSize: '0.75rem', opacity: 0.5, marginLeft: 8 }}>
                ({items.length} calculators)
              </span>
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 12,
              }}
            >
              {items.map((c) => (
                <CalculatorCard key={c.meta.slug} calc={c} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}