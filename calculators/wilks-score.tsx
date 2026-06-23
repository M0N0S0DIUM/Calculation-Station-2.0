"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface Props {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: Props) {
  const [bw, setBw] = useState<number | null>(() => Number(initialParams?.bw ?? 82));
  const [total, setTotal] = useState<number | null>(() => Number(initialParams?.total ?? 400));
  const [sex, setSex] = useState<string>(() => String(initialParams?.sex ?? "male"));

  const result = useMemo(() => {
    const b = bw ?? 0;
    const t = total ?? 0;
    if (b <= 0 || t <= 0) return null;
    // Wilks2 coefficients
    const mCoeff = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-6, -1.291e-8];
    const fCoeff = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-5, -9.054e-8];
    const c = sex === "male" ? mCoeff : fCoeff;
    const denom = c[0] + c[1]*b + c[2]*b**2 + c[3]*b**3 + c[4]*b**4 + c[5]*b**5;
    const coeff = 500 / denom;
    return coeff * t;
  }, [bw, total, sex]);

  const shareParams: ShareParams = { bw: bw ?? 0, total: total ?? 0, sex };
  useEffect(() => { if (onStateChange) onStateChange(shareParams); }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField label="Sex" value={sex} onChange={setSex} options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]} />
        <NumberField label="Bodyweight" value={bw} onChange={setBw} step={0.5} suffix="kg" />
        <NumberField label="Total lifted" value={total} onChange={setTotal} step={2.5} suffix="kg" />
      </Grid>
      <Hr />
      <Result label="Wilks Score" value={result !== null ? fmt(result, 2) : "—"} />
      <SmallNote>Wilks2 formula. Compare strength across weight classes.</SmallNote>
    </Card>
  );
}

export const wilksScore: CalculatorModule = {
  meta: {
    slug: "wilks-score",
    title: "Wilks Score",
    category: "Health",
    description: "Compare powerlifting strength across bodyweight classes.",
    keywords: ["wilks", "wilks score", "powerlifting", "strength", "bodyweight", "total", "ipf", "competition", "wilks2", "coefficient"],
  },
  Calculator: C,
};
