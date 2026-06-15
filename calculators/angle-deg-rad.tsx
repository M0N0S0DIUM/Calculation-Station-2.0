"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface AngleDegRadCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: AngleDegRadCalculatorProps) {
  const [deg, setDeg] = useState(() => Number(initialParams?.deg ?? 180));
  const [rad, setRad] = useState(() => Number(initialParams?.rad ?? Math.PI));

  const out = useMemo(() => {
    const radFromDeg = deg * Math.PI/180;
    const degFromRad = rad * 180/Math.PI;
    return { radFromDeg, degFromRad };
  }, [deg, rad]);

  const shareParams: ShareParams = { deg, rad };
  if (onStateChange) onStateChange(shareParams);

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
  meta: { slug: "angle-deg-rad", title: "Angle Converter", category: "Conversion", description: "Degrees ↔ radians.", keywords: ["angle", "degrees", "radians", "deg", "rad", "convert", "π", "pi", "trigonometry", "geometry"] },
  Calculator: C,
};