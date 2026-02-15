"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

function C() {
  const [principal, setPrincipal] = useState(5000);
  const [monthly, setMonthly] = useState(200);
  const [apr, setApr] = useState(7);
  const [years, setYears] = useState(20);

  const r = useMemo(() => {
    const rm = (apr/100)/12;
    const n = Math.max(0, Math.round(years*12));
    if (apr < 0 || n === 0) return { fv: principal, invested: principal, gain: 0 };
    const fvP = principal*Math.pow(1+rm, n);
    const fvC = rm === 0 ? monthly*n : monthly*((Math.pow(1+rm,n)-1)/rm);
    const fv = fvP + fvC;
    const invested = principal + monthly*n;
    return { fv, invested, gain: fv - invested };
  }, [principal, monthly, apr, years]);

  return (
    <Card>
      <Grid>
        <NumberField label="Starting principal" value={principal} onChange={setPrincipal} step={100} />
        <NumberField label="Monthly contribution" value={monthly} onChange={setMonthly} step={10} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Future value" value={fmtMoney(r.fv)} />
        <Result label="Total contributed" value={fmtMoney(r.invested)} />
        <Result label="Gain" value={fmtMoney(r.gain)} />
      </div>
    </Card>
  );
}

export const compoundInterest: CalculatorModule = {
  meta: { slug: "compound-interest", title: "Compound Interest", category: "Financial", description: "Future value with monthly contributions." },
  Calculator: C,
};
