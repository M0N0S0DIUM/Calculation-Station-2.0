"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

function C() {
  const [P, setP] = useState(1000);
  const [apr, setApr] = useState(5);
  const [years, setYears] = useState(3);
  const r = useMemo(() => {
    const interest = P*(apr/100)*years;
    return { interest, total: P + interest };
  }, [P, apr, years]);

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
  meta: { slug: "simple-interest", title: "Simple Interest", category: "Financial", description: "Total = P + P·r·t." },
  Calculator: C,
};
