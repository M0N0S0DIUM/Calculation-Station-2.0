"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [units, setUnits] = useState("lb");
  const [weight, setWeight] = useState(180);
  const [mult, setMult] = useState(0.5); // oz per lb

  const r = useMemo(() => {
    const lbs = units === "lb" ? weight : weight*2.2046226218;
    const oz = lbs * mult;
    const liters = oz * 0.0295735296;
    return { oz, liters };
  }, [units, weight, mult]);

  return (
    <Card>
      <Grid>
        <SelectField label="Weight units" value={units} onChange={setUnits} options={[{value:"lb",label:"lb"},{value:"kg",label:"kg"}]} />
        <NumberField label="Weight" value={weight} onChange={setWeight} step={0.1} />
        <NumberField label="Multiplier" value={mult} onChange={setMult} step={0.05} suffix="oz per lb" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Daily water (oz)" value={fmt(r.oz, 0)} />
        <Result label="Daily water (liters)" value={fmt(r.liters, 2)} />
      </div>
      <Hr />
      <SmallNote>Rule-of-thumb. Needs vary with heat/activity/health.</SmallNote>
    </Card>
  );
}

export const waterIntake: CalculatorModule = {
  meta: { slug: "water-intake", title: "Water Intake", category: "Health", description: "Simple daily water estimate by body weight." },
  Calculator: C,
};
