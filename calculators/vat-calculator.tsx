"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmtMoney, fmt } from "@/lib/math";

interface VATCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: VATCalculatorProps) {
  const [amount, setAmount] = useState<number | null>(() => Number(initialParams?.amount ?? 100));
  const [vatRate, setVatRate] = useState<number | null>(() => Number(initialParams?.vatRate ?? 20));
  const [mode, setMode] = useState<"add" | "remove">(
    () => (initialParams?.mode as "add" | "remove") ?? "add"
  );

  const r = useMemo(() => {
    const amountVal = amount ?? 0;
    const vatRateVal = vatRate ?? 0;

    if (mode === "add") {
      const vat = amountVal * (vatRateVal / 100);
      return { net: amountVal, vat, gross: amountVal + vat };
    } else {
      const net = amountVal / (1 + vatRateVal / 100);
      const vat = amountVal - net;
      return { net, vat, gross: amountVal };
    }
  }, [amount, vatRate, mode]);

  const shareParams: ShareParams = { amount: amount ?? 0, vatRate: vatRate ?? 0, mode };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">VAT / GST Calculator</h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 mb-4">
        <label className="grid gap-2">
          <div className="text-sm text-neutral-400">Mode</div>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "add" | "remove")}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm outline-none transition focus:border-neutral-600 focus:ring-2 focus:ring-white/10"
          >
            <option value="add">Add VAT (Net → Gross)</option>
            <option value="remove">Remove VAT (Gross → Net)</option>
          </select>
        </label>
      </div>
      <Grid>
        <NumberField
          label={mode === "add" ? "Net amount" : "Gross amount"}
          value={amount}
          onChange={setAmount}
          step={0.01}
        />
        <NumberField
          label="VAT Rate"
          value={vatRate}
          onChange={setVatRate}
          step={0.1}
          suffix="%"
          min={0}
          max={100}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Net amount" value={fmtMoney(r.net)} copyValue={String(r.net)} />
        <Result label="VAT amount" value={fmtMoney(r.vat)} copyValue={String(r.vat)} />
        <Result label="Gross amount" value={fmtMoney(r.gross)} copyValue={String(r.gross)} />
      </div>
      <SmallNote>Common rates: UK 20%, EU 19-27%, Canada GST 5%, Australia GST 10%</SmallNote>
    </Card>
  );
}

export const vatCalculator: CalculatorModule = {
  meta: {
    slug: "vat-calculator",
    title: "VAT / GST Calculator",
    category: "Financial",
    description: "Add or remove VAT/GST from an amount with custom rates.",
    keywords: ["vat", "gst", "sales tax", "value added tax", "tax calculator", "net", "gross", "vat rate"],
  },
  Calculator: C,
};