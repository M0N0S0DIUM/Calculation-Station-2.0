"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface SalesTaxCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: SalesTaxCalculatorProps) {
  const [price, setPrice] = useState<number | null>(() => Number(initialParams?.price ?? 100));
  const [taxPct, setTaxPct] = useState<number | null>(() => Number(initialParams?.taxPct ?? 8.25));
  const r = useMemo(() => {
    const priceVal = price ?? 0;
    const taxPctVal = taxPct ?? 0;

    const tax = priceVal * taxPctVal/100;
    const total = priceVal + tax;
    const baseFromTotal = (1 + taxPctVal/100) !== 0 ? total/(1+taxPctVal/100) : NaN;
    return { tax, total, baseFromTotal };
  }, [price, taxPct]);

  const shareParams: ShareParams = { price: price ?? 0, taxPct: taxPct ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Pre-tax price" value={price} onChange={setPrice} step={0.01} />
        <NumberField label="Tax rate" value={taxPct} onChange={setTaxPct} step={0.01} suffix="%" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Tax amount" value={fmtMoney(r.tax)} />
        <Result label="Total with tax" value={fmtMoney(r.total)} />
        <Result label="Base from total (if you typed total as price)" value={fmtMoney(r.baseFromTotal)} />
      </div>
    </Card>
  );
}

export const salesTax: CalculatorModule = {
  meta: { slug: "sales-tax", title: "Sales Tax", category: "Financial", description: "Add/remove sales tax.", keywords: ["sales tax", "tax", "vat", "gst", "add tax", "remove tax", "pre-tax", "post-tax", "total"] },
  Calculator: C,
};