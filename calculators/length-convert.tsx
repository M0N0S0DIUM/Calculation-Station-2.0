"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "mm": 0.001, "cm": 0.01, "m": 1, "km": 1000,
  "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.344
};

interface LengthConvertCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: LengthConvertCalculatorProps) {
  const keys = Object.keys(U);
  const [from, setFrom] = useState<string | null>(() => String(initialParams?.from ?? keys[0]));
  const [to, setTo] = useState<string | null>(() => String(initialParams?.to ?? keys[1] ?? keys[0]));
  const [v, setV] = useState<number | null>(() => Number(initialParams?.v ?? 1));
  const out = useMemo(() => {
    const vVal = v ?? 0;
    const fromVal = from ?? '';
    const toVal = to ?? '';
 const base = vVal * U[fromVal]; return base / U[toVal]; }, [from, to, v]);
  const options = keys.map((k) => ({ value: k, label: k }));

  const shareParams: ShareParams = { from: from ?? '', to: to ?? '', v: v ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="From" value={from ?? ""} onChange={setFrom} options={options} />
        <SelectField label="To" value={to ?? ""} onChange={setTo} options={options} />
        <NumberField label="Value" value={v} onChange={setV} step={0.01} />
      </Grid>
      <Result label={`${v} ${from}`} value={`${fmt(out, 10)} ${to}`} />
    </Card>
  );
}

export const lengthConvert: CalculatorModule = {
  meta: { slug: "length-convert", title: "Length Converter", category: "Conversion", description: "Convert mm/cm/m/km/in/ft/yd/mi.", keywords: ["length", "convert", "mm", "cm", "meter", "km", "inch", "foot", "yard", "mile", "distance", "unit conversion"] },
  Calculator: C,
};