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
  const [cost, setCost] = useState(() => Number(initialParams?.cost ?? 50));
  const [price, setPrice] = useState(() => Number(initialParams?.price ?? 80));
  const r = useMemo(() => {
    const profit = price - cost;
    const margin = price !== 0 ? (profit/price)*100 : NaN;
    const markup = cost !== 0 ? (profit/cost)*100 : NaN;
    return { profit, margin, markup };
  }, [cost, price]);

  const shareParams: ShareParams = { cost, price };
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