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
  value: number | null;
  onChange: (v: number | null) => void;
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
        value={props.value !== null && Number.isFinite(props.value) ? props.value : ""}
        step={props.step ?? 1}
        min={props.min}
        max={props.max}
        onChange={(e) => {
          const raw = e.target.value;
          // Allow empty string (clearing field) - call onChange with null
          if (raw === "") {
            props.onChange(null);
            return;
          }
          // Allow partial numbers like "1.", "-", "-." - don't update state yet
          if (raw === "-" || raw === "-." || raw.endsWith(".")) {
            return;
          }
          const num = Number(raw);
          if (Number.isFinite(num)) {
            props.onChange(num);
          }
        }}
        onBlur={(e) => {
          // On blur, if the value is just "-" or "-." or ends with ".", clear it
          const raw = e.target.value;
          if (raw === "-" || raw === "-." || raw.endsWith(".")) {
            props.onChange(null);
          }
        }}
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

export function Result({ 
  label, 
  value, 
  copyValue
}: { 
  label: string; 
  value: string; 
  copyValue?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!copyValue) return;
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-neutral-950/60 px-4 py-3">
      <span className="text-sm text-neutral-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold tabular-nums">{value}</span>
        {copyValue && (
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition"
            aria-label={copied ? "Copied!" : "Copy to clipboard"}
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function SmallNote({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 text-sm text-neutral-500">{children}</div>;
}

/* ---------- Share ---------- */

export function createShareUrl(slug: string, params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  const query = searchParams.toString();
  return `/c/${slug}${query ? `?${query}` : ""}`;
}

interface ShareButtonProps {
  slug: string;
  params: Record<string, string | number | boolean>;
  children?: React.ReactNode;
}

export function ShareButton({ slug, params, children }: ShareButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const url = createShareUrl(slug, params);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: show the URL in a prompt
      prompt("Copy this link:", fullUrl);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition border border-neutral-800"
      aria-label={copied ? "Link copied!" : "Copy shareable link"}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="19" r="3"></circle><path d="M13 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"></path></svg>
      )}
      <span>{copied ? "Copied!" : "Share"}</span>
    </button>
  );
}