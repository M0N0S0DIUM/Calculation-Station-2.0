"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

function C() {
  const [cap, setCap] = useState(3000);
  const [capUnit, setCapUnit] = useState("mAh");
  const [current, setCurrent] = useState(300);
  const [curUnit, setCurUnit] = useState("mA");

  const out = useMemo(() => {
    const Ah = capUnit === "Ah" ? cap : cap/1000;
    const A = curUnit === "A" ? current : current/1000;
    const hours = A !== 0 ? Ah/A : NaN;
    return { hours, minutes: hours*60 };
  }, [cap, capUnit, current, curUnit]);

  return (
    <Card>
      <Grid>
        <NumberField label="Capacity" value={cap} onChange={setCap} step={10} />
        <SelectField label="Capacity unit" value={capUnit} onChange={setCapUnit} options={[{value:"mAh",label:"mAh"},{value:"Ah",label:"Ah"}]} />
        <NumberField label="Load current" value={current} onChange={setCurrent} step={10} />
        <SelectField label="Current unit" value={curUnit} onChange={setCurUnit} options={[{value:"mA",label:"mA"},{value:"A",label:"A"}]} />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Runtime (hours)" value={fmt(out.hours, 3)} />
        <Result label="Runtime (minutes)" value={fmt(out.minutes, 1)} />
      </div>
      <Hr />
      <SmallNote>Ideal estimate; real runtime depends on load profile and battery sag.</SmallNote>
    </Card>
  );
}

export const batteryRuntime: CalculatorModule = {
  meta: { slug: "battery-runtime", title: "Battery Runtime", category: "Electronics", description: "Runtime from capacity and load current." },
  Calculator: C,
};
