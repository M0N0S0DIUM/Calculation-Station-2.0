"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BatteryRuntimeCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BatteryRuntimeCalculatorProps) {
  const [cap, setCap] = useState<number | null>(() => Number(initialParams?.cap ?? 3000));
  const [capUnit, setCapUnit] = useState<string | null>(() => String(initialParams?.capUnit ?? "mAh"));
  const [current, setCurrent] = useState<number | null>(() => Number(initialParams?.current ?? 300));
  const [curUnit, setCurUnit] = useState<string | null>(() => String(initialParams?.curUnit ?? "mA"));

  const out = useMemo(() => {
    const capVal = cap ?? 0;
    const currentVal = current ?? 0;
    const capUnitVal = capUnit ?? '';
    const curUnitVal = curUnit ?? '';

    const Ah = capUnitVal === "Ah" ? capVal : capVal/1000;
    const A = curUnitVal === "A" ? currentVal : currentVal/1000;
    const hours = A !== 0 ? Ah/A : NaN;
    return { hours, minutes: hours*60 };
  }, [cap, capUnit, current, curUnit]);

  const shareParams: ShareParams = { cap: cap ?? 0, capUnit: capUnit ?? '', current: current ?? 0, curUnit: curUnit ?? '' };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <NumberField label="Capacity" value={cap} onChange={setCap} step={10} />
        <SelectField label="Capacity unit" value={capUnit ?? ""} onChange={setCapUnit} options={[{value:"mAh",label:"mAh"},{value:"Ah",label:"Ah"}]} />
        <NumberField label="Load current" value={current} onChange={setCurrent} step={10} />
        <SelectField label="Current unit" value={curUnit ?? ""} onChange={setCurUnit} options={[{value:"mA",label:"mA"},{value:"A",label:"A"}]} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Runtime (hours)" value={fmt(out.hours, 3)} />
        <Result label="Runtime (minutes)" value={fmt(out.minutes, 1)} />
      </div>
      <SmallNote>Assumes 100% efficiency. Real runtime will be less.</SmallNote>
    </Card>
  );
}

export const batteryRuntime: CalculatorModule = {
  meta: { slug: "battery-runtime", title: "Battery Runtime", category: "Electronics", description: "Runtime from capacity and load current.", keywords: ["battery", "runtime", "capacity", "mah", "ah", "current", "load", "discharge", "hours", "estimate"] },
  Calculator: C,
};