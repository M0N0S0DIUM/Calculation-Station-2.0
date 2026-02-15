"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "mm": 0.001,
  "cm": 0.01,
  "m": 1,
  "km": 1000,
  "in": 0.0254,
  "ft": 0.3048,
  "yd": 0.9144,
  "mi": 1609.344
};

function C() {
  const keys = Object.keys(U);
  const [from, setFrom] = useState(keys[0]);
  const [to, setTo] = useState(keys[1] ?? keys[0]);
  const [v, setV] = useState(1);

  const out = useMemo(() => {
    const base = v * U[from];
    return base / U[to];
  }, [from, to, v]);

  const options = keys.map((k) => ({ value: k, label: k }));

  return (
    <Card>
      <Grid>
        <SelectField label="From" value={from} onChange={setFrom} options={options} />
        <SelectField label="To" value={to} onChange={setTo} options={options} />
        <NumberField label="Value" value={v} onChange={setV} step={0.01} />
      </Grid>
      <div style={{ marginTop: 12 }}>
        <Result label="Result" value={`${fmt(out, 6)} ${to}`} />
      </div>
    </Card>
  );
}

export const lengthconvert: CalculatorModule = {
  meta: { slug: "length-convert", title: "Length Converter", category: "Conversion", description: "Convert mm/cm/m/km/in/ft/yd/mi." },
  Calculator: C,
};
