import type { ShareParams } from "@/lib/types";

export interface CalcVariant {
  /** URL slug for /topic/[slug] */
  slug: string;
  /** Parent calculator slug (must match a real /c/[slug]) */
  parent: string;
  /** SEO page title (shown in <title> + H1) */
  title: string;
  /** Meta description for SERPs */
  description: string;
  /** Target keyword phrase — goes in H1 naturally */
  keyword: string;
  /** Pre-fill params passed to the calculator as initialParams */
  initial: ShareParams;
  /** Intro paragraph (1-2 sentences, shown above the calc) */
  intro: string;
  /** "How it works" block — 2-4 paragraphs of useful content */
  howItWorks: string[];
  /** FAQ entries for FAQPage schema + visible expandable UI */
  faq: { q: string; a: string }[];
  /** Cross-links: slugs of other variant pages */
  related: string[];
}

export interface VariantRegistry {
  [slug: string]: CalcVariant;
}

// Re-export sub-registries so the /topic route can iterate over all variants
import { bmiVariants } from "./bmi";
import { bmrVariants } from "./bmr-tdee";
import { oneRepMaxVariants } from "./one-rep-max";
import { mortgageVariants } from "./mortgage";
import { compoundInterestVariants } from "./compound-interest";
import { percentageVariants } from "./percentage";
import { loanVariants } from "./loan";
import { fireVariants } from "./fire";
import { proteinVariants } from "./protein";

export const ALL_VARIANTS: VariantRegistry = {
  ...bmiVariants,
  ...bmrVariants,
  ...oneRepMaxVariants,
  ...mortgageVariants,
  ...compoundInterestVariants,
  ...percentageVariants,
  ...loanVariants,
  ...fireVariants,
  ...proteinVariants,
};

export function getVariant(slug: string): CalcVariant | undefined {
  return ALL_VARIANTS[slug];
}

export function allVariantSlugs(): string[] {
  return Object.keys(ALL_VARIANTS);
}

/** Get all variants for a given parent calculator */
export function variantsForParent(parent: string): CalcVariant[] {
  return Object.values(ALL_VARIANTS).filter((v) => v.parent === parent);
}
