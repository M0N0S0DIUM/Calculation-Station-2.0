"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface WaterIntakeCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: WaterIntakeCalculatorProps) {
  const [units, setUnits] = useState<string | null>(() => String(initialParams?.units ?? "lb"));
  const [weight, setWeight] = useState<number | null>(() => Number(initialParams?.weight ?? 180));
  const [mult, setMult] = useState<number | null>(() => Number(initialParams?.mult ?? 0.5));

  const r = useMemo(() => {
    const multVal = mult ?? 0;
    const weightVal = weight ?? 0;
    const unitsVal = units ?? '';

    const lbs = unitsVal === "lb" ? weightVal : weightVal*2.2046226218;
    const oz = lbs * multVal;
    const liters = oz * 0.0295735296;
    return { oz, liters };
  }, [units, weight, mult]);

  const shareParams: ShareParams = { units: units ?? '', weight: weight ?? 0, mult: mult ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="Weight units" value={units ?? ""} onChange={setUnits} options={[{value:"lb",label:"lb"},{value:"kg",label:"kg"}]} />
        <NumberField label="Weight" value={weight} onChange={setWeight} step={0.1} />
        <NumberField label="Multiplier" value={mult} onChange={setMult} step={0.05} suffix="oz per lb" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Daily water (oz)" value={fmt(r.oz, 0)} />
        <Result label="Daily water (liters)" value={fmt(r.liters, 2)} />
      </div>
      <SmallNote>Common multiplier: 0.5–1.0 oz per lb body weight.</SmallNote>
    </Card>
  );
}

export const waterIntake: CalculatorModule = {
  meta: { slug: "water-intake", title: "Water Intake", category: "Health", description: "Simple daily water estimate by body weight.", keywords: ["water", "hydration", "daily water", "water intake", "body weight", "oz", "liters", "drink water"] },
  Calculator: C,
};