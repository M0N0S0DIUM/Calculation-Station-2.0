"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface TaxBracketProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: TaxBracketProps) {
  const [income, setIncome] = useState(() => Number(initialParams?.income ?? 80000));
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "hoh">(
    () => (initialParams?.filingStatus as "single" | "married" | "hoh") ?? "single"
  );
  const [year, setYear] = useState(() => Number(initialParams?.year ?? 2024));

  const r = useMemo(() => {
    // 2024 US Federal Tax Brackets
    const brackets = {
      single: [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 23200, rate: 0.10 },
        { min: 23200, max: 94300, rate: 0.12 },
        { min: 94300, max: 201050, rate: 0.24 },
        { min: 201050, max: 383900, rate: 0.24 },
        { min: 383900, max: 487450, rate: 0.32 },
        { min: 487450, max: 731200, rate: 0.35 },
        { min: 731200, max: Infinity, rate: 0.37 },
      ],
      hoh: [
        { min: 0, max: 16550, rate: 0.10 },
        { min: 16550, max: 63100, rate: 0.12 },
        { min: 63100, max: 100500, rate: 0.22 },
        { min: 100500, max: 191950, rate: 0.24 },
        { min: 191950, max: 243700, rate: 0.32 },
        { min: 243700, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ],
    };

    const selectedBrackets = brackets[filingStatus];
    let tax = 0;
    let marginalRate = 0;
    const bracketDetails = [];

    for (const bracket of selectedBrackets) {
      const taxableInBracket = Math.max(0, Math.min(income, bracket.max) - bracket.min);
      if (taxableInBracket > 0) {
        const bracketTax = taxableInBracket * bracket.rate;
        tax += bracketTax;
        marginalRate = bracket.rate * 100;
        bracketDetails.push({
          range: `$${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? "∞" : "$" + bracket.max.toLocaleString()}`,
          rate: bracket.rate * 100,
          amount: bracketTax,
        });
      } else if (income <= bracket.min) {
        break;
      }
    }

    const effectiveRate = income > 0 ? (tax / income) * 100 : 0;
    const afterTax = income - tax;

    return { tax, effectiveRate, afterTax, marginalRate, bracketDetails };
  }, [income, filingStatus, year]);

  const shareParams: ShareParams = { income, filingStatus, year };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">US Federal Income Tax Calculator</h3>
      </div>
      <SelectField
        label="Filing Status"
        value={filingStatus}
        onChange={(v) => setFilingStatus(v as "single" | "married" | "hoh")}
        options={[
          { value: "single", label: "Single" },
          { value: "married", label: "Married Filing Jointly" },
          { value: "hoh", label: "Head of Household" },
        ]}
      />
      <Hr />
      <Grid>
        <NumberField label="Taxable Income" value={income} onChange={setIncome} step={1000} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Federal Tax Owed" value={fmt(r.tax, 2)} copyValue={String(r.tax)} />
        <Result label="Effective Tax Rate" value={fmt(r.effectiveRate, 2) + "%"} copyValue={String(r.effectiveRate)} />
        <Result label="Marginal Tax Rate" value={fmt(r.marginalRate, 0) + "%"} />
        <Result label="After-Tax Income" value={fmt(r.afterTax, 2)} copyValue={String(r.afterTax)} />
      </div>
      <SmallNote>2024 brackets shown. Excludes standard deduction, state tax, FICA. Simplified estimate.</SmallNote>
    </Card>
  );
}

export const taxBracket: CalculatorModule = {
  meta: {
    slug: "tax-bracket",
    title: "US Federal Tax Bracket Calculator",
    category: "Financial",
    description: "Calculate federal tax, effective rate, and marginal bracket for 2024.",
    keywords: ["tax bracket", "federal tax", "income tax", "marginal rate", "effective rate", "2024 tax brackets", "filing status"],
  },
  Calculator: C,
};