"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, ShareButton } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [units, setUnits] = useState("us");
  const [lbs, setLbs] = useState(180);
  const [inch, setInch] = useState(70);
  const [kg, setKg] = useState(82);
  const [cm, setCm] = useState(178);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const u = params.get("units");
    const w = params.get("weight");
    const h = params.get("height");
    if (u) setUnits(u);
    if (w) {
      if (units === "us") setLbs(Number(w));
      else setKg(Number(w));
    }
    if (h) {
      if (units === "us") setInch(Number(h));
      else setCm(Number(h));
    }
  }, []);

  const r = useMemo(() => {
    const bmi = units === "us" ? (lbs/(inch*inch))*703 : kg/Math.pow(cm/100,2);
    let cat = "—";
    if (Number.isFinite(bmi)) {
      if (bmi < 18.5) cat = "Underweight";
      else if (bmi < 25) cat = "Normal";
      else if (bmi < 30) cat = "Overweight";
      else cat = "Obese";
    }
    return { bmi, cat };
  }, [units, lbs, inch, kg, cm]);

  const shareParams = useMemo(() => ({
    units,
    weight: units === "us" ? lbs : kg,
    height: units === "us" ? inch : cm,
  }), [units, lbs, inch, kg, cm]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">BMI Calculator</h3>
        <ShareButton slug="bmi" params={shareParams} />
      </div>
      <SelectField
        label="Units"
        value={units}
        onChange={setUnits}
        options={[{value:"us",label:"US (lb/in)"},{value:"metric",label:"Metric (kg/cm)"}]}
      />
      <Hr />
      {units === "us" ? (
        <Grid>
          <NumberField label="Weight" value={lbs} onChange={setLbs} suffix="lb" />
          <NumberField label="Height" value={inch} onChange={setInch} suffix="in" />
        </Grid>
      ) : (
        <Grid>
          <NumberField label="Weight" value={kg} onChange={setKg} suffix="kg" step={0.1} />
          <NumberField label="Height" value={cm} onChange={setCm} suffix="cm" step={0.1} />
        </Grid>
      )}
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="BMI" value={fmt(r.bmi, 2)} copyValue={Number.isFinite(r.bmi) ? String(r.bmi) : undefined} />
        <Result label="Category" value={r.cat} />
      </div>
    </Card>
  );
}

export const bmi: CalculatorModule = {
  meta: { slug: "bmi", title: "BMI Calculator", category: "Health", description: "Body mass index (US/Metric).", keywords: ["bmi", "body mass index", "weight", "height", "health", "body fat", "obesity", "underweight", "normal weight", "overweight"] },
  Calculator: C,
};