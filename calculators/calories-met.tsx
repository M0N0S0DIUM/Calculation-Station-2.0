"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface CaloriesMetCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: CaloriesMetCalculatorProps) {
  const [weight, setWeight] = useState<number | null>(() => Number(initialParams?.weight ?? 180));
  const [units, setUnits] = useState<string | null>(() => String(initialParams?.units ?? "lb"));
  const [met, setMet] = useState<number | null>(() => Number(initialParams?.met ?? 6));
  const [minutes, setMinutes] = useState<number | null>(() => Number(initialParams?.minutes ?? 30));

  const kcal = useMemo(() => {
    const metVal = met ?? 0;
    const minutesVal = minutes ?? 0;
    const weightVal = weight ?? 0;
    const unitsVal = units ?? '';

    const kg = unitsVal === "kg" ? weightVal : weightVal*0.45359237;
    const kcalMin = metVal * 3.5 * kg / 200;
    return kcalMin * minutesVal;
  }, [weight, units, met, minutes]);

  const shareParams: ShareParams = { weight: weight ?? 0, units: units ?? '', met: met ?? 0, minutes: minutes ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Weight" value={weight} onChange={setWeight} step={0.1} />
        <SelectField label="Units" value={units ?? ""} onChange={setUnits} options={[{value:"lb",label:"lb"},{value:"kg",label:"kg"}]} />
        <NumberField label="MET" value={met} onChange={setMet} step={0.1} />
        <NumberField label="Minutes" value={minutes} onChange={setMinutes} step={1} />
      </Grid>
      <Hr />
      <Result label="Estimated calories burned" value={`${fmt(kcal, 0)} kcal`} />
      <Hr />
      <SmallNote>kcal = MET × 3.5 × weight(kg) / 200 × minutes</SmallNote>
    </Card>
  );
}

export const caloriesMet: CalculatorModule = {
  meta: { slug: "calories-met", title: "Calories Burned (MET)", category: "Health", description: "Calories burned from MET, weight, minutes.", keywords: ["calories", "burned", "met", "metabolic equivalent", "exercise", "activity", "weight", "minutes", "energy expenditure", "workout"] },
  Calculator: C,
};