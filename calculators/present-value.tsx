"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

function C() {
  const [fv, setFv] = useState(10000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const pv = useMemo(() => fv / Math.pow(1 + rate/100, years), [fv, rate, years]);

  return (
    <Card>
      <Grid>
        <NumberField label="Future value" value={fv} onChange={setFv} step={100} />
        <NumberField label="Discount rate" value={rate} onChange={setRate} step={0.01} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={1} />
      </Grid>
      <div style={{ marginTop: 12 }}>
        <Result label="Present value" value={fmtMoney(pv)} />
      </div>
    </Card>
  );
}

export const presentValue: CalculatorModule = {
  meta: { slug: "present-value", title: "Present Value", category: "Financial", description: "PV of a future amount with discount rate." },
  Calculator: C,
};
