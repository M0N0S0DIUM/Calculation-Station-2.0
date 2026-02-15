"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [weight, setWeight] = useState(180);
  const [units, setUnits] = useState("lb");
  const [met, setMet] = useState(6); // moderate
  const [minutes, setMinutes] = useState(30);

  const kcal = useMemo(() => {
    const kg = units === "kg" ? weight : weight*0.45359237;
    // kcal/min = MET * 3.5 * kg / 200
    const kcalMin = met * 3.5 * kg / 200;
    return kcalMin * minutes;
  }, [weight, units, met, minutes]);

  return (
    <Card>
      <Grid>
        <NumberField label="Weight" value={weight} onChange={setWeight} step={0.1} />
        <SelectField label="Units" value={units} onChange={setUnits} options={[{value:"lb",label:"lb"},{value:"kg",label:"kg"}]} />
        <NumberField label="MET" value={met} onChange={setMet} step={0.1} />
        <NumberField label="Minutes" value={minutes} onChange={setMinutes} step={1} />
      </Grid>
      <Hr />
      <Result label="Estimated calories burned" value={`${fmt(kcal, 0)} kcal`} />
      <Hr />
      <SmallNote>MET varies by activity intensity; this is a standard estimate.</SmallNote>
    </Card>
  );
}

export const caloriesMet: CalculatorModule = {
  meta: { slug: "calories-met", title: "Calories Burned (MET)", category: "Health", description: "Calories burned from MET, weight, minutes." },
  Calculator: C,
};
