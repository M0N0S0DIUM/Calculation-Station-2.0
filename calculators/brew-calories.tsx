"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BeerCaloriesCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BeerCaloriesCalculatorProps) {
  const [og, setOg] = useState<number | null>(() => {
    if (initialParams?.og !== undefined) return Number(initialParams.og);
    return 1.050;
  });
  const [fg, setFg] = useState<number | null>(() => {
    if (initialParams?.fg !== undefined) return Number(initialParams.fg);
    return 1.012;
  });
  const [abv, setAbv] = useState<number | null>(() => {
    if (initialParams?.abv !== undefined) return Number(initialParams.abv);
    return 5.0;
  });
  const [serving, setServing] = useState<number | null>(() => {
    if (initialParams?.serving !== undefined) return Number(initialParams.serving);
    return 12;
  });
  const [servingUnit, setServingUnit] = useState<string>(() => {
    if (initialParams?.servingUnit !== undefined) return String(initialParams.servingUnit);
    return "oz";
  });
  const [mode, setMode] = useState<string>(() => {
    if (initialParams?.mode !== undefined) return String(initialParams.mode);
    return "ogfg";
  });

  const r = useMemo(() => {
    const ogVal = og ?? 1.050;
    const fgVal = fg ?? 1.012;
    const abvVal = abv ?? 5.0;
    const serv = serving ?? 12;
    const servMl = servingUnit === "ml" ? serv : serv * 29.5735;

    let calcAbv = abvVal;
    let calcFg = fgVal;
    let calcOg = ogVal;

    if (mode === "ogfg") {
      calcAbv = (ogVal - fgVal) * 131.25;
    } else {
      calcFg = ogVal - (abvVal / 131.25);
    }

    // Calories from alcohol: ABV% * 1.6 * serving_oz
    // Calories from carbs: (FG - 1) * 3500 * serving_oz (approximate)
    const alcoholCal = calcAbv * 1.6 * (servingUnit === "ml" ? serv / 29.5735 : serv);
    const carbCal = (calcFg - 1) * 3500 * (servingUnit === "ml" ? serv / 29.5735 : serv);
    const totalCal = alcoholCal + carbCal;

    // Per 100ml
    const calPer100ml = totalCal / (servMl / 100);

    return {
      abv: calcAbv,
      fg: calcFg,
      og: calcOg,
      alcoholCal,
      carbCal,
      totalCal,
      calPer100ml,
      servMl,
    };
  }, [og, fg, abv, serving, servingUnit, mode]);

  const shareParams: ShareParams = {
    og: og ?? 1.050,
    fg: fg ?? 1.012,
    abv: abv ?? 5.0,
    serving: serving ?? 12,
    servingUnit,
    mode,
  };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField
          label="Input Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "ogfg", label: "OG + FG" },
            { value: "abv", label: "ABV + OG" },
          ]}
        />
        <NumberField
          label="Original Gravity"
          value={og}
          onChange={setOg}
          step={0.001}
          min={1.020}
          max={1.120}
          suffix="SG"
        />
        {mode === "ogfg" ? (
          <NumberField
            label="Final Gravity"
            value={fg}
            onChange={setFg}
            step={0.001}
            min={0.990}
            max={1.040}
            suffix="SG"
          />
        ) : (
          <NumberField
            label="ABV"
            value={abv}
            onChange={setAbv}
            step={0.1}
            min={1}
            max={15}
            suffix="%"
          />
        )}
        <NumberField
          label="Serving Size"
          value={serving}
          onChange={setServing}
          step={1}
          min={1}
          max={500}
        />
        <SelectField
          label="Serving Unit"
          value={servingUnit}
          onChange={setServingUnit}
          options={[{ value: "oz", label: "Ounces (oz)" }, { value: "ml", label: "Milliliters (ml)" }]}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="ABV" value={`${fmt(r.abv)}%`} />
        <Result label="Alcohol Calories" value={fmt(r.alcoholCal)} />
        <Result label="Carb Calories" value={fmt(r.carbCal)} />
        <Result label="Total Calories" value={fmt(r.totalCal)} copyValue={fmt(r.totalCal)} />
        <Result label="Calories / 100ml" value={fmt(r.calPer100ml)} />
      </div>
      <SmallNote>
        Alcohol: 7 cal/g × ABV% × 1.6 = ~cal/oz. Carbs: (FG−1) × 3500 × oz (approximate residual sugar).
        Actual values vary — this is an estimate. For labeling, lab analysis is required.
      </SmallNote>
    </Card>
  );
}

export const brewCalories: CalculatorModule = {
  meta: {
    slug: "brew-calories",
    title: "Beer Calories Calculator",
    category: "Brewing",
    description: "Estimate beer calories from OG/FG or ABV. Breaks down alcohol vs carb calories. Supports oz/ml serving sizes.",
    keywords: ["beer calories", "calorie calculator beer", "abv calories", "homebrew calories", "alcohol calories", "carb calories beer", "beer nutrition"],
  },
  Calculator: C,
};