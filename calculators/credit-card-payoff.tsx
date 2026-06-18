"use client";

import React, { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney, fmt } from "@/lib/math";

interface CreditCardPayoffCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: CreditCardPayoffCalculatorProps) {
  const [balance, setBalance] = useState<number | null>(() => Number(initialParams?.balance ?? 5000));
  const [apr, setApr] = useState<number | null>(() => Number(initialParams?.apr ?? 24));
  const [payment, setPayment] = useState<number | null>(() => Number(initialParams?.payment ?? 200));

  const r = useMemo(() => {
    const aprVal = apr ?? 0;
    const balanceVal = balance ?? 0;
    const paymentVal = payment ?? 0;

    const rm = (aprVal/100)/12;
    if (balanceVal <= 0 || paymentVal <= 0 || aprVal < 0) return null;
    let b = balanceVal;
    let months = 0;
    let interestPaid = 0;
    const maxMonths = 1200;
    // Assumes no new charges
    while (b > 0.01 && months < maxMonths) {
      const interest = b * rm;
      interestPaid += interest;
      b = b + interest - paymentVal;
      months++;
      if (b > balanceVal*10) break;
      if (paymentVal <= interest + 0.01) {
        return { months: Infinity, interestPaid, totalPaid: NaN };
      }
    }
    const totalPaid = balanceVal + interestPaid;
    return { months, interestPaid, totalPaid };
  }, [balance, apr, payment]);

  const shareParams: ShareParams = { balance: balance ?? 0, apr: apr ?? 0, payment: payment ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Balance" value={balance} onChange={setBalance} step={100} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Monthly payment" value={payment} onChange={setPayment} step={10} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        {r ? (
          <div>
            <Result label="Months to payoff" value={r.months === Infinity ? "Never (payment ≤ interest)" : String(r.months)} />
            <Result label="Interest paid" value={fmtMoney(r.interestPaid)} />
            <Result label="Total paid" value={fmtMoney(r.totalPaid)} />
          </div>
        ) : (
          <Result label="—" value="Invalid inputs" />
        )}
      </div>
      <SmallNote>Assumes no new charges. Payoff may vary with rounding.</SmallNote>
    </Card>
  );
}

export const creditCardPayoff: CalculatorModule = {
  meta: { slug: "credit-card-payoff", title: "Credit Card Payoff", category: "Financial", description: "Estimate months to payoff with fixed monthly payment.", keywords: ["credit card", "payoff", "debt", "balance", "apr", "monthly payment", "interest", "pay off", "credit card debt"] },
  Calculator: C,
};