"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface IBUCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: IBUCalculatorProps) {
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
  const [hops] = useState<Array<{aa: number; weight: number; time: number; form: string}>>([
    { aa: 5.5, weight: 1, time: 60, form: "pellet" },
    { aa: 7.0, weight: 0.5, time: 15, form: "pellet" },
    { aa: 6.0, weight: 0.5, time: 5, form: "pellet" },
    { aa: 5.0, weight: 1, time: 0, form: "pellet" },
  ]);
  // Simplified - using single hop addition for this calculator
  const [aa, setAa] = useState<number | null>(() => {
    if (initialParams?.aa !== undefined) return Number(initialParams.aa);
    return 5.5;
  });
  const [weight, setWeight] = useState<number | null>(() => {
    if (initialParams?.weight !== undefined) return Number(initialParams.weight);
    return 1;
  });
  const [weightUnit, setWeightUnit] = useState<string>(() => {
    if (initialParams?.weightUnit !== undefined) return String(initialParams.weightUnit);
    return "oz";
  });
  const [boilTime, setBoilTime] = useState<number | null>(() => {
    if (initialParams?.boilTime !== undefined) return Number(initialParams.boilTime);
    return 60;
  });
  const [hopForm, setHopForm] = useState<string>(() => {
    if (initialParams?.hopForm !== undefined) return String(initialParams.hopForm);
    return "pellet";
  });
  const [formula, setFormula] = useState<string>(() => {
    if (initialParams?.formula !== undefined) return String(initialParams.formula);
    return "tinseth";
  });

  const r = useMemo(() => {
    const volGal = batchUnit === "L" ? (batchVolume ?? 5) / 3.78541 : (batchVolume ?? 5);
    const wOz = weightUnit === "g" ? (weight ?? 1) / 28.3495 : (weight ?? 1);
    const alphaAcid = aa ?? 5.5;
    const time = boilTime ?? 60;
    const ogVal = og ?? 1.050;

    // Utilization based on hop form
    const formFactor = hopForm === "pellet" ? 1.15 : hopForm === "plug" ? 1.0 : 0.75; // whole leaf

    let utilization = 0;

    if (formula === "tinseth") {
      // Tinseth formula
      const bigness = 1.65 * Math.pow(0.000125, ogVal - 1);
      const boilTimeFactor = (1 - Math.exp(-0.04 * time)) / 4.15;
      utilization = bigness * boilTimeFactor * formFactor;
    } else if (formula === "rager") {
      // Rager formula
      const gravityFactor = ogVal > 1.050 ? 1 + (ogVal - 1.050) / 0.2 : 1;
      const timeFactor = 18.11 + 13.86 * Math.tanh((time - 31.32) / 18.27);
      utilization = (timeFactor / 100) * gravityFactor * formFactor;
    } else {
      // Garetz formula (simplified)
      utilization = (time / 60) * 0.3 * formFactor;
    }

    // IBU = (oz * AA% * utilization * 7490) / vol(gal)
    const ibu = (wOz * alphaAcid * utilization * 7490) / volGal;

    return { ibu, utilization: utilization * 100, volGal, formula };
  }, [batchVolume, batchUnit, og, aa, weight, weightUnit, boilTime, hopForm, formula]);

  const shareParams: ShareParams = {
    batchVolume: batchVolume ?? 5,
    batchUnit,
    og: og ?? 1.050,
    aa: aa ?? 5.5,
    weight: weight ?? 1,
    weightUnit,
    boilTime: boilTime ?? 60,
    hopForm,
    formula,
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
          min={1.000}
          max={1.200}
          suffix="SG"
        />
        <NumberField
          label="Alpha Acid %"
          value={aa}
          onChange={setAa}
          step={0.1}
          min={1}
          max={20}
          suffix="%"
        />
        <NumberField
          label="Hop Weight"
          value={weight}
          onChange={setWeight}
          step={0.1}
          min={0.1}
          max={10}
        />
        <SelectField
          label="Weight Unit"
          value={weightUnit}
          onChange={setWeightUnit}
          options={[{ value: "oz", label: "Ounces (oz)" }, { value: "g", label: "Grams (g)" }]}
        />
        <NumberField
          label="Boil Time"
          value={boilTime}
          onChange={setBoilTime}
          step={5}
          min={0}
          max={120}
          suffix="min"
        />
        <SelectField
          label="Hop Form"
          value={hopForm}
          onChange={setHopForm}
          options={[
            { value: "pellet", label: "Pellets" },
            { value: "plug", label: "Plugs" },
            { value: "leaf", label: "Whole Leaf" },
          ]}
        />
        <SelectField
          label="Formula"
          value={formula}
          onChange={setFormula}
          options={[
            { value: "tinseth", label: "Tinseth (most common)" },
            { value: "rager", label: "Rager" },
            { value: "garetz", label: "Garetz" },
          ]}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Estimated IBU" value={fmt(r.ibu)} copyValue={fmt(r.ibu)} />
        <Result label="Hop Utilization" value={`${fmt(r.utilization)}%`} />
      </div>
      <SmallNote>
        Tinseth is the most widely used formula. Rager gives higher IBUs for late additions.
        For multiple hop additions, calculate each separately and sum the IBUs.
        Actual IBU varies with equipment, pH, and hop age — use as a guide.
      </SmallNote>
    </Card>
  );
}

export const brewIbu: CalculatorModule = {
  meta: {
    slug: "brew-ibu",
    title: "IBU Calculator",
    category: "Brewing",
    description: "Calculate International Bitterness Units (IBU) using Tinseth, Rager, or Garetz formulas. Accounts for hop form, alpha acid, boil time, and gravity.",
    keywords: ["ibu", "international bitterness units", "bitterness calculator", "hop calculator", "tinseth", "rager", "garetz", "homebrew ibu"],
  },
  Calculator: C,
};