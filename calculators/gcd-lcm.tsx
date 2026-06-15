"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { gcd, lcm, fmt } from "@/lib/math";

interface GCDLCMCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: GCDLCMCalculatorProps) {
  const [a, setA] = useState(() => Number(initialParams?.a ?? 48));
  const [b, setB] = useState(() => Number(initialParams?.b ?? 18));
  const r = useMemo(() => ({ gcd: gcd(a,b), lcm: lcm(a,b) }), [a,b]);

  const shareParams: ShareParams = { a, b };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="A" value={a} onChange={setA} step={1} />
        <NumberField label="B" value={b} onChange={setB} step={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="GCD" value={String(r.gcd)} />
        <Result label="LCM" value={String(r.lcm)} />
      </div>
      <SmallNote>Uses Euclidean algorithm.</SmallNote>
    </Card>
  );
}

export const gcdLcm: CalculatorModule = {
  meta: { slug: "gcd-lcm", title: "GCD / LCM", category: "Basic", description: "Greatest common divisor and least common multiple.", keywords: ["gcd", "greatest common divisor", "lcm", "least common multiple", "factor", "multiple", "euclid"] },
  Calculator: C,
};