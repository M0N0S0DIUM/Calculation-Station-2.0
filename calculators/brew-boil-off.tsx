"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BoilOffCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BoilOffCalculatorProps) {
  const [preBoilVol, setPreBoilVol] = useState<number | null>(() => {
    if (initialParams?.preBoilVol !== undefined) return Number(initialParams.preBoilVol);
    return 7;
  });
  const [postBoilVol, setPostBoilVol] = useState<number | null>(() => {
    if (initialParams?.postBoilVol !== undefined) return Number(initialParams.postBoilVol);
    return 5.5;
  });
  const [boilTime, setBoilTime] = useState<number | null>(() => {
    if (initialParams?.boilTime !== undefined) return Number(initialParams.boilTime);
    return 60;
  });
  const [unit, setUnit] = useState<string>(() => {
    if (initialParams?.unit !== undefined) return String(initialParams.unit);
    return "gal";
  });
  const [mode, setMode] = useState<string>(() => {
    if (initialParams?.mode !== undefined) return String(initialParams.mode);
    return "rate";
  });

  const r = useMemo(() => {
    const pre = preBoilVol ?? 7;
    const post = postBoilVol ?? 5.5;
    const time = boilTime ?? 60;
    const u = unit;

    let boilOffRate = 0;
    let boilOffTotal = 0;
    let preBoilNeeded = 0;

    if (mode === "rate") {
      // Calculate rate from volumes
      boilOffTotal = pre - post;
      boilOffRate = (boilOffTotal / time) * 60; // per hour
      preBoilNeeded = pre;
    } else {
      // Calculate pre-boil volume from rate
      const ratePerHour = pre; // using preBoilVol field as rate/hr
      boilOffRate = ratePerHour;
      boilOffTotal = (ratePerHour / 60) * time;
      preBoilNeeded = post + boilOffTotal;
    }

    const evapPct = preBoilNeeded > 0 ? (boilOffTotal / preBoilNeeded) * 100 : 0;

    return {
      boilOffRate,
      boilOffTotal,
      preBoilNeeded,
      evapPct,
    };
  }, [preBoilVol, postBoilVol, boilTime, unit, mode]);

  const shareParams: ShareParams = {
    preBoilVol: preBoilVol ?? 7,
    postBoilVol: postBoilVol ?? 5.5,
    boilTime: boilTime ?? 60,
    unit,
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
            { value: "rate", label: "Calculate Rate (from volumes)" },
            { value: "preboil", label: "Calculate Pre-Boil Vol (from rate)" },
          ]}
        />
        <SelectField
          label="Unit"
          value={unit}
          onChange={setUnit}
          options={[{ value: "gal", label: "Gallons" }, { value: "L", label: "Liters" }]}
        />
        {mode === "rate" ? (
          <>
            <NumberField
              label="Pre-Boil Volume"
              value={preBoilVol}
              onChange={setPreBoilVol}
              step={0.25}
              min={1}
              max={50}
              suffix={unit}
            />
            <NumberField
              label="Post-Boil Volume"
              value={postBoilVol}
              onChange={setPostBoilVol}
              step={0.25}
              min={0.5}
              max={50}
              suffix={unit}
            />
          </>
        ) : (
          <>
            <NumberField
              label="Boil-off Rate"
              value={preBoilVol}
              onChange={setPreBoilVol}
              step={0.25}
              min={0.5}
              max={5}
              suffix={`${unit}/hr`}
            />
            <NumberField
              label="Target Post-Boil Volume"
              value={postBoilVol}
              onChange={setPostBoilVol}
              step={0.25}
              min={0.5}
              max={50}
              suffix={unit}
            />
          </>
        )}
        <NumberField
          label="Boil Time"
          value={boilTime}
          onChange={setBoilTime}
          step={5}
          min={15}
          max={180}
          suffix="min"
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Boil-off Rate" value={`${fmt(r.boilOffRate)} ${unit}/hr`} copyValue={`${fmt(r.boilOffRate)} ${unit}/hr`} />
        <Result label="Total Boil-off" value={`${fmt(r.boilOffTotal)} ${unit}`} />
        <Result label="Required Pre-Boil Volume" value={`${fmt(r.preBoilNeeded)} ${unit}`} />
        <Result label="Evaporation %" value={`${fmt(r.evapPct)}%`} />
      </div>
      <SmallNote>
        Typical boil-off: 0.75–1.5 gal/hr (3–6 L/hr) depending on kettle geometry, vigor, altitude.
        Wide kettles boil off more. Factor in hop absorption (~0.1 gal/oz) and trub loss.
        Measure your actual rate for best results.
      </SmallNote>
    </Card>
  );
}

export const brewBoilOff: CalculatorModule = {
  meta: {
    slug: "brew-boil-off",
    title: "Boil-off Calculator",
    category: "Brewing",
    description: "Calculate boil-off rate, total evaporation, and required pre-boil volume. Work forward from volumes or backward from target rate.",
    keywords: ["boil off calculator", "evaporation rate", "pre boil volume", "boil off rate", "homebrew boil off", "kettle evaporation"],
  },
  Calculator: C,
};