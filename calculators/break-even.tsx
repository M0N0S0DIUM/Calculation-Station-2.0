"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt, fmtMoney } from "@/lib/math";

function C() {
  const [fixed, setFixed] = useState(10000);
  const [price, setPrice] = useState(50);
  const [variable, setVariable] = useState(20);

  const r = useMemo(() => {
    const contrib = price - variable;
    const units = contrib > 0 ? fixed / contrib : Infinity;
    const revenue = units !== Infinity ? units * price : NaN;
    return { contrib, units, revenue };
  }, [fixed, price, variable]);

  return (
    <Card>
      <Grid>
        <NumberField label="Fixed costs" value={fixed} onChange={setFixed} step={100} />
        <NumberField label="Price per unit" value={price} onChange={setPrice} step={0.01} />
        <NumberField label="Variable cost/unit" value={variable} onChange={setVariable} step={0.01} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Contribution margin/unit" value={fmtMoney(r.contrib)} />
        <Result label="Units to break even" value={r.units === Infinity ? "Never (price ≤ variable)" : fmt(r.units, 2)} />
        <Result label="Break-even revenue" value={fmtMoney(r.revenue)} />
      </div>
      <Hr />
      <SmallNote>Classic CVP: units = fixed / (price - variable).</SmallNote>
    </Card>
  );
}

export const breakEven: CalculatorModule = {
  meta: { slug: "break-even", title: "Break-even Point", category: "Financial", description: "Units to break even: fixed / (price - variable)." },
  Calculator: C,
};
