"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(4);
  const r = useMemo(() => {
    // a/b = c/d => d = (b*c)/a
    const d = a !== 0 ? (b*c)/a : NaN;
    return { d };
  }, [a,b,c]);

  return (
    <Card>
      <Grid>
        <NumberField label="a" value={a} onChange={setA} step={0.01} />
        <NumberField label="b" value={b} onChange={setB} step={0.01} />
        <NumberField label="c" value={c} onChange={setC} step={0.01} />
      </Grid>
      <Hr />
      <Result label="d (a:b = c:d)" value={fmt(r.d)} />
      <Hr />
      <SmallNote>Formula: d = (b·c)/a</SmallNote>
    </Card>
  );
}

export const ratioProportion: CalculatorModule = {
  meta: { slug: "ratio-proportion", title: "Ratio / Proportion", category: "Basic", description: "Solve a:b = c:d for missing value." },
  Calculator: C,
};
