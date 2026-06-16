"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtPct } from "@/lib/math";

interface APRToAPYCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: APRToAPYCalculatorProps) {
  const [apr, setApr] = useState(() => Number(initialParams?.apr ?? 6));
  const [n, setN] = useState(() => Number(initialParams?.n ?? 12));
  const r = useMemo(() => {
    const apy = (Math.pow(1 + (apr/100)/n, n) - 1) * 100;
    return { apy };
  }, [apr, n]);

  const shareParams: ShareParams = { apr, n };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Compounds per year" value={n} onChange={setN} step={1} min={1} />
      </Grid>
      <Hr />
      <Result label="APY" value={fmtPct(r.apy, 4)} />
    </Card>
  );
}

export const aprToApy: CalculatorModule = {
  meta: { slug: "apr-to-apy", title: "APR → APY", category: "Financial", description: "Convert APR to APY with compounding.", keywords: ["apr", "apy", "annual percentage rate", "annual percentage yield", "compounding", "convert", "effective rate", "nominal rate"] },
  Calculator: C,
};