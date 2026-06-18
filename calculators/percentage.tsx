"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt, fmtPct } from "@/lib/math";

interface PercentageCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: PercentageCalculatorProps) {
  const [base, setBase] = useState<number | null>(() => Number(initialParams?.base ?? 200));
  const [pct, setPct] = useState<number | null>(() => Number(initialParams?.pct ?? 15));
  const [part, setPart] = useState<number | null>(() => Number(initialParams?.part ?? 30));

  const r = useMemo(() => {
    const baseVal = base ?? 0;
    const partVal = part ?? 0;
    const pctVal = pct ?? 0;

    const pctOf = baseVal * (pctVal / 100);
    const whatPct = baseVal !== 0 ? (partVal / baseVal) * 100 : NaN;
    const inc = baseVal * (1 + pctVal / 100);
    const dec = baseVal * (1 - pctVal / 100);
    return { pctOf, whatPct, inc, dec };
  }, [base, pct, part]);

  const shareParams: ShareParams = { base: base ?? 0, pct: pct ?? 0, part: part ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Base" value={base} onChange={setBase} />
        <NumberField label="Percent" value={pct} onChange={setPct} suffix="%" step={0.1} />
        <NumberField label="Part" value={part} onChange={setPart} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label={`${pct}% of ${base}`} value={fmt(r.pctOf)} />
        <Result label={`${part} is what % of ${base}`} value={fmtPct(r.whatPct)} />
        <Result label={`${base} increased by ${pct}%`} value={fmt(r.inc)} />
        <Result label={`${base} decreased by ${pct}%`} value={fmt(r.dec)} />
      </div>
    </Card>
  );
}

export const percentage: CalculatorModule = {
  meta: { slug: "percentage", title: "Percentage Calculator", category: "Basic", description: "Percent of, what percent, increase/decrease.", keywords: ["percent", "percentage", "increase", "decrease", "percent of", "what percent", "ratio"] },
  Calculator: C,
};