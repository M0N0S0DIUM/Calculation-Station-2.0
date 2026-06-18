"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface LoanCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: LoanCalculatorProps) {
  const [principal, setPrincipal] = useState<number | null>(() => Number(initialParams?.principal ?? 20000));
  const [apr, setApr] = useState<number | null>(() => Number(initialParams?.apr ?? 6.5));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 5));

  const r = useMemo(() => {
    const aprVal = apr ?? 0;
    const principalVal = principal ?? 0;
    const yearsVal = years ?? 0;

    const P = principalVal;
    const rm = (aprVal/100)/12;
    const n = Math.max(1, Math.round(yearsVal*12));
    if (P <= 0 || aprVal < 0) return null;
    if (rm === 0) {
      const m = P/n;
      const total = m*n;
      return { monthly: m, total, interest: total-P };
    }
    const monthly = P * (rm*Math.pow(1+rm, n)) / (Math.pow(1+rm, n)-1);
    const total = monthly*n;
    return { monthly, total, interest: total-P };
  }, [principal, apr, years]);

  const shareParams: ShareParams = { principal: principal ?? 0, apr: apr ?? 0, years: years ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Loan Calculator</h3>
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