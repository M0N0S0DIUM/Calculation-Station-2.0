"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface ProteinIntakeProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: ProteinIntakeProps) {
  const [weight, setWeight] = useState<number | null>(() => Number(initialParams?.weight ?? 180));
  const [activity, setActivity] = useState<"sedentary" | "light" | "moderate" | "active" | "very-active">(
    () => (initialParams?.activity as "sedentary" | "light" | "moderate" | "active" | "very-active") ?? "moderate"
  );
  const [goal, setGoal] = useState<"maintain" | "muscle" | "weight-loss" | "endurance">(
    () => (initialParams?.goal as "maintain" | "muscle" | "weight-loss" | "endurance") ?? "muscle"
  );
  const [units, setUnits] = useState<"us" | "metric">(
    () => (initialParams?.units as "us" | "metric") ?? "us"
  );

  const r = useMemo(() => {
    const weightVal = weight ?? 0;

    const weightKg = units === "us" ? weightVal / 2.20462 : weightVal;
    
    const activityMultipliers = {
      sedentary: 0.8,
      light: 1.0,
      moderate: 1.3,
      active: 1.6,
      "very-active": 2.0,
    };
    
    const goalMultipliers = {
          maintain: 1.0,
          muscle: 1.2,
          "weight-loss": 1.8,
          endurance: 1.4,
        };
    
    const baseProtein = weightKg * activityMultipliers[activity];
    const targetProtein = baseProtein * goalMultipliers[goal];
    const minProtein = weightKg * 0.8;
    const maxProtein = weightKg * 2.2;
    
    const caloriesFromProtein = targetProtein * 4;
    
    return { targetProtein, minProtein, maxProtein, caloriesFromProtein, weightKg };
  }, [weight, activity, goal, units]);

  const shareParams: ShareParams = { weight: weight ?? 0, activity: activity ?? 'moderate', goal: goal ?? 'muscle', units: units ?? 'us' };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Protein Intake Calculator</h3>
      </div>
      <SelectField
        label="Units"
        value={units}
        onChange={(v) => setUnits(v as "us" | "metric")}
        options={[{ value: "us", label: "US (lb)" }, { value: "metric", label: "Metric (kg)" }]}
      />
      <Hr />
      <SelectField
        label="Activity Level"
        value={activity}
        onChange={(v) => setActivity(v as "sedentary" | "light" | "moderate" | "active" | "very-active")}
        options={[
          { value: "sedentary", label: "Sedentary (little/no exercise)" },
          { value: "light", label: "Light (1-3 days/week)" },
          { value: "moderate", label: "Moderate (3-5 days/week)" },
          { value: "active", label: "Active (6-7 days/week)" },
          { value: "very-active", label: "Very Active (2x/day, athlete)" },
        ]}
      />
      <Hr />
      <SelectField
        label="Goal"
        value={goal}
        onChange={(v) => setGoal(v as "maintain" | "muscle" | "weight-loss" | "endurance")}
        options={[
          { value: "maintain", label: "Maintain Weight" },
          { value: "muscle", label: "Build Muscle" },
          { value: "weight-loss", label: "Lose Weight (high protein)" },
          { value: "endurance", label: "Endurance Athlete" },
        ]}
      />
      <Hr />
      <Grid>
        <NumberField label={units === "us" ? "Body Weight (lb)" : "Body Weight (kg)"} value={weight} onChange={setWeight} step={0.1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Recommended Daily Protein" value={fmt(r.targetProtein, 0) + " g"} copyValue={String(r.targetProtein)} />
        <Result label="Minimum (0.8g/kg)" value={fmt(r.minProtein, 0) + " g"} />
        <Result label="Maximum (2.2g/kg)" value={fmt(r.maxProtein, 0) + " g"} />
        <Result label="Calories from Protein" value={fmt(r.caloriesFromProtein, 0) + " kcal"} />
        <Result label="Per Meal (4 meals)" value={fmt(r.targetProtein / 4, 0) + " g"} />
        <Result label="Per Meal (6 meals)" value={fmt(r.targetProtein / 6, 0) + " g"} />
      </div>
      <SmallNote>Based on ACSM/ISSN guidelines. Higher for muscle gain & weight loss to preserve lean mass. Consult a dietitian for personalized advice.</SmallNote>
    </Card>
  );
}

export const proteinIntake: CalculatorModule = {
  meta: {
    slug: "protein-intake",
    title: "Protein Intake Calculator",
    category: "Health",
    description: "Calculate daily protein needs based on weight, activity level, and fitness goals.",
    keywords: ["protein", "protein intake", "daily protein", "macro", "muscle building", "weight loss", "nutrition", "fitness", "gym"],
  },
  Calculator: C,
};