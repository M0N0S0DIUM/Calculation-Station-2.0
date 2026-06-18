"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BMICalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BMICalculatorProps) {
  const [units, setUnits] = useState<string | null>(() => String(initialParams?.units ?? "us"));
  const [lbs, setLbs] = useState<number | null>(() => Number(initialParams?.weight ?? (initialParams?.units === "metric" ? undefined : 180)) ?? 180);
  const [inch, setInch] = useState<number | null>(() => Number(initialParams?.height ?? (initialParams?.units === "metric" ? undefined : 70)) ?? 70);
  const [kg, setKg] = useState<number | null>(() => Number(initialParams?.weight ?? (initialParams?.units === "us" ? undefined : 82)) ?? 82);
  const [cm, setCm] = useState<number | null>(() => Number(initialParams?.height ?? (initialParams?.units === "us" ? undefined : 178)) ?? 178);

  const r = useMemo(() => {
    const cmVal = cm ?? 0;
    const inchVal = inch ?? 0;
    const kgVal = kg ?? 0;
    const lbsVal = lbs ?? 0;

    const bmi = units === "us" ? (lbsVal/(inchVal*inchVal))*703 : kgVal/Math.pow(cmVal/100,2);
    let cat = "—";
    if (Number.isFinite(bmi)) {
      if (bmi < 18.5) cat = "Underweight";
      else if (bmi < 25) cat = "Normal";
      else if (bmi < 30) cat = "Overweight";
      else cat = "Obese";
    }
    return { bmi, cat };
  }, [units, lbs, inch, kg, cm]);

  const shareParams: ShareParams = {
      units: units ?? '',
      weight: units === "us" ? (lbs ?? 0) : (kg ?? 0),
      height: units === "us" ? (inch ?? 0) : (cm ?? 0),
    };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, units, lbs, inch, kg, cm, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">BMI Calculator</h3>
      </div>
      <SelectField
              label="Units"
              value={units ?? ""}
              onChange={setUnits}
              options={[{value:"us",label:"US (lb/in)"},{value:"metric",label:"Metric (kg/cm)"}]}
      />
      <Hr />
      {units === "us" ? (
        <Grid>
          <NumberField label="Weight" value={lbs} onChange={setLbs} suffix="lb" />
          <NumberField label="Height" value={inch} onChange={setInch} suffix="in" />
        </Grid>
      ) : (
        <Grid>
          <NumberField label="Weight" value={kg} onChange={setKg} suffix="kg" step={0.1} />
          <NumberField label="Height" value={cm} onChange={setCm} suffix="cm" step={0.1} />
        </Grid>
      )}
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="BMI" value={fmt(r.bmi, 2)} copyValue={Number.isFinite(r.bmi) ? String(r.bmi) : undefined} />
        <Result label="Category" value={r.cat} />
      </div>
      <SmallNote>US: lb/in. Metric: kg/cm.</SmallNote>
    </Card>
  );
}

export const bmi: CalculatorModule = {
  meta: { slug: "bmi", title: "BMI Calculator", category: "Health", description: "Body mass index (US/Metric).", keywords: ["bmi", "body mass index", "weight", "height", "health", "body fat", "obesity", "underweight", "normal weight", "overweight"] },
  Calculator: C,
};