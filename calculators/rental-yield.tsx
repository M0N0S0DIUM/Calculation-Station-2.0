"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface RentalYieldProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: RentalYieldProps) {
  const [propertyValue, setPropertyValue] = useState(() => Number(initialParams?.propertyValue ?? 300000));
  const [monthlyRent, setMonthlyRent] = useState(() => Number(initialParams?.monthlyRent ?? 1500));
  const [annualExpenses, setAnnualExpenses] = useState(() => Number(initialParams?.annualExpenses ?? 5000));
  const [mortgageBalance, setMortgageBalance] = useState(() => Number(initialParams?.mortgageBalance ?? 0));
  const [mortgageRate, setMortgageRate] = useState(() => Number(initialParams?.mortgageRate ?? 6));

  const r = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const grossYield = (annualRent / propertyValue) * 100;
    const netIncome = annualRent - annualExpenses;
    const netYield = (netIncome / propertyValue) * 100;
    
    let cashOnCash = 0;
    if (mortgageBalance > 0) {
      const mortgagePayment = mortgageBalance * (mortgageRate/100)/12 * 12;
      const cashFlow = netIncome - mortgagePayment;
      const equity = propertyValue - mortgageBalance;
      cashOnCash = equity > 0 ? (cashFlow / equity) * 100 : 0;
    } else {
      cashOnCash = netYield;
    }
    
    return { grossYield, netYield, netIncome, cashOnCash, annualRent };
  }, [propertyValue, monthlyRent, annualExpenses, mortgageBalance, mortgageRate]);

  const shareParams: ShareParams = { propertyValue, monthlyRent, annualExpenses, mortgageBalance, mortgageRate };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Rental Yield Calculator</h3>
      </div>
      <Grid>
        <NumberField label="Property Value" value={propertyValue} onChange={setPropertyValue} step={5000} />
        <NumberField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} step={50} />
        <NumberField label="Annual Expenses" value={annualExpenses} onChange={setAnnualExpenses} step={500} />
        <NumberField label="Mortgage Balance" value={mortgageBalance} onChange={setMortgageBalance} step={5000} />
        <NumberField label="Mortgage Rate" value={mortgageRate} onChange={setMortgageRate} step={0.1} suffix="%" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Annual Rent" value={fmt(r.annualRent, 0)} />
        <Result label="Gross Yield" value={fmt(r.grossYield, 2) + "%"} copyValue={String(r.grossYield)} />
        <Result label="Net Income/Year" value={fmt(r.netIncome, 0)} />
        <Result label="Net Yield" value={fmt(r.grossYield, 2) + "%"} copyValue={String(r.netYield)} />
        <Result label="Cash-on-Cash Return" value={fmt(r.grossYield, 2) + "%"} copyValue={String(r.cashOnCash)} />
      </div>
      <SmallNote>Gross yield = annual rent / property value. Net yield subtracts expenses. Cash-on-cash includes mortgage.</SmallNote>
    </Card>
  );
}

export const rentalYield: CalculatorModule = {
  meta: {
    slug: "rental-yield",
    title: "Rental Yield Calculator",
    category: "Financial",
    description: "Calculate gross yield, net yield, and cash-on-cash return for rental properties.",
    keywords: ["rental yield", "gross yield", "net yield", "cash on cash", "property investment", "real estate", "roi", "landlord"],
  },
  Calculator: C,
};