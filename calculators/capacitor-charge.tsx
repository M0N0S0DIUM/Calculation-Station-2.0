"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface CapacitorChargeCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: CapacitorChargeCalculatorProps) {
  const [R, setR] = useState(() => Number(initialParams?.R ?? 10000));
  const [Ccap, setCcap] = useState(() => Number(initialParams?.Ccap ?? 1e-6));
  const [pct, setPct] = useState(() => Number(initialParams?.pct ?? 90));

  const out = useMemo(() => {
    const tau = R*Ccap;
    const p = pct/100;
    const t = (p > 0 && p < 1) ? -tau*Math.log(1 - p) : NaN;
    return { tau, t };
  }, [R, Ccap, pct]);

  const shareParams: ShareParams = { R, Ccap, pct };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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
      <SmallNote>t = -τ·ln(1 - target%), where target% is fraction of final voltage.</SmallNote>
    </Card>
  );
}

export const capacitorCharge: CalculatorModule = {
  meta: { slug: "capacitor-charge", title: "Capacitor Charge Time", category: "Electronics", description: "Time to reach a target % of final voltage in RC.", keywords: ["capacitor", "charge", "rc", "time constant", "tau", "voltage", "exponential", "charging curve", "percent", "final voltage"] },
  Calculator: C,
};