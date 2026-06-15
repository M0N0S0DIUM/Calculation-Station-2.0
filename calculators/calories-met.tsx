"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface CaloriesMetCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: CaloriesMetCalculatorProps) {
  const [weight, setWeight] = useState(() => Number(initialParams?.weight ?? 180));
  const [units, setUnits] = useState(() => String(initialParams?.units ?? "lb"));
  const [met, setMet] = useState(() => Number(initialParams?.met ?? 6));
  const [minutes, setMinutes] = useState(() => Number(initialParams?.minutes ?? 30));

  const kcal = useMemo(() => {
    const kg = units === "kg" ? weight : weight*0.45359237;
    const kcalMin = met * 3.5 * kg / 200;
    return kcalMin * minutes;
  }, [weight, units, met, minutes]);

  const shareParams: ShareParams = { weight, units, met, minutes };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="Weight" value={weight} onChange={setWeight} step={0.1} />
        <SelectField label="Units" value={units} onChange={setUnits} options={[{value:"lb",label:"lb"},{value:"kg",label:"kg"}]} />
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