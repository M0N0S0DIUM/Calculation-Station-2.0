"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, ShareButton } from "@/components/ui";
import { fmtMoney } from "@/lib/math";

function C() {
  const [home, setHome] = useState(300000);
  const [downPct, setDownPct] = useState(20);
  const [apr, setApr] = useState(6.75);
  const [years, setYears] = useState(30);
  const [tax, setTax] = useState(250);
  const [ins, setIns] = useState(120);
  const [hoa, setHoa] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const h = params.get("home");
    const d = params.get("downPct");
    const a = params.get("apr");
    const y = params.get("years");
    const t = params.get("tax");
    const i = params.get("ins");
    const o = params.get("hoa");
    if (h) setHome(Number(h));
    if (d) setDownPct(Number(d));
    if (a) setApr(Number(a));
    if (y) setYears(Number(y));
    if (t) setTax(Number(t));
    if (i) setIns(Number(i));
    if (o) setHoa(Number(o));
  }, []);

  const r = useMemo(() => {
    const down = home * downPct/100;
    const P = home - down;
    const rm = (apr/100)/12;
    const n = Math.max(1, Math.round(years*12));
    if (P <= 0 || apr < 0) return null;
    const pi = rm === 0 ? P/n : P*(rm*Math.pow(1+rm,n))/(Math.pow(1+rm,n)-1);
    const total = pi + tax + ins + hoa;
    return { down, loan: P, pi, total };
  }, [home, downPct, apr, years, tax, ins, hoa]);

  const shareParams = useMemo(() => ({
    home,
    downPct,
    apr,
    years,
    tax,
    ins,
    hoa,
  }), [home, downPct, apr, years, tax, ins, hoa]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Mortgage Calculator</h3>
        <ShareButton slug="mortgage" params={shareParams} />
      </div>
      <Grid>
        <NumberField label="Home price" value={home} onChange={setHome} step={1000} />
        <NumberField label="Down %" value={downPct} onChange={setDownPct} step={0.5} suffix="%" />
        <NumberField label="APR" value={apr} onChange={setApr} step={0.01} suffix="%" />
        <NumberField label="Term (years)" value={years} onChange={setYears} step={1} />
        <NumberField label="Taxes (monthly)" value={tax} onChange={setTax} step={10} />
        <NumberField label="Insurance (monthly)" value={ins} onChange={setIns} step={10} />
        <NumberField label="HOA/PMI (monthly)" value={hoa} onChange={setHoa} step={10} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Down payment" value={fmtMoney(r?.down ?? NaN)} copyValue={r?.down ? String(r.down) : undefined} />
        <Result label="Loan amount" value={fmtMoney(r?.loan ?? NaN)} copyValue={r?.loan ? String(r.loan) : undefined} />
        <Result label="P&I payment" value={fmtMoney(r?.pi ?? NaN)} copyValue={r?.pi ? String(r.pi) : undefined} />
        <Result label="Total monthly" value={fmtMoney(r?.total ?? NaN)} copyValue={r?.total ? String(r.total) : undefined} />
      </div>
      <Hr />
      <SmallNote>PMI varies; put it into HOA/PMI if needed.</SmallNote>
    </Card>
  );
}

export const mortgage: CalculatorModule = {
  meta: { slug: "mortgage", title: "Mortgage Calculator", category: "Financial", description: "Monthly PITI+HOA estimate.", keywords: ["mortgage", "home loan", "house payment", "piti", "down payment", "property tax", "insurance", "hoa", "pmi", "amortization"] },
  Calculator: C,
};