"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface EmergencyFundProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: EmergencyFundProps) {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | null>(() => Number(initialParams?.monthlyExpenses ?? 3000));
  const [monthsCoverage, setMonthsCoverage] = useState<number | null>(() => Number(initialParams?.monthsCoverage ?? 6));
  const [currentSavings, setCurrentSavings] = useState<number | null>(() => Number(initialParams?.currentSavings ?? 5000));
  const [monthlySavings, setMonthlySavings] = useState<number | null>(() => Number(initialParams?.monthlySavings ?? 500));
  const [apr, setApr] = useState<number | null>(() => Number(initialParams?.apr ?? 4));

  const r = useMemo(() => {
    const aprVal = apr ?? 0;
    const currentSavingsVal = currentSavings ?? 0;
    const monthlyExpensesVal = monthlyExpenses ?? 0;
    const monthlySavingsVal = monthlySavings ?? 0;
    const monthsCoverageVal = monthsCoverage ?? 0;

    const targetAmount = monthlyExpensesVal * monthsCoverageVal;
    const remaining = Math.max(0, targetAmount - currentSavingsVal);
    const monthlyRate = aprVal / 100 / 12;
    
    let monthsToGoal = 0;
    if (monthlySavingsVal > 0) {
      if (monthlyRate === 0) {
        monthsToGoal = Math.ceil(remaining / monthlySavingsVal);
      } else {
        monthsToGoal = Math.ceil(
          Math.log(1 + (remaining * monthlyRate) / monthlySavingsVal) / Math.log(1 + monthlyRate)
        );
      }
    }
    
    const yearsToGoal = monthsToGoal / 12;
    
    return { targetAmount, remaining, monthsToGoal, yearsToGoal };
  }, [monthlyExpenses, monthsCoverage, currentSavings, monthlySavings, apr]);

  const shareParams: ShareParams = { monthlyExpenses: monthlyExpenses ?? 0, monthsCoverage: monthsCoverage ?? 0, currentSavings: currentSavings ?? 0, monthlySavings: monthlySavings ?? 0, apr: apr ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Emergency Fund Calculator</h3>
      </div>
      <SelectField
        label="Target Coverage"
        value={String(monthsCoverage)}
        onChange={(v) => setMonthsCoverage(Number(v))}
        options={[
          { value: "3", label: "3 Months (Minimum)" },
          { value: "6", label: "6 Months (Standard)" },
          { value: "9", label: "9 Months (Conservative)" },
          { value: "12", label: "12 Months (Very Safe)" },
        ]}
      />
      <Hr />
      <Grid>
        <NumberField label="Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} step={100} />
        <NumberField label="Current Savings" value={currentSavings} onChange={setCurrentSavings} step={500} />
        <NumberField label="Monthly Savings" value={monthlySavings} onChange={setMonthlySavings} step={50} />
        <NumberField label="Savings APY" value={apr} onChange={setApr} step={0.1} suffix="%" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Target Emergency Fund" value={fmt(r.targetAmount, 0)} copyValue={String(r.targetAmount)} />
        <Result label="Remaining Needed" value={fmt(r.remaining, 0)} />
        <Result label="Months to Reach Goal" value={String(r.monthsToGoal)} />
        <Result label="Years to Reach Goal" value={fmt(r.yearsToGoal, 1)} />
      </div>
      <SmallNote>3-6 months for stable income; 9-12 months for variable income or single income households.</SmallNote>
    </Card>
  );
}

export const emergencyFund: CalculatorModule = {
  meta: {
    slug: "emergency-fund",
    title: "Emergency Fund Calculator",
    category: "Financial",
    description: "Calculate how much emergency savings you need and how long to build it.",
    keywords: ["emergency fund", "emergency savings", "rainy day fund", "financial cushion", "months of expenses", "financial security"],
  },
  Calculator: C,
};