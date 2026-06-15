"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface TipCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: TipCalculatorProps) {
  const [bill, setBill] = useState(() => Number(initialParams?.bill ?? 45.00));
  const [tipPct, setTipPct] = useState(() => Number(initialParams?.tipPct ?? 20));
  const [people, setPeople] = useState(() => Number(initialParams?.people ?? 2));
  const r = useMemo(() => {
    const tip = bill * tipPct/100;
    const total = bill + tip;
    const per = people > 0 ? total/people : NaN;
    return { tip, total, per };
  }, [bill, tipPct, people]);

  const shareParams: ShareParams = { bill, tipPct, people };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="Bill" value={bill} onChange={setBill} step={0.01} />
        <NumberField label="Tip %" value={tipPct} onChange={setTipPct} step={0.5} suffix="%" />
        <NumberField label="People" value={people} onChange={setPeople} step={1} min={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Tip" value={fmtMoney(r.tip)} />
        <Result label="Total" value={fmtMoney(r.total)} />
        <Result label="Per person" value={fmtMoney(r.per)} />
      </div>
    </Card>
  );
}

export const tip: CalculatorModule = {
  meta: { slug: "tip", title: "Tip Calculator", category: "Financial", description: "Tip amount and total bill.", keywords: ["tip", "gratuity", "bill", "split", "per person", "restaurant", "dining"] },
  Calculator: C,
};