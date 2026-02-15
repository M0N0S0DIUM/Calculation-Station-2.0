"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [dist, setDist] = useState(5);
  const [unit, setUnit] = useState("km");
  const [minutes, setMinutes] = useState(25);

  const r = useMemo(() => {
    const km = unit === "km" ? dist : dist*1.609344;
    const hours = minutes/60;
    const kmh = hours !== 0 ? km/hours : NaN;
    const mph = kmh/1.609344;
    const paceMinPerKm = km !== 0 ? minutes/km : NaN;
    const paceMinPerMi = (unit === "mi" ? minutes/dist : minutes/(km/1.609344));
    return { kmh, mph, paceMinPerKm, paceMinPerMi };
  }, [dist, unit, minutes]);

  const mmss = (m:number) => {
    if (!Number.isFinite(m)) return "—";
    const mm = Math.floor(m);
    const ss = Math.round((m - mm)*60);
    return `${mm}:${String(ss).padStart(2,"0")}`;
  };

  return (
    <Card>
      <Grid>
        <NumberField label="Distance" value={dist} onChange={setDist} step={0.01} />
        <SelectField label="Unit" value={unit} onChange={setUnit} options={[{value:"km",label:"km"},{value:"mi",label:"mi"}]} />
        <NumberField label="Time" value={minutes} onChange={setMinutes} step={0.1} suffix="minutes" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Pace (min/km)" value={mmss(r.paceMinPerKm)} />
        <Result label="Pace (min/mi)" value={mmss(r.paceMinPerMi)} />
        <Result label="Speed (km/h)" value={fmt(r.kmh, 2)} />
        <Result label="Speed (mph)" value={fmt(r.mph, 2)} />
      </div>
    </Card>
  );
}

export const runningPace: CalculatorModule = {
  meta: { slug: "running-pace", title: "Running Pace", category: "Health", description: "Convert distance/time to pace and speed." },
  Calculator: C,
};
