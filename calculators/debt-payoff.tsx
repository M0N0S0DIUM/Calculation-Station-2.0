"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface DebtPayoffProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: DebtPayoffProps) {
  const [balance, setBalance] = useState(() => Number(initialParams?.balance ?? 10000));
  const [apr, setApr] = useState(() => Number(initialParams?.apr ?? 18));
  const [monthlyPayment, setMonthlyPayment] = useState(() => Number(initialParams?.monthlyPayment ?? 300));

  const r = useMemo(() => {
    const monthlyRate = apr / 100 / 12;
    
    if (monthlyPayment <= balance * monthlyRate) {
      return { monthsToPayoff: Infinity, totalInterest: Infinity, yearsToPayoff: Infinity, totalPaid: Infinity, minMonths: Infinity, minTotalInterest: Infinity, minPayment: 0 };
    }
    
    const monthsToPayoff = Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate);
    const totalPaid = monthlyPayment * monthsToPayoff;
    const totalInterest = totalPaid - balance;
    const yearsToPayoff = monthsToPayoff / 12;
    
    // Minimum payment (just interest + 1% of balance)
    const minPayment = Math.max(25, balance * monthlyRate + balance * 0.01);
    const minMonths = monthlyRate === 0 ? balance / minPayment : 
      Math.log(minPayment / (minPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate);
    const minTotalPaid = minPayment * minMonths;
    const minTotalInterest = minTotalPaid - balance;
    
    return { monthsToPayoff, totalInterest, yearsToPayoff, totalPaid, minMonths, minTotalInterest, minPayment };
  }, [balance, apr, monthlyPayment]);

  const shareParams: ShareParams = { balance, apr, monthlyPayment };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Debt Payoff Calculator</h3>
      </div>
      <Grid>
        <NumberField label="Current Balance" value={balance} onChange={setBalance} step={100} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.1} suffix="%" />
        <NumberField label="Monthly Payment" value={monthlyPayment} onChange={setMonthlyPayment} step={25} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        {r.monthsToPayoff === Infinity ? (
          <Result label="⚠ Payment Too Low" value="Payment only covers interest" />
        ) : (
          <>
            <Result label="Months to Payoff" value={Math.ceil(r.monthsToPayoff).toString()} />
            <Result label="Years to Payoff" value={fmt(r.yearsToPayoff, 1)} />
            <Result label="Total Interest" value={r.monthsToPayoff === Infinity ? "∞" : fmt(r.totalInterest, 2)} copyValue={r.monthsToPayoff === Infinity ? "Infinity" : String(r.totalInterest)} />
            <Result label="Total Paid" value={r.monthsToPayoff === Infinity ? "∞" : fmt(r.totalPaid, 2)} />
            <Result label="Min Payment ({fmt(r.minPayment, 0)}/mo)" value={`${Math.ceil(r.minMonths)} mo`} />
            <Result label="Min Payment Total Interest" value={fmt(r.minTotalInterest, 2)} />
          </>
        )}
      </div>
      <SmallNote>Paying only minimum can take decades. Even small extra payments dramatically reduce time and interest.</SmallNote>
    </Card>
  );
}

export const debtPayoff: CalculatorModule = {
  meta: {
    slug: "debt-payoff",
    title: "Debt Payoff Calculator",
    category: "Financial",
    description: "Calculate months to become debt-free. Compare your payment vs minimum payment.",
    keywords: ["debt payoff", "debt free", "credit card payoff", "debt avalanche", "debt snowball", "interest", "minimum payment"],
  },
  Calculator: C,
};