"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface MacrosCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: MacrosCalculatorProps) {
  const [cal, setCal] = useState(() => Number(initialParams?.cal ?? 2200));
  const [p, setP] = useState(() => Number(initialParams?.p ?? 30));
  const [c, setC] = useState(() => Number(initialParams?.c ?? 40));
  const [f, setF] = useState(() => Number(initialParams?.f ?? 30));

  const r = useMemo(() => {
    const totalPct = p+c+f;
    const pG = (cal*(p/100))/4;
    const cG = (cal*(c/100))/4;
    const fG = (cal*(f/100))/9;
    return { totalPct, pG, cG, fG };
  }, [cal, p, c, f]);

  const shareParams: ShareParams = { cal, p, c, f };
  if (onStateChange) onStateChange(shareParams);

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