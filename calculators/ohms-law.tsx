"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface OhmsLawCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: OhmsLawCalculatorProps) {
  const [v, setV] = useState(() => Number(initialParams?.v ?? 5));
  const [i, setI] = useState(() => Number(initialParams?.i ?? 0.2));
  const [r, setR] = useState(() => Number(initialParams?.r ?? 25));

  const out = useMemo(() => {
    const P_vi = v*i;
    const R_vi = i !== 0 ? v/i : NaN;
    const I_vr = r !== 0 ? v/r : NaN;
    const V_ir = i*r;
    const P_vr = r !== 0 ? (v*v)/r : NaN;
    const P_ir = i*i*r;
    return { P_vi, R_vi, I_vr, V_ir, P_vr, P_ir };
  }, [v,i,r]);

  const shareParams: ShareParams = { v, i, r };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="Voltage" value={v} onChange={setV} step={0.01} suffix="V" />
        <NumberField label="Current" value={i} onChange={setI} step={0.001} suffix="A" />
        <NumberField label="Resistance" value={r} onChange={setR} step={0.1} suffix="Ω" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="V×I (Power)" value={`${fmt(out.P_vi, 6)} W`} />
        <Result label="V/I (Resistance)" value={`${fmt(out.R_vi, 6)} Ω`} />
        <Result label="V/R (Current)" value={`${fmt(out.I_vr, 6)} A`} />
        <Result label="I×R (Voltage)" value={`${fmt(out.V_ir, 6)} V`} />
        <Result label="V²/R (Power)" value={`${fmt(out.P_vr, 6)} W`} />
        <Result label="I²×R (Power)" value={`${fmt(out.P_ir, 6)} W`} />
      </div>
    </Card>
  );
}

export const ohmsLaw: CalculatorModule = {
  meta: { slug: "ohms-law", title: "Ohm's Law", category: "Electronics", description: "V/I/R + power.", keywords: ["ohm's law", "ohms law", "voltage", "current", "resistance", "power", "v", "i", "r", "watt", "amp", "volt", "ohm", "circuit"] },
  Calculator: C,
};