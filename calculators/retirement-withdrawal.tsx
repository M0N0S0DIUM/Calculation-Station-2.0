"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface RetirementWithdrawalProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: RetirementWithdrawalProps) {
  const [portfolio, setPortfolio] = useState<number | null>(() => Number(initialParams?.portfolio ?? 1000000));
  const [withdrawalRate, setWithdrawalRate] = useState<number | null>(() => Number(initialParams?.withdrawalRate ?? 4));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 30));
  const [returnRate, setReturnRate] = useState<number | null>(() => Number(initialParams?.returnRate ?? 7));
  const [inflation, setInflation] = useState<number | null>(() => Number(initialParams?.inflation ?? 3));

  const r = useMemo(() => {
    const inflationVal = inflation ?? 0;
    const portfolioVal = portfolio ?? 0;
    const returnRateVal = returnRate ?? 0;
    const withdrawalRateVal = withdrawalRate ?? 0;
    const yearsVal = years ?? 0;

    const annualWithdrawal = portfolioVal * (withdrawalRateVal / 100);
    const monthlyWithdrawal = annualWithdrawal / 12;
    
    // Simple projection with inflationVal-adjusted withdrawals
    let balance = portfolioVal;
    let totalWithdrawn = 0;
    let currentWithdrawal = annualWithdrawal;
    const realReturn = (1 + returnRateVal / 100) / (1 + inflationVal / 100) - 1;
    
    for (let y = 0; y < yearsVal; y++) {
      balance = balance * (1 + returnRateVal / 100) - currentWithdrawal;
      totalWithdrawn += currentWithdrawal;
      currentWithdrawal *= (1 + inflationVal / 100);
      if (balance <= 0) break;
    }
    
    const success = balance > 0;
    const realAnnualWithdrawal = annualWithdrawal;
    
    return { annualWithdrawal, monthlyWithdrawal, totalWithdrawn, finalBalance: Math.max(0, balance), success, realReturn };
  }, [portfolio, withdrawalRate, years, returnRate, inflation]);

  const shareParams: ShareParams = { portfolio: portfolio ?? 0, withdrawalRate: withdrawalRate ?? 0, years: years ?? 0, returnRate: returnRate ?? 0, inflation: inflation ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Retirement Withdrawal (4% Rule)</h3>
      </div>
      <Grid>
        <NumberField label="Portfolio value" value={portfolio} onChange={setPortfolio} step={10000} />
        <NumberField label="Withdrawal rate" value={withdrawalRate} onChange={setWithdrawalRate} step={0.1} suffix="%" />
        <NumberField label="Retirement years" value={years} onChange={setYears} step={1} min={1} />
        <NumberField label="Expected return" value={returnRate} onChange={setReturnRate} step={0.1} suffix="%" />
        <NumberField label="Inflation rate" value={inflation} onChange={setInflation} step={0.1} suffix="%" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Annual withdrawal" value={fmt(r.annualWithdrawal, 0)} copyValue={String(r.annualWithdrawal)} />
        <Result label="Monthly withdrawal" value={fmt(r.monthlyWithdrawal, 0)} copyValue={String(r.monthlyWithdrawal)} />
        <Result label={`Total withdrawn (${years} yr)`} value={fmt(r.totalWithdrawn, 0)} />
        <Result label={`Portfolio after ${years} yr`} value={fmt(r.finalBalance, 0)} />
        <Result label="Success (portfolio lasts)" value={r.success ? "Yes \u2713" : "No \u2717"} />
      </div>
      <SmallNote>4% rule: historically safe withdrawal rate for 30-year retirement. Adjust for your risk tolerance.</SmallNote>
    </Card>
  );
}

export const retirementWithdrawal: CalculatorModule = {
  meta: {
    slug: "retirement-withdrawal",
    title: "Retirement Withdrawal (4% Rule)",
    category: "Financial",
    description: "Test if your portfolio can sustain withdrawals for retirement using the 4% rule.",
    keywords: ["retirement", "withdrawal", "4% rule", "safe withdrawal rate", "swr", "portfolio", "financial independence", "fire", "pension"],
  },
  Calculator: C,
};