"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "mL": 1e-6, "L": 0.001, "m^3": 1, "gal(us)": 0.003785411784, "qt(us)": 0.000946352946, "ft^3": 0.028316846592
};

interface VolumeConvertCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: VolumeConvertCalculatorProps) {
  const keys = Object.keys(U);
  const [from, setFrom] = useState(() => String(initialParams?.from ?? keys[0]));
  const [to, setTo] = useState(() => String(initialParams?.to ?? keys[1] ?? keys[0]));
  const [v, setV] = useState(() => Number(initialParams?.v ?? 1));
  const out = useMemo(() => { const base = v * U[from]; return base / U[to]; }, [from, to, v]);
  const options = keys.map((k) => ({ value: k, label: k }));

  const shareParams: ShareParams = { from, to, v };
  if (onStateChange) onStateChange(shareParams);

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

export const volumeConvert: CalculatorModule = {
  meta: { slug: "volume-convert", title: "Volume Converter", category: "Conversion", description: "Convert mL/L/m^3/US gal/US qt/ft^3.", keywords: ["volume", "convert", "ml", "l", "liter", "m3", "cubic meter", "gallon", "quart", "ft3", "cubic foot", "us", "unit conversion"] },
  Calculator: C,
};