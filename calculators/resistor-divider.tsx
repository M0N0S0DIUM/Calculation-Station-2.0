"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface ResistorDividerCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: ResistorDividerCalculatorProps) {
  const [vin, setVin] = useState(() => Number(initialParams?.vin ?? 12));
  const [rt, setRt] = useState(() => Number(initialParams?.rt ?? 10000));
  const [rb, setRb] = useState(() => Number(initialParams?.rb ?? 4700));

  const out = useMemo(() => {
    const denom = rt + rb;
    const vout = denom !== 0 ? vin*(rb/denom) : NaN;
    const i = denom !== 0 ? vin/denom : NaN;
    const pt = i*i*rt;
    const pb = i*i*rb;
    return { vout, i, pt, pb };
  }, [vin, rt, rb]);

  const shareParams: ShareParams = { vin, rt, rb };
  if (onStateChange) onStateChange(shareParams);

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