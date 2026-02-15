"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

function C() {
  const [pv, setPv] = useState(5000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const fv = useMemo(() => pv * Math.pow(1 + rate/100, years), [pv, rate, years]);

  return (
    <Card>
      <Grid>
        <NumberField label="Present value" value={pv} onChange={setPv} step={100} />
        <NumberField label="Rate" value={rate} onChange={setRate} step={0.01} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={1} />
      </Grid>
      <div style={{ marginTop: 12 }}>
        <Result label="Future value" value={fmtMoney(fv)} />
      </div>
    </Card>
  );
}

export const futureValue: CalculatorModule = {
  meta: { slug: "future-value", title: "Future Value", category: "Financial", description: "FV from present value with rate." },
  Calculator: C,
};
