"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface LoanAmortizationProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: LoanAmortizationProps) {
  const [principal, setPrincipal] = useState<number | null>(() => Number(initialParams?.principal ?? 300000));
  const [apr, setApr] = useState<number | null>(() => Number(initialParams?.apr ?? 6.5));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 30));
  const [extraPayment, setExtraPayment] = useState<number | null>(() => Number(initialParams?.extraPayment ?? 0));

  const r = useMemo(() => {
    const aprVal = apr ?? 0;
    const extraPaymentVal = extraPayment ?? 0;
    const principalVal = principal ?? 0;
    const yearsVal = years ?? 0;

    const P = principalVal;
    const rm = (aprVal/100)/12;
    const n = Math.max(1, Math.round(yearsVal*12));
    
    let monthlyPI = 0;
    if (rm === 0) monthlyPI = P/n;
    else monthlyPI = P * (rm*Math.pow(1+rm, n)) / (Math.pow(1+rm, n)-1);
    
    // Standard payoff
    const totalPayment = monthlyPI * n;
    const totalInterest = totalPayment - P;
    
    // With extra payment
    let monthsWithExtra = 0;
    let interestWithExtra = 0;
    let balance = P;
    if (extraPaymentVal > 0) {
      while (balance > 0 && monthsWithExtra < n * 2) {
        const interest = balance * rm;
        const principalPayment = Math.min(monthlyPI - interest + extraPaymentVal, balance);
        balance -= principalPayment;
        interestWithExtra += interest;
        monthsWithExtra++;
      }
    }
    
    const timeSaved = n - monthsWithExtra;
    const interestSaved = totalInterest - interestWithExtra;
    
    return { 
      monthlyPI, 
      totalPayment, 
      totalInterest, 
      monthsWithExtra, 
      interestWithExtra, 
      timeSaved, 
      interestSaved 
    };
  }, [principal, apr, years, extraPayment]);

  const shareParams: ShareParams = { principal: principal ?? 0, apr: apr ?? 0, years: years ?? 0, extraPayment: extraPayment ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Loan Amortization (Extra Payments)</h3>
      </div>
      <Grid>
        <NumberField label="Loan Amount" value={principal} onChange={setPrincipal} step={1000} />
        <NumberField label="Annual Rate (APR)" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Term (Years)" value={years} onChange={setYears} step={1} min={1} />
        <NumberField label="Extra Monthly Payment" value={extraPayment} onChange={setExtraPayment} step={50} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Monthly Payment (P+I)" value={fmt(r.monthlyPI, 2)} copyValue={String(r.monthlyPI)} />
        <Result label="Total Paid (Standard)" value={fmt(r.totalPayment, 2)} />
        <Result label="Total Interest (Standard)" value={fmt(r.totalInterest, 2)} />
        {(extraPayment ?? 0) > 0 && (
          <>
            <Result label="Payoff Time (with Extra)" value={`${Math.floor(r.monthsWithExtra / 12)} yr ${r.monthsWithExtra % 12} mo`} />
            <Result label="Interest with Extra" value={fmt(r.interestWithExtra, 2)} />
            <Result label="Time Saved" value={`${Math.floor(r.timeSaved / 12)} yr ${r.timeSaved % 12} mo`} />
            <Result label="Interest Saved" value={fmt(r.interestSaved, 2)} />
          </>
        )}
      </div>
      <SmallNote>Extra payments go directly to principal, reducing interest and loan term.</SmallNote>
    </Card>
  );
}

export const loanAmortization: CalculatorModule = {
  meta: {
    slug: "loan-amortization",
    title: "Loan Amortization (Extra Payments)",
    category: "Financial",
    description: "See how extra monthly payments reduce loan term and interest.",
    keywords: ["loan", "amortization", "extra payment", "payoff early", "mortgage", "principal", "interest saved", "loan term"],
  },
  Calculator: C,
};
