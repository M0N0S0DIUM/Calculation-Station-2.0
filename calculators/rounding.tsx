"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { round, fmt } from "@/lib/math";

function C() {
  const [x, setX] = useState(123.456789);
  const [d, setD] = useState(2);
  const r = useMemo(() => round(x, Math.max(0, Math.min(12, Math.trunc(d)))), [x,d]);
  return (
    <Card>
      <Grid>
        <NumberField label="Number" value={x} onChange={setX} step={0.0001} />
        <NumberField label="Decimals" value={d} onChange={setD} step={1} min={0} max={12} />
      </Grid>
      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        <Result label="Rounded" value={fmt(r, 12)} />
      </div>
    </Card>
  );
}

export const rounding: CalculatorModule = {
  meta: { slug: "rounding", title: "Rounding", category: "Basic", description: "Round a number to N decimals." },
  Calculator: C,
};
