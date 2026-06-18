"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { round, fmt } from "@/lib/math";

interface RoundingCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: RoundingCalculatorProps) {
  const [x, setX] = useState<number | null>(() => Number(initialParams?.x ?? 123.456789));
  const [d, setD] = useState<number | null>(() => Number(initialParams?.d ?? 2));
  const r = useMemo(() => {
    const xVal = x ?? 0;
    const dVal = d ?? 0;
    return round(xVal, Math.max(0, Math.min(12, Math.trunc(dVal))));
  }, [x, d]);

  const shareParams: ShareParams = { x: x ?? 0, d: d ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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
  meta: { slug: "rounding", title: "Rounding", category: "Basic", description: "Round a number to N decimals.", keywords: ["round", "rounding", "decimal", "decimals", "precision", "number", "truncate", "math", "significant figures"] },
  Calculator: C,
};