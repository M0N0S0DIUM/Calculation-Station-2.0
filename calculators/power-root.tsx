"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface PowerRootCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: PowerRootCalculatorProps) {
  const [x, setX] = useState<number | null>(() => Number(initialParams?.x ?? 16));
  const [n, setN] = useState<number | null>(() => Number(initialParams?.n ?? 2));
  const out = useMemo(() => {
    const nVal = n ?? 0;
    const xVal = x ?? 0;

    const pow = Math.pow(xVal, nVal);
    const root = nVal !== 0 ? Math.pow(xVal, 1/nVal) : NaN;
    return { pow, root };
  }, [x,n]);

  const shareParams: ShareParams = { x: x ?? 0, n: n ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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
  meta: { slug: "power-root", title: "Power & Root", category: "Basic", description: "Compute x^n and n-th root of x.", keywords: ["power", "exponent", "root", "nth root", "x^n", "radical", "exponentiation"] },
  Calculator: C,
};