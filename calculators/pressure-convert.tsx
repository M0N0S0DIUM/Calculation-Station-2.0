"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "Pa": 1,
  "kPa": 1000,
  "bar": 100000,
  "psi": 6894.757293168,
  "atm": 101325
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

export const pressureconvert: CalculatorModule = {
  meta: { slug: "pressure-convert", title: "Pressure Converter", category: "Conversion", description: "Convert Pa/kPa/bar/psi/atm." },
  Calculator: C,
};
