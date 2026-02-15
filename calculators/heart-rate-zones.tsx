"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [age, setAge] = useState(30);
  const [rest, setRest] = useState(60);
  const r = useMemo(() => {
    const max = 220 - age;
    const hrr = max - rest;
    const zone = (p: number) => rest + hrr*p;
    const z = (a:number,b:number)=>`${fmt(zone(a),0)}–${fmt(zone(b),0)} bpm`;
    return { max, z1:z(0.5,0.6), z2:z(0.6,0.7), z3:z(0.7,0.8), z4:z(0.8,0.9), z5:z(0.9,1.0) };
  }, [age, rest]);

  return (
    <Card>
      <Grid>
        <NumberField label="Age" value={age} onChange={setAge} step={1} />
        <NumberField label="Resting HR" value={rest} onChange={setRest} step={1} suffix="bpm" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Estimated max HR" value={`${fmt(r.max,0)} bpm`} />
        <Result label="Zone 1 (50–60%)" value={r.z1} />
        <Result label="Zone 2 (60–70%)" value={r.z2} />
        <Result label="Zone 3 (70–80%)" value={r.z3} />
        <Result label="Zone 4 (80–90%)" value={r.z4} />
        <Result label="Zone 5 (90–100%)" value={r.z5} />
      </div>
    </Card>
  );
}

export const heartRateZones: CalculatorModule = {
  meta: { slug: "heart-rate-zones", title: "Heart Rate Zones", category: "Health", description: "Karvonen zones from age + resting HR." },
  Calculator: C,
};
