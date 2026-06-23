"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";

interface Props {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

const PLATES_KG = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25];
const PLATES_LB = [45, 35, 25, 10, 5, 2.5, 1.25];

function calcPlates(targetWeight: number, barWeight: number, plates: number[]) {
  let remaining = (targetWeight - barWeight) / 2;
  const result: { plate: number; count: number }[] = [];
  for (const p of plates) {
    if (remaining <= 0) break;
    const count = Math.floor(remaining / p);
    if (count > 0) {
      result.push({ plate: p, count });
      remaining -= count * p;
    }
  }
  return { plates: result, remainder: remaining };
}

function C({ onStateChange, initialParams }: Props) {
  const [target, setTarget] = useState<number | null>(() => Number(initialParams?.target ?? 100));
  const [unit, setUnit] = useState<string>(() => String(initialParams?.unit ?? "kg"));

  const barWeight = unit === "kg" ? 20 : 45;
  const availablePlates = unit === "kg" ? PLATES_KG : PLATES_LB;

  const result = useMemo(() => {
    const t = target ?? 0;
    if (t <= barWeight) return null;
    return calcPlates(t, barWeight, availablePlates);
  }, [target, unit, barWeight, availablePlates]);

  const shareParams: ShareParams = { target: target ?? 0, unit };
  useEffect(() => { if (onStateChange) onStateChange(shareParams); }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="Unit" value={unit} onChange={setUnit} options={[{value:"kg",label:"kg"},{value:"lb",label:"lb"}]} />
        <NumberField label="Target weight" value={target} onChange={setTarget} step={2.5} suffix={unit} />
      </Grid>
      <Hr />
      {!result ? (
        <div style={{ color: "#888", fontSize: 14 }}>Enter a weight above bar weight ({barWeight} {unit}).</div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {result.plates.map(({ plate, count }) => (
            <Result key={plate} label={plate + " " + unit + " plates"} value={"x " + count + " per side"} />
          ))}
          {result.remainder > 0.01 && (
            <Result label="Unloaded" value={(result.remainder * 2).toFixed(2) + " " + unit} />
          )}
        </div>
      )}
      <SmallNote>Standard bar: {barWeight} {unit}. Shows plates per side.</SmallNote>
    </Card>
  );
}

export const plateCalculator: CalculatorModule = {
  meta: {
    slug: "plate-calculator",
    title: "Plate Calculator",
    category: "Health",
    description: "Find which weight plates to load on a barbell.",
    keywords: ["plate calculator", "barbell", "plates", "weight", "powerlifting", "gym", "squat", "bench", "deadlift", "loading", "kg", "lb"],
  },
  Calculator: C,
};