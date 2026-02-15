"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [R, setR] = useState(1000);
  const [Ccap, setCcap] = useState(1e-6);
  const out = useMemo(() => {
    const tau = R*Ccap;
    const fc = tau !== 0 ? 1/(2*Math.PI*tau) : NaN;
    return { tau, fc };
  }, [R, Ccap]);

  return (
    <Card>
      <Grid>
        <NumberField label="Resistance" value={R} onChange={setR} step={10} suffix="Ω" />
        <NumberField label="Capacitance" value={Ccap} onChange={setCcap} step={1e-7} suffix="F" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Tau (R·C)" value={`${fmt(out.tau, 9)} s`} />
        <Result label="Cutoff (1/2πRC)" value={`${fmt(out.fc, 6)} Hz`} />
      </div>
    </Card>
  );
}

export const rcCutoff: CalculatorModule = {
  meta: { slug: "rc-cutoff", title: "RC Cutoff", category: "Electronics", description: "RC time constant and cutoff frequency." },
  Calculator: C,
};
