"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface PrimingCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: PrimingCalculatorProps) {
  const [volume, setVolume] = useState<number | null>(() => {
    if (initialParams?.volume !== undefined) return Number(initialParams.volume);
    return 5;
  });
  const [volumeUnit, setVolumeUnit] = useState<string>(() => {
    if (initialParams?.volumeUnit !== undefined) return String(initialParams.volumeUnit);
    return "gal";
  });
  const [temp, setTemp] = useState<number | null>(() => {
    if (initialParams?.temp !== undefined) return Number(initialParams.temp);
    return 68;
  });
  const [co2, setCo2] = useState<number | null>(() => {
    if (initialParams?.co2 !== undefined) return Number(initialParams.co2);
    return 2.4;
  });
  const [sugarType, setSugarType] = useState<string>(() => {
    if (initialParams?.sugarType !== undefined) return String(initialParams.sugarType);
    return "corn";
  });

  const r = useMemo(() => {
    const volGal = volumeUnit === "L" ? (volume ?? 5) / 3.78541 : (volume ?? 5);
    const tempF = temp ?? 68;
    const co2Vol = co2 ?? 2.4;

    // CO2 already in beer after fermentation (based on temp)
    // Using formula from "Brewing" by Michael Lewis: CO2 = 3.0378 - 0.050062*T + 0.00026555*T^2
    const co2Residual = 3.0378 - 0.050062 * tempF + 0.00026555 * tempF * tempF;

    // CO2 needed from priming
    const co2Needed = co2Vol - co2Residual;

    // Sugar weights (oz per gallon per vol CO2)
    const sugarFactors: Record<string, number> = {
      corn: 0.46,      // Corn sugar (dextrose)
      table: 0.41,     // Table sugar (sucrose)
      dme: 0.56,       // Dry malt extract
      honey: 0.36,     // Honey
      maple: 0.38,     // Maple syrup
    };

    const factor = sugarFactors[sugarType] ?? 0.46;
    const ozPerGal = co2Needed * factor;
    const totalOz = ozPerGal * volGal;
    const totalGrams = totalOz * 28.3495;

    return {
      co2Residual: Math.max(0, co2Residual),
      co2Needed: Math.max(0, co2Needed),
      ozPerGal,
      totalOz,
      totalGrams,
      sugarType,
    };
  }, [volume, volumeUnit, temp, co2, sugarType]);

  const shareParams: ShareParams = {
    volume: volume ?? 5,
    volumeUnit,
    temp: temp ?? 68,
    co2: co2 ?? 2.4,
    sugarType,
  };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField
          label="Batch Volume"
          value={volume}
          onChange={setVolume}
          step={0.5}
          min={0.5}
          max={100}
        />
        <SelectField
          label="Volume Unit"
          value={volumeUnit}
          onChange={setVolumeUnit}
          options={[
            { value: "gal", label: "Gallons" },
            { value: "L", label: "Liters" },
          ]}
        />
        <NumberField
          label="Fermentation Temp"
          value={temp}
          onChange={setTemp}
          step={1}
          min={32}
          max={90}
          suffix="°F"
        />
        <NumberField
          label="Target CO₂ Volume"
          value={co2}
          onChange={setCo2}
          step={0.1}
          min={1.5}
          max={4.5}
          suffix="vol"
        />
        <SelectField
          label="Priming Sugar"
          value={sugarType}
          onChange={setSugarType}
          options={[
            { value: "corn", label: "Corn Sugar (Dextrose)" },
            { value: "table", label: "Table Sugar (Sucrose)" },
            { value: "dme", label: "Dry Malt Extract (DME)" },
            { value: "honey", label: "Honey" },
            { value: "maple", label: "Maple Syrup" },
          ]}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Residual CO₂" value={`${fmt(r.co2Residual)} vol`} />
        <Result label="CO₂ Needed from Priming" value={`${fmt(r.co2Needed)} vol`} />
        <Result label="Sugar per Gallon" value={`${fmt(r.ozPerGal)} oz/gal`} />
        <Result label="Total Sugar Needed" value={`${fmt(r.totalOz)} oz (${fmt(r.totalGrams)} g)`} copyValue={`${fmt(r.totalGrams)} g ${r.sugarType}`} />
      </div>
      <SmallNote>
        Residual CO₂ calculated from fermentation temperature. Target CO₂: 2.4–2.7 vol for most ales, 2.2–2.6 for lagers, 3.0+ for Belgians/Hefeweizens.
        Weigh sugar for accuracy — volume measures vary.
      </SmallNote>
    </Card>
  );
}

export const brewPriming: CalculatorModule = {
  meta: {
    slug: "brew-priming",
    title: "Priming Sugar Calculator",
    category: "Brewing",
    description: "Calculate priming sugar (corn sugar, table sugar, DME, honey, maple) for bottle conditioning based on batch volume, temperature, and target carbonation.",
    keywords: ["priming sugar", "bottle conditioning", "carbonation", "corn sugar", "dextrose", "priming calculator", "homebrew priming"],
  },
  Calculator: C,
};