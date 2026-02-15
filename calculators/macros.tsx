"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [cal, setCal] = useState(2200);
  const [p, setP] = useState(30);
  const [c, setC] = useState(40);
  const [f, setF] = useState(30);

  const r = useMemo(() => {
    const totalPct = p+c+f;
    const pG = (cal*(p/100))/4;
    const cG = (cal*(c/100))/4;
    const fG = (cal*(f/100))/9;
    return { totalPct, pG, cG, fG };
  }, [cal, p, c, f]);

  return (
    <Card>
      <Grid>
        <NumberField label="Calories/day" value={cal} onChange={setCal} step={10} />
        <NumberField label="Protein %" value={p} onChange={setP} step={1} suffix="%" />
        <NumberField label="Carbs %" value={c} onChange={setC} step={1} suffix="%" />
        <NumberField label="Fat %" value={f} onChange={setF} step={1} suffix="%" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Total %" value={`${fmt(r.totalPct, 0)}%`} />
        <Result label="Protein (g/day)" value={fmt(r.pG, 0)} />
        <Result label="Carbs (g/day)" value={fmt(r.cG, 0)} />
        <Result label="Fat (g/day)" value={fmt(r.fG, 0)} />
      </div>
      <Hr />
      <SmallNote>Protein/carbs=4 kcal/g, fat=9 kcal/g.</SmallNote>
    </Card>
  );
}

export const macros: CalculatorModule = {
  meta: { slug: "macros", title: "Macro Split", category: "Health", description: "Convert macro % to grams/day." },
  Calculator: C,
};
