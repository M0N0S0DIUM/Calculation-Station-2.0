"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(30);
  const [kg, setKg] = useState(82);
  const [cm, setCm] = useState(178);
  const [activity, setActivity] = useState("1.55");

  const r = useMemo(() => {
    const bmr = sex === "male" ? 10*kg + 6.25*cm - 5*age + 5 : 10*kg + 6.25*cm - 5*age - 161;
    const tdee = bmr * Number(activity);
    return { bmr, tdee };
  }, [sex, age, kg, cm, activity]);

  return (
    <Card>
      <Grid>
        <SelectField label="Sex" value={sex} onChange={setSex} options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]} />
        <NumberField label="Age" value={age} onChange={setAge} step={1} />
        <NumberField label="Weight" value={kg} onChange={setKg} step={0.1} suffix="kg" />
        <NumberField label="Height" value={cm} onChange={setCm} step={0.1} suffix="cm" />
        <SelectField
          label="Activity"
          value={activity}
          onChange={setActivity}
          options={[
            {value:"1.2",label:"Sedentary (1.2)"},
            {value:"1.375",label:"Light (1.375)"},
            {value:"1.55",label:"Moderate (1.55)"},
            {value:"1.725",label:"Very active (1.725)"},
            {value:"1.9",label:"Athlete (1.9)"},
          ]}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="BMR (kcal/day)" value={fmt(r.bmr, 0)} />
        <Result label="TDEE (kcal/day)" value={fmt(r.tdee, 0)} />
      </div>
      <Hr />
      <SmallNote>Estimate only.</SmallNote>
    </Card>
  );
}

export const bmrTdee: CalculatorModule = {
  meta: { slug: "bmr-tdee", title: "BMR / TDEE", category: "Health", description: "Calories/day estimate (Mifflin-St Jeor)." },
  Calculator: C,
};
