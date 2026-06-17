"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface RetirementAgeProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: RetirementAgeProps) {
  const [currentAge, setCurrentAge] = useState(() => Number(initialParams?.currentAge ?? 30));
  const [retirementAge, setRetirementAge] = useState(() => Number(initialParams?.retirementAge ?? 65));
  const [currentSavings, setCurrentSavings] = useState(() => Number(initialParams?.currentSavings ?? 50000));
  const [monthlyContribution, setMonthlyContribution] = useState(() => Number(initialParams?.monthlyContribution ?? 1000));
  const [expectedReturn, setExpectedReturn] = useState(() => Number(initialParams?.expectedReturn ?? 7));
  const [withdrawalRate, setWithdrawalRate] = useState(() => Number(initialParams?.withdrawalRate ?? 4));

  const r = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) {
      return { yearsToRetirement: 0, projectedSavings: currentSavings, annualIncome: 0, monthlyIncome: 0 };
    }
    
    const months = yearsToRetirement * 12;
    const monthlyRate = expectedReturn / 100 / 12;
    
    let projectedSavings = currentSavings;
    if (monthlyRate === 0) {
      projectedSavings += monthlyContribution * months;
    } else {
      projectedSavings = currentSavings * Math.pow(1 + monthlyRate, months) + 
                         monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    }
    
    const annualIncome = projectedSavings * (withdrawalRate / 100);
    const monthlyIncome = annualIncome / 12;
    
    return { yearsToRetirement, projectedSavings, annualIncome, monthlyIncome };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, withdrawalRate]);

  const shareParams: ShareParams = { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, withdrawalRate };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Retirement Age Calculator</h3>
      </div>
      <Grid>
        <NumberField label="Current Age" value={currentAge} onChange={setCurrentAge} step={1} min={18} max={80} />
        <NumberField label="Target Retirement Age" value={retirementAge} onChange={setRetirementAge} step={1} min={currentAge} max={100} />
        <NumberField label="Current Savings" value={currentSavings} onChange={setCurrentSavings} step={5000} />
        <NumberField label="Monthly Contribution" value={monthlyContribution} onChange={setMonthlyContribution} step={100} />
        <NumberField label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} step={0.1} suffix="%" />
        <NumberField label="Safe Withdrawal Rate" value={withdrawalRate} onChange={setWithdrawalRate} step={0.1} suffix="%" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Years Until Retirement" value={String(r.yearsToRetirement)} />
        <Result label="Projected Savings at Retirement" value={fmt(r.projectedSavings, 0)} copyValue={String(r.projectedSavings)} />
        <Result label="Annual Income (4% Rule)" value={fmt(r.annualIncome, 0)} copyValue={String(r.annualIncome)} />
        <Result label="Monthly Income" value={fmt(r.monthlyIncome, 0)} copyValue={String(r.monthlyIncome)} />
      </div>
      <SmallNote>Assumes monthly compounding. 4% withdrawal rule historically sustainable for 30-year retirement.</SmallNote>
    </Card>
  );
}

export const retirementAge: CalculatorModule = {
  meta: {
    slug: "retirement-age",
    title: "Retirement Age Calculator",
    category: "Financial",
    description: "Project your retirement savings and income based on age, contributions, and returns.",
    keywords: ["retirement", "retirement age", "when can i retire", "retirement savings", "4% rule", "financial independence", "fire", "pension"],
  },
  Calculator: C,
};