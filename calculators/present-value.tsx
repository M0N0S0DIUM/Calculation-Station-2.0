"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface PresentValueCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: PresentValueCalculatorProps) {
  const [fv, setFv] = useState<number | null>(() => Number(initialParams?.fv ?? 10000));
  const [rate, setRate] = useState<number | null>(() => Number(initialParams?.rate ?? 6));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 10));
  const pv = useMemo(() => {
    const fvVal = fv ?? 0;
    const rateVal = rate ?? 0;
    const yearsVal = years ?? 0;
    return fvVal / Math.pow(1 + rateVal/100, yearsVal);
  }, [fv, rate, years]);

  const shareParams: ShareParams = { fv: fv ?? 0, rate: rate ?? 0, years: years ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Future value" value={fv} onChange={setFv} step={100} />
        <NumberField label="Discount rate" value={rate} onChange={setRate} step={0.01} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={1} />
      </Grid>
      <div style={{ marginTop: 12 }}>
        <Result label="Present value" value={fmtMoney(pv)} />
      </div>
    </Card>
  );
}

export const presentValue: CalculatorModule = {
  meta: { slug: "present-value", title: "Present Value", category: "Financial", description: "PV of a future amount with discount rate.", keywords: ["present value", "pv", "future value", "discount rate", "time value of money", "discounting", "net present value"] },
  Calculator: C,
};