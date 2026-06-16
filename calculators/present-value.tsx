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
  const [fv, setFv] = useState(() => Number(initialParams?.fv ?? 10000));
  const [rate, setRate] = useState(() => Number(initialParams?.rate ?? 6));
  const [years, setYears] = useState(() => Number(initialParams?.years ?? 10));
  const pv = useMemo(() => fv / Math.pow(1 + rate/100, years), [fv, rate, years]);

  const shareParams: ShareParams = { fv, rate, years };
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