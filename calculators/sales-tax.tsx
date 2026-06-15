"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface SalesTaxCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: SalesTaxCalculatorProps) {
  const [price, setPrice] = useState(() => Number(initialParams?.price ?? 100));
  const [taxPct, setTaxPct] = useState(() => Number(initialParams?.taxPct ?? 8.25));
  const r = useMemo(() => {
    const tax = price * taxPct/100;
    const total = price + tax;
    const baseFromTotal = (1 + taxPct/100) !== 0 ? total/(1+taxPct/100) : NaN;
    return { tax, total, baseFromTotal };
  }, [price, taxPct]);

  const shareParams: ShareParams = { price, taxPct };
  if (onStateChange) onStateChange(shareParams);

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