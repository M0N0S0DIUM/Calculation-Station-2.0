"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "Pa": 1, "kPa": 1000, "bar": 100000, "psi": 6894.757293168, "atm": 101325
};

interface PressureConvertCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: PressureConvertCalculatorProps) {
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

export const pressureConvert: CalculatorModule = {
  meta: { slug: "pressure-convert", title: "Pressure Converter", category: "Conversion", description: "Convert Pa/kPa/bar/psi/atm.", keywords: ["pressure", "convert", "pa", "kpa", "bar", "psi", "atm", "pascal", "kilopascal", "pounds per square inch", "atmosphere", "unit conversion"] },
  Calculator: C,
};