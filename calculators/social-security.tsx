"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface SocialSecurityProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: SocialSecurityProps) {
  const [birthYear, setBirthYear] = useState(() => Number(initialParams?.birthYear ?? 1970));
  const [annualIncome, setAnnualIncome] = useState(() => Number(initialParams?.annualIncome ?? 80000));
  const [claimAge, setClaimAge] = useState(() => Number(initialParams?.claimAge ?? 67));

  const r = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const fullRetirementAge = birthYear >= 1960 ? 67 : birthYear >= 1955 ? 66 + (birthYear - 1954) * 2/12 : 66;
    
    // Simplified benefit calculation (rough estimate)
    // Based on bend points for 2024
    const monthlyIncome = annualIncome / 12;
    const a = Math.min(monthlyIncome, 1174) * 0.9;
    const b = Math.min(Math.max(monthlyIncome - 1174, 0), 5904) * 0.32;
    const c = Math.max(monthlyIncome - 7078, 0) * 0.15;
    const pia = Math.round(a + b + c);
    
    let benefit = pia;
    const monthsDiff = (claimAge - fullRetirementAge) * 12;
    if (monthsDiff > 0) {
      // Delayed retirement credits: 8% per year = 0.67% per month
      benefit = Math.round(pia * (1 + monthsDiff * 0.0067));
    } else if (monthsDiff < 0) {
      // Early reduction: 5/9% per month for first 36 months, then 5/12%
      const earlyMonths = Math.abs(monthsDiff);
      if (earlyMonths <= 36) {
        benefit = Math.round(pia * (1 - earlyMonths * 0.00556));
      } else {
        benefit = Math.round(pia * (1 - 36 * 0.00556 - (earlyMonths - 36) * 0.00417));
      }
    }
    
    const annualBenefit = benefit * 12;
    const lifetimeTo85 = benefit * 12 * (85 - claimAge);
    const lifetimeTo90 = benefit * 12 * (90 - claimAge);
    
    return { fullRetirementAge, pia, benefit, annualBenefit, lifetimeTo85, lifetimeTo90, age };
  }, [birthYear, annualIncome, claimAge]);

  const shareParams: ShareParams = { birthYear, annualIncome, claimAge };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Social Security Benefit Estimator</h3>
      </div>
      <Grid>
        <NumberField label="Birth Year" value={birthYear} onChange={setBirthYear} step={1} min={1940} max={2010} />
        <NumberField label="Current Annual Income" value={annualIncome} onChange={setAnnualIncome} step={1000} />
        <NumberField label="Claim Age" value={claimAge} onChange={setClaimAge} step={1} min={62} max={70} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Current Age" value={String(r.age)} />
        <Result label="Full Retirement Age" value={fmt(r.fullRetirementAge, 1)} />
        <Result label="Primary Insurance Amount (PIA)" value={fmt(r.pia, 0)} copyValue={String(r.pia)} />
        <Result label="Estimated Monthly at {claimAge}" value={fmt(r.benefit, 0)} copyValue={String(r.benefit)} />
        <Result label="Estimated Annual Benefit" value={fmt(r.annualBenefit, 0)} />
        <Result label="Lifetime to 85" value={fmt(r.lifetimeTo85, 0)} />
        <Result label="Lifetime to 90" value={fmt(r.lifetimeTo90, 0)} />
      </div>
      <SmallNote>Rough estimate based on 2024 bend points. Actual benefit depends on 35 highest earning years. Not official SSA calculation.</SmallNote>
    </Card>
  );
}

export const socialSecurity: CalculatorModule = {
  meta: {
    slug: "social-security",
    title: "Social Security Benefit Estimator",
    category: "Financial",
    description: "Estimate your Social Security benefit at different claim ages (62-70).",
    keywords: ["social security", "SSA", "benefit estimate", "retirement age", "claim age", "PIA", "full retirement age", "social security calculator"],
  },
  Calculator: C,
};