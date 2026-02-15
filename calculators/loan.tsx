"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

function C() {
  const [principal, setPrincipal] = useState(20000);
  const [apr, setApr] = useState(6.5);
  const [years, setYears] = useState(5);

  const r = useMemo(() => {
    const P = principal;
    const rm = (apr/100)/12;
    const n = Math.max(1, Math.round(years*12));
    if (P <= 0 || apr < 0) return null;
    if (rm === 0) {
      const m = P/n;
      const total = m*n;
      return { monthly: m, total, interest: total-P };
    }
    const monthly = P * (rm*Math.pow(1+rm, n)) / (Math.pow(1+rm, n)-1);
    const total = monthly*n;
    return { monthly, total, interest: total-P };
  }, [principal, apr, years]);

  return (
    <Card>
      <Grid>
        <NumberField label="Principal" value={principal} onChange={setPrincipal} step={100} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Term (years)" value={years} onChange={setYears} step={0.25} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Monthly payment" value={fmtMoney(r?.monthly ?? NaN)} />
        <Result label="Total paid" value={fmtMoney(r?.total ?? NaN)} />
        <Result label="Total interest" value={fmtMoney(r?.interest ?? NaN)} />
      </div>
    </Card>
  );
}

export const loan: CalculatorModule = {
  meta: { slug: "loan", title: "Loan Calculator", category: "Financial", description: "Monthly payment + total interest." },
  Calculator: C,
};
