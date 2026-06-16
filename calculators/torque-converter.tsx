"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, SelectField, Result, Hr, SmallNote } from "@/components/ui";
import { fmt } from "@/lib/math";

interface TorqueConverterProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

const TORQUE_UNITS = [
  { value: "nm", label: "Newton-meters (Nm)" },
  { value: "ftlb", label: "Foot-pounds (ft-lb)" },
  { value: "inlb", label: "Inch-pounds (in-lb)" },
  { value: "kgfm", label: "Kilogram-force meters (kgf·m)" },
];

function C({ onStateChange, initialParams }: TorqueConverterProps) {
  const [value, setValue] = useState(() => Number(initialParams?.value ?? 100));
  const [fromUnit, setFromUnit] = useState<string>(() => String(initialParams?.fromUnit ?? "nm"));
  const [toUnit, setToUnit] = useState<string>(() => String(initialParams?.toUnit ?? "ftlb"));

  const toNm = useMemo(() => {
    switch (fromUnit) {
      case "nm": return value;
      case "ftlb": return value * 1.35582;
      case "inlb": return value * 0.112985;
      case "kgfm": return value * 9.80665;
      default: return value;
    }
  }, [value, fromUnit]);

  const r = useMemo(() => {
    switch (toUnit) {
      case "nm": return toNm;
      case "ftlb": return toNm / 1.35582;
      case "inlb": return toNm / 0.112985;
      case "kgfm": return toNm / 9.80665;
      default: return toNm;
    }
  }, [toNm, toUnit]);

  const shareParams: ShareParams = { value, fromUnit, toUnit };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Torque Converter</h3>
      </div>
      <Grid>
        <NumberField label="Value" value={value} onChange={setValue} step={0.1} />
        <SelectField
          label="From"
          value={fromUnit}
          onChange={setFromUnit}
          options={TORQUE_UNITS}
        />
        <SelectField
          label="To"
          value={toUnit}
          onChange={setToUnit}
          options={TORQUE_UNITS}
        />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label={`${value} ${TORQUE_UNITS.find(u => u.value === fromUnit)?.label}`} value={fmt(r, 2) + " " + TORQUE_UNITS.find(u => u.value === toUnit)?.label} copyValue={String(r)} />
      </div>
      <SmallNote>Common for automotive, engineering, and cycling torque specs.</SmallNote>
    </Card>
  );
}

export const torqueConverter: CalculatorModule = {
  meta: {
    slug: "torque-converter",
    title: "Torque Converter",
    category: "Conversion",
    description: "Convert between Nm, ft-lb, in-lb, and kgf·m torque units.",
    keywords: ["torque", "newton meter", "foot pound", "inch pound", "kgf meter", "conversion", "automotive", "engineering", "wrench"],
  },
  Calculator: C,
};