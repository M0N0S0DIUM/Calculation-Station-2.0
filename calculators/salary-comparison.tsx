"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface SalaryComparisonProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: SalaryComparisonProps) {
  const [salary, setSalary] = useState(() => Number(initialParams?.salary ?? 80000));
  const [locationFrom, setLocationFrom] = useState<string>(() => String(initialParams?.locationFrom ?? "national"));
  const [locationTo, setLocationTo] = useState<string>(() => String(initialParams?.locationTo ?? "san-francisco"));
  const [includeTaxes, setIncludeTaxes] = useState(() => Boolean(initialParams?.includeTaxes ?? true));

  const locations = [
    { id: "national", name: "National Average", colIndex: 100 },
    { id: "new-york", name: "New York, NY", colIndex: 187 },
    { id: "san-francisco", name: "San Francisco, CA", colIndex: 194 },
    { id: "los-angeles", name: "Los Angeles, CA", colIndex: 151 },
    { id: "seattle", name: "Seattle, WA", colIndex: 145 },
    { id: "boston", name: "Boston, MA", colIndex: 148 },
    { id: "washington-dc", name: "Washington, DC", colIndex: 152 },
    { id: "san-diego", name: "San Diego, CA", colIndex: 144 },
    { id: "denver", name: "Denver, CO", colIndex: 114 },
    { id: "austin", name: "Austin, TX", colIndex: 104 },
    { id: "chicago", name: "Chicago, IL", colIndex: 118 },
    { id: "miami", name: "Miami, FL", colIndex: 118 },
    { id: "atlanta", name: "Atlanta, GA", colIndex: 105 },
    { id: "dallas", name: "Dallas, TX", colIndex: 101 },
    { id: "phoenix", name: "Phoenix, AZ", colIndex: 105 },
    { id: "philadelphia", name: "Philadelphia, PA", colIndex: 112 },
    { id: "houston", name: "Houston, TX", colIndex: 96 },
    { id: "raleigh", name: "Raleigh, NC", colIndex: 95 },
    { id: "nashville", name: "Nashville, TN", colIndex: 98 },
    { id: "columbus", name: "Columbus, OH", colIndex: 90 },
  ];

  const getIndex = (id: string) => locations.find(l => l.id === id)?.colIndex ?? 100;

  const r = useMemo(() => {
    const fromIdx = getIndex(locationFrom);
    const toIdx = getIndex(locationTo);
    
    const equivalentSalary = salary * (toIdx / fromIdx);
    const difference = equivalentSalary - salary;
    const pctChange = ((equivalentSalary - salary) / salary) * 100;
    
    // Rough tax estimate (federal + state average)
    let afterTaxFrom = salary;
    let afterTaxTo = equivalentSalary;
    
    if (includeTaxes) {
      const fedBrackets = [
        { max: 11600, rate: 0.10 },
        { max: 47150, rate: 0.12 },
        { max: 100525, rate: 0.22 },
        { max: 191950, rate: 0.24 },
        { max: 243725, rate: 0.32 },
        { max: 609350, rate: 0.35 },
        { max: Infinity, rate: 0.37 },
      ];
      
      let tax = 0;
      for (const b of fedBrackets) {
        const taxable = Math.max(0, Math.min(salary, b.max) - (b.max === Infinity ? 0 : (b.max === 11600 ? 0 : 11600)));
        if (taxable > 0) tax += taxable * b.rate;
      }
      afterTaxFrom = salary - tax;
      
      let tax2 = 0;
      for (const b of fedBrackets) {
        const taxable = Math.max(0, Math.min(equivalentSalary, b.max) - (b.max === Infinity ? 0 : (b.max === 11600 ? 0 : 11600)));
        if (taxable > 0) tax2 += taxable * b.rate;
      }
      afterTaxTo = equivalentSalary - tax2;
    }
    
    return { 
      equivalentSalary, 
      difference, 
      pctChange, 
      afterTaxFrom, 
      afterTaxTo,
      fromIdx,
      toIdx
    };
  }, [salary, locationFrom, locationTo, includeTaxes]);

  const shareParams: ShareParams = { salary, locationFrom, locationTo, includeTaxes };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Salary Cost of Living Comparison</h3>
      </div>
      <Grid>
        <NumberField label="Current Salary" value={salary} onChange={setSalary} step={1000} />
      </Grid>
      <Hr />
      <SelectField
        label="Current Location"
        value={locationFrom}
        onChange={setLocationFrom}
        options={locations.map(l => ({ value: l.id, label: l.name }))}
      />
      <SelectField
        label="Target Location"
        value={locationTo}
        onChange={setLocationTo}
        options={locations.map(l => ({ value: l.id, label: l.name }))}
      />
      <div className="flex items-center gap-2 mt-2">
        <input type="checkbox" id="includeTaxes" checked={includeTaxes} onChange={(e) => setIncludeTaxes(e.target.checked)} className="w-4 h-4" />
        <label htmlFor="includeTaxes" className="text-sm">Estimate Federal Tax Impact</label>
      </div>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Equivalent Salary" value={fmt(r.equivalentSalary, 0)} copyValue={String(r.equivalentSalary)} />
        <Result label="Difference" value={r.difference >= 0 ? "+" + fmt(r.difference, 0) : fmt(r.difference, 0)} copyValue={String(r.difference)} />
        <Result label="% Change" value={fmt(r.pctChange, 1) + "%"} />
        {includeTaxes && (
          <>
            <Result label="After-Tax (Current)" value={fmt(r.afterTaxFrom, 0)} />
            <Result label="After-Tax (Target)" value={fmt(r.afterTaxTo, 0)} />
          </>
        )}
      </div>
      <SmallNote>Based on COL index (national=100). Excludes state tax, property tax, lifestyle differences. Estimates only.</SmallNote>
    </Card>
  );
}

export const salaryComparison: CalculatorModule = {
  meta: {
    slug: "salary-comparison",
    title: "Salary Cost of Living Comparison",
    category: "Financial",
    description: "Compare salary purchasing power between US cities with cost of living adjustment.",
    keywords: ["salary comparison", "cost of living", "relocation", "col", "equivalent salary", "city comparison", "moving", "purchasing power"],
  },
  Calculator: C,
};