"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney, fmt } from "@/lib/math";

interface SavingsGoalCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: SavingsGoalCalculatorProps) {
  const [goal, setGoal] = useState<number | null>(() => Number(initialParams?.goal ?? 10000));
  const [current, setCurrent] = useState<number | null>(() => Number(initialParams?.current ?? 0));
  const [apr, setApr] = useState<number | null>(() => Number(initialParams?.apr ?? 4));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 5));

  const r = useMemo(() => {
    const aprVal = apr ?? 0;
    const currentVal = current ?? 0;
    const goalVal = goal ?? 0;
    const yearsVal = years ?? 0;

    const remaining = Math.max(0, goalVal - currentVal);
    const months = yearsVal * 12;
    const monthlyRate = aprVal / 100 / 12;
    
    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = remaining / months;
    } else {
      monthlyPayment = remaining * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    }
    
    const totalContributed = monthlyPayment * months;
    const totalInterest = Math.max(0, goalVal - currentVal - totalContributed);
    
    return { monthlyPayment, totalContributed, totalInterest, remaining };
  }, [goal, current, apr, years]);

  const shareParams: ShareParams = { goal: goal ?? 0, current: current ?? 0, apr: apr ?? 0, years: years ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Savings Goal Calculator</h3>
      </div>
      <Grid>
        <NumberField label="Savings goal" value={goal} onChange={setGoal} step={100} />
        <NumberField label="Current savings" value={current} onChange={setCurrent} step={100} />
        <NumberField label="Expected return (APR)" value={apr} onChange={setApr} step={0.1} suffix="%" />
        <NumberField label="Time horizon (years)" value={years} onChange={setYears} step={1} min={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Remaining to save" value={fmtMoney(r.remaining)} />
        <Result label="Monthly contribution needed" value={fmtMoney(r.monthlyPayment)} copyValue={String(r.monthlyPayment)} />
        <Result label="Total you'll contribute" value={fmtMoney(r.totalContributed)} />
        <Result label="Interest earned" value={fmtMoney(r.totalInterest)} />
      </div>
      <SmallNote>Assumes monthly compounding and contributions at end of each month.</SmallNote>
    </Card>
  );
}

export const savingsGoal: CalculatorModule = {
  meta: {
    slug: "savings-goal",
    title: "Savings Goal Calculator",
    category: "Financial",
    description: "Calculate monthly savings needed to reach a financial goal.",
    keywords: ["savings", "goal", "monthly savings", "target", "financial planning", "compound interest", "retirement", "emergency fund"],
  },
  Calculator: C,
};