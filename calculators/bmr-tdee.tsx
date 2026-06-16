"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BMRTDEECalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BMRTDEECalculatorProps) {
  const [sex, setSex] = useState(() => String(initialParams?.sex ?? "male"));
  const [age, setAge] = useState(() => Number(initialParams?.age ?? 30));
  const [kg, setKg] = useState(() => Number(initialParams?.kg ?? 82));
  const [cm, setCm] = useState(() => Number(initialParams?.cm ?? 178));
  const [activity, setActivity] = useState(() => String(initialParams?.activity ?? "1.55"));

  const r = useMemo(() => {
    const bmr = sex === "male" ? 10*kg + 6.25*cm - 5*age + 5 : 10*kg + 6.25*cm - 5*age - 161;
    const tdee = bmr * Number(activity);
    return { bmr, tdee };
  }, [sex, age, kg, cm, activity]);

  const shareParams: ShareParams = { sex, age, kg, cm, activity };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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
            {value:"1.725",label:"Active (1.725)"},
            {value:"1.9",label:"Very active (1.9)"}
          ]}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="BMR (kcal/day)" value={fmt(r.bmr, 0)} />
        <Result label="TDEE (kcal/day)" value={fmt(r.tdee, 0)} />
      </div>
      <SmallNote>Mifflin-St Jeor formula.</SmallNote>
    </Card>
  );
}

export const bmrTdee: CalculatorModule = {
  meta: { slug: "bmr-tdee", title: "BMR / TDEE", category: "Health", description: "Calories/day estimate (Mifflin-St Jeor).", keywords: ["bmr", "basal metabolic rate", "tdee", "total daily energy expenditure", "calories", "mifflin st jeor", "metabolism", "weight loss", "weight gain", "maintenance calories"] },
  Calculator: C,
};