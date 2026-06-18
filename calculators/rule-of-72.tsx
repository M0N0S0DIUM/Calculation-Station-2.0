"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface RuleOf72Props {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: RuleOf72Props) {
  const [rate, setRate] = useState<number | null>(() => Number(initialParams?.rate ?? 7));
  const [amount, setAmount] = useState<number | null>(() => Number(initialParams?.amount ?? 10000));

  const r = useMemo(() => {
    const amountVal = amount ?? 0;
    const rateVal = rate ?? 0;

    const yearsToDouble = 72 / rateVal;
    const yearsToTriple = 114 / rateVal;
    const yearsToQuadruple = 144 / rateVal;
    const futureValue2x = amountVal * 2;
    const futureValue3x = amountVal * 3;
    const futureValue4x = amountVal * 4;
    return { yearsToDouble, yearsToTriple, yearsToQuadruple, futureValue2x, futureValue3x, futureValue4x };
  }, [rate, amount]);

  const shareParams: ShareParams = { rate: rate ?? 0, amount: amount ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Rule of 72 / 114 / 144</h3>
      </div>
      <Grid>
        <NumberField label="Annual Return Rate" value={rate} onChange={setRate} step={0.1} suffix="%" min={0.1} max={100} />
        <NumberField label="Initial Amount" value={amount} onChange={setAmount} step={100} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Time to Double (72/rate)" value={fmt(r.yearsToDouble, 1) + " years"} copyValue={String(r.yearsToDouble)} />
        <Result label="Amount when Doubled" value={fmt(r.futureValue2x, 2)} />
        <Result label="Time to Triple (114/rate)" value={fmt(r.yearsToTriple, 1) + " years"} copyValue={String(r.yearsToTriple)} />
        <Result label="Amount when Tripled" value={fmt(r.futureValue3x, 2)} />
        <Result label="Time to 4x (144/rate)" value={fmt(r.yearsToQuadruple, 1) + " years"} copyValue={String(r.yearsToQuadruple)} />
        <Result label="Amount when 4x" value={fmt(r.futureValue4x, 2)} />
      </div>
      <SmallNote>Rule of 72: years to double = 72 ÷ rate. 114 for triple, 144 for quadruple. Approximate for 6-10% returns.</SmallNote>
    </Card>
  );
}

export const ruleOf72: CalculatorModule = {
  meta: {
    slug: "rule-of-72",
    title: "Rule of 72 / 114 / 144",
    category: "Financial",
    description: "Quick mental math: years to double, triple, or quadruple your money.",
    keywords: ["rule of 72", "rule of 114", "rule of 144", "double money", "triple money", "compound interest", "mental math", "investment"],
  },
  Calculator: C,
};