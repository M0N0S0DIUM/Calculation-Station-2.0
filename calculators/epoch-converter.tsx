"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, Grid, NumberField, TextField, Result, Hr, SmallNote } from "@/components/ui";

function C() {
  const [epoch, setEpoch] = useState(Math.floor(Date.now()/1000));
  const [iso, setIso] = useState(new Date().toISOString());

  const out = useMemo(() => {
    const dFromEpoch = new Date(epoch*1000);
    const isoFromEpoch = isNaN(dFromEpoch.getTime()) ? "—" : dFromEpoch.toISOString();
    const dFromIso = new Date(iso);
    const epochFromIso = isNaN(dFromIso.getTime()) ? NaN : Math.floor(dFromIso.getTime()/1000);
    return { isoFromEpoch, epochFromIso };
  }, [epoch, iso]);

  return (
    <Card>
      <Grid>
        <NumberField label="Epoch seconds" value={epoch} onChange={setEpoch} step={1} />
        <TextField label="ISO string" value={iso} onChange={setIso} placeholder="2026-02-15T12:34:56Z" />
      </Grid>
      <Hr />
      <div style={{ display: "grid", gap: 8 }}>
        <Result label="ISO from epoch" value={out.isoFromEpoch} />
        <Result label="Epoch from ISO" value={Number.isFinite(out.epochFromIso) ? String(out.epochFromIso) : "—"} />
      </div>
      <Hr />
      <SmallNote>ISO parsing uses the browser/JS Date rules.</SmallNote>
    </Card>
  );
}

export const epochConverter: CalculatorModule = {
  meta: { slug: "epoch-converter", title: "Epoch Converter", category: "Time", description: "Unix seconds ↔ ISO date/time (local)." },
  Calculator: C,
};
