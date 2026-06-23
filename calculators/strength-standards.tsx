"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface Props {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

const STANDARDS: Record<string, Record<string, number[]>> = {
  squat:    { male: [0.75, 1.25, 1.75, 2.0, 2.5], female: [0.5, 0.75, 1.25, 1.5, 1.75] },
  bench:    { male: [0.5, 0.75, 1.25, 1.5, 2.0],  female: [0.25, 0.5, 0.75, 1.0, 1.25] },
  deadlift: { male: [1.0, 1.5, 2.0, 2.5, 3.0],    female: [0.75, 1.0, 1.5, 1.75, 2.25] },
  ohp:      { male: [0.35, 0.55, 0.75, 1.0, 1.25], female: [0.2, 0.35, 0.5, 0.65, 0.8] },
};
const LEVELS = ["Beginner", "Novice", "Intermediate", "Advanced", "Elite"];

function getLevel(multiple: number, standards: number[]) {
  for (let i = standards.length - 1; i >= 0; i--) {
    if (multiple >= standards[i]) return LEVELS[i];
  }
  return "Below Beginner";
}

function C({ onStateChange, initialParams }: Props) {
  const [bw, setBw] = useState<number | null>(() => Number(initialParams?.bw ?? 80));
  const [squat, setSquat] = useState<number | null>(() => Number(initialParams?.squat ?? 100));
  const [bench, setBench] = useState<number | null>(() => Number(initialParams?.bench ?? 80));
  const [deadlift, setDeadlift] = useState<number | null>(() => Number(initialParams?.deadlift ?? 120));
  const [ohp, setOhp] = useState<number | null>(() => Number(initialParams?.ohp ?? 50));
  const [sex, setSex] = useState<string>(() => String(initialParams?.sex ?? "male"));

  const result = useMemo(() => {
    const b = bw ?? 0;
    if (b <= 0) return null;
    const key = sex === "male" ? "male" : "female";
    const safe = (v: number | null) => (v ?? 0) / b;
    return {
      squat:    { mult: safe(squat),    level: getLevel(safe(squat),    STANDARDS.squat[key]) },
      bench:    { mult: safe(bench),    level: getLevel(safe(bench),    STANDARDS.bench[key]) },
      deadlift: { mult: safe(deadlift), level: getLevel(safe(deadlift), STANDARDS.deadlift[key]) },
      ohp:      { mult: safe(ohp),      level: getLevel(safe(ohp),      STANDARDS.ohp[key]) },
    };
  }, [bw, squat, bench, deadlift, ohp, sex]);

  const shareParams: ShareParams = { bw: bw ?? 0, squat: squat ?? 0, bench: bench ?? 0, deadlift: deadlift ?? 0, ohp: ohp ?? 0, sex };
  useEffect(() => { if (onStateChange) onStateChange(shareParams); }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="Sex" value={sex} onChange={setSex} options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]} />
        <NumberField label="Bodyweight" value={bw} onChange={setBw} step={0.5} suffix="kg" />
        <NumberField label="Squat 1RM" value={squat} onChange={setSquat} step={2.5} suffix="kg" />
        <NumberField label="Bench 1RM" value={bench} onChange={setBench} step={2.5} suffix="kg" />
        <NumberField label="Deadlift 1RM" value={deadlift} onChange={setDeadlift} step={2.5} suffix="kg" />
        <NumberField label="Overhead Press 1RM" value={ohp} onChange={setOhp} step={2.5} suffix="kg" />
      </Grid>
      <Hr />
      {result ? (
        <div style={{ display: "grid", gap: 8 }}>
          <Result label="Squat" value={result.squat.level + " (" + fmt(result.squat.mult, 2) + "x BW)"} />
          <Result label="Bench" value={result.bench.level + " (" + fmt(result.bench.mult, 2) + "x BW)"} />
          <Result label="Deadlift" value={result.deadlift.level + " (" + fmt(result.deadlift.mult, 2) + "x BW)"} />
          <Result label="Overhead Press" value={result.ohp.level + " (" + fmt(result.ohp.mult, 2) + "x BW)"} />
        </div>
      ) : (
        <div style={{ color: "#888", fontSize: 14 }}>Enter your bodyweight and lifts.</div>
      )}
      <SmallNote>Levels: Beginner to Elite, based on bodyweight multiples.</SmallNote>
    </Card>
  );
}

export const strengthStandards: CalculatorModule = {
  meta: {
    slug: "strength-standards",
    title: "Strength Standards",
    category: "Health",
    description: "See how your squat, bench, deadlift, and OHP compare to strength standards.",
    keywords: ["strength standards", "squat", "bench press", "deadlift", "overhead press", "powerlifting", "beginner", "intermediate", "advanced", "elite", "bodyweight ratio", "strength level"],
  },
  Calculator: C,
};