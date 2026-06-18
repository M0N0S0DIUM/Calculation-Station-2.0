"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface TireSizeCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: TireSizeCalculatorProps) {
  const [width, setWidth] = useState<number | null>(() => Number(initialParams?.width ?? 225));
  const [aspect, setAspect] = useState<number | null>(() => Number(initialParams?.aspect ?? 45));
  const [rim, setRim] = useState<number | null>(() => Number(initialParams?.rim ?? 17));

  const r = useMemo(() => {
    const aspectVal = aspect ?? 0;
    const rimVal = rim ?? 0;
    const widthVal = width ?? 0;

    const sidewallMm = widthVal * (aspectVal / 100);
    const sidewallIn = sidewallMm / 25.4;
    const overallDiameterIn = (2 * sidewallIn) + rimVal;
    const overallDiameterMm = overallDiameterIn * 25.4;
    const circumferenceMm = overallDiameterMm * Math.PI;
    const revsPerKm = 1000000 / circumferenceMm;
    const revsPerMile = 63360 / overallDiameterIn;
    
    return { sidewallMm, sidewallIn, overallDiameterIn, overallDiameterMm, circumferenceMm, revsPerKm, revsPerMile };
  }, [width, aspect, rim]);

  const shareParams: ShareParams = { width: width ?? 0, aspect: aspect ?? 0, rim: rim ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Tire Size Calculator</h3>
      </div>
      <p className="text-sm text-neutral-400 mb-4">Format: {width}/{aspect}R{rim} (e.g., 225/45R17)</p>
      <Grid>
        <NumberField label="Width" value={width} onChange={setWidth} step={5} suffix="mm" />
        <NumberField label="Aspect Ratio" value={aspect} onChange={setAspect} step={5} suffix="%" min={20} max={80} />
        <NumberField label="Rim Diameter" value={rim} onChange={setRim} step={1} suffix="in" min={10} max={30} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Tire code" value={`${width}/${aspect}R${rim}`} />
        <Result label="Sidewall height" value={fmt(r.sidewallMm, 1) + " mm"} copyValue={String(r.sidewallMm)} />
        <Result label="Overall diameter" value={fmt(r.overallDiameterIn, 1) + " in"} copyValue={String(r.overallDiameterIn)} />
        <Result label="Circumference" value={fmt(r.circumferenceMm / 1000, 2) + " m"} copyValue={String(r.circumferenceMm / 1000)} />
        <Result label="Revolutions per km" value={fmt(r.revsPerKm, 0)} />
        <Result label="Revolutions per mile" value={fmt(r.revsPerMile, 0)} />
      </div>
      <SmallNote>Useful for speedometer calibration, gear ratio calculations, and plus-sizing tires.</SmallNote>
    </Card>
  );
}

export const tireSize: CalculatorModule = {
  meta: {
    slug: "tire-size",
    title: "Tire Size Calculator",
    category: "Conversion",
    description: "Calculate diameter, circumference, sidewall, and revs/km from tire code.",
    keywords: ["tire", "tyre", "size", "diameter", "circumference", "sidewall", "revs per km", "speedometer", "plus sizing", "wheel"],
  },
  Calculator: C,
};