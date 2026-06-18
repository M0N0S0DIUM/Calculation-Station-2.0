"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface FuelCostCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: FuelCostCalculatorProps) {
  const [distance, setDistance] = useState<number | null>(() => Number(initialParams?.distance ?? 100));
  const [efficiency, setEfficiency] = useState<number | null>(() => Number(initialParams?.efficiency ?? 25));
  const [fuelPrice, setFuelPrice] = useState<number | null>(() => Number(initialParams?.fuelPrice ?? 3.5));
  const [units, setUnits] = useState<"us" | "metric">(
    () => (initialParams?.units as "us" | "metric") ?? "us"
  );

  const r = useMemo(() => {
    const distanceVal = distance ?? 0;
    const efficiencyVal = efficiency ?? 0;
    const fuelPriceVal = fuelPrice ?? 0;

    let distKm = distanceVal;
    let effL100km = efficiencyVal;
    let pricePerLiter = fuelPriceVal;
    
    if (units === "us") {
      // US: distanceVal in miles, efficiencyVal in MPG, price in $/gallon
      distKm = distanceVal * 1.60934;
      effL100km = 235.215 / efficiencyVal; // MPG to L/100km
      pricePerLiter = fuelPriceVal / 3.78541; // $/gal to $/L
    }
    
    const fuelNeeded = (distKm / 100) * effL100km;
    const cost = fuelNeeded * pricePerLiter;
    const costPerKm = cost / distKm;
    const costPerMile = cost / distanceVal;
    
    return { fuelNeeded, cost, costPerKm, costPerMile, distKm, effL100km };
  }, [distance, efficiency, fuelPrice, units]);

  const shareParams: ShareParams = { distance: distance ?? 0, efficiency: efficiency ?? 0, fuelPrice: fuelPrice ?? 0, units: units ?? 'us' };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Fuel Cost Calculator</h3>
      </div>
      <SelectField
        label="Units"
        value={units}
        onChange={(v) => setUnits(v as "us" | "metric")}
        options={[{ value: "us", label: "US (miles, MPG, $/gal)" }, { value: "metric", label: "Metric (km, L/100km, $/L)" }]}
      />
      <Hr />
      {units === "us" ? (
        <Grid>
          <NumberField label="Distance" value={distance} onChange={setDistance} suffix="mi" step={10} />
          <NumberField label="Fuel efficiency" value={efficiency} onChange={setEfficiency} suffix="MPG" step={1} />
          <NumberField label="Fuel price" value={fuelPrice} onChange={setFuelPrice} step={0.01} suffix="$/gal" />
        </Grid>
      ) : (
        <Grid>
          <NumberField label="Distance" value={distance} onChange={setDistance} suffix="km" step={10} />
          <NumberField label="Fuel efficiency" value={efficiency} onChange={setEfficiency} suffix="L/100km" step={0.1} />
          <NumberField label="Fuel price" value={fuelPrice} onChange={setFuelPrice} step={0.01} suffix="$/L" />
        </Grid>
      )}
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Fuel needed" value={fmt(r.fuelNeeded, 2) + (units === "us" ? " gal" : " L")} />
        <Result label="Total cost" value={"$" + fmt(r.cost, 2)} copyValue={String(r.cost)} />
        <Result label="Cost per km" value={fmt(r.costPerKm, 3) + " $/km"} />
        <Result label="Cost per mile" value={fmt(r.costPerMile, 3) + " $/mi"} />
      </div>
      <SmallNote>US: MPG, miles, $/gallon. Metric: L/100km, km, $/liter.</SmallNote>
    </Card>
  );
}

export const fuelCost: CalculatorModule = {
  meta: {
    slug: "fuel-cost",
    title: "Fuel Cost Calculator",
    category: "Conversion",
    description: "Calculate fuel needed and trip cost from distance, efficiency, and fuel price.",
    keywords: ["fuel", "gas", "cost", "trip", "mileage", "mpg", "l/100km", "fuel economy", "road trip", "gasoline"],
  },
  Calculator: C,
};