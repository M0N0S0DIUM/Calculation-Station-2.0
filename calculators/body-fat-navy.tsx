"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtPct } from "@/lib/math";

function log10(x:number){ return Math.log(x)/Math.LN10; }

interface BodyFatNavyCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BodyFatNavyCalculatorProps) {
  const [sex, setSex] = useState<string | null>(() => String(initialParams?.sex ?? "male"));
  const [height, setHeight] = useState<number | null>(() => Number(initialParams?.height ?? 70));
  const [neck, setNeck] = useState<number | null>(() => Number(initialParams?.neck ?? 15));
  const [waist, setWaist] = useState<number | null>(() => Number(initialParams?.waist ?? 34));
  const [hip, setHip] = useState<number | null>(() => Number(initialParams?.hip ?? 38));

  const bf = useMemo(() => {
    const heightVal = height ?? 0;
    const hipVal = hip ?? 0;
    const neckVal = neck ?? 0;
    const waistVal = waist ?? 0;
    const sexVal = sex ?? '';

    if (sexVal === "male") {
      const v = 86.010*log10(waistVal - neckVal) - 70.041*log10(heightVal) + 36.76;
      return v;
    } else {
      const v = 163.205*log10(waistVal + hipVal - neckVal) - 97.684*log10(heightVal) - 78.387;
      return v;
    }
  }, [sex, height, neck, waist, hip]);

  const shareParams: ShareParams = { sex: sex ?? '', height: height ?? 0, neck: neck ?? 0, waist: waist ?? 0, hip: hip ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="Sex" value={sex ?? ""} onChange={setSex} options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]} />
        <NumberField label="Height" value={height} onChange={setHeight} step={0.1} suffix="in" />
        <NumberField label="Neck" value={neck} onChange={setNeck} step={0.1} suffix="in" />
        <NumberField label="Waist" value={waist} onChange={setWaist} step={0.1} suffix="in" />
        <NumberField label="Hip (female only)" value={hip} onChange={setHip} step={0.1} suffix="in" />
      </Grid>
      <Hr />
      <Result label="Body fat %" value={fmtPct(bf)} />
      <Hr />
      <SmallNote>US Navy method. All measurements in inches.</SmallNote>
    </Card>
  );
}

export const bodyFatNavy: CalculatorModule = {
  meta: { slug: "body-fat-navy", title: "Body Fat (Navy Method)", category: "Health", description: "Estimate body fat % from measurements.", keywords: ["body fat", "navy method", "body fat percentage", "measurements", "neck", "waist", "hip", "height", "military", "fitness"] },
  Calculator: C,
};