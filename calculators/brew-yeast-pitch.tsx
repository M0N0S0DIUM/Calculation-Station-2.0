"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface YeastPitchCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: YeastPitchCalculatorProps) {
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
  const [yeastType, setYeastType] = useState<string>(() => {
    if (initialParams?.yeastType !== undefined) return String(initialParams.yeastType);
    return "ale";
  });
  const [viability, setViability] = useState<number | null>(() => {
    if (initialParams?.viability !== undefined) return Number(initialParams.viability);
    return 100;
  });
  const [starter, setStarter] = useState<boolean>(() => {
    if (initialParams?.starter !== undefined) return Boolean(initialParams.starter);
    return false;
  });
  const [starterVol, setStarterVol] = useState<number | null>(() => {
    if (initialParams?.starterVol !== undefined) return Number(initialParams.starterVol);
    return 1;
  });
  const [starterUnit, setStarterUnit] = useState<string>(() => {
    if (initialParams?.starterUnit !== undefined) return String(initialParams.starterUnit);
    return "L";
  });
  const [starterOg, setStarterOg] = useState<number | null>(() => {
    if (initialParams?.starterOg !== undefined) return Number(initialParams.starterOg);
    return 1.040;
  });

  const r = useMemo(() => {
    const volL = batchUnit === "L" ? (batchVolume ?? 5) : (batchVolume ?? 5) * 3.78541;
    const gravityPoints = (og ?? 1.050 - 1) * 1000;

    const rate = yeastType === "lager" ? 1.5 : 1.0;
    const cellsNeeded = volL * 1000 * gravityPoints * rate;

    const cellsPerPackage = 100 * (viability ?? 100) / 100;
    const packagesNeeded = cellsNeeded / cellsPerPackage;

    let starterCells = 0;
    if (starter) {
      const starterVolL = starterUnit === "L" ? (starterVol ?? 1) : (starterVol ?? 1) * 0.946353;
      const growthFactor = starterVolL >= 2 ? 5 : starterVolL >= 1.5 ? 7 : starterVolL >= 1 ? 10 : 12;
      starterCells = cellsPerPackage * growthFactor;
    }

    return {
      cellsNeeded,
      cellsPerPackage,
      packagesNeeded,
      starterCells,
    };
  }, [batchVolume, batchUnit, og, yeastType, viability, starter, starterVol, starterUnit, starterOg]);

  const shareParams: ShareParams = {
    batchVolume: batchVolume ?? 5,
    batchUnit,
    og: og ?? 1.050,
    yeastType,
    viability: viability ?? 100,
    starter,
    starterVol: starterVol ?? 1,
    starterUnit,
    starterOg: starterOg ?? 1.040,
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
          label="Original Gravity"
          value={og}
          onChange={setOg}
          step={0.001}
          min={1.020}
          max={1.120}
          suffix="SG"
        />
        <SelectField
          label="Yeast Type"
          value={yeastType}
          onChange={setYeastType}
          options={[
            { value: "ale", label: "Ale (0.75M cells/mL/°P)" },
            { value: "lager", label: "Lager (1.5M cells/mL/°P)" },
          ]}
        />
        <NumberField
          label="Yeast Viability"
          value={viability}
          onChange={setViability}
          step={1}
          min={0}
          max={100}
          suffix="%"
        />
        <SelectField
          label="Starter?"
          value={starter ? "yes" : "no"}
          onChange={(v) => setStarter(v === "yes")}
          options={[
            { value: "no", label: "No Starter" },
            { value: "yes", label: "With Starter" },
          ]}
        />
        {starter && (
          <>
            <NumberField
              label="Starter Volume"
              value={starterVol}
              onChange={setStarterVol}
              step={0.5}
              min={0.5}
              max={5}
            />
            <SelectField
              label="Starter Unit"
              value={starterUnit}
              onChange={setStarterUnit}
              options={[{ value: "L", label: "Liters" }, { value: "qt", label: "Quarts" }]}
            />
            <NumberField
              label="Starter Gravity"
              value={starterOg}
              onChange={setStarterOg}
              step={0.001}
              min={1.020}
              max={1.060}
              suffix="SG"
            />
          </>
        )}
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Cells Needed" value={`${fmt(r.cellsNeeded / 1e9)} billion`} />
        <Result label="Cells per Pack (adj.)" value={`${fmt(r.cellsPerPackage)} billion`} />
        <Result label="Packs Needed (no starter)" value={fmt(r.packagesNeeded, 2)} copyValue={fmt(r.packagesNeeded, 2)} />
        {starter && <Result label="Cells After Starter" value={`${fmt(r.starterCells / 1e9)} billion`} />}
      </div>
      <SmallNote>
        Standard pack/vial ≈ 100B cells at 100% viability. Ale: 0.75M cells/mL/°P, Lager: 1.5M.
        Starter growth: ~10x for 1L, ~7x for 1.5L, ~5x for 2L (stir plate). Without stir plate, halve these.
        Always make a starter for lager, high-gravity ({'>'}1.065), or old yeast.
      </SmallNote>
    </Card>
  );
}

export const brewYeastPitch: CalculatorModule = {
  meta: {
    slug: "brew-yeast-pitch",
    title: "Yeast Pitch Rate Calculator",
    category: "Brewing",
    description: "Calculate yeast cells needed and packages required based on batch volume, gravity, yeast type, viability, and starter. Supports ale and lager rates.",
    keywords: ["yeast pitch rate", "yeast calculator", "pitch rate", "yeast starter", "cells needed", "homebrew yeast", "lager pitch rate", "ale pitch rate"],
  },
  Calculator: C,
};