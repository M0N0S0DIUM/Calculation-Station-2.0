"use client";

import { useMemo, useState, useEffect } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, Result, Hr, SmallNote, SelectField } from "@/components/ui";
import { fmt } from "@/lib/math";

interface BrixSgCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: BrixSgCalculatorProps) {
  const [inputMode, setInputMode] = useState<string>(() => {
    if (initialParams?.inputMode !== undefined) return String(initialParams.inputMode);
    return "brix";
  });
  const [brix, setBrix] = useState<number | null>(() => {
    if (initialParams?.brix !== undefined) return Number(initialParams.brix);
    return 12;
  });
  const [sg, setSg] = useState<number | null>(() => {
    if (initialParams?.sg !== undefined) return Number(initialParams.sg);
    return 1.048;
  });
  const [plato, setPlato] = useState<number | null>(() => {
    if (initialParams?.plato !== undefined) return Number(initialParams.plato);
    return 12;
  });

  const r = useMemo(() => {
    let brixVal = brix;
    let sgVal = sg;
    let platoVal = plato;

    if (inputMode === "brix" && brixVal !== null) {
      // Brix to SG (approximate)
      sgVal = 1 + (brixVal / (258.6 - ((brixVal / 258.2) * 227.1)));
      platoVal = brixVal;
    } else if (inputMode === "sg" && sgVal !== null) {
      // SG to Brix
      brixVal = (182.4601 * sgVal - 775.6821) * sgVal + 1262.7794 * sgVal - 669.5622;
      platoVal = brixVal;
    } else if (inputMode === "plato" && platoVal !== null) {
      // Plato to SG
      sgVal = 1 + (platoVal / (258.6 - ((platoVal / 258.2) * 227.1)));
      brixVal = platoVal;
    }

    // Potential ABV (assuming 75% attenuation)
    const potentialAbv = sgVal ? (sgVal - 1) * 131.25 * 0.75 : 0;

    return {
      brix: brixVal,
      sg: sgVal,
      plato: platoVal,
      potentialAbv,
    };
  }, [inputMode, brix, sg, plato]);

  const shareParams: ShareParams = {
    inputMode,
    brix: brix ?? 12,
    sg: sg ?? 1.048,
    plato: plato ?? 12,
  };
  useEffect(() => {
    if (onStateChange) onStateChange(shareParams);
  }, [shareParams, onStateChange]);

  return (
    <Card>
      <Grid>
        <SelectField
          label="Input Mode"
          value={inputMode}
          onChange={setInputMode}
          options={[
            { value: "brix", label: "Brix" },
            { value: "sg", label: "Specific Gravity" },
            { value: "plato", label: "Plato (°P)" },
          ]}
        />
        {inputMode === "brix" && (
          <NumberField
            label="Brix"
            value={brix}
            onChange={setBrix}
            step={0.1}
            min={0}
            max={40}
            suffix="°Bx"
          />
        )}
        {inputMode === "sg" && (
          <NumberField
            label="Specific Gravity"
            value={sg}
            onChange={setSg}
            step={0.001}
            min={1.000}
            max={1.200}
            suffix="SG"
          />
        )}
        {inputMode === "plato" && (
          <NumberField
            label="Plato"
            value={plato}
            onChange={setPlato}
            step={0.1}
            min={0}
            max={30}
            suffix="°P"
          />
        )}
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="Brix" value={`${fmt(r.brix ?? 0)} °Bx`} />
        <Result label="Specific Gravity" value={r.sg ? fmt(r.sg, 4) : "—"} copyValue={r.sg ? fmt(r.sg, 4) : "—"} />
        <Result label="Plato" value={`${fmt(r.plato ?? 0)} °P`} />
        <Result label="Potential ABV (75% atten.)" value={`${fmt(r.potentialAbv ?? 0)}%`} />
      </div>
      <SmallNote>
        Brix ≈ Plato for brewing purposes. Conversion uses cubic approximation.
        Refractometers need a correction factor for alcohol-containing wort — use the "Refractometer Correction" calculator for finished beer.
      </SmallNote>
    </Card>
  );
}

export const brewBrixSg: CalculatorModule = {
  meta: {
    slug: "brew-brix-sg",
    title: "Brix / SG / Plato Converter",
    category: "Brewing",
    description: "Convert between Brix, Specific Gravity, and Plato. Includes potential ABV estimate at 75% attenuation.",
    keywords: ["brix to sg", "sg to brix", "plato to sg", "brix plato converter", "specific gravity converter", "refractometer brix", "brew gravity conversion"],
  },
  Calculator: C,
};