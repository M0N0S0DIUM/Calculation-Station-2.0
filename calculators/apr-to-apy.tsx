"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmtPct } from "@/lib/math";

function C() {
  const [apr, setApr] = useState(6);
  const [n, setN] = useState(12); // compounding periods per year
  const r = useMemo(() => {
    const apy = (Math.pow(1 + (apr/100)/n, n) - 1) * 100;
    return { apy };
  }, [apr, n]);

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
  meta: { slug: "apr-to-apy", title: "APR → APY", category: "Financial", description: "Convert APR to APY with compounding." },
  Calculator: C,
};
