"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, NumberField, Result, Hr } from "@/components/ui";
import { fmt } from "@/lib/math";

interface AreaCircleCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: AreaCircleCalculatorProps) {
  const [r, setR] = useState<number | null>(() => Number(initialParams?.r ?? 5));
  const out = useMemo(() => {
    const rVal = r ?? 0;
    return {
      area: Math.PI * rVal * rVal,
      circ: 2 * Math.PI * rVal
    };
  }, [r]);

  const shareParams: ShareParams = { r: r ?? 0 };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <NumberField label="Radius" value={r} onChange={setR} step={0.01} />
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Area" value={fmt(out.area)} />
        <Result label="Circumference" value={fmt(out.circ)} />
      </div>
    </Card>
  );
}

export const areaCircle: CalculatorModule = {
  meta: { slug: "area-circle", title: "Area of a Circle", category: "Basic", description: "Area and circumference from radius.", keywords: ["circle", "area", "circumference", "radius", "pi", "geometry", "π"] },
  Calculator: C,
};