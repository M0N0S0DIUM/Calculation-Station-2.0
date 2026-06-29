"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface StrikeWaterCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: StrikeWaterCalculatorProps) {
  const [grainWeight, setGrainWeight] = useState<number | null>(() => {
    if (initialParams?.grainWeight !== undefined) return Number(initialParams.grainWeight);
    return 10;
  });
  const [grainTemp, setGrainTemp] = useState<number | null>(() => {
    if (initialParams?.grainTemp !== undefined) return Number(initialParams.grainTemp);
    return 70;
  });
  const [targetMashTemp, setTargetMashTemp] = useState<number | null>(() => {
    if (initialParams?.targetMashTemp !== undefined) return Number(initialParams.targetMashTemp);
    return 152;
  });
  const [waterVolume, setWaterVolume] = useState<number | null>(() => {
    if (initialParams?.waterVolume !== undefined) return Number(initialParams.waterVolume);
    return 3.5;
  });
  const [equipLoss, setEquipLoss] = useState<number | null>(() => {
    if (initialParams?.equipLoss !== undefined) return Number(initialParams.equipLoss);
    return 0.5;
  });
  const [unit, setUnit] = useState<string>(() => {
    if (initialParams?.unit !== undefined) return String(initialParams.unit);
    return "us";
  });

  const r = useMemo(() => {
    const gw = unit === "metric" ? (grainWeight ?? 10) * 2.20462 : (grainWeight ?? 10);
    const gt = grainTemp ?? 70;
    const tm = targetMashTemp ?? 152;
    const wv = unit === "metric" ? (waterVolume ?? 3.5) * 0.264172 : (waterVolume ?? 3.5);
    const el = unit === "metric" ? (equipLoss ?? 0.5) * 0.264172 : (equipLoss ?? 0.5);

    const ratio = (wv * 4) / gw;
    const strikeTemp = (0.2 / ratio) * (tm - gt) + tm;

    const grainAbsorption = gw * 0.12;
    const totalWater = wv + el + grainAbsorption;

    return {
      strikeTemp,
      ratio,
      totalWater,
      grainAbsorption,
    };
  }, [grainWeight, grainTemp, targetMashTemp, waterVolume, equipLoss, unit]);

  const shareParams: ShareParams = {
    grainWeight: grainWeight ?? 10,
    grainTemp: grainTemp ?? 70,
    targetMashTemp: targetMashTemp ?? 152,
    waterVolume: waterVolume ?? 3.5,
    equipLoss: equipLoss ?? 0.5,
    unit,
  };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  const volUnit = unit === "metric" ? "L" : "gal";
  const wtUnit = unit === "metric" ? "kg" : "lb";
  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <Card>
      <Grid>
        <SelectField
          label="Units"
          value={unit}
          onChange={setUnit}
          options={[
            { value: "us", label: "US (lb, gal, °F)" },
            { value: "metric", label: "Metric (kg, L, °C)" },
          ]}
        />
        <NumberField
          label={`Grain Weight (${wtUnit})`}
          value={grainWeight}
          onChange={setGrainWeight}
          step={unit === "metric" ? 0.5 : 1}
          min={0.5}
          max={unit === "metric" ? 50 : 100}
        />
        <NumberField
          label={`Grain Temp (${tempUnit})`}
          value={grainTemp}
          onChange={setGrainTemp}
          step={1}
          min={unit === "metric" ? 10 : 50}
          max={unit === "metric" ? 30 : 90}
        />
        <NumberField
          label={`Target Mash Temp (${tempUnit})`}
          value={targetMashTemp}
          onChange={setTargetMashTemp}
          step={1}
          min={unit === "metric" ? 60 : 140}
          max={unit === "metric" ? 75 : 165}
        />
        <NumberField
          label={`Mash Water Volume (${volUnit})`}
          value={waterVolume}
          onChange={setWaterVolume}
          step={unit === "metric" ? 1 : 0.25}
          min={unit === "metric" ? 5 : 1}
          max={unit === "metric" ? 100 : 30}
        />
        <NumberField
          label={`Equipment Loss (${volUnit})`}
          value={equipLoss}
          onChange={setEquipLoss}
          step={unit === "metric" ? 0.5 : 0.1}
          min={0}
          max={unit === "metric" ? 10 : 3}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Strike Water Temp" value={`${fmt(r.strikeTemp)}${tempUnit}`} copyValue={`${fmt(r.strikeTemp)}${tempUnit}`} />
        <Result label="Water-to-Grain Ratio" value={`${fmt(r.ratio)} qt/lb`} />
        <Result label="Total Water Needed" value={`${fmt(r.totalWater)} ${volUnit}`} />
        <Result label="Grain Absorption" value={`${fmt(r.grainAbsorption)} ${volUnit}`} />
      </div>
      <SmallNote>
        Formula: Tw = (0.2/r)×(T2−T1) + T2. Assumes 0.2 qt/lb grain thermal mass.
        Heat equipment separately if needed. Mash thickness ~1.25–2 qt/lb typical.
      </SmallNote>
    </Card>
  );
}

export const brewStrikeWater: CalculatorModule = {
  meta: {
    slug: "brew-strike-water",
    title: "Strike Water Calculator",
    category: "Brewing",
    description: "Calculate strike water temperature and volume for infusion mashing. Accounts for grain weight, temperature, equipment loss, and absorption.",
    keywords: ["strike water", "mash temperature", "infusion mash", "strike temp calculator", "brew strike water", "mash water calculator", "homebrew mash"],
  },
  Calculator: C,
};