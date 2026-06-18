"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BSACalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BSACalculatorProps) {
  const [units, setUnits] = useState<"us" | "metric">(
    () => (initialParams?.units as "us" | "metric") ?? "metric"
  );
  const [weight, setWeight] = useState<number | null>(() => Number(initialParams?.weight ?? 70));
  const [height, setHeight] = useState<number | null>(() => Number(initialParams?.height ?? 175));

  const r = useMemo(() => {
    const heightVal = height ?? 0;
    const weightVal = weight ?? 0;

    // Mosteller formula: BSA = sqrt(heightVal(cm) * weightVal(kg) / 3600)
    // Du Bois formula: BSA = 0.007184 * weightVal^0.425 * heightVal^0.725
    let w = weightVal, h = heightVal;
    if (units === "us") {
      w = weightVal * 0.453592; // lb to kg
      h = heightVal * 2.54; // in to cm
    }
    const mosteller = Math.sqrt(h * w / 3600);
    const dubois = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);
    const avg = (mosteller + dubois) / 2;
    return { mosteller, dubois, avg, weightVal: w, heightVal: h };
  }, [units, weight, height]);

  const shareParams: ShareParams = {
      units: units ?? 'metric',
      weight: units === "us" ? (weight ?? 0) : Math.round((weight ?? 0) * 10) / 10,
      height: units === "us" ? (height ?? 0) : Math.round((height ?? 0) * 10) / 10,
    };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Body Surface Area (BSA)</h3>
      </div>
      <SelectField
        label="Units"
        value={units}
        onChange={(v) => setUnits(v as "us" | "metric")}
        options={[{ value: "us", label: "US (lb/in)" }, { value: "metric", label: "Metric (kg/cm)" }]}
      />
      <Hr />
      {units === "us" ? (
        <Grid>
          <NumberField label="Weight" value={weight} onChange={setWeight} suffix="lb" step={1} />
          <NumberField label="Height" value={height} onChange={setHeight} suffix="in" step={0.1} />
        </Grid>
      ) : (
        <Grid>
          <NumberField label="Weight" value={weight} onChange={setWeight} suffix="kg" step={0.1} />
          <NumberField label="Height" value={height} onChange={setHeight} suffix="cm" step={0.1} />
        </Grid>
      )}
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Mosteller formula" value={fmt(r.mosteller, 2) + " m²"} copyValue={String(r.mosteller)} />
        <Result label="Du Bois formula" value={fmt(r.dubois, 2) + " m²"} copyValue={String(r.dubois)} />
        <Result label="Average" value={fmt(r.avg, 2) + " m²"} copyValue={String(r.avg)} />
      </div>
      <SmallNote>BSA used for drug dosing, cardiac index, chemotherapy. Mosteller & Du Bois are common formulas.</SmallNote>
    </Card>
  );
}

export const bsa: CalculatorModule = {
  meta: {
    slug: "bsa",
    title: "Body Surface Area (BSA)",
    category: "Health",
    description: "Calculate BSA using Mosteller and Du Bois formulas.",
    keywords: ["bsa", "body surface area", "mosteller", "du bois", "drug dosing", "chemotherapy", "cardiac index", "medical"],
  },
  Calculator: C,
};