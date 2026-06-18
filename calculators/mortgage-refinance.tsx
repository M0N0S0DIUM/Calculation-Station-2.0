"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface MortgageRefinanceProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: MortgageRefinanceProps) {
  const [currentBalance, setCurrentBalance] = useState<number | null>(() => Number(initialParams?.currentBalance ?? 250000));
  const [currentRate, setCurrentRate] = useState<number | null>(() => Number(initialParams?.currentRate ?? 6.5));
  const [currentTermLeft, setCurrentTermLeft] = useState<number | null>(() => Number(initialParams?.currentTermLeft ?? 25));
  const [newRate, setNewRate] = useState<number | null>(() => Number(initialParams?.newRate ?? 5.5));
  const [newTerm, setNewTerm] = useState<number | null>(() => Number(initialParams?.newTerm ?? 30));
  const [closingCosts, setClosingCosts] = useState<number | null>(() => Number(initialParams?.closingCosts ?? 5000));
  const [cashOut, setCashOut] = useState<number | null>(() => Number(initialParams?.cashOut ?? 0));

  const r = useMemo(() => {
    const cashOutVal = cashOut ?? 0;
    const closingCostsVal = closingCosts ?? 0;
    const currentBalanceVal = currentBalance ?? 0;
    const currentRateVal = currentRate ?? 0;
    const currentTermLeftVal = currentTermLeft ?? 0;
    const newRateVal = newRate ?? 0;
    const newTermVal = newTerm ?? 0;

    const currentMonthly = currentBalanceVal * (currentRateVal/100)/12 * Math.pow(1 + currentRateVal/100/12, currentTermLeftVal*12) / 
                          (Math.pow(1 + currentRateVal/100/12, currentTermLeftVal*12) - 1);
    const newLoanAmount = currentBalanceVal + closingCostsVal + cashOutVal;
    const newMonthly = newLoanAmount * (newRateVal/100)/12 * Math.pow(1 + newRateVal/100/12, newTermVal*12) / 
                       (Math.pow(1 + newRateVal/100/12, newTermVal*12) - 1);
    const monthlySavings = currentMonthly - newMonthly;
    const totalCurrentPayments = currentMonthly * currentTermLeftVal * 12;
    const totalNewPayments = newMonthly * newTermVal * 12 + closingCostsVal;
    const lifetimeSavings = totalCurrentPayments - totalNewPayments;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCostsVal / monthlySavings) : Infinity;
    
    return { currentMonthly, newMonthly, monthlySavings, totalCurrentPayments, totalNewPayments, lifetimeSavings, breakEvenMonths, newLoanAmount };
  }, [currentBalance, currentRate, currentTermLeft, newRate, newTerm, closingCosts, cashOut]);

  const shareParams: ShareParams = { currentBalance: currentBalance ?? 0, currentRate: currentRate ?? 0, currentTermLeft: currentTermLeft ?? 0, newRate: newRate ?? 0, newTerm: newTerm ?? 0, closingCosts: closingCosts ?? 0, cashOut: cashOut ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Mortgage Refinance Calculator</h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 mb-4">
        <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/30">
          <div className="font-medium text-neutral-300">Current Mortgage</div>
        </div>
        <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/30">
          <div className="font-medium text-neutral-300">New Mortgage</div>
        </div>
      </div>
      <Grid>
        <NumberField label="Current Balance" value={currentBalance} onChange={setCurrentBalance} step={1000} />
        <NumberField label="New Rate" value={newRate} onChange={setNewRate} step={0.01} suffix="%" />
        <NumberField label="Current Rate" value={currentRate} onChange={setCurrentRate} step={0.01} suffix="%" />
        <NumberField label="New Term" value={newTerm} onChange={setNewTerm} step={1} min={5} max={30} suffix="yr" />
        <NumberField label="Years Remaining" value={currentTermLeft} onChange={setCurrentTermLeft} step={1} min={1} max={30} suffix="yr" />
        <NumberField label="Closing Costs" value={closingCosts} onChange={setClosingCosts} step={500} />
        <NumberField label="Cash Out" value={cashOut} onChange={setCashOut} step={1000} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Current Monthly (P+I)" value={fmt(r.currentMonthly, 2)} />
        <Result label="New Monthly (P+I)" value={fmt(r.newMonthly, 2)} />
        <Result label="Monthly Savings" value={fmt(r.monthlySavings, 2)} copyValue={String(r.monthlySavings)} />
        <Result label="New Loan Amount" value={fmt(r.newLoanAmount, 0)} />
        <Result label="Break-even Point" value={r.breakEvenMonths === Infinity ? "Never" : `${r.breakEvenMonths} months`} />
        <Result label="Lifetime Savings/(Cost)" value={fmt(r.lifetimeSavings, 0)} copyValue={String(r.lifetimeSavings)} />
      </div>
      <SmallNote>Positive lifetime savings = refinance saves money. Break-even = months to recoup closing costs.</SmallNote>
    </Card>
  );
}

export const mortgageRefinance: CalculatorModule = {
  meta: {
    slug: "mortgage-refinance",
    title: "Mortgage Refinance Calculator",
    category: "Financial",
    description: "Compare current vs new mortgage. Calculate break-even point and lifetime savings.",
    keywords: ["mortgage refinance", "refi", "refinance calculator", "break even", "closing costs", "cash out refi", "mortgage savings", "interest rate"],
  },
  Calculator: C,
};