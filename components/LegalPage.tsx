import Link from "next/link";

export default function LegalPage({
  title,
  subtitle,
  updated,
  children,
}: {
  title: string;
  subtitle?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
        >
          <span>←</span> Back to calculators
        </Link>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-3 text-neutral-400 leading-relaxed">{subtitle}</p>
        ) : null}

        {updated ? (
          <p className="mt-3 text-xs text-neutral-500">
            Last updated: {updated}
          </p>
        ) : null}
      </div>

      <div className="prose prose-invert prose-neutral max-w-none
                      prose-headings:tracking-tight
                      prose-a:text-white prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-white">
        {children}
      </div>
    </div>
  );
}
