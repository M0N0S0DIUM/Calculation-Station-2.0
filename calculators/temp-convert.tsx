"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [from, setFrom] = useState("C");
  const [v, setV] = useState(25);
  const r = useMemo(() => {
    let C = v;
    if (from === "F") C = (v-32)*(5/9);
    if (from === "K") C = v-273.15;
    const F = C*(9/5)+32;
    const K = C+273.15;
    return { C, F, K };
  }, [from, v]);

  return (
    <Card>
      <Grid>
        <SelectField label="From" value={from} onChange={setFrom} options={[{value:"C",label:"Celsius"},{value:"F",label:"Fahrenheit"},{value:"K",label:"Kelvin"}]} />
        <NumberField label="Value" value={v} onChange={setV} step={0.1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Celsius" value={`${fmt(r.C, 2)} °C`} />
        <Result label="Fahrenheit" value={`${fmt(r.F, 2)} °F`} />
        <Result label="Kelvin" value={`${fmt(r.K, 2)} K`} />
      </div>
    </Card>
  );
}

export const tempConvert: CalculatorModule = {
  meta: { slug: "temp-convert", title: "Temperature Converter", category: "Conversion", description: "Convert °C, °F, K." },
  Calculator: C,
};
