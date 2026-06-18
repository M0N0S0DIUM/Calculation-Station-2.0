"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { gcd, lcm, fmt } from "@/lib/math";

interface GCDLCMCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: GCDLCMCalculatorProps) {
  const [a, setA] = useState<number | null>(() => Number(initialParams?.a ?? 48));
  const [b, setB] = useState<number | null>(() => Number(initialParams?.b ?? 18));
  const r = useMemo(() => {
    const aVal = a ?? 0;
    const bVal = b ?? 0;
    return { gcd: gcd(aVal, bVal), lcm: lcm(aVal, bVal) };
  }, [a, b]);

  const shareParams: ShareParams = { a: a ?? 0, b: b ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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