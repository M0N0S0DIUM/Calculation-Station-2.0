"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Result, Hr, TextField, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [list, setList] = useState("10, 20, 30, 40");
  const r = useMemo(() => {
    const nums = list.split(/[,\s]+/).map(s => s.trim()).filter(Boolean).map(Number).filter(Number.isFinite);
    if (!nums.length) return { n: 0, sum: NaN, avg: NaN, min: NaN, max: NaN };
    const sum = nums.reduce((a,b) => a + b, 0);
    return { n: nums.length, sum, avg: sum/nums.length, min: Math.min(...nums), max: Math.max(...nums) };
  }, [list]);

  return (
    <Card>
      <TextField label="Numbers (comma or space separated)" value={list} onChange={setList} placeholder="e.g. 1 2 3 4" />
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Count" value={String(r.n)} />
        <Result label="Sum" value={fmt(r.sum)} />
        <Result label="Average" value={fmt(r.avg)} />
        <Result label="Min" value={fmt(r.min)} />
        <Result label="Max" value={fmt(r.max)} />
      </div>
      <Hr />
      <SmallNote>Non-numbers are ignored.</SmallNote>
    </Card>
  );
}

export const averageStats: CalculatorModule = {
  meta: { slug: "average-stats", title: "Average / Quick Stats", category: "Basic", description: "Average, sum, min, max from a list." },
  Calculator: C,
};
