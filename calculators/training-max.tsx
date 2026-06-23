"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface Props {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: Props) {
  const [oneRM, setOneRM] = useState<number | null>(() => Number(initialParams?.oneRM ?? 200));

  const result = useMemo(() => {
    const rm = oneRM ?? 0;
    if (rm <= 0) return null;
    return {
      tm90: rm * 0.9,
      tm85: rm * 0.85,
      tm: rm * 0.9,
      week1: [rm * 0.9 * 0.65, rm * 0.9 * 0.75, rm * 0.9 * 0.85],
      week2: [rm * 0.9 * 0.70, rm * 0.9 * 0.80, rm * 0.9 * 0.90],
      week3: [rm * 0.9 * 0.75, rm * 0.9 * 0.85, rm * 0.9 * 0.95],
    };
  }, [oneRM]);

  const shareParams: ShareParams = { oneRM: oneRM ?? 0 };
  useEffect(() => { if (onStateChange) onStateChange(shareParams); }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="1 Rep Max" value={oneRM} onChange={setOneRM} step={2.5} />
      </Grid>
      <Hr />
      {result ? (
        <div style={{ display: "grid", gap: 8 }}>
          <Result label="Training Max (90% of 1RM)" value={fmt(result.tm, 1)} />
          <Hr />
          <Result label="Week 1 — Set 1 (65%)" value={fmt(result.week1[0], 1)} />
          <Result label="Week 1 — Set 2 (75%)" value={fmt(result.week1[1], 1)} />
          <Result label="Week 1 — Set 3 (85%)" value={fmt(result.week1[2], 1)} />
          <Hr />
          <Result label="Week 2 — Set 1 (70%)" value={fmt(result.week2[0], 1)} />
          <Result label="Week 2 — Set 2 (80%)" value={fmt(result.week2[1], 1)} />
          <Result label="Week 2 — Set 3 (90%)" value={fmt(result.week2[2], 1)} />
          <Hr />
          <Result label="Week 3 — Set 1 (75%)" value={fmt(result.week3[0], 1)} />
          <Result label="Week 3 — Set 2 (85%)" value={fmt(result.week3[1], 1)} />
          <Result label="Week 3 — Set 3 (95%)" value={fmt(result.week3[2], 1)} />
        </div>
      ) : (
        <div style={{ color: "#888", fontSize: 14 }}>Enter your 1RM to see training percentages.</div>
      )}
      <SmallNote>Based on Jim Wendler 5/3/1. Training max = 90% of 1RM.</SmallNote>
    </Card>
  );
}

export const trainingMax: CalculatorModule = {
  meta: {
    slug: "training-max",
    title: "Training Max (5/3/1)",
    category: "Health",
    description: "Calculate 5/3/1 training max and working sets from your 1RM.",
    keywords: ["training max", "531", "5/3/1", "wendler", "powerlifting", "working sets", "percentages", "strength training", "1rm", "programming"],
  },
  Calculator: C,
};
