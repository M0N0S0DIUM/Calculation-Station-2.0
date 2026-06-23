"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface Props {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: Props) {
  const [age, setAge] = useState<number | null>(() => Number(initialParams?.age ?? 30));
  const [restingHR, setRestingHR] = useState<number | null>(() => Number(initialParams?.restingHR ?? 60));
  const [maxHR, setMaxHR] = useState<number | null>(() => Number(initialParams?.maxHR ?? 0));

  const result = useMemo(() => {
    const a = age ?? 0;
    const rhr = restingHR ?? 0;
    if (a <= 0 || rhr <= 0) return null;
    const mhr = (maxHR && maxHR > 0) ? maxHR : 220 - a;
    const vo2max = 15 * (mhr / rhr);
    const thresholds = [35, 42, 49, 56, Infinity];
    const labels = ["Poor", "Fair", "Good", "Excellent", "Superior"];
    const category = labels[thresholds.findIndex((t) => vo2max <= t)] ?? "Superior";
    return { vo2max, mhr, category };
  }, [age, restingHR, maxHR]);

  const shareParams: ShareParams = { age: age ?? 0, restingHR: restingHR ?? 0, maxHR: maxHR ?? 0 };
  useEffect(() => { if (onStateChange) onStateChange(shareParams); }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Age" value={age} onChange={setAge} step={1} min={5} max={100} />
        <NumberField label="Resting heart rate" value={restingHR} onChange={setRestingHR} step={1} suffix="bpm" />
        <NumberField label="Max heart rate (optional)" value={maxHR} onChange={setMaxHR} step={1} suffix="bpm" />
      </Grid>
      <Hr />
      {result ? (
        <div style={{ display: "grid", gap: 8 }}>
          <Result label="Estimated VO2 Max" value={fmt(result.vo2max, 1) + " ml/kg/min"} />
          <Result label="Max Heart Rate used" value={fmt(result.mhr, 0) + " bpm"} />
          <Result label="Fitness Category" value={result.category} />
        </div>
      ) : (
        <div style={{ color: "#888", fontSize: 14 }}>Enter your age and resting heart rate.</div>
      )}
      <SmallNote>Uth-Sorensen formula (15 x HRmax / HRrest). Leave max HR blank to use 220 minus age.</SmallNote>
    </Card>
  );
}

export const vo2Max: CalculatorModule = {
  meta: {
    slug: "vo2-max",
    title: "VO2 Max Estimator",
    category: "Health",
    description: "Estimate aerobic fitness (VO2 max) from heart rate.",
    keywords: ["vo2 max", "vo2max", "aerobic fitness", "cardio", "heart rate", "max heart rate", "resting heart rate", "endurance", "running", "fitness test"],
  },
  Calculator: C,
};