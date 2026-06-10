"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, ShareButton } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

function C() {
  const [principal, setPrincipal] = useState(20000);
  const [apr, setApr] = useState(6.5);
  const [years, setYears] = useState(5);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("principal");
    const a = params.get("apr");
    const y = params.get("years");
    if (p) setPrincipal(Number(p));
    if (a) setApr(Number(a));
    if (y) setYears(Number(y));
  }, []);

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

  const shareParams = useMemo(() => ({
    principal,
    apr,
    years,
  }), [principal, apr, years]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Loan Calculator</h3>
        <ShareButton slug="loan" params={shareParams} />
      </div>
      <Grid>
        <NumberField label="Principal" value={principal} onChange={setPrincipal} step={100} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Term (years)" value={years} onChange={setYears} step={0.25} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Monthly payment" value={fmtMoney(r?.monthly ?? NaN)} copyValue={r?.monthly ? String(r.monthly) : undefined} />
        <Result label="Total paid" value={fmtMoney(r?.total ?? NaN)} copyValue={r?.total ? String(r.total) : undefined} />
        <Result label="Total interest" value={fmtMoney(r?.interest ?? NaN)} copyValue={r?.interest ? String(r.interest) : undefined} />
      </div>
    </Card>
  );
}

export const loan: CalculatorModule = {
  meta: { slug: "loan", title: "Loan Calculator", category: "Financial", description: "Monthly payment + total interest.", keywords: ["loan", "monthly payment", "amortization", "principal", "interest", "term", "apr", "installment"] },
  Calculator: C,
};