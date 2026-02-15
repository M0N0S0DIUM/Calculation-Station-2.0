"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [vin, setVin] = useState(12);
  const [rt, setRt] = useState(10000);
  const [rb, setRb] = useState(4700);

  const out = useMemo(() => {
    const denom = rt + rb;
    const vout = denom !== 0 ? vin*(rb/denom) : NaN;
    const i = denom !== 0 ? vin/denom : NaN;
    const pt = i*i*rt;
    const pb = i*i*rb;
    return { vout, i, pt, pb };
  }, [vin, rt, rb]);

  return (
    <Card>
      <Grid>
        <NumberField label="Vin" value={vin} onChange={setVin} step={0.01} suffix="V" />
        <NumberField label="R top" value={rt} onChange={setRt} step={10} suffix="Ω" />
        <NumberField label="R bottom" value={rb} onChange={setRb} step={10} suffix="Ω" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Vout" value={`${fmt(out.vout, 6)} V`} />
        <Result label="Divider current" value={`${fmt(out.i, 9)} A`} />
        <Result label="Power (top)" value={`${fmt(out.pt, 6)} W`} />
        <Result label="Power (bottom)" value={`${fmt(out.pb, 6)} W`} />
      </div>
      <Hr />
      <SmallNote>Does not account for load at Vout.</SmallNote>
    </Card>
  );
}

export const resistorDivider: CalculatorModule = {
  meta: { slug: "resistor-divider", title: "Resistor Divider", category: "Electronics", description: "Vout, current, resistor power." },
  Calculator: C,
};
