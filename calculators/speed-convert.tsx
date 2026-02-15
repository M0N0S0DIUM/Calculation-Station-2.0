"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

const U: Record<string, number> = {
  "m/s": 1,
  "km/h": 0.2777777777777778,
  "mph": 0.44704,
  "kn": 0.5144444444444445
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

export const speedconvert: CalculatorModule = {
  meta: { slug: "speed-convert", title: "Speed Converter", category: "Conversion", description: "Convert m/s, km/h, mph, knots." },
  Calculator: C,
};
