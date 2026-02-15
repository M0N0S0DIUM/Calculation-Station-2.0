"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney, fmt } from "@/lib/math";

function C() {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(24);
  const [payment, setPayment] = useState(200);

  const r = useMemo(() => {
    const rm = (apr/100)/12;
    if (balance <= 0 || payment <= 0 || apr < 0) return null;
    // simulate month by month to avoid weird formula edge cases
    let b = balance;
    let months = 0;
    let interestPaid = 0;
    const maxMonths = 1200;
    while (b > 0.01 && months < maxMonths) {
      const interest = b * rm;
      interestPaid += interest;
      b = b + interest - payment;
      months++;
      if (b > balance*10) break; // runaway
      if (payment <= interest + 0.01) {
        return { months: Infinity, interestPaid, totalPaid: NaN };
      }
    }
    const totalPaid = balance + interestPaid;
    return { months, interestPaid, totalPaid };
  }, [balance, apr, payment]);

  return (
    <Card>
      <Grid>
        <NumberField label="Balance" value={balance} onChange={setBalance} step={50} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Monthly payment" value={payment} onChange={setPayment} step={10} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Months to payoff" value={r?.months === Infinity ? "Never (payment too low)" : fmt(r?.months ?? NaN, 0)} />
        <Result label="Interest paid" value={fmtMoney(r?.interestPaid ?? NaN)} />
        <Result label="Total paid" value={fmtMoney(r?.totalPaid ?? NaN)} />
      </div>
      <Hr />
      <SmallNote>If payment ≤ monthly interest, balance never goes down.</SmallNote>
    </Card>
  );
}

export const creditCardPayoff: CalculatorModule = {
  meta: { slug: "credit-card-payoff", title: "Credit Card Payoff", category: "Financial", description: "Estimate months to payoff with fixed monthly payment." },
  Calculator: C,
};
