"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface ResistorDividerCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: ResistorDividerCalculatorProps) {
  const [vin, setVin] = useState<number | null>(() => Number(initialParams?.vin ?? 12));
  const [rt, setRt] = useState<number | null>(() => Number(initialParams?.rt ?? 10000));
  const [rb, setRb] = useState<number | null>(() => Number(initialParams?.rb ?? 4700));

  const out = useMemo(() => {
    const rbVal = rb ?? 0;
    const rtVal = rt ?? 0;
    const vinVal = vin ?? 0;

    const denom = rtVal + rbVal;
    const vout = denom !== 0 ? vinVal*(rbVal/denom) : NaN;
    const i = denom !== 0 ? vinVal/denom : NaN;
    const pt = i*i*rtVal;
    const pb = i*i*rbVal;
    return { vout, i, pt, pb };
  }, [vin, rt, rb]);

  const shareParams: ShareParams = { vin: vin ?? 0, rt: rt ?? 0, rb: rb ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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
        <Result label="Current" value={`${fmt(out.i, 9)} A`} />
        <Result label="Top R power" value={`${fmt(out.pt, 9)} W`} />
        <Result label="Bottom R power" value={`${fmt(out.pb, 9)} W`} />
      </div>
      <SmallNote>Vout = Vin × (Rbottom / (Rtop + Rbottom))</SmallNote>
    </Card>
  );
}

export const resistorDivider: CalculatorModule = {
  meta: { slug: "resistor-divider", title: "Resistor Divider", category: "Electronics", description: "Vout, current, resistor power.", keywords: ["resistor divider", "voltage divider", "vout", "vin", "resistor", "current", "power", "top", "bottom", "circuit", "ohms law"] },
  Calculator: C,
};