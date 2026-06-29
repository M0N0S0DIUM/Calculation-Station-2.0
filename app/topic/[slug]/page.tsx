import type { Metadata } from "next";
import { allVariantSlugs, getVariant } from "@/lib/variants";
import { getCalculatorMeta } from "@/lib/registry";
import TopicClient from "./TopicClient";

export function generateStaticParams() {
  return allVariantSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const variant = getVariant(slug);
  if (!variant) return { title: "Not Found | Calculation Station" };

  return {
    title: variant.title,
    description: variant.description,
    alternates: { canonical: `/topic/${slug}` },
    openGraph: {
      title: variant.title,
      description: variant.description,
      type: "article",
    },
  };
}

function FaqSchema({ faq }: { faq: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = getVariant(slug);
  if (!variant) return <div>Topic not found.</div>;

  return (
    <>
      <FaqSchema faq={variant.faq} />
      <TopicClient slug={slug} />
    </>
  );
}
