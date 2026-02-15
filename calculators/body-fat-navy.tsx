"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtPct } from "@/lib/math";

function log10(x:number){ return Math.log(x)/Math.LN10; }

function C() {
  const [sex, setSex] = useState("male");
  const [height, setHeight] = useState(70); // inches
  const [neck, setNeck] = useState(15);
  const [waist, setWaist] = useState(34);
  const [hip, setHip] = useState(38);

  const bf = useMemo(() => {
    // US Navy formula (inches)
    if (sex === "male") {
      const v = 86.010*log10(waist - neck) - 70.041*log10(height) + 36.76;
      return v;
    } else {
      const v = 163.205*log10(waist + hip - neck) - 97.684*log10(height) - 78.387;
      return v;
    }
  }, [sex, height, neck, waist, hip]);

  return (
    <Card>
      <Grid>
        <SelectField label="Sex" value={sex} onChange={setSex} options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]} />
        <NumberField label="Height" value={height} onChange={setHeight} step={0.1} suffix="in" />
        <NumberField label="Neck" value={neck} onChange={setNeck} step={0.1} suffix="in" />
        <NumberField label="Waist" value={waist} onChange={setWaist} step={0.1} suffix="in" />
        {sex === "female" ? <NumberField label="Hip" value={hip} onChange={setHip} step={0.1} suffix="in" /> : null}
      </Grid>
      <Hr />
      <Result label="Estimated body fat" value={fmtPct(bf, 2)} />
      <Hr />
      <SmallNote>Uses classic Navy method (approximation). Measurements in inches.</SmallNote>
    </Card>
  );
}

export const bodyFatNavy: CalculatorModule = {
  meta: { slug: "body-fat-navy", title: "Body Fat (Navy Method)", category: "Health", description: "Estimate body fat % from measurements." },
  Calculator: C,
};
