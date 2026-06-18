"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface DollarCostAveragingProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: DollarCostAveragingProps) {
  const [totalInvested, setTotalInvested] = useState<number | null>(() => Number(initialParams?.totalInvested ?? 12000));
  const [frequency, setFrequency] = useState<"monthly" | "weekly" | "biweekly">(
    () => (initialParams?.frequency as "monthly" | "weekly" | "biweekly") ?? "monthly"
  );
  const [years, setYears] = useState<number | null>(() => Number(initialParams?.years ?? 10));
  const [scenario, setScenario] = useState<"lump" | "dca" | "both">(
    () => (initialParams?.scenario as "lump" | "dca" | "both") ?? "both"
  );

  const r = useMemo(() => {
    const totalInvestedVal = totalInvested ?? 0;
    const yearsVal = years ?? 0;

    const periods = frequency === "monthly" ? 12 : frequency === "weekly" ? 52 : 26;
    const totalPeriods = yearsVal * periods;
    const perPeriod = totalInvestedVal / totalPeriods;
    
    // Lump sum: all invested at start
    const lumpSumValue = totalInvestedVal;
    
    // DCA: invested evenly over time
    // Average entry price is roughly middle of period
    const dcaEffectiveInvestment = totalInvestedVal;
    
    return { totalPeriods, perPeriod, lumpSumValue, dcaEffectiveInvestment, totalInvested: totalInvestedVal };
  }, [totalInvested, frequency, years]);

  const shareParams: ShareParams = { totalInvested: totalInvested ?? 0, frequency, years: years ?? 0, scenario };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Dollar Cost Averaging vs Lump Sum</h3>
      </div>
      <SelectField
        label="Comparison"
        value={scenario}
        onChange={(v) => setScenario(v as "lump" | "dca" | "both")}
        options={[
          { value: "lump", label: "Lump Sum Only" },
          { value: "dca", label: "DCA Only" },
          { value: "both", label: "Compare Both" }
        ]}
      />
      <Hr />
      <Grid>
        <NumberField label="Total to Invest" value={totalInvested} onChange={setTotalInvested} step={1000} />
        <NumberField label="Investment Frequency" value={frequency === "monthly" ? 12 : frequency === "weekly" ? 52 : 26} onChange={() => {}} step={1} suffix="times/yr" />
        <NumberField label="Time Period" value={years} onChange={setYears} step={1} min={1} suffix="years" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Total Periods" value={String(r.totalPeriods)} />
        <Result label="Per Period Investment" value={fmt(r.perPeriod, 2)} />
        <Result label="Total Invested" value={fmt(r.totalInvested, 2)} />
        <Result label="Average Entry Price Benefit" value="Lower volatility impact" />
      </div>
      <SmallNote>DCA smooths entry price over time. Lump sum wins in rising markets; DCA reduces timing risk.</SmallNote>
    </Card>
  );
}

export const dollarCostAveraging: CalculatorModule = {
  meta: {
    slug: "dollar-cost-averaging",
    title: "Dollar Cost Averaging (DCA)",
    category: "Financial",
    description: "Compare lump sum vs periodic investing. Calculate per-period investment amounts.",
    keywords: ["dollar cost averaging", "DCA", "lump sum", "periodic investing", "investment strategy", "market timing", "volatility"],
  },
  Calculator: C,
};