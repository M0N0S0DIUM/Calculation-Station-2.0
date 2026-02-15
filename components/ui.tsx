"use client";

import React from "react";

/* ---------- Card ---------- */

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 transition hover:border-neutral-800">
      {children}
    </div>
  );
}

/* ---------- Layout ---------- */

export function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Hr() {
  return <div className="my-4 h-px bg-neutral-900" />;
}

/* ---------- Inputs ---------- */

export function NumberField(props: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <label className="grid gap-2">
      <div className="flex justify-between text-sm text-neutral-400">
        <span>{props.label}</span>
        {props.suffix && <span>{props.suffix}</span>}
      </div>

      <input
        type="number"
        value={Number.isFinite(props.value) ? props.value : 0}
        step={props.step ?? 1}
        min={props.min}
        max={props.max}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm outline-none transition
                   focus:border-neutral-600 focus:ring-2 focus:ring-white/10"
      />
    </label>
  );
}

export function TextField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <div className="text-sm text-neutral-400">{props.label}</div>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm outline-none transition
                   placeholder:text-neutral-600 focus:border-neutral-600 focus:ring-2 focus:ring-white/10"
      />
    </label>
  );
}

export function SelectField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="grid gap-2">
      <div className="text-sm text-neutral-400">{props.label}</div>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm outline-none transition
                   focus:border-neutral-600 focus:ring-2 focus:ring-white/10"
      >
        {props.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------- Output ---------- */

export function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-neutral-950/60 px-4 py-3">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

export function SmallNote({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 text-sm text-neutral-500">{children}</div>;
}
