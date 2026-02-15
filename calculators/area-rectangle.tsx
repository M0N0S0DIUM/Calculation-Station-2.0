"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, Result } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [w, setW] = useState(10);
  const [h, setH] = useState(5);
  const out = useMemo(() => ({ area: w*h, perim: 2*(w+h) }), [w,h]);
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
  meta: { slug: "area-rectangle", title: "Area of a Rectangle", category: "Basic", description: "Area and perimeter from width/height." },
  Calculator: C,
};
