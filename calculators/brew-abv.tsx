"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface ABVCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: ABVCalculatorProps) {
  const [og, setOg] = useState<number | null>(() => {
    if (initialParams?.og !== undefined) return Number(initialParams.og);
    return 1.050;
  });
  const [fg, setFg] = useState<number | null>(() => {
    if (initialParams?.fg !== undefined) return Number(initialParams.fg);
    return 1.012;
  });
  const [useAdvanced, setUseAdvanced] = useState(false);

  const r = useMemo(() => {
    const ogVal = og ?? 1.050;
    const fgVal = fg ?? 1.012;

    // Standard formula: ABV = (OG - FG) * 131.25
    const abvStandard = (ogVal - fgVal) * 131.25;

    // Advanced formula (more accurate for higher ABV): ABV = 76.08 * (OG - FG) / (1.775 - OG) * (FG / 0.794)
    const abvAdvanced = 76.08 * (ogVal - fgVal) / (1.775 - ogVal) * (fgVal / 0.794);

    // Apparent attenuation
    const apparentAttenuation = ((ogVal - fgVal) / (ogVal - 1)) * 100;

    // Real attenuation (using advanced formula)
    const realAttenuation = ((ogVal - fgVal) / (ogVal - 1)) * 100 * 0.819;

    // Calories per 12oz (approximate)
    const caloriesPer12oz = abvStandard * 1.6 * 12 + (fgVal - 1) * 3500;

    return {
      abvStandard,
      abvAdvanced,
      apparentAttenuation,
      realAttenuation,
      caloriesPer12oz,
    };
  }, [og, fg]);

  const shareParams: ShareParams = { og: og ?? 1.050, fg: fg ?? 1.012 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField
          label="Original Gravity (OG)"
          value={og}
          onChange={setOg}
          step={0.001}
          min={1.000}
          max={1.200}
          suffix="SG"
        />
        <NumberField
          label="Final Gravity (FG)"
          value={fg}
          onChange={setFg}
          step={0.001}
          min={0.990}
          max={1.100}
          suffix="SG"
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="ABV (Standard)" value={`${fmt(r.abvStandard)}%`} />
        <Result label="ABV (Advanced)" value={`${fmt(r.abvAdvanced)}%`} copyValue={`${fmt(r.abvAdvanced)}%`} />
        <Result label="Apparent Attenuation" value={`${fmt(r.apparentAttenuation)}%`} />
        <Result label="Real Attenuation" value={`${fmt(r.realAttenuation)}%`} />
        <Result label="~Calories / 12 oz" value={fmt(r.caloriesPer12oz)} />
      </div>
      <SmallNote>
        Standard formula: (OG − FG) × 131.25. Advanced formula accounts for alcohol's lower density.
        For high-gravity beers ({'>'}8% ABV), the advanced formula is more accurate.
      </SmallNote>
    </Card>
  );
}

export const brewAbv: CalculatorModule = {
  meta: {
    slug: "brew-abv",
    title: "ABV Calculator",
    category: "Brewing",
    description: "Calculate alcohol by volume from original and final gravity. Includes standard and advanced formulas.",
    keywords: ["abv", "alcohol by volume", "original gravity", "final gravity", "og fg calculator", "beer abv", "homebrew abv"],
  },
  Calculator: C,
};