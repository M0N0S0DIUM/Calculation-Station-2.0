"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface AttenuationCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: AttenuationCalculatorProps) {
  const [og, setOg] = useState<number | null>(() => {
    if (initialParams?.og !== undefined) return Number(initialParams.og);
    return 1.050;
  });
  const [fg, setFg] = useState<number | null>(() => {
    if (initialParams?.fg !== undefined) return Number(initialParams.fg);
    return 1.012;
  });
  const [yeastAtten, setYeastAtten] = useState<number | null>(() => {
    if (initialParams?.yeastAtten !== undefined) return Number(initialParams.yeastAtten);
    return 75;
  });
  const [mode, setMode] = useState<string>(() => {
    if (initialParams?.mode !== undefined) return String(initialParams.mode);
    return "actual";
  });

  const r = useMemo(() => {
    const ogVal = og ?? 1.050;
    const fgVal = fg ?? 1.012;
    const yeastAttenVal = yeastAtten ?? 75;

    const apparentAtten = ((ogVal - fgVal) / (ogVal - 1)) * 100;
    const realAtten = apparentAtten * 0.819;

    const expectedFg = 1 + (ogVal - 1) * (1 - yeastAttenVal / 100);
    const expectedAbv = (ogVal - expectedFg) * 131.25;
    const expectedApparentAtten = yeastAttenVal;
    const expectedRealAtten = yeastAttenVal * 0.819;

    return {
      apparentAtten,
      realAtten,
      expectedFg,
      expectedAbv,
      expectedApparentAtten,
      expectedRealAtten,
    };
  }, [og, fg, yeastAtten]);

  const shareParams: ShareParams = {
    og: og ?? 1.050,
    fg: fg ?? 1.012,
    yeastAtten: yeastAtten ?? 75,
    mode,
  };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField
          label="Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "actual", label: "Actual Attenuation (from OG/FG)" },
            { value: "predict", label: "Predict FG from Yeast Attenuation" },
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
        {mode === "actual" ? (
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
            label="Yeast Attenuation"
            value={yeastAtten}
            onChange={setYeastAtten}
            step={1}
            min={50}
            max={90}
            suffix="%"
          />
        )}
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        {mode === "actual" ? (
          <>
            <Result label="Apparent Attenuation" value={`${fmt(r.apparentAtten)}%`} copyValue={`${fmt(r.apparentAtten)}%`} />
            <Result label="Real Attenuation" value={`${fmt(r.realAtten)}%`} />
            <Result label="ABV (standard)" value={`${fmt(((og ?? 1.050) - (fg ?? 1.012)) * 131.25)}%`} />
          </>
        ) : (
          <>
            <Result label="Predicted FG" value={fmt(r.expectedFg, 4)} copyValue={fmt(r.expectedFg, 4)} />
            <Result label="Predicted ABV" value={`${fmt(r.expectedAbv)}%`} />
            <Result label="Expected Apparent Atten." value={`${fmt(r.expectedApparentAtten)}%`} />
            <Result label="Expected Real Atten." value={`${fmt(r.expectedRealAtten)}%`} />
          </>
        )}
      </div>
      <SmallNote>
        Apparent attenuation = (OG−FG)/(OG−1)×100. Real attenuation ≈ apparent × 0.819 (accounts for alcohol's lower density).
        Yeast attenuation % is typically 70–80% for ale, 65–75% for lager. Higher = drier beer.
      </SmallNote>
    </Card>
  );
}

export const brewAttenuation: CalculatorModule = {
  meta: {
    slug: "brew-attenuation",
    title: "Attenuation Calculator",
    category: "Brewing",
    description: "Calculate apparent and real attenuation from OG/FG, or predict FG from yeast attenuation rating. Includes ABV estimates.",
    keywords: ["attenuation calculator", "apparent attenuation", "real attenuation", "yeast attenuation", "fg prediction", "apparent vs real attenuation", "brew attenuation"],
  },
  Calculator: C,
};