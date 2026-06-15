"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "mg": 1e-6, "g": 0.001, "kg": 1, "oz": 0.028349523125, "lb": 0.45359237
};

interface MassConvertCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: MassConvertCalculatorProps) {
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

export const massConvert: CalculatorModule = {
  meta: { slug: "mass-convert", title: "Mass Converter", category: "Conversion", description: "Convert mg/g/kg/oz/lb.", keywords: ["mass", "convert", "weight", "mg", "g", "kg", "oz", "lb", "ounce", "pound", "gram", "kilogram", "unit conversion"] },
  Calculator: C,
};