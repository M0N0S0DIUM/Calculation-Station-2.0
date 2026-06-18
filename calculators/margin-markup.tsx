"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtPct, fmtMoney } from "@/lib/math";

interface MarginMarkupCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: MarginMarkupCalculatorProps) {
  const [cost, setCost] = useState<number | null>(() => Number(initialParams?.cost ?? 50));
  const [price, setPrice] = useState<number | null>(() => Number(initialParams?.price ?? 80));
  const r = useMemo(() => {
    const costVal = cost ?? 0;
    const priceVal = price ?? 0;

    const profit = priceVal - costVal;
    const margin = priceVal !== 0 ? (profit/priceVal)*100 : NaN;
    const markup = costVal !== 0 ? (profit/costVal)*100 : NaN;
    return { profit, margin, markup };
  }, [cost, price]);

  const shareParams: ShareParams = { cost: cost ?? 0, price: price ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Cost" value={cost} onChange={setCost} step={0.01} />
        <NumberField label="Price" value={price} onChange={setPrice} step={0.01} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Profit" value={fmtMoney(r.profit)} />
        <Result label="Margin %" value={fmtPct(r.margin)} />
        <Result label="Markup %" value={fmtPct(r.markup)} />
      </div>
    </Card>
  );
}

export const marginMarkup: CalculatorModule = {
  meta: { slug: "margin-markup", title: "Margin / Markup", category: "Financial", description: "Compute margin% and markup% from cost and price.", keywords: ["margin", "markup", "profit margin", "cost", "price", "profit", "business", "pricing", "wholesale", "retail"] },
  Calculator: C,
};