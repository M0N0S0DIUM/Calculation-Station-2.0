"use client";
import { useMemo, useState } from "react";
import type { CalculatorModule } from "@/lib/types";
import { Card, NumberField, Result, Hr, SmallNote } from "@/components/ui";

function isPrime(n: number) {
  n = Math.trunc(n);
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function C() {
  const [n, setN] = useState(97);
  const r = useMemo(() => isPrime(n), [n]);
  return (
    <Card>
      <NumberField label="Integer" value={n} onChange={setN} step={1} />
      <Hr />
      <Result label="Prime?" value={r ? "Yes" : "No"} />
      <Hr />
      <SmallNote>Fast enough for typical ranges (32-bit-ish).</SmallNote>
    </Card>
  );
}

export const primeCheck: CalculatorModule = {
  meta: { slug: "prime-check", title: "Prime Checker", category: "Basic", description: "Check if an integer is prime." },
  Calculator: C,
};
