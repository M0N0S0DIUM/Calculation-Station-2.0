"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface MacrosCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: MacrosCalculatorProps) {
  const [weight, setWeight] = useState(() => Number(initialParams?.weight ?? 180));
  const [bodyFat, setBodyFat] = useState(() => Number(initialParams?.bodyFat ?? 20));
  const [activity, setActivity] = useState<"sedentary" | "light" | "moderate" | "active" | "very-active">(
    () => (initialParams?.activity as "sedentary" | "light" | "moderate" | "active" | "very-active") ?? "moderate"
  );
  const [goal, setGoal] = useState<"maintain" | "muscle" | "cut" | "recomp">(
    () => (initialParams?.goal as "maintain" | "muscle" | "cut" | "recomp") ?? "maintain"
  );
  const [units, setUnits] = useState<"us" | "metric">(
    () => (initialParams?.units as "us" | "metric") ?? "us"
  );

  const r = useMemo(() => {
    const weightKg = units === "us" ? weight / 2.20462 : weight;
    const leanMass = weightKg * (1 - bodyFat / 100);
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    };
    
    const bmr = 370 + (21.6 * leanMass); // Katch-McArdle
    const tdee = bmr * activityMultipliers[activity];
    
    let calorieTarget = tdee;
    if (goal === "cut") calorieTarget = tdee - 500;
    else if (goal === "muscle") calorieTarget = tdee + 250;
    else if (goal === "recomp") calorieTarget = tdee - 100;
    
    // Protein: 1.8-2.2g per kg lean mass
    const proteinPerKg = goal === "cut" ? 2.2 : goal === "muscle" ? 2.0 : 1.8;
    const protein = leanMass * proteinPerKg;
    const proteinCal = protein * 4;
    
    // Fat: 20-30% of calories
    const fatPct = goal === "cut" ? 0.25 : 0.30;
    const fatCal = calorieTarget * fatPct;
    const fat = fatCal / 9;
    
    // Carbs: remainder
    const carbCal = calorieTarget - proteinCal - fatCal;
    const carbs = carbCal / 4;
    
    return { 
      tdee: Math.round(tdee), 
      targetCalories: Math.round(calorieTarget), 
      protein: Math.round(protein), 
      fat: Math.round(fat), 
      carbs: Math.round(carbs),
      proteinCal: Math.round(proteinCal),
      fatCal: Math.round(fatCal),
      carbCal: Math.round(carbCal),
    };
  }, [weight, bodyFat, activity, goal, units]);

  const shareParams: ShareParams = { weight, bodyFat, activity, goal, units };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Macro Calculator (TDEE + Split)</h3>
      </div>
      <SelectField
        label="Units"
        value={units}
        onChange={(v) => setUnits(v as "us" | "metric")}
        options={[{ value: "us", label: "US (lb)" }, { value: "metric", label: "Metric (kg)" }]}
      />
      <Hr />
      <Grid>
        <NumberField label={units === "us" ? "Weight (lb)" : "Weight (kg)"} value={weight} onChange={setWeight} step={0.1} />
        <NumberField label="Body Fat %" value={bodyFat} onChange={setBodyFat} step={1} min={5} max={50} suffix="%" />
      </Grid>
      <Hr />
      <SelectField
        label="Activity Level"
        value={activity}
        onChange={(v) => setActivity(v as "sedentary" | "light" | "moderate" | "active" | "very-active")}
        options={[
          { value: "sedentary", label: "Sedentary (desk job)" },
          { value: "light", label: "Light (1-3x/week)" },
          { value: "moderate", label: "Moderate (3-5x/week)" },
          { value: "active", label: "Active (6-7x/week)" },
          { value: "very-active", label: "Very Active (athlete)" },
        ]}
      />
      <Hr />
      <SelectField
        label="Goal"
        value={goal}
        onChange={(v) => setGoal(v as "maintain" | "muscle" | "cut" | "recomp")}
        options={[
          { value: "maintain", label: "Maintain Weight" },
          { value: "muscle", label: "Build Muscle (+250 cal)" },
          { value: "cut", label: "Lose Fat (-500 cal)" },
          { value: "recomp", label: "Recomp (-100 cal)" },
        ]}
      />
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="TDEE (Maintenance)" value={String(r.tdee) + " kcal"} />
        <Result label="Target Calories" value={String(r.targetCalories) + " kcal"} copyValue={String(r.targetCalories)} />
        <Result label="Protein" value={String(r.protein) + " g"} copyValue={String(r.protein)} />
        <Result label="Fat" value={String(r.fat) + " g"} copyValue={String(r.fat)} />
        <Result label="Carbs" value={String(r.carbs) + " g"} copyValue={String(r.carbs)} />
        <Result label="Protein Calories" value={String(r.proteinCal) + " kcal"} />
        <Result label="Fat Calories" value={String(r.fatCal) + " kcal"} />
        <Result label="Carb Calories" value={String(r.carbCal) + " kcal"} />
      </div>
      <SmallNote>Uses Katch-McArdle BMR (needs body fat %). Protein based on lean mass. Fat 25-30%. Carbs fill remainder.</SmallNote>
    </Card>
  );
}

export const macrosCalculator2: CalculatorModule = {
  meta: {
    slug: "macro-calculator-advanced",
    title: "Macro Calculator (TDEE + Split)",
    category: "Health",
    description: "Calculate TDEE and macro split (protein/fat/carbs) based on lean mass and goals.",
    keywords: ["macros", "macro calculator", "tdee", "protein", "carbs", "fat", "lean mass", "body recomposition", "cutting", "bulking", "iifym"],
  },
  Calculator: C,
};