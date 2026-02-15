"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "mL": 1e-06,
  "L": 0.001,
  "m^3": 1,
  "gal(us)": 0.003785411784,
  "qt(us)": 0.000946352946,
  "ft^3": 0.028316846592
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
        <Result label="Result" value={`${fmt(out, 9)} ${to}`} />
      </div>
    </Card>
  );
}

export const volumeconvert: CalculatorModule = {
  meta: { slug: "volume-convert", title: "Volume Converter", category: "Conversion", description: "Convert mL/L/m^3/US gal/US qt/ft^3." },
  Calculator: C,
};
