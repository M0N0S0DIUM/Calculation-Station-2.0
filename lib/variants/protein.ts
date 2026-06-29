import type { CalcVariant } from "./index";

export const proteinVariants: Record<string, CalcVariant> = {
  "protein-intake-for-muscle-building": {
    slug: "protein-intake-for-muscle-building",
    parent: "protein-intake",
    title: "Protein Intake for Muscle Building — Grams Per Day Calculator",
    description: "Calculate optimal daily protein for muscle building. Based on bodyweight and training volume. Science-backed recommendations for hypertrophy.",
    keyword: "protein intake for muscle building",
    initial: { weight: 180, activity: "active", goal: "gain" },
    intro: "Trying to build muscle? Research shows 0.8–1.0 grams per pound of bodyweight maximizes muscle protein synthesis for most lifters.",
    howItWorks: [
      "Research consensus: 1.6–2.2 g/kg (0.73–1.0 g/lb) daily protein maximizes muscle growth for most natural lifters.",
      "A 180 lb lifter building muscle needs roughly 150–180g protein per day. Beyond this range, extra protein doesn't further stimulate growth.",
      "Distribute protein across 4–5 meals of 30–40g each to maximize muscle protein synthesis — hitting the leucine threshold each meal.",
      "Timing matters less than total intake. Post-workout protein helps, but getting enough total daily protein is what drives results."
    ],
    faq: [
      { q: "How much protein do I need to build muscle?", a: "1.6-2.2 g/kg (0.73-1.0 g/lb) of body weight daily. For a 180 lb lifter: 130-180g per day. Above 1 g/lb provides no additional muscle-building benefit for most people." },
      { q: "Does more protein always equal more muscle?", a: "No. Above 2.2 g/kg (~1g/lb), extra protein doesn't build more muscle. It gets oxidized for energy or stored as fat. Save your money." },
      { q: "Best protein sources for muscle?", a: "Whey, eggs, chicken, beef, fish, Greek yogurt — all complete proteins. Plant sources need combining (rice+beans, tofu+grain) for complete amino acid profiles." }
    ],
    related: ["protein-intake-for-weight-loss", "protein-per-day-by-weight"]
  },

  "protein-intake-for-weight-loss": {
    slug: "protein-intake-for-weight-loss",
    parent: "protein-intake",
    title: "Protein Intake for Weight Loss — Preserve Muscle While Cutting",
    description: "Calculate protein needs while in a calorie deficit. Higher protein preserves lean mass during fat loss and keeps you full longer.",
    keyword: "protein intake for weight loss",
    initial: { weight: 180, activity: "active", goal: "lose" },
    intro: "Losing weight? Higher protein intake preserves muscle, reduces hunger, and increases thermogenesis. Get the right amount here.",
    howItWorks: [
      "While cutting (calorie deficit), aim for 1.0–1.2 g/lb (2.2–2.6 g/kg) to preserve lean muscle mass.",
      "A 180 lb person cutting should consume 180–220g protein daily — higher than when bulking or maintaining.",
      "Protein's thermic effect burns 20–30% of its calories during digestion (vs 5–10% for carbs/fat), giving you a dieting edge.",
      "High-protein diets increase satiety hormones (GLP-1, PYY), making calorie restriction more sustainable."
    ],
    faq: [
      { q: "How much protein while losing weight?", a: "1.0-1.2 g/lb of body weight. Higher than maintenance because deficit increases muscle breakdown risk. For a 180 lb person: 180-220g/day." },
      { q: "Will too much protein make me fat?", a: "No — protein is the hardest macronutrient to overeat due to high satiety. Excess protein oxidizes for energy or deaminates (urea cycle) rather than storing as fat." },
      { q: "Protein timing: every 3 hours or all at once?", a: "Distribution matters more on cuts. 4-5 meals of 40g protein keeps muscle protein synthesis elevated throughout the day, reducing muscle loss." }
    ],
    related: ["protein-intake-for-muscle-building", "protein-per-day-by-weight"]
  },

  "protein-per-day-by-weight": {
    slug: "protein-per-day-by-weight",
    parent: "protein-intake",
    title: "Protein Per Day by Weight — General Recommendation Calculator",
    description: "Calculate your daily protein needs based on bodyweight, activity level, and goals. Covers RDA, active, and athlete recommendations.",
    keyword: "how much protein per day by weight",
    initial: { weight: 160, activity: "moderate", goal: "maintain" },
    intro: "Confused about how much protein you need? This calculator factors in your weight, activity level, and goals to give a personalized target.",
    howItWorks: [
      "RDA (0.8 g/kg or 0.36 g/lb) is the MINIMUM to prevent deficiency — not optimal for health, muscle, or satiety.",
      "Active adults should target 1.2–1.6 g/kg (0.5–0.7 g/lb). Athletes and lifters benefit from 1.6–2.2 g/kg.",
      "A 160 lb moderately active person: maintenance ~115g/day. Athletes: 145g. Cutting: 175g/day.",
      "Age matters too: adults 50+ benefit from 1.2+ g/kg to combat sarcopenia (age-related muscle loss)."
    ],
    faq: [
      { q: "What's the RDA for protein?", a: "0.8 g/kg (0.36 g/lb) — but this is a bare minimum for health, not optimal. Most adults benefit from 1.2-2.0 g/kg depending on activity." },
      { q: "Is 100g of protein per day enough?", a: "For most adults under 150 lbs with moderate activity, yes. For larger or highly active people, 100g falls short. Check the calculator for your specific needs." },
      { q: "Does protein intake change with age?", a: "Yes. Adults 50+ should target 1.2-1.6 g/kg minimum to preserve muscle. Seniors 70+ may need 1.6+ g/kg due to reduced protein synthesis efficiency." }
    ],
    related: ["protein-intake-for-muscle-building", "protein-intake-for-weight-loss"]
  },

  "protein-calculator-for-vegetarians": {
    slug: "protein-calculator-for-vegetarians",
    parent: "protein-intake",
    title: "Protein Calculator for Vegetarians — Plant-Based Targets",
    description: "Calculate protein needs on a vegetarian or vegan diet. Includes plant protein sources and how to get complete amino acid profiles.",
    keyword: "protein calculator for vegetarians",
    initial: { weight: 160, activity: "moderate", goal: "maintain" },
    intro: "Getting enough protein on a plant-based diet is totally doable. Learn your targets and the best vegetarian/vegan protein sources.",
    howItWorks: [
      "Vegetarians/vegans should target the same 1.2–2.0 g/kg as omnivores, but need to be more strategic about food choices.",
      "Top vegetarian sources: Greek yogurt (17g/cup), cottage cheese (28g/cup), eggs (6g each), tempeh (31g/cup), lentils (18g/cup).",
      "Top vegan sources: seitan (25g/3.5oz), tofu (20g/cup), tempeh, hemp seeds (10g/3tbsp), nutritional yeast (8g/2tbsp).",
      "Combine complementary proteins throughout the day: rice+beans, hummus+pita, peanut butter+bread for complete amino profiles."
    ],
    faq: [
      { q: "Can vegetarians build muscle?", a: "Absolutely. Research shows vegetarian athletes achieve similar hypertrophy to omnivores when total protein and leucine thresholds are met. It just requires more planning." },
      { q: "Do vegetarians need more protein?", a: "Slightly — plant proteins have lower digestibility (PDCAAS). Target the upper end of recommendations (0.9-1.0 g/lb) to compensate." },
      { q: "Best vegetarian protein powder?", a: "Whey and casein for vegetarians. For vegans: pea/rice blend (complete profile), soy, or hemp. Many plant proteins need combining for all 9 essential amino acids." }
    ],
    related: ["protein-per-day-by-weight", "protein-intake-for-muscle-building"]
  }
};
