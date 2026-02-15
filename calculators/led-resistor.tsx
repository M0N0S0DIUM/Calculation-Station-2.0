"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [vs, setVs] = useState(5);
  const [vf, setVf] = useState(2.0);
  const [imA, setImA] = useState(10);

  const out = useMemo(() => {
    const I = imA/1000;
    const vR = vs - vf;
    const R = I !== 0 ? vR/I : NaN;
    const pR = I*I*R;
    return { vR, R, pR };
  }, [vs, vf, imA]);

  return (
    <Card>
      <Grid>
        <NumberField label="Supply voltage" value={vs} onChange={setVs} step={0.01} suffix="V" />
        <NumberField label="LED Vf" value={vf} onChange={setVf} step={0.01} suffix="V" />
        <NumberField label="LED current" value={imA} onChange={setImA} step={0.5} suffix="mA" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Resistor voltage" value={`${fmt(out.vR, 4)} V`} />
        <Result label="Resistor value" value={`${fmt(out.R, 2)} Ω`} />
        <Result label="Resistor power" value={`${fmt(out.pR, 6)} W`} />
      </div>
      <Hr />
      <SmallNote>If Vs ≤ Vf, you need a different topology.</SmallNote>
    </Card>
  );
}

export const ledResistor: CalculatorModule = {
  meta: { slug: "led-resistor", title: "LED Resistor", category: "Electronics", description: "Series resistor and power for an LED." },
  Calculator: C,
};
