import { getAllCalculatorSlugs } from "@/lib/registry";
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.calculationstation.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllCalculatorSlugs();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,        lastModified: now, priority: 1.0,  changeFrequency: "weekly" },
    { url: `${BASE_URL}/about`,   lastModified: now, priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/privacy`, lastModified: now, priority: 0.5,  changeFrequency: "yearly" },
    { url: `${BASE_URL}/terms`,   lastModified: now, priority: 0.5,  changeFrequency: "yearly" },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/c/${slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...calculatorRoutes];
}