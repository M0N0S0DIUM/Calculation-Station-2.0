"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface GrainBillCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: GrainBillCalculatorProps) {
  const [batchVolume, setBatchVolume] = useState<number | null>(() => {
    if (initialParams?.batchVolume !== undefined) return Number(initialParams.batchVolume);
    return 5;
  });
  const [batchUnit, setBatchUnit] = useState<string>(() => {
    if (initialParams?.batchUnit !== undefined) return String(initialParams.batchUnit);
    return "gal";
  });
  const [og, setOg] = useState<number | null>(() => {
    if (initialParams?.og !== undefined) return Number(initialParams.og);
    return 1.050;
  });
  const [efficiency, setEfficiency] = useState<number | null>(() => {
    if (initialParams?.efficiency !== undefined) return Number(initialParams.efficiency);
    return 75;
  });
  const [unit, setUnit] = useState<string>(() => {
    if (initialParams?.unit !== undefined) return String(initialParams.unit);
    return "lb";
  });

  // Default grain composition for a typical pale ale
  const [grains] = useState<Array<{name: string; ppg: number; color: number; pct: number}>>([
    { name: "2-Row Pale Malt", ppg: 37, color: 1.8, pct: 85 },
    { name: "Crystal 40L", ppg: 34, color: 40, pct: 10 },
    { name: "Caramel 10L", ppg: 35, color: 10, pct: 5 },
  ]);

  const r = useMemo(() => {
    const volGal = batchUnit === "L" ? (batchVolume ?? 5) / 3.78541 : (batchVolume ?? 5);
    const targetOg = og ?? 1.050;
    const gravityPoints = (targetOg - 1) * 1000;
    const eff = (efficiency ?? 75) / 100;

    const totalPoints = gravityPoints * volGal;
    const avgPpg = grains.reduce((sum, g) => sum + g.ppg * (g.pct / 100), 0);
    const totalGrainLb = totalPoints / (avgPpg * eff);

    const grainWeights = grains.map(g => ({
      name: g.name,
      weightLb: totalGrainLb * (g.pct / 100),
      weightKg: totalGrainLb * (g.pct / 100) * 0.453592,
      colorContribution: g.color * (g.pct / 100),
      pct: g.pct,
    }));

    const mcu = grainWeights.reduce((sum, g) => sum + g.colorContribution * (g.weightLb / volGal), 0);
    const srm = 1.4922 * Math.pow(mcu, 0.6859);

    return {
      totalGrainLb,
      totalGrainKg: totalGrainLb * 0.453592,
      grainWeights,
      avgPpg,
      mcu,
      srm,
    };
  }, [batchVolume, batchUnit, og, efficiency, unit]);

  const shareParams: ShareParams = {
    batchVolume: batchVolume ?? 5,
    batchUnit,
    og: og ?? 1.050,
    efficiency: efficiency ?? 75,
    unit,
  };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField
          label="Batch Volume"
          value={batchVolume}
          onChange={setBatchVolume}
          step={0.5}
          min={0.5}
          max={50}
        />
        <SelectField
          label="Volume Unit"
          value={batchUnit}
          onChange={setBatchUnit}
          options={[{ value: "gal", label: "Gallons" }, { value: "L", label: "Liters" }]}
        />
        <NumberField
          label="Target OG"
          value={og}
          onChange={setOg}
          step={0.001}
          min={1.020}
          max={1.120}
          suffix="SG"
        />
        <NumberField
          label="Brewhouse Efficiency"
          value={efficiency}
          onChange={setEfficiency}
          step={1}
          min={50}
          max={90}
          suffix="%"
        />
        <SelectField
          label="Output Unit"
          value={unit}
          onChange={setUnit}
          options={[{ value: "lb", label: "Pounds" }, { value: "kg", label: "Kilograms" }]}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Total Grain" value={unit === "lb" ? `${fmt(r.totalGrainLb)} lb` : `${fmt(r.totalGrainKg)} kg`} copyValue={unit === "lb" ? `${fmt(r.totalGrainLb)} lb` : `${fmt(r.totalGrainKg)} kg`} />
        <Result label="Avg PPG" value={fmt(r.avgPpg)} />
        <Result label="Est. SRM (Morey)" value={fmt(r.srm, 1)} />
        <Result label="MCU" value={fmt(r.mcu, 1)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <strong style={{ display: "block", marginBottom: 4 }}>Grain Breakdown (fixed: 85% Pale, 10% Crystal 40L, 5% Caramel 10L)</strong>
        {r.grainWeights.map((g, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8, fontSize: "0.85rem", color: "#a3a3a3" }}>
            <span>{g.name}</span>
            <span>{unit === "lb" ? `${fmt(g.weightLb)} lb` : `${fmt(g.weightKg)} kg`}</span>
            <span>{fmt(g.pct)}%</span>
          </div>
        ))}
      </div>
      <SmallNote>
        Uses fixed Pale Ale recipe (85% 2-Row, 10% Crystal 40L, 5% Caramel 10L).
        For custom recipes, use a full recipe builder. PPG = points per pound per gallon.
        SRM via Morey formula: 1.4922 × MCU^0.6859. MCU = Σ(color × lb) / volume(gal).
      </SmallNote>
    </Card>
  );
}

export const brewGrainBill: CalculatorModule = {
  meta: {
    slug: "brew-grain-bill",
    title: "Grain Bill Calculator",
    category: "Brewing",
    description: "Calculate total grain weight and per-grain amounts for a target OG, volume, and efficiency. Includes SRM color estimate via Morey formula.",
    keywords: ["grain bill calculator", "grain weight calculator", "brew grain calculator", "malt calculator", "og calculator", "brewhouse efficiency", "srm calculator"],
  },
  Calculator: C,
};