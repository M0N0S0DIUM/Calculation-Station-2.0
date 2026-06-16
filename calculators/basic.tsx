"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BasicCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BasicCalculatorProps) {
  const [a, setA] = useState(() => {
    if (initialParams?.a !== undefined) return Number(initialParams.a);
    return 12;
  });
  const [b, setB] = useState(() => {
    if (initialParams?.b !== undefined) return Number(initialParams.b);
    return 3;
  });

  const r = useMemo(() => ({
    add: a + b,
    sub: a - b,
    mul: a * b,
    div: b !== 0 ? a / b : NaN,
    pow: Math.pow(a, b),
  }), [a, b]);

  const shareParams: ShareParams = { a, b };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="A" value={a} onChange={setA} />
        <NumberField label="B" value={b} onChange={setB} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="A + B" value={fmt(r.add)} />
        <Result label="A - B" value={fmt(r.sub)} />
        <Result label="A × B" value={fmt(r.mul)} />
        <Result label="A ÷ B" value={fmt(r.div)} />
        <Result label="A ^ B" value={fmt(r.pow)} />
      </div>
    </Card>
  );
}

export const basic: CalculatorModule = {
  meta: { slug: "basic", title: "Basic Calculator", category: "Basic", description: "Add/subtract/multiply/divide/powers.", keywords: ["add", "subtract", "multiply", "divide", "power", "arithmetic", "math"] },
  Calculator: C,
};