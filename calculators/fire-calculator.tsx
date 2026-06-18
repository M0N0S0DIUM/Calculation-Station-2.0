"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface FIRECalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: FIRECalculatorProps) {
  const [annualExpenses, setAnnualExpenses] = useState<number | null>(() => Number(initialParams?.annualExpenses ?? 40000));
  const [currentSavings, setCurrentSavings] = useState<number | null>(() => Number(initialParams?.currentSavings ?? 50000));
  const [annualSavings, setAnnualSavings] = useState<number | null>(() => Number(initialParams?.annualSavings ?? 20000));
  const [expectedReturn, setExpectedReturn] = useState<number | null>(() => Number(initialParams?.expectedReturn ?? 7));
  const [swr, setSwr] = useState<number | null>(() => Number(initialParams?.swr ?? 4));
  const [inflation, setInflation] = useState<number | null>(() => Number(initialParams?.inflation ?? 3));

  const r = useMemo(() => {
    const annualExpensesVal = annualExpenses ?? 0;
    const annualSavingsVal = annualSavings ?? 0;
    const currentSavingsVal = currentSavings ?? 0;
    const expectedReturnVal = expectedReturn ?? 0;
    const inflationVal = inflation ?? 0;
    const swrVal = swr ?? 0;

    const fireNumber = annualExpensesVal * (100 / swrVal);
    const realReturn = (1 + expectedReturnVal / 100) / (1 + inflationVal / 100) - 1;
    
    if (realReturn <= 0) {
      return { fireNumber, yearsToFIRE: Infinity, coastFIRE: 0, monthlySavingsNeeded: Infinity };
    }
    
    // Years to FIRE with compound growth
    const target = fireNumber;
    const monthlySavings = annualSavingsVal / 12;
    const monthlyRate = realReturn / 12;
    
    let yearsToFIRE = 0;
    if (monthlySavings > 0) {
      yearsToFIRE = Math.log(1 + (target - currentSavingsVal) * monthlyRate / monthlySavings) / (12 * Math.log(1 + monthlyRate));
    }
    
    // Coast FIRE - amount needed now to reach FIRE by traditional retirement age
    const yearsToRetirement = Math.max(0, 65 - 30); // assuming age 30
    const coastFIRE = target / Math.pow(1 + realReturn, yearsToRetirement);
    
    // Monthly savings needed to reach FIRE in 10 years
    const targetYears = 10;
    const monthlySavingsNeeded = targetYears > 0 && monthlyRate > 0 
      ? (target - currentSavingsVal) * monthlyRate / (Math.pow(1 + monthlyRate, targetYears * 12) - 1)
      : (target - currentSavingsVal) / (targetYears * 12);
    
    return { fireNumber, yearsToFIRE, coastFIRE, monthlySavingsNeeded, monthlySavings };
  }, [annualExpenses, currentSavings, annualSavings, expectedReturn, swr, inflation]);

  const shareParams: ShareParams = { annualExpenses: annualExpenses ?? 0, currentSavings: currentSavings ?? 0, annualSavings: annualSavings ?? 0, expectedReturn: expectedReturn ?? 0, swr: swr ?? 0, inflation: inflation ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">FIRE Calculator (Financial Independence)</h3>
      </div>
      <Grid>
        <NumberField label="Annual Expenses" value={annualExpenses} onChange={setAnnualExpenses} step={1000} />
        <NumberField label="Current Savings" value={currentSavings} onChange={setCurrentSavings} step={5000} />
        <NumberField label="Annual Savings" value={annualSavings} onChange={setAnnualSavings} step={1000} />
        <NumberField label="Expected Return" value={expectedReturn} onChange={setExpectedReturn} step={0.1} suffix="%" />
        <NumberField label="Safe Withdrawal Rate" value={swr} onChange={setSwr} step={0.1} suffix="%" />
        <NumberField label="Inflation Rate" value={inflation} onChange={setInflation} step={0.1} suffix="%" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="FIRE Number (25x expenses)" value={fmt(r.fireNumber, 0)} copyValue={String(r.fireNumber)} />
        <Result label="Years to FIRE" value={r.yearsToFIRE === Infinity ? "Never" : fmt(r.yearsToFIRE, 1)} copyValue={String(r.yearsToFIRE)} />
        <Result label="Coast FIRE (age 65)" value={fmt(r.coastFIRE, 0)} />
        <Result label="Monthly Savings for 10yr FIRE" value={r.monthlySavingsNeeded === Infinity ? "N/A" : fmt(r.monthlySavingsNeeded, 0)} />
        <Result label="Current Monthly Savings" value={fmt(r.monthlySavings ?? 0, 0)} />
      </div>
      <SmallNote>FIRE = Financial Independence Retire Early. Coast FIRE = amount needed now to reach FIRE by 65 without adding more.</SmallNote>
    </Card>
  );
}

export const fireCalculator: CalculatorModule = {
  meta: {
    slug: "fire-calculator",
    title: "FIRE Calculator (Financial Independence)",
    category: "Financial",
    description: "Calculate your FIRE number, years to financial independence, and Coast FIRE.",
    keywords: ["fire", "financial independence", "retire early", "coast fire", "fire number", "safe withdrawal rate", "4% rule", "early retirement"],
  },
  Calculator: C,
};