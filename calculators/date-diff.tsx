"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [a, setA] = useState(() => new Date().toISOString().slice(0,10));
  const [b, setB] = useState(() => new Date().toISOString().slice(0,10));

  const out = useMemo(() => {
    const da = new Date(a + "T00:00:00");
    const db = new Date(b + "T00:00:00");
    const ms = db.getTime() - da.getTime();
    const days = ms / (1000*60*60*24);
    return { days, weeks: days/7 };
  }, [a,b]);

  return (
    <Card>
      <label style={{ display: "grid", gap: 6 }}>
        <div style={{ opacity: 0.85 }}>Start date</div>
        <input type="date" value={a} onChange={(e)=>setA(e.target.value)} style={{ width:"100%", padding:"10px 12px", borderRadius:12, border:"1px solid #999", background:"transparent" }} />
      </label>
      <div style={{ marginTop: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <div style={{ opacity: 0.85 }}>End date</div>
          <input type="date" value={b} onChange={(e)=>setB(e.target.value)} style={{ width:"100%", padding:"10px 12px", borderRadius:12, border:"1px solid #999", background:"transparent" }} />
        </label>
      </div>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Days" value={fmt(out.days, 0)} />
        <Result label="Weeks" value={fmt(out.weeks, 2)} />
      </div>
      <Hr />
      <SmallNote>Positive means end date is after start date.</SmallNote>
    </Card>
  );
}

export const dateDiff: CalculatorModule = {
  meta: { slug: "date-diff", title: "Date Difference", category: "Time", description: "Days/weeks between two dates." },
  Calculator: C,
};
