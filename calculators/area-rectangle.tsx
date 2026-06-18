"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

interface AreaRectangleCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: AreaRectangleCalculatorProps) {
  const [w, setW] = useState<number | null>(() => Number(initialParams?.w ?? 10));
  const [h, setH] = useState<number | null>(() => Number(initialParams?.h ?? 5));
  const out = useMemo(() => {
    const wVal = w ?? 0;
    const hVal = h ?? 0;
    return { area: wVal * hVal, perim: 2 * (wVal + hVal) };
  }, [w, h]);

  const shareParams: ShareParams = { w: w ?? 0, h: h ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Width" value={w} onChange={setW} step={0.01} />
        <NumberField label="Height" value={h} onChange={setH} step={0.01} />
      </Grid>
      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        <Result label="Area" value={fmt(out.area)} />
        <Result label="Perimeter" value={fmt(out.perim)} />
      </div>
    </Card>
  );
}

export const areaRectangle: CalculatorModule = {
  meta: { slug: "area-rectangle", title: "Area of a Rectangle", category: "Basic", description: "Area and perimeter from width/height.", keywords: ["rectangle", "area", "perimeter", "width", "height", "geometry", "rectangular"] },
  Calculator: C,
};