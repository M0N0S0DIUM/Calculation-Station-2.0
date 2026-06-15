"use client";

import { useMemo, useState } from "react";
import type { CalculatorModule, ShareParams } from "@/lib/types";
import { Card, Grid, NumberField, TextField, Result, Hr, SmallNote } from "@/components/ui";

interface EpochConverterCalculatorProps {
  onStateChange?: (params: ShareParams) => void;
  initialParams?: ShareParams;
}

function C({ onStateChange, initialParams }: EpochConverterCalculatorProps) {
  const [epoch, setEpoch] = useState(() => Number(initialParams?.epoch ?? Math.floor(Date.now()/1000)));
  const [iso, setIso] = useState(() => String(initialParams?.iso ?? new Date().toISOString()));

  const out = useMemo(() => {
    const dFromEpoch = new Date(epoch*1000);
    const isoFromEpoch = dFromEpoch.toISOString();
    const epochFromIso = Math.floor(new Date(iso).getTime()/1000);
    return { isoFromEpoch, epochFromIso };
  }, [epoch, iso]);

  const shareParams: ShareParams = { epoch, iso };
  if (onStateChange) onStateChange(shareParams);

  return (
    <Card>
      <Grid>
        <NumberField label="Unix epoch (seconds)" value={epoch} onChange={setEpoch} step={1} />
        <TextField label="ISO date/time" value={iso} onChange={setIso} placeholder="e.g. 2024-01-15T14:30:00" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="From epoch" value={out.isoFromEpoch} />
        <Result label="From ISO" value={String(out.epochFromIso)} />
      </div>
      <SmallNote>Epoch in seconds. ISO in local time zone.</SmallNote>
    </Card>
  );
}

export const epochConverter: CalculatorModule = {
  meta: { slug: "epoch-converter", title: "Epoch Converter", category: "Time", description: "Unix seconds ↔ ISO date/time (local).", keywords: ["epoch", "unix", "timestamp", "iso", "date", "time", "seconds", "milliseconds", "convert", "unix time"] },
  Calculator: C,
};