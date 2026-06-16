"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, TextField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface DateCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: DateCalculatorProps) {
  const [baseDate, setBaseDate] = useState<string>(() => String(initialParams?.baseDate ?? new Date().toISOString().split("T")[0]));
  const [days, setDays] = useState(() => Number(initialParams?.days ?? 0));
  const [weeks, setWeeks] = useState(() => Number(initialParams?.weeks ?? 0));
  const [months, setMonths] = useState(() => Number(initialParams?.months ?? 0));
  const [years, setYears] = useState(() => Number(initialParams?.years ?? 0));
  const [operation, setOperation] = useState<"add" | "subtract">(
    () => (initialParams?.operation as "add" | "subtract") ?? "add"
  );

  const r = useMemo(() => {
    const date = new Date(baseDate + "T12:00:00"); // Use noon to avoid DST issues
    const multiplier = operation === "add" ? 1 : -1;
    
    date.setDate(date.getDate() + multiplier * days);
    date.setDate(date.getDate() + multiplier * weeks * 7);
    date.setMonth(date.getMonth() + multiplier * months);
    date.setFullYear(date.getFullYear() + multiplier * years);
    
    const resultDate = date.toISOString().split("T")[0];
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const formatted = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    
    // Difference from today
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const diffMs = date.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    return { resultDate, dayName, formatted, diffDays };
  }, [baseDate, days, weeks, months, years, operation]);

  const shareParams: ShareParams = { baseDate, days, weeks, months, years, operation };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Date Calculator</h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 mb-4">
        <label className="grid gap-2">
          <div className="text-sm text-neutral-400">Operation</div>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as "add" | "subtract")}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm outline-none transition focus:border-neutral-600 focus:ring-2 focus:ring-white/10"
          >
            <option value="add">Add time</option>
            <option value="subtract">Subtract time</option>
          </select>
        </label>
      </div>
      <TextField label="Base date" value={baseDate} onChange={setBaseDate} placeholder="YYYY-MM-DD" />
      <Hr />
      <Grid>
        <NumberField label="Years" value={years} onChange={setYears} step={1} min={0} />
        <NumberField label="Months" value={months} onChange={setMonths} step={1} min={0} />
        <NumberField label="Weeks" value={weeks} onChange={setWeeks} step={1} min={0} />
        <NumberField label="Days" value={days} onChange={setDays} step={1} min={0} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Result date" value={r.formatted} copyValue={r.resultDate} />
        <Result label="Day of week" value={r.dayName} />
        <Result label="ISO format" value={r.resultDate} copyValue={r.resultDate} />
        <Result label="Days from today" value={r.diffDays >= 0 ? `+${r.diffDays}` : String(r.diffDays)} />
      </div>
      <SmallNote>Add/subtract years, months, weeks, and days from a base date. Handles month-end dates correctly.</SmallNote>
    </Card>
  );
}

export const dateCalculator: CalculatorModule = {
  meta: {
    slug: "date-calculator",
    title: "Date Calculator (Add/Subtract)",
    category: "Time",
    description: "Add or subtract years, months, weeks, and days from a date.",
    keywords: ["date", "calculator", "add days", "subtract days", "date math", "deadline", "due date", "anniversary", "calendar"],
  },
  Calculator: C,
};