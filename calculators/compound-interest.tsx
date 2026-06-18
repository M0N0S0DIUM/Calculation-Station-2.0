"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface CompoundInterestCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: CompoundInterestCalculatorProps) {
  const [principal, setPrincipal] = useState<number | null>(() => Number(initialParams?.principal ?? 5000));
  const [monthly, setMonthly] = useState<number | null>(() => Number(initialParams?.monthly ?? 200));
  const [apr, setApr] = useState<number | null>(() => Number(initialParams?.apr ?? 7));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 20));

  const r = useMemo(() => {
    const aprVal = apr ?? 0;
    const monthlyVal = monthly ?? 0;
    const principalVal = principal ?? 0;
    const yearsVal = years ?? 0;

    const rm = (aprVal/100)/12;
    const n = Math.max(0, Math.round(yearsVal*12));
    if (aprVal < 0 || n === 0) return { fv: principalVal, invested: principalVal, gain: 0 };
    if (rm === 0) {
      const invested = principalVal + monthlyVal*n;
      return { fv: invested, invested, gain: 0 };
    }
    const fvPrincipal = principalVal * Math.pow(1+rm, n);
    const fvMonthly = monthlyVal * (Math.pow(1+rm, n) - 1) / rm;
    const fv = fvPrincipal + fvMonthly;
    const invested = principalVal + monthlyVal*n;
    return { fv, invested, gain: fv - invested };
  }, [principal, monthly, apr, years]);

  const shareParams: ShareParams = { principal: principal ?? 0, monthly: monthly ?? 0, apr: apr ?? 0, years: years ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Compound Interest</h3>
      </div>
      <Grid>
        <NumberField label="Initial principal" value={principal} onChange={setPrincipal} step={100} />
        <NumberField label="Monthly contribution" value={monthly} onChange={setMonthly} step={10} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={1} min={0} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Future value" value={fmtMoney(r.fv)} />
        <Result label="Total invested" value={fmtMoney(r.invested)} />
        <Result label="Total gain" value={fmtMoney(r.gain)} />
      </div>
    </Card>
  );
}

export const compoundInterest: CalculatorModule = {
  meta: { slug: "compound-interest", title: "Compound Interest", category: "Financial", description: "Future value with monthly contributions.", keywords: ["compound interest", "future value", "fv", "investment", "savings", "monthly contribution", "apr", "compounding", "time value of money"] },
  Calculator: C,
};