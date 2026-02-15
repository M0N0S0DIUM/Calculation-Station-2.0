"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { gcd, fmt } from "@/lib/math";

function C() {
  const [num, setNum] = useState(42);
  const [den, setDen] = useState(56);

  const r = useMemo(() => {
    if (den === 0) return { simp: "—", mixed: "—", dec: NaN };
    const g = gcd(num, den);
    let n = num / g;
    let d = den / g;
    if (d < 0) { n = -n; d = -d; }
    const whole = Math.trunc(n / d);
    const rem = Math.abs(n % d);
    const mixed = rem === 0 ? `${whole}` : `${whole} ${rem}/${d}`;
    return { simp: `${n}/${d}`, mixed, dec: n / d };
  }, [num, den]);

  return (
    <Card>
      <Grid>
        <NumberField label="Numerator" value={num} onChange={setNum} step={1} />
        <NumberField label="Denominator" value={den} onChange={setDen} step={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Simplified" value={r.simp} />
        <Result label="Mixed number" value={r.mixed} />
        <Result label="Decimal" value={fmt(r.dec, 10)} />
      </div>
    </Card>
  );
}

export const fractionSimplifier: CalculatorModule = {
  meta: { slug: "fraction-simplifier", title: "Fraction Simplifier", category: "Basic", description: "Reduce a fraction + mixed number + decimal." },
  Calculator: C,
};
