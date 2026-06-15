"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface SimpleInterestCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: SimpleInterestCalculatorProps) {
  const [P, setP] = useState(() => Number(initialParams?.P ?? 1000));
  const [apr, setApr] = useState(() => Number(initialParams?.apr ?? 5));
  const [years, setYears] = useState(() => Number(initialParams?.years ?? 3));
  const r = useMemo(() => {
    const interest = P*(apr/100)*years;
    return { interest, total: P + interest };
  }, [P, apr, years]);

  const shareParams: ShareParams = { P, apr, years };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="Principal" value={P} onChange={setP} step={10} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} step={0.25} />
      </Grid>
      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        <Result label="Interest" value={fmtMoney(r.interest)} />
        <Result label="Total" value={fmtMoney(r.total)} />
      </div>
    </Card>
  );
}

export const simpleInterest: CalculatorModule = {
  meta: { slug: "simple-interest", title: "Simple Interest", category: "Financial", description: "Total = P + P·r·t.", keywords: ["simple interest", "principal", "rate", "time", "interest", "total", "p+r+t", "basic interest"] },
  Calculator: C,
};