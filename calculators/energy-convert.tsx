"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "J": 1, "kJ": 1000, "Wh": 3600, "kWh": 3600000, "cal": 4.184, "kcal": 4184, "BTU": 1055.05585262
};

interface EnergyConvertCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: EnergyConvertCalculatorProps) {
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

export const energyConvert: CalculatorModule = {
  meta: { slug: "energy-convert", title: "Energy Converter", category: "Conversion", description: "Convert J/kJ/Wh/kWh/cal/kcal/BTU.", keywords: ["energy", "convert", "joule", "j", "kj", "wh", "kwh", "calorie", "kcal", "btu", "unit conversion"] },
  Calculator: C,
};