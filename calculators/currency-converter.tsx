"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface CurrencyConverterProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

// Common currencies
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
];

function C({ onStateChange, initialParams }: CurrencyConverterProps) {
  const [amount, setAmount] = useState(() => Number(initialParams?.amount ?? 100));
  const [fromCurrency, setFromCurrency] = useState<string>(() => String(initialParams?.fromCurrency ?? "USD"));
  const [toCurrency, setToCurrency] = useState<string>(() => String(initialParams?.toCurrency ?? "EUR"));
  const [rate, setRate] = useState(() => Number(initialParams?.rate ?? 0.92));

  const r = useMemo(() => {
    const converted = amount * rate;
    return { converted, inverseRate: 1 / rate };
  }, [amount, rate]);

  const shareParams: ShareParams = { amount, fromCurrency, toCurrency, rate };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Currency Converter</h3>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <NumberField label="Amount" value={amount} onChange={setAmount} step={0.01} />
          <SelectField
            label="From"
            value={fromCurrency}
            onChange={setFromCurrency}
            options={CURRENCIES.map(c => ({ value: c.code, label: `${c.code} ${c.symbol}` }))}
          />
          <SelectField
            label="To"
            value={toCurrency}
            onChange={setToCurrency}
            options={CURRENCIES.map(c => ({ value: c.code, label: `${c.code} ${c.symbol}` }))}
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <NumberField label="Exchange rate (1 from = X to)" value={rate} onChange={setRate} step={0.0001} />
        </div>
      </div>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label={`${amount} ${fromCurrency} =`} value={fmt(r.converted, 2)} copyValue={String(r.converted)} />
        <Result label={`Inverse rate (1 ${toCurrency} = ${fromCurrency})`} value={fmt(r.inverseRate, 4)} />
      </div>
      <SmallNote>Enter current market rate. Rates fluctuate - check live rates for actual transactions.</SmallNote>
    </Card>
  );
}

export const currencyConverter: CalculatorModule = {
  meta: {
    slug: "currency-converter",
    title: "Currency Converter",
    category: "Conversion",
    description: "Convert between major world currencies with custom exchange rates.",
    keywords: ["currency", "converter", "exchange rate", "forex", "usd", "eur", "gbp", "jpy", "international", "money"],
  },
  Calculator: C,
};