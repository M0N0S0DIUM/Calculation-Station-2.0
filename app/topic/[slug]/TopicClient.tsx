"use client";

import { getVariant, variantsForParent } from "@/lib/variants";
import { getCalculator } from "@/lib/registry-client";

export default function TopicClient({ slug }: { slug: string }) {
  const variant = getVariant(slug);
  if (!variant) return <div>Topic not found.</div>;

  const calculator = getCalculator(variant.parent);
  if (!calculator) return <div>Calculator not found.</div>;
  const CalculatorComponent = calculator.Calculator;
  const siblings = variantsForParent(variant.parent).filter((v) => v.slug !== variant.slug);

  const { title, intro, howItWorks, faq, initial } = variant;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-xl text-gray-600">{intro}</p>
        </header>

        {/* Calculator */}
        <section className="mb-12">
          <CalculatorComponent initialParams={initial} />
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {howItWorks.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faq.map((item, i) => (
              <div key={i} className="border-l-4 border-indigo-500 pl-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.q}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related topics */}
        {siblings.length > 0 && (
          <section className="mb-12 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900">
              Related calculators
            </h2>
            <ul className="space-y-1">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/topic/${s.slug}`}
                    className="text-indigo-600 hover:text-indigo-700 hover:underline"
                  >
                    {s.title.split(" — ")[0]}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back to all calculators */}
        <footer className="text-center text-gray-500">
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            ← All calculators
          </a>
          <span className="mx-3">·</span>
          <a
            href={`/c/${variant.parent}`}
            className="text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Full {calculator.meta.title}
          </a>
        </footer>
      </article>
    </div>
  );
}
