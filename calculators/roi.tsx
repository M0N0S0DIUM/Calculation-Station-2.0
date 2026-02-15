"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtPct, fmtMoney } from "@/lib/math";

function C() {
  const [cost, setCost] = useState(1000);
  const [value, setValue] = useState(1300);
  const r = useMemo(() => {
    const profit = value - cost;
    const roi = cost !== 0 ? (profit/cost)*100 : NaN;
    return { profit, roi };
  }, [cost, value]);

  return (
    <Card>
      <Grid>
        <NumberField label="Cost" value={cost} onChange={setCost} step={10} />
        <NumberField label="Final value" value={value} onChange={setValue} step={10} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Profit" value={fmtMoney(r.profit)} />
        <Result label="ROI" value={fmtPct(r.roi)} />
      </div>
    </Card>
  );
}

export const roi: CalculatorModule = {
  meta: { slug: "roi", title: "ROI Calculator", category: "Financial", description: "Return on investment (%)." },
  Calculator: C,
};
