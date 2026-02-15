export function round(n: number, digits = 6) {
  if (!Number.isFinite(n)) return NaN;
  const p = Math.pow(10, digits);
  return Math.round(n * p) / p;
}

export function fmt(n: number, digits = 6) {
  if (!Number.isFinite(n)) return "—";
  const r = round(n, digits);
  return r.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export function fmtInt(n: number) {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString();
}

export function fmtMoney(n: number, currency: string = "USD") {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, { style: "currency", currency });
}

export function fmtPct(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return `${round(n, digits)}%`;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b !== 0) [a, b] = [b, a % b];
  return a || 1;
}

export function lcm(a: number, b: number): number {
  a = Math.trunc(a); b = Math.trunc(b);
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
