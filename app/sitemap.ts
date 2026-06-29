import { getAllCalculatorSlugs } from "@/lib/registry";
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.calculationstation.org";

/** Top traffic calculators - boosted priority for SEO */
const HIGH_TRAFFIC = new Set(["basic", "bmi", "bmr-tdee", "one-rep-max", "macros", "percentage"]);

/** High-intent money calculators - worth the SEO push */
const HIGH_INTENT = new Set([
  "mortgage", "mortgage-refinance", "compound-interest", "loan",
  "loan-amortization", "roi", "tax-bracket", "credit-card-payoff",
  "retirement-withdrawal", "fire-calculator", "future-value",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllCalculatorSlugs();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,        lastModified: now, priority: 1.0,  changeFrequency: "weekly" },
    { url: `${BASE_URL}/about`,   lastModified: now, priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/privacy`, lastModified: now, priority: 0.3,  changeFrequency: "yearly" },
    { url: `${BASE_URL}/terms`,   lastModified: now, priority: 0.3,  changeFrequency: "yearly" },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/c/${slug}`,
    lastModified: now,
    priority: HIGH_TRAFFIC.has(slug) ? 0.90
            : HIGH_INTENT.has(slug)  ? 0.85
            : 0.70,
    changeFrequency: "monthly",
  }));

  const categoryRoutes: MetadataRoute.Sitemap = [
    "basic", "financial", "health", "conversion",
    "electronics", "time", "brewing",
  ].map((cat) => ({
    url: `${BASE_URL}/cat/${cat}`,
    lastModified: now,
    priority: 0.65,
    changeFrequency: "weekly",
  }));

  return [...staticRoutes, ...calculatorRoutes, ...categoryRoutes];
}
