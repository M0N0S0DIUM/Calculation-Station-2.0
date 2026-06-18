"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface MacrosCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: MacrosCalculatorProps) {
  const [cal, setCal] = useState<number | null>(() => Number(initialParams?.cal ?? 2200));
  const [p, setP] = useState<number | null>(() => Number(initialParams?.p ?? 30));
  const [c, setC] = useState<number | null>(() => Number(initialParams?.c ?? 40));
  const [f, setF] = useState<number | null>(() => Number(initialParams?.f ?? 30));

  const r = useMemo(() => {
    const cVal = c ?? 0;
    const calVal = cal ?? 0;
    const fVal = f ?? 0;
    const pVal = p ?? 0;

    const totalPct = pVal+cVal+fVal;
    const pG = (calVal*(pVal/100))/4;
    const cG = (calVal*(cVal/100))/4;
    const fG = (calVal*(fVal/100))/9;
    return { totalPct, pG, cG, fG };
  }, [cal, p, c, f]);

  const shareParams: ShareParams = { cal: cal ?? 0, p: p ?? 0, c: c ?? 0, f: f ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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
        <Result label="Total %" value={String(r.totalPct)} />
        <Result label="Protein (g)" value={fmt(r.pG, 1)} />
        <Result label="Carbs (g)" value={fmt(r.cG, 1)} />
        <Result label="Fat (g)" value={fmt(r.fG, 1)} />
      </div>
      <Hr />
      <SmallNote>Protein & carbs: 4 kcal/g. Fat: 9 kcal/g.</SmallNote>
    </Card>
  );
}

export const macros: CalculatorModule = {
  meta: { slug: "macros", title: "Macro Split", category: "Health", description: "Convert macro % to grams/day.", keywords: ["macros", "macronutrients", "protein", "carbs", "carbohydrates", "fat", "grams", "percentage", "split", "diet", "nutrition"] },
  Calculator: C,
};