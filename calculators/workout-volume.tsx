"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface WorkoutVolumeProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: WorkoutVolumeProps) {
  const [sets, setSets] = useState<number | null>(() => Number(initialParams?.sets ?? 10));
  const [reps, setReps] = useState<number | null>(() => Number(initialParams?.reps ?? 10));
  const [weight, setWeight] = useState<number | null>(() => Number(initialParams?.weight ?? 135));
  const [exercises, setExercises] = useState<number | null>(() => Number(initialParams?.exercises ?? 4));
  const [frequency, setFrequency] = useState<number | null>(() => Number(initialParams?.frequency ?? 3));
  const [units, setUnits] = useState<"us" | "metric">(
    () => (initialParams?.units as "us" | "metric") ?? "us"
  );

  const r = useMemo(() => {
    const exercisesVal = exercises ?? 0;
    const frequencyVal = frequency ?? 0;
    const repsVal = reps ?? 0;
    const setsVal = sets ?? 0;
    const weightVal = weight ?? 0;

    const volumePerSet = weightVal * repsVal;
    const volumePerExercise = volumePerSet * setsVal;
    const volumePerSession = volumePerExercise * exercisesVal;
    const weeklyVolume = volumePerSession * frequencyVal;
    const monthlyVolume = weeklyVolume * 4.33;
    
    // Estimated 1RM using Epley formula
    const estimated1RM = weightVal * (1 + repsVal / 30);
    
    // Volume landmarks (Dr. Mike Israetel)
    const mv = weeklyVolume * 0.5; // Maintenance
    const mev = weeklyVolume * 0.7; // Minimum Effective
    const mav = weeklyVolume * 1.0; // Maximum Adaptive
    const mrv = weeklyVolume * 1.3; // Maximum Recoverable
    
    return { 
      volumePerSet, 
      volumePerExercise, 
      volumePerSession, 
      weeklyVolume, 
      monthlyVolume,
      estimated1RM,
      mv, mev, mav, mrv
    };
  }, [sets, reps, weight, exercises, frequency, units]);

  const shareParams: ShareParams = { sets: sets ?? 0, reps: reps ?? 0, weight: weight ?? 0, exercises: exercises ?? 0, frequency: frequency ?? 0, units };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Workout Volume Calculator</h3>
      </div>
      <SelectField
        label="Units"
        value={units}
        onChange={(v) => setUnits(v as "us" | "metric")}
        options={[{ value: "us", label: "US (lb)" }, { value: "metric", label: "Metric (kg)" }]}
      />
      <Hr />
      <Grid>
        <NumberField label="Sets per Exercise" value={sets} onChange={setSets} step={1} min={1} max={20} />
        <NumberField label="Reps per Set" value={reps} onChange={setReps} step={1} min={1} max={30} />
        <NumberField label={units === "us" ? "Weight (lb)" : "Weight (kg)"} value={weight} onChange={setWeight} step={2.5} />
        <NumberField label="Exercises per Session" value={exercises} onChange={setExercises} step={1} min={1} max={10} />
        <NumberField label="Sessions per Week" value={frequency} onChange={setFrequency} step={1} min={1} max={7} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Volume per Set" value={fmt(r.volumePerSet, 0) + (units === "us" ? " lb" : " kg")} />
        <Result label="Volume per Exercise" value={fmt(r.volumePerExercise, 0) + (units === "us" ? " lb" : " kg")} />
        <Result label="Volume per Session" value={fmt(r.volumePerSession, 0) + (units === "us" ? " lb" : " kg")} />
        <Result label="Weekly Volume" value={fmt(r.weeklyVolume, 0) + (units === "us" ? " lb" : " kg")} copyValue={String(r.weeklyVolume)} />
        <Result label="Monthly Volume" value={fmt(r.monthlyVolume, 0) + (units === "us" ? " lb" : " kg")} />
        <Result label="Estimated 1RM (Epley)" value={fmt(r.estimated1RM, 1) + (units === "us" ? " lb" : " kg")} />
      </div>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="MV (Maintenance)" value={fmt(r.mv, 0) + " weekly"} />
        <Result label="MEV (Min Effective)" value={fmt(r.mev, 0) + " weekly"} />
        <Result label="MAV (Max Adaptive)" value={fmt(r.mav, 0) + " weekly"} />
        <Result label="MRV (Max Recoverable)" value={fmt(r.mrv, 0) + " weekly"} />
      </div>
      <SmallNote>Volume = Sets × Reps × Weight. MEV/MAV/MRV landmarks from Renaissance Periodization. Adjust based on recovery.</SmallNote>
    </Card>
  );
}

export const workoutVolume: CalculatorModule = {
  meta: {
    slug: "workout-volume",
    title: "Workout Volume Calculator",
    category: "Health",
    description: "Calculate training volume (sets × reps × weight) with MEV/MAV/MRV landmarks.",
    keywords: ["workout volume", "training volume", "sets reps weight", "mev", "mav", "mrv", "hypertrophy", "progressive overload", "periodization", "rpe"],
  },
  Calculator: C,
};