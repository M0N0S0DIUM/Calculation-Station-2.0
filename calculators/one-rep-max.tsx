"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [weight, setWeight] = useState(185);
  const [reps, setReps] = useState(5);

  const rm = useMemo(() => {
    if (reps <= 1) return weight;
    return weight * (1 + reps/30);
  }, [weight, reps]);

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
  meta: { slug: "one-rep-max", title: "One-Rep Max (Epley)", category: "Health", description: "Estimate 1RM from weight and reps." },
  Calculator: C,
};
