"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface RunningPaceCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: RunningPaceCalculatorProps) {
  const [dist, setDist] = useState<number | null>(() => Number(initialParams?.dist ?? 5));
  const [unit, setUnit] = useState<string | null>(() => String(initialParams?.unit ?? "km"));
  const [minutes, setMinutes] = useState<number | null>(() => Number(initialParams?.minutes ?? 25));

  const r = useMemo(() => {
    const distVal = dist ?? 0;
    const minutesVal = minutes ?? 0;
    const unitVal = unit ?? '';

    const km = unitVal === "km" ? distVal : distVal*1.609344;
    const hours = minutesVal/60;
    const kmh = hours !== 0 ? km/hours : NaN;
    const mph = kmh/1.609344;
    const paceMinPerKm = km !== 0 ? minutesVal/km : NaN;
    const paceMinPerMi = (unitVal === "mi" ? minutesVal/distVal : minutesVal/(km/1.609344));
    return { kmh, mph, paceMinPerKm, paceMinPerMi };
  }, [dist, unit, minutes]);

  const mmss = (m:number) => {
    if (!Number.isFinite(m)) return "—";
    const mm = Math.floor(m);
    const ss = Math.round((m - mm)*60);
    return `${mm}:${String(ss).padStart(2,"0")}`;
  };

  const shareParams: ShareParams = { dist: dist ?? 0, unit: unit ?? '', minutes: minutes ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Distance" value={dist} onChange={setDist} step={0.01} />
        <SelectField label="Unit" value={unit ?? ""} onChange={setUnit} options={[{value:"km",label:"km"},{value:"mi",label:"mi"}]} />
        <NumberField label="Time (minutes)" value={minutes} onChange={setMinutes} step={1} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Speed" value={`${fmt(r.kmh,2)} km/h / ${fmt(r.mph,2)} mph`} />
        <Result label="Pace" value={`${mmss(r.paceMinPerKm)} min/km / ${mmss(r.paceMinPerMi)} min/mi`} />
      </div>
    </Card>
  );
}

export const runningPace: CalculatorModule = {
  meta: { slug: "running-pace", title: "Running Pace", category: "Health", description: "Convert distance/time to pace and speed.", keywords: ["running", "pace", "speed", "distance", "time", "min/km", "min/mi", "km/h", "mph", "jogging", "marathon", "5k", "10k"] },
  Calculator: C,
};