"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface RatioProportionCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: RatioProportionCalculatorProps) {
  const [a, setA] = useState(() => Number(initialParams?.a ?? 2));
  const [b, setB] = useState(() => Number(initialParams?.b ?? 3));
  const [c, setC] = useState(() => Number(initialParams?.c ?? 4));
  const r = useMemo(() => {
    const d = a !== 0 ? (b*c)/a : NaN;
    return { d };
  }, [a,b,c]);

  const shareParams: ShareParams = { a, b, c };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="a" value={a} onChange={setA} step={0.01} />
        <NumberField label="b" value={b} onChange={setB} step={0.01} />
        <NumberField label="c" value={c} onChange={setC} step={0.01} />
      </Grid>
      <Hr />
      <Result label="d (a:b = c:d)" value={fmt(r.d)} />
      <Hr />
      <SmallNote>Formula: d = (b·c)/a</SmallNote>
    </Card>
  );
}

export const ratioProportion: CalculatorModule = {
  meta: { slug: "ratio-proportion", title: "Ratio / Proportion", category: "Basic", description: "Solve a:b = c:d for missing value.", keywords: ["ratio", "proportion", "cross multiply", "a:b=c:d", "proportional", "scale"] },
  Calculator: C,
};