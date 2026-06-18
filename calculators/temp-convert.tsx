"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface TempConvertCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: TempConvertCalculatorProps) {
  const [from, setFrom] = useState<string | null>(() => String(initialParams?.from ?? "C"));
  const [v, setV] = useState<number | null>(() => Number(initialParams?.v ?? 25));
  const r = useMemo(() => {
    const vVal = v ?? 0;
    const fromVal = from ?? '';

    let C = vVal;
    if (fromVal === "F") C = (vVal-32)*(5/9);
    if (fromVal === "K") C = vVal-273.15;
    const F = C*(9/5)+32;
    const K = C+273.15;
    return { C, F, K };
  }, [from, v]);

  const shareParams: ShareParams = { from: from ?? '', v: v ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="From" value={from ?? ""} onChange={setFrom} options={[{value:"C",label:"Celsius"},{value:"F",label:"Fahrenheit"},{value:"K",label:"Kelvin"}]} />
        <NumberField label="Value" value={v} onChange={setV} step={0.1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Celsius" value={`${fmt(r.C, 2)} °C`} copyValue={Number.isFinite(r.C) ? String(r.C) : undefined} />
        <Result label="Fahrenheit" value={`${fmt(r.F, 2)} °F`} copyValue={Number.isFinite(r.F) ? String(r.F) : undefined} />
        <Result label="Kelvin" value={`${fmt(r.K, 2)} K`} copyValue={Number.isFinite(r.K) ? String(r.K) : undefined} />
      </div>
    </Card>
  );
}

export const tempConvert: CalculatorModule = {
  meta: { slug: "temp-convert", title: "Temperature Converter", category: "Conversion", description: "Convert °C, °F, K.", keywords: ["temperature", "convert", "celsius", "fahrenheit", "kelvin", "c", "f", "k", "degrees", "temp", "unit conversion"] },
  Calculator: C,
};