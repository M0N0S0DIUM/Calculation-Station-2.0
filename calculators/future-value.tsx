"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface FutureValueCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: FutureValueCalculatorProps) {
  const [pv, setPv] = useState(() => Number(initialParams?.pv ?? 1000));
  const [rate, setRate] = useState(() => Number(initialParams?.rate ?? 6));
  const [years, setYears] = useState(() => Number(initialParams?.years ?? 10));
  const fv = useMemo(() => pv * Math.pow(1 + rate/100, years), [pv, rate, years]);

  const shareParams: ShareParams = { pv, rate, years };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="Present value" value={pv} onChange={setPv} step={100} />
        <NumberField label="Rate" value={rate} onChange={setRate} step={0.01} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={1} />
      </Grid>
      <div style={{ marginTop: 12 }}>
        <Result label="Future value" value={fmtMoney(fv)} />
      </div>
    </Card>
  );
}

export const futureValue: CalculatorModule = {
  meta: { slug: "future-value", title: "Future Value", category: "Financial", description: "FV from present value with rate.", keywords: ["future value", "fv", "present value", "rate", "years", "compounding", "growth", "investment"] },
  Calculator: C,
};