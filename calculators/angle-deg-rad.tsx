"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [deg, setDeg] = useState(180);
  const [rad, setRad] = useState(Math.PI);

  const out = useMemo(() => {
    const radFromDeg = deg * Math.PI/180;
    const degFromRad = rad * 180/Math.PI;
    return { radFromDeg, degFromRad };
  }, [deg, rad]);

  return (
    <Card>
      <Grid>
        <NumberField label="Degrees" value={deg} onChange={setDeg} step={0.1} suffix="°" />
        <NumberField label="Radians" value={rad} onChange={setRad} step={0.001} suffix="rad" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Radians from degrees" value={fmt(out.radFromDeg, 10)} />
        <Result label="Degrees from radians" value={fmt(out.degFromRad, 6)} />
      </div>
    </Card>
  );
}

export const angleDegRad: CalculatorModule = {
  meta: { slug: "angle-deg-rad", title: "Angle Converter", category: "Conversion", description: "Degrees ↔ radians." },
  Calculator: C,
};
