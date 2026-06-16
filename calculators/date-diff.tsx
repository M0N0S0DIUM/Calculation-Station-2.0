"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface DateDiffCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: DateDiffCalculatorProps) {
  const [a, setA] = useState(() => String(initialParams?.a ?? new Date().toISOString().slice(0,10)));
  const [b, setB] = useState(() => String(initialParams?.b ?? new Date().toISOString().slice(0,10)));

  const out = useMemo(() => {
    const da = new Date(a + "T00:00:00");
    const db = new Date(b + "T00:00:00");
    const ms = db.getTime() - da.getTime();
    const days = ms / (1000*60*60*24);
    return { days, weeks: days/7 };
  }, [a,b]);

  const shareParams: ShareParams = { a, b };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

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
        <Result label="Days" value={fmt(out.days, 2)} />
        <Result label="Weeks" value={fmt(out.weeks, 2)} />
      </div>
      <SmallNote>Time component is ignored. Negative = end before start.</SmallNote>
    </Card>
  );
}

export const dateDiff: CalculatorModule = {
  meta: { slug: "date-diff", title: "Date Difference", category: "Time", description: "Days/weeks between two dates.", keywords: ["date", "difference", "days", "weeks", "between", "duration", "interval", "start", "end", "calendar"] },
  Calculator: C,
};