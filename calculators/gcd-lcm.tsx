"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { gcd, lcm, fmtInt } from "@/lib/math";

function C() {
  const [a, setA] = useState(84);
  const [b, setB] = useState(120);
  const r = useMemo(() => ({ g: gcd(a,b), l: lcm(a,b) }), [a,b]);

  return (
    <Card>
      <Grid>
        <NumberField label="A" value={a} onChange={setA} step={1} />
        <NumberField label="B" value={b} onChange={setB} step={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="GCD" value={fmtInt(r.g)} />
        <Result label="LCM" value={fmtInt(r.l)} />
      </div>
    </Card>
  );
}

export const gcdLcm: CalculatorModule = {
  meta: { slug: "gcd-lcm", title: "GCD / LCM", category: "Basic", description: "Greatest common divisor and least common multiple." },
  Calculator: C,
};
