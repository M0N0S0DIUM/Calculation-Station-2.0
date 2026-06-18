"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface OneRepMaxCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: OneRepMaxCalculatorProps) {
  const [weight, setWeight] = useState<number | null>(() => Number(initialParams?.weight ?? 185));
  const [reps, setReps] = useState<number | null>(() => Number(initialParams?.reps ?? 5));

  const rm = useMemo(() => {
    const repsVal = reps ?? 0;
    const weightVal = weight ?? 0;

    if (repsVal <= 1) return weightVal;
    return weightVal * (1 + repsVal/30);
  }, [weight, reps]);

  const shareParams: ShareParams = { weight: weight ?? 0, reps: reps ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Weight lifted" value={weight} onChange={setWeight} step={1} />
        <NumberField label="Reps" value={reps} onChange={setReps} step={1} min={1} />
      </Grid>
      <Hr />
      <Result label="Estimated 1RM" value={fmt(rm, 1)} />
      <Hr />
      <SmallNote>Epley formula. Most accurate for reps ≤ ~10.</SmallNote>
    </Card>
  );
}

export const oneRepMax: CalculatorModule = {
  meta: { slug: "one-rep-max", title: "One-Rep Max (Epley)", category: "Health", description: "Estimate 1RM from weight and reps.", keywords: ["one rep max", "1rm", "epley", "weight lifting", "strength", "reps", "weight", "powerlifting", "bodybuilding", "max lift"] },
  Calculator: C,
};