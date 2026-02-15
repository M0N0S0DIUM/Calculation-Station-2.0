"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [units, setUnits] = useState("us");
  const [lbs, setLbs] = useState(180);
  const [inch, setInch] = useState(70);
  const [kg, setKg] = useState(82);
  const [cm, setCm] = useState(178);

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

  return (
    <Card>
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
        <Result label="BMI" value={fmt(r.bmi, 2)} />
        <Result label="Category" value={r.cat} />
      </div>
    </Card>
  );
}

export const bmi: CalculatorModule = {
  meta: { slug: "bmi", title: "BMI Calculator", category: "Health", description: "Body mass index (US/Metric)." },
  Calculator: C,
};
