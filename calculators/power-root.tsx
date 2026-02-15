"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [x, setX] = useState(16);
  const [n, setN] = useState(2);
  const out = useMemo(() => {
    const pow = Math.pow(x, n);
    const root = n !== 0 ? Math.pow(x, 1/n) : NaN;
    return { pow, root };
  }, [x,n]);

  return (
    <Card>
      <Grid>
        <NumberField label="x" value={x} onChange={setX} step={0.01} />
        <NumberField label="n" value={n} onChange={setN} step={0.01} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="x^n" value={fmt(out.pow)} />
        <Result label="n-th root of x" value={fmt(out.root)} />
      </div>
    </Card>
  );
}

export const powerRoot: CalculatorModule = {
  meta: { slug: "power-root", title: "Power & Root", category: "Basic", description: "Compute x^n and n-th root of x." },
  Calculator: C,
};
