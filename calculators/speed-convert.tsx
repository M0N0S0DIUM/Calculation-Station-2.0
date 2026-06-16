"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "m/s": 1, "km/h": 0.2777777777777778, "mph": 0.44704, "kn": 0.5144444444444445
};

interface SpeedConvertCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: SpeedConvertCalculatorProps) {
  const keys = Object.keys(U);
  const [from, setFrom] = useState(() => String(initialParams?.from ?? keys[0]));
  const [to, setTo] = useState(() => String(initialParams?.to ?? keys[1] ?? keys[0]));
  const [v, setV] = useState(() => Number(initialParams?.v ?? 1));
  const out = useMemo(() => { const base = v * U[from]; return base / U[to]; }, [from, to, v]);
  const options = keys.map((k) => ({ value: k, label: k }));

  const shareParams: ShareParams = { from, to, v };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="From" value={from} onChange={setFrom} options={options} />
        <SelectField label="To" value={to} onChange={setTo} options={options} />
        <NumberField label="Value" value={v} onChange={setV} step={0.01} />
      </Grid>
      <Result label={`${v} ${from}`} value={`${fmt(out, 10)} ${to}`} />
    </Card>
  );
}

export const speedConvert: CalculatorModule = {
  meta: { slug: "speed-convert", title: "Speed Converter", category: "Conversion", description: "Convert m/s, km/h, mph, knots.", keywords: ["speed", "convert", "m/s", "km/h", "mph", "knots", "velocity", "meter per second", "kilometer per hour", "miles per hour", "nautical", "unit conversion"] },
  Calculator: C,
};