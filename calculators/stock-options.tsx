"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface StockOptionsProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: StockOptionsProps) {
  const [currentPrice, setCurrentPrice] = useState<number | null>(() => Number(initialParams?.currentPrice ?? 150));
  const [strikePrice, setStrikePrice] = useState<number | null>(() => Number(initialParams?.strikePrice ?? 140));
  const [optionPrice, setOptionPrice] = useState<number | null>(() => Number(initialParams?.optionPrice ?? 15));
  const [contracts, setContracts] = useState<number | null>(() => Number(initialParams?.contracts ?? 1));
  const [type, setType] = useState<"call" | "put">(
    () => (initialParams?.type as "call" | "put") ?? "call"
  );

  const r = useMemo(() => {
    const contractsVal = contracts ?? 0;
    const currentPriceVal = currentPrice ?? 0;
    const optionPriceVal = optionPrice ?? 0;
    const strikePriceVal = strikePrice ?? 0;

    const intrinsicValue = type === "call" 
      ? Math.max(0, currentPriceVal - strikePriceVal)
      : Math.max(0, strikePriceVal - currentPriceVal);
    const timeValue = optionPriceVal - intrinsicValue;
    const totalCost = optionPriceVal * 100 * contractsVal;
    const breakEven = type === "call" ? strikePriceVal + optionPriceVal : strikePriceVal - optionPriceVal;
    const maxLoss = totalCost;
    const intrinsicTotal = intrinsicValue * 100 * contractsVal;
    
    return { intrinsicValue, timeValue, totalCost, breakEven, maxLoss, intrinsicTotal };
  }, [currentPrice, strikePrice, optionPrice, contracts, type]);

  const shareParams: ShareParams = { currentPrice: currentPrice ?? 0, strikePrice: strikePrice ?? 0, optionPrice: optionPrice ?? 0, contracts: contracts ?? 0, type };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Stock Options Calculator</h3>
      </div>
      <SelectField
        label="Option Type"
        value={type}
        onChange={(v) => setType(v as "call" | "put")}
        options={[{ value: "call", label: "Call (Right to Buy)" }, { value: "put", label: "Put (Right to Sell)" }]}
      />
      <Hr />
      <Grid>
        <NumberField label="Current Stock Price" value={currentPrice} onChange={setCurrentPrice} step={0.5} />
        <NumberField label="Strike Price" value={strikePrice} onChange={setStrikePrice} step={0.5} />
        <NumberField label="Option Premium" value={optionPrice} onChange={setOptionPrice} step={0.1} />
        <NumberField label="Contracts" value={contracts} onChange={setContracts} step={1} min={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Intrinsic Value/Share" value={fmt(r.intrinsicValue, 2)} />
        <Result label="Time Value/Share" value={fmt(r.timeValue, 2)} />
        <Result label="Total Cost (Premium)" value={fmt(r.totalCost, 2)} copyValue={String(r.totalCost)} />
        <Result label="Break-even Price" value={fmt(r.breakEven, 2)} copyValue={String(r.breakEven)} />
        <Result label="Max Loss" value={fmt(r.maxLoss, 2)} />
        <Result label="Total Intrinsic Value" value={fmt(r.intrinsicTotal, 2)} />
      </div>
      <SmallNote>1 contract = 100 shares. Intrinsic = max(0, stock - strike) for calls, max(0, strike - stock) for puts.</SmallNote>
    </Card>
  );
}

export const stockOptions: CalculatorModule = {
  meta: {
    slug: "stock-options",
    title: "Stock Options Calculator",
    category: "Financial",
    description: "Calculate intrinsic value, time value, break-even, and total cost for call/put options.",
    keywords: ["stock options", "call option", "put option", "intrinsic value", "time value", "break even", "option premium", "derivatives"],
  },
  Calculator: C,
};