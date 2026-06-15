"use client";

import React, { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney, fmt } from "@/lib/math";

interface CreditCardPayoffCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: CreditCardPayoffCalculatorProps) {
  const [balance, setBalance] = useState(() => Number(initialParams?.balance ?? 5000));
  const [apr, setApr] = useState(() => Number(initialParams?.apr ?? 24));
  const [payment, setPayment] = useState(() => Number(initialParams?.payment ?? 200));

  const r = useMemo(() => {
    const rm = (apr/100)/12;
    if (balance <= 0 || payment <= 0 || apr < 0) return null;
    let b = balance;
    let months = 0;
    let interestPaid = 0;
    const maxMonths = 1200;
    // Assumes no new charges
    while (b > 0.01 && months < maxMonths) {
      const interest = b * rm;
      interestPaid += interest;
      b = b + interest - payment;
      months++;
      if (b > balance*10) break;
      if (payment <= interest + 0.01) {
        return { months: Infinity, interestPaid, totalPaid: NaN };
      }
    }
    const totalPaid = balance + interestPaid;
    return { months, interestPaid, totalPaid };
  }, [balance, apr, payment]);

  const shareParams: ShareParams = { balance, apr, payment };
  if (onStateChange) onStateChange(shareParams);

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