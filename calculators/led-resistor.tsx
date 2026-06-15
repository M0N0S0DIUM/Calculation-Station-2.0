"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface LEDResistorCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: LEDResistorCalculatorProps) {
  const [vs, setVs] = useState(() => Number(initialParams?.vs ?? 5));
  const [vf, setVf] = useState(() => Number(initialParams?.vf ?? 2.0));
  const [imA, setImA] = useState(() => Number(initialParams?.imA ?? 10));

  const out = useMemo(() => {
    const I = imA/1000;
    const vR = vs - vf;
    const R = I !== 0 ? vR/I : NaN;
    const pR = I*I*R;
    return { vR, R, pR };
  }, [vs, vf, imA]);

  const shareParams: ShareParams = { vs, vf, imA };
  if (onStateChange) onStateChange(shareParams);

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
      <SmallNote>R = (Vs - Vf) / I. Use next standard value up.</SmallNote>
    </Card>
  );
}

export const ledResistor: CalculatorModule = {
  meta: { slug: "led-resistor", title: "LED Resistor", category: "Electronics", description: "Series resistor and power for an LED.", keywords: ["led", "resistor", "series", "forward voltage", "vf", "current", "ma", "ohm", "power", "watt", "circuit"] },
  Calculator: C,
};