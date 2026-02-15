"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [r, setR] = useState(5);
  const out = useMemo(() => ({
    area: Math.PI * r * r,
    circ: 2 * Math.PI * r
  }), [r]);

  return (
    <Card>
      <NumberField label="Radius" value={r} onChange={setR} step={0.01} />
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Area" value={fmt(out.area)} />
        <Result label="Circumference" value={fmt(out.circ)} />
      </div>
    </Card>
  );
}

export const areaCircle: CalculatorModule = {
  meta: { slug: "area-circle", title: "Area of a Circle", category: "Basic", description: "Area and circumference from radius." },
  Calculator: C,
};
