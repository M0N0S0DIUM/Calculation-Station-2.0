"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BodyFatProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BodyFatProps) {
  const [gender, setGender] = useState<"male" | "female">(
    () => (initialParams?.gender as "male" | "female") ?? "male"
  );
  const [weight, setWeight] = useState(() => Number(initialParams?.weight ?? 180));
  const [waist, setWaist] = useState(() => Number(initialParams?.waist ?? 34));
  const [neck, setNeck] = useState(() => Number(initialParams?.neck ?? 16));
  const [hip, setHip] = useState(() => Number(initialParams?.hip ?? 36));
  const [height, setHeight] = useState(() => Number(initialParams?.height ?? 70));
  const [units, setUnits] = useState<"us" | "metric">(
    () => (initialParams?.units as "us" | "metric") ?? "us"
  );

  const r = useMemo(() => {
    let w = weight, wst = waist, nck = neck, hp = hip, hgt = height;
    if (units === "metric") {
      w = weight * 2.20462;
      wst = waist / 2.54;
      nck = neck / 2.54;
      hp = hip / 2.54;
      hgt = height / 2.54;
    }

    let bodyFat = 0;
    if (gender === "male") {
      // US Navy method for men
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wst - nck) + 0.15456 * Math.log10(hgt)) - 450;
    } else {
      // US Navy method for women
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wst + hp - nck) + 0.22100 * Math.log10(hgt)) - 450;
    }

    const leanMass = w * (1 - bodyFat / 100);
    const fatMass = w * (bodyFat / 100);
    
    let category = "";
    if (gender === "male") {
      if (bodyFat < 6) category = "Essential Fat";
      else if (bodyFat < 14) category = "Athletes";
      else if (bodyFat < 18) category = "Fitness";
      else if (bodyFat < 25) category = "Average";
      else category = "Obese";
    } else {
      if (bodyFat < 14) category = "Essential Fat";
      else if (bodyFat < 21) category = "Athletes";
      else if (bodyFat < 25) category = "Fitness";
      else if (bodyFat < 32) category = "Average";
      else category = "Obese";
    }

    return { bodyFat, leanMass, fatMass, category };
  }, [gender, weight, waist, neck, hip, height, units]);

  const shareParams: ShareParams = { gender, weight, waist, neck, hip, height, units };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Body Fat % (US Navy Method)</h3>
      </div>
      <SelectField
        label="Gender"
        value={gender}
        onChange={(v) => setGender(v as "male" | "female")}
        options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]}
      />
      <Hr />
      <SelectField
        label="Units"
        value={units}
        onChange={(v) => setUnits(v as "us" | "metric")}
        options={[{ value: "us", label: "US (lb/in)" }, { value: "metric", label: "Metric (kg/cm)" }]}
      />
      <Hr />
      <Grid>
        <NumberField label={units === "us" ? "Weight (lb)" : "Weight (kg)"} value={weight} onChange={setWeight} step={0.1} />
        <NumberField label={units === "us" ? "Waist (in)" : "Waist (cm)"} value={waist} onChange={setWaist} step={0.1} />
        <NumberField label={units === "us" ? "Neck (in)" : "Neck (cm)"} value={neck} onChange={setNeck} step={0.1} />
        {gender === "female" && (
          <NumberField label={units === "us" ? "Hip (in)" : "Hip (cm)"} value={hip} onChange={setHip} step={0.1} />
        )}
        <NumberField label={units === "us" ? "Height (in)" : "Height (cm)"} value={height} onChange={setHeight} step={0.1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Body Fat %" value={fmt(r.bodyFat, 1) + "%"} copyValue={String(r.bodyFat)} />
        <Result label="Category" value={r.category} />
        <Result label="Lean Mass" value={fmt(r.leanMass, 1) + (units === "us" ? " lb" : " kg")} />
        <Result label="Fat Mass" value={fmt(r.fatMass, 1) + (units === "us" ? " lb" : " kg")} />
      </div>
      <SmallNote>US Navy method using circumference measurements. More accurate than BMI for body composition.</SmallNote>
    </Card>
  );
}

export const bodyFatNavy2: CalculatorModule = {
  meta: {
    slug: "body-fat-percentage",
    title: "Body Fat % Calculator (Navy Method)",
    category: "Health",
    description: "Estimate body fat percentage using US Navy circumference method (gender-specific).",
    keywords: ["body fat", "body fat percentage", "navy method", "body composition", "lean mass", "fat mass", "fitness", "health"],
  },
  Calculator: C,
};