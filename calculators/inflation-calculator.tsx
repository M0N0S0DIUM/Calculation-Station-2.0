"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface InflationCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: InflationCalculatorProps) {
  const [amount, setAmount] = useState<number | null>(() => Number(initialParams?.amount ?? 10000));
  const [inflationRate, setInflationRate] = useState<number | null>(() => Number(initialParams?.inflationRate ?? 3));
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 10));
  const [mode, setMode] = useState<"future" | "past">(
    () => (initialParams?.mode as "future" | "past") ?? "future"
  );

  const r = useMemo(() => {
    const amountVal = amount ?? 0;
    const inflationRateVal = inflationRate ?? 0;
    const yearsVal = years ?? 0;

    const factor = Math.pow(1 + inflationRateVal / 100, yearsVal);
    let futureValue = 0;
    let pastValue = 0;
    if (mode === "future") {
      futureValue = amountVal * factor;
      pastValue = amountVal / factor;
    } else {
      pastValue = amountVal * factor;
      futureValue = amountVal / factor;
    }
    const purchasingPower = (1 / factor) * 100;
    return { futureValue, pastValue, purchasingPower, factor };
  }, [amount, inflationRate, years, mode]);

  const shareParams: ShareParams = { amount: amount ?? 0, inflationRate: inflationRate ?? 0, years: years ?? 0, mode: mode ?? 'future' };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Inflation Calculator</h3>
      </div>
      <SelectField
        label="Direction"
        value={mode}
        onChange={(v) => setMode(v as "future" | "past")}
        options={[{ value: "future", label: "Today's $ → Future Value" }, { value: "past", label: "Today's $ → Past Value" }]}
      />
      <Hr />
      <Grid>
        <NumberField label="Amount" value={amount} onChange={setAmount} step={100} />
        <NumberField label="Annual Inflation Rate" value={inflationRate} onChange={setInflationRate} step={0.1} suffix="%" min={0} max={100} />
        <NumberField label="Years" value={years} onChange={setYears} step={1} min={1} max={100} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        {mode === "future" ? (
          <>
            <Result label="Future Value" value={fmt(r.futureValue, 2)} copyValue={String(r.futureValue)} />
            <Result label="Equivalent Today" value={fmt(r.pastValue, 2)} />
          </>
        ) : (
          <>
            <Result label="Past Value" value={fmt(r.pastValue, 2)} copyValue={String(r.pastValue)} />
            <Result label="Equivalent Today" value={fmt(r.futureValue, 2)} />
          </>
        )}
        <Result label="Purchasing Power Remaining" value={fmt(r.purchasingPower, 1) + "%"} />
        <Result label="Cumulative Inflation Factor" value={fmt(r.factor, 3) + "x"} />
      </div>
      <SmallNote>Shows how inflation erodes purchasing power over time. US average ~3% historically.</SmallNote>
    </Card>
  );
}

export const inflationCalculator: CalculatorModule = {
  meta: {
    slug: "inflation-calculator",
    title: "Inflation Calculator",
    category: "Financial",
    description: "Calculate future/past purchasing power with custom inflation rates.",
    keywords: ["inflation", "purchasing power", "cpi", "future value", "past value", "money value", "cost of living", "real value"],
  },
  Calculator: C,
};