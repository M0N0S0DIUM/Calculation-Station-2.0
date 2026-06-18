"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface OhmsLawCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: OhmsLawCalculatorProps) {
  const [v, setV] = useState<number | null>(() => Number(initialParams?.v ?? 5));
  const [i, setI] = useState<number | null>(() => Number(initialParams?.i ?? 0.2));
  const [r, setR] = useState<number | null>(() => Number(initialParams?.r ?? 25));

  const out = useMemo(() => {
    const iVal = i ?? 0;
    const rVal = r ?? 0;
    const vVal = v ?? 0;

    const P_vi = vVal*iVal;
    const R_vi = iVal !== 0 ? vVal/iVal : NaN;
    const I_vr = rVal !== 0 ? vVal/rVal : NaN;
    const V_ir = iVal*rVal;
    const P_vr = rVal !== 0 ? (vVal*vVal)/rVal : NaN;
    const P_ir = iVal*iVal*rVal;
    return { P_vi, R_vi, I_vr, V_ir, P_vr, P_ir };
  }, [v,i,r]);

  const shareParams: ShareParams = { v: v ?? 0, i: i ?? 0, r: r ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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