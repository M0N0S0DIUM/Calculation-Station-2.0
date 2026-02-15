import Link from "next/link";
import type { CalculatorModule } from "@/lib/types";

export default function CalculatorCard({ calc }: { calc: CalculatorModule }) {
  const { meta } = calc;

  return (
    <Link
      href={`/c/${meta.slug}`}
      className="group block rounded-2xl border border-neutral-900 bg-neutral-950/40 p-5 transition
                 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-950/60"
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold tracking-tight group-hover:text-white transition">
          {meta.title}
        </div>
        <span className="rounded-full border border-neutral-800 bg-neutral-900/50 px-2 py-0.5 text-xs text-neutral-400">
          {meta.category}
        </span>
      </div>

      <div className="mt-3 text-sm text-neutral-500">
        {meta.description}
      </div>
    </Link>
  );
}
