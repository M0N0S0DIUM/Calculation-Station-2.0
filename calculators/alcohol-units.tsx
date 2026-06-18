"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface AlcoholCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: AlcoholCalculatorProps) {
  const [volume, setVolume] = useState<number | null>(() => Number(initialParams?.volume ?? 500));
  const [abv, setAbv] = useState<number | null>(() => Number(initialParams?.abv ?? 5));
  const [units, setUnits] = useState<"ml" | "oz">(
    () => (initialParams?.units as "ml" | "oz") ?? "ml"
  );

  const r = useMemo(() => {
    const abvVal = abv ?? 0;
    const volumeVal = volume ?? 0;

    const volMl = units === "ml" ? volumeVal : volumeVal * 29.5735;
    const pureAlcoholMl = volMl * (abvVal / 100);
    const pureAlcoholGrams = pureAlcoholMl * 0.789; // density of ethanol
    
    // UK units: 1 unit = 8g = 10ml pure alcohol
    // US standard drinks: 1 drink = 14g = 17.7ml pure alcohol
    const ukUnits = pureAlcoholGrams / 8;
    const usDrinks = pureAlcoholGrams / 14;
    
    // Calories: 7 cal/g alcohol
    const calories = pureAlcoholGrams * 7;
    
    return { pureAlcoholMl, pureAlcoholGrams, ukUnits, usDrinks, calories };
  }, [volume, abv, units]);

  const shareParams: ShareParams = { volume: volume ?? 0, abv: abv ?? 0, units };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Alcohol Unit Calculator</h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 mb-4">
        <label className="grid gap-2">
          <div className="text-sm text-neutral-400">Volume unit</div>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value as "ml" | "oz")}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm outline-none transition focus:border-neutral-600 focus:ring-2 focus:ring-white/10"
          >
            <option value="ml">Milliliters (ml)</option>
            <option value="oz">US Fluid Ounces (fl oz)</option>
          </select>
        </label>
      </div>
      <Grid>
        <NumberField label="Volume" value={volume} onChange={setVolume} step={10} min={0} />
        <NumberField label="ABV" value={abv} onChange={setAbv} step={0.1} suffix="%" min={0} max={100} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Pure alcohol" value={fmt(r.pureAlcoholMl, 1) + " ml"} />
        <Result label="UK units (8g each)" value={fmt(r.ukUnits, 1)} copyValue={String(r.ukUnits)} />
        <Result label="US standard drinks (14g)" value={fmt(r.usDrinks, 1)} copyValue={String(r.usDrinks)} />
        <Result label="Alcohol calories" value={fmt(r.calories, 0) + " kcal"} />
      </div>
      <SmallNote>UK: 1 unit = 8g alcohol. US: 1 standard drink = 14g alcohol. Drink responsibly.</SmallNote>
    </Card>
  );
}

export const alcoholUnits: CalculatorModule = {
  meta: {
    slug: "alcohol-units",
    title: "Alcohol Unit Calculator",
    category: "Health",
    description: "Calculate UK units, US standard drinks, and calories from volume and ABV.",
    keywords: ["alcohol", "units", "standard drinks", "abv", "blood alcohol", "uk units", "us drinks", "calories", "responsible drinking"],
  },
  Calculator: C,
};