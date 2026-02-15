"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [R, setR] = useState(10000);
  const [Ccap, setCcap] = useState(1e-6);
  const [pct, setPct] = useState(90); // % of final

  const out = useMemo(() => {
    const tau = R*Ccap;
    const p = pct/100;
    const t = (p > 0 && p < 1) ? -tau*Math.log(1 - p) : NaN;
    return { tau, t };
  }, [R, Ccap, pct]);

  return (
    <Card>
      <Grid>
        <NumberField label="R" value={R} onChange={setR} step={100} suffix="Ω" />
        <NumberField label="C" value={Ccap} onChange={setCcap} step={1e-7} suffix="F" />
        <NumberField label="Target" value={pct} onChange={setPct} step={1} suffix="%" min={1} max={99.9} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Tau" value={`${fmt(out.tau, 9)} s`} />
        <Result label="Time to target" value={`${fmt(out.t, 9)} s`} />
      </div>
      <Hr />
      <SmallNote>Charging curve: V(t)=Vf(1-e^{-t/RC}).</SmallNote>
    </Card>
  );
}

export const capacitorCharge: CalculatorModule = {
  meta: { slug: "capacitor-charge", title: "Capacitor Charge Time", category: "Electronics", description: "Time to reach a target % of final voltage in RC." },
  Calculator: C,
};
