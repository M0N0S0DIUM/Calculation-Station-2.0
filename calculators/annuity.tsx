"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney, fmt } from "@/lib/math";

interface AnnuityCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: AnnuityCalculatorProps) {
  const [payment, setPayment] = useState<number | null>(() => Number(initialParams?.payment ?? 500));
  const [apr, setApr] = useState<number | null>(() => Number(initialParams?.apr ?? 5));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 20));
  const [type, setType] = useState<"ordinary" | "due">(
    () => (initialParams?.type as "ordinary" | "due") ?? "ordinary"
  );

  const r = useMemo(() => {
    const aprVal = apr ?? 0;
    const paymentVal = payment ?? 0;
    const yearsVal = years ?? 0;

    const n = yearsVal * 12;
    const i = aprVal / 100 / 12;
    
    let fv = 0;
    if (i === 0) {
      fv = paymentVal * n;
    } else {
      fv = paymentVal * ((Math.pow(1 + i, n) - 1) / i);
      if (type === "due") fv *= (1 + i);
    }
    
    const totalPaid = paymentVal * n;
    const interest = fv - totalPaid;
    
    // Present value
    let pv = 0;
    if (i === 0) {
      pv = paymentVal * n;
    } else {
      pv = paymentVal * ((1 - Math.pow(1 + i, -n)) / i);
      if (type === "due") pv *= (1 + i);
    }
    
    return { fv, pv, totalPaid, interest, n };
  }, [payment, apr, years, type]);

  const shareParams: ShareParams = { payment: payment ?? 0, apr: apr ?? 0, years: years ?? 0, type };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Annuity Calculator</h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 mb-4">
        <label className="grid gap-2">
          <div className="text-sm text-neutral-400">Payment timing</div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "ordinary" | "due")}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm outline-none transition focus:border-neutral-600 focus:ring-2 focus:ring-white/10"
          >
            <option value="ordinary">Ordinary (end of period)</option>
            <option value="due">Annuity due (start of period)</option>
          </select>
        </label>
      </div>
      <Grid>
        <NumberField label="Periodic payment" value={payment} onChange={setPayment} step={10} />
        <NumberField label="Annual rate (APR)" value={apr} onChange={setApr} step={0.1} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={1} min={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Future value" value={fmtMoney(r.fv)} copyValue={String(r.fv)} />
        <Result label="Present value" value={fmtMoney(r.pv)} copyValue={String(r.pv)} />
        <Result label="Total payments" value={fmtMoney(r.totalPaid)} />
        <Result label="Interest earned" value={fmtMoney(r.interest)} />
      </div>
      <SmallNote>Ordinary annuity: payments at period end. Annuity due: payments at period start.</SmallNote>
    </Card>
  );
}

export const annuity: CalculatorModule = {
  meta: {
    slug: "annuity",
    title: "Annuity Calculator",
    category: "Financial",
    description: "Future & present value of regular payments (ordinary or due).",
    keywords: ["annuity", "future value", "present value", "ordinary annuity", "annuity due", "retirement", "pension", "periodic payments"],
  },
  Calculator: C,
};