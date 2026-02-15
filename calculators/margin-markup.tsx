"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtPct, fmtMoney } from "@/lib/math";

function C() {
  const [cost, setCost] = useState(50);
  const [price, setPrice] = useState(80);
  const r = useMemo(() => {
    const profit = price - cost;
    const margin = price !== 0 ? (profit/price)*100 : NaN;
    const markup = cost !== 0 ? (profit/cost)*100 : NaN;
    return { profit, margin, markup };
  }, [cost, price]);

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
  meta: { slug: "margin-markup", title: "Margin / Markup", category: "Financial", description: "Compute margin% and markup% from cost and price." },
  Calculator: C,
};
