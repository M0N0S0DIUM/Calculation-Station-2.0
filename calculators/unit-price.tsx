"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface UnitPriceCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: UnitPriceCalculatorProps) {
  const [price, setPrice] = useState(() => Number(initialParams?.price ?? 9.99));
  const [qty, setQty] = useState(() => Number(initialParams?.qty ?? 12));
  const [units, setUnits] = useState(() => Number(initialParams?.units ?? 16));
  const r = useMemo(() => ({
    perItem: qty !== 0 ? price/qty : NaN,
    perUnit: units !== 0 ? price/units : NaN
  }), [price, qty, units]);

  const shareParams: ShareParams = { price, qty, units };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="Total price" value={price} onChange={setPrice} step={0.01} />
        <NumberField label="Quantity (items)" value={qty} onChange={setQty} step={1} />
        <NumberField label="Units (oz, mL, etc.)" value={units} onChange={setUnits} step={0.01} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Price per item" value={fmtMoney(r.perItem)} />
        <Result label="Price per unit" value={fmtMoney(r.perUnit)} />
      </div>
    </Card>
  );
}

export const unitPrice: CalculatorModule = {
  meta: { slug: "unit-price", title: "Unit Price", category: "Basic", description: "Cost per item or per unit.", keywords: ["unit price", "cost per item", "price per unit", "comparison", "shopping", "value"] },
  Calculator: C,
};