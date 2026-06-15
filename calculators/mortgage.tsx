"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

interface MortgageCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: MortgageCalculatorProps) {
  const [home, setHome] = useState(() => Number(initialParams?.home ?? 300000));
  const [downPct, setDownPct] = useState(() => Number(initialParams?.downPct ?? 20));
  const [apr, setApr] = useState(() => Number(initialParams?.apr ?? 6.75));
  const [years, setYears] = useState(() => Number(initialParams?.years ?? 30));
  const [tax, setTax] = useState(() => Number(initialParams?.tax ?? 250));
  const [ins, setIns] = useState(() => Number(initialParams?.ins ?? 120));
  const [hoa, setHoa] = useState(() => Number(initialParams?.hoa ?? 0));

  const r = useMemo(() => {
    const principal = home * (1 - downPct/100);
    const rm = (apr/100)/12;
    const n = Math.max(1, Math.round(years*12));
    let monthlyPI = 0;
    if (rm === 0) monthlyPI = principal/n;
    else monthlyPI = principal * (rm*Math.pow(1+rm, n)) / (Math.pow(1+rm, n)-1);
    const monthlyTax = tax/12;
    const monthlyIns = ins/12;
    const monthlyHoa = hoa/12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyHoa;
    const totalPaid = monthlyPI * n;
    const totalInterest = totalPaid - principal;
    return { principal, monthlyPI, monthlyTax, monthlyIns, monthlyHoa, totalMonthly, totalPaid, totalInterest };
  }, [home, downPct, apr, years, tax, ins, hoa]);

  const shareParams: ShareParams = { home, downPct, apr, years, tax, ins, hoa };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Mortgage Calculator</h3>
      </div>
      <Grid>
        <NumberField label="Home price" value={home} onChange={setHome} step={1000} />
        <NumberField label="Down %" value={downPct} onChange={setDownPct} step={1} suffix="%" min={0} max={100} />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Term (years)" value={years} onChange={setYears} step={1} min={1} />
        <NumberField label="Monthly tax" value={tax} onChange={setTax} step={10} />
        <NumberField label="Monthly insurance" value={ins} onChange={setIns} step={10} />
        <NumberField label="Monthly HOA" value={hoa} onChange={setHoa} step={10} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Principal" value={fmtMoney(r.principal)} />
        <Result label="Principal + Interest" value={fmtMoney(r.monthlyPI)} />
        <Result label="Tax + Insurance + HOA" value={fmtMoney(r.monthlyTax + r.monthlyIns + r.monthlyHoa)} />
        <Result label="Total monthly (PITI+HOA)" value={fmtMoney(r.totalMonthly)} />
        <Result label="Total paid" value={fmtMoney(r.totalPaid)} />
        <Result label="Total interest" value={fmtMoney(r.totalInterest)} />
      </div>
      <SmallNote>Estimate only. Consult a lender for exact terms.</SmallNote>
    </Card>
  );
}

export const mortgage: CalculatorModule = {
  meta: { slug: "mortgage", title: "Mortgage Calculator", category: "Financial", description: "Monthly PITI+HOA estimate.", keywords: ["mortgage", "home loan", "house payment", "piti", "down payment", "property tax", "insurance", "hoa", "pmi", "amortization"] },
  Calculator: C,
};