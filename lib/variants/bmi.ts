import type { CalcVariant } from "./index";

export const bmiVariants: Record<string, CalcVariant> = {
  "bmi-for-athletes": {
    slug: "bmi-for-athletes",
    parent: "bmi",
    title: "BMI Calculator for Athletes — Accurate Body Mass Index Tool",
    description: "Calculate BMI for athletes and active individuals. Understand how muscle mass affects BMI and what healthy ranges mean for sports performance.",
    keyword: "BMI calculator for athletes",
    initial: { units: "us", weight: 185, height: 72 },
    intro: "BMI can be misleading for athletes because muscle weighs more than fat. Use this calculator to see your BMI, then read below to interpret what it means for your sport.",
    howItWorks: [
      "BMI (Body Mass Index) = weight (kg) ÷ height² (m²). For US units, multiply the result by 703.",
      "Standard BMI categories: underweight (<18.5), normal (18.5–24.9), overweight (25–29.9), obese (≥30). These were designed for the general population, not athletes.",
      "Why BMI misclassifies athletes: dense muscle tissue is heavier than fat, so a lean athlete can have a 'high' BMI despite low body fat. A Division I football player might have a BMI of 28 (overweight) but 8% body fat.",
      "For athletes, body fat percentage (measured via calipers, DEXA scan, or bioimpedance) is far more indicative of fitness than BMI. Use this as a quick estimate, then follow up with sport-specific body composition testing."
    ],
    faq: [
      {
        q: "Is BMI accurate for athletes?",
        a: "No — BMI often overestimates body fat in athletes with high muscle mass. A professional rugby player or bodybuilder can easily fall into the 'overweight' or 'obese' BMI category while being extremely lean. Body fat percentage is a better metric for most athletes."
      },
      {
        q: "What's a healthy BMI for a runner?",
        a: "Elite distance runners typically range from BMI 18–21. However, this isn't a target — it's a side effect of low body fat and high power-to-weight ratio. Focus on performance and recovery rather than hitting a specific BMI."
      },
      {
        q: "Should I use BMI to track fitness progress?",
        a: "No. Since muscle is denser than fat, you can gain muscle and lose fat while your BMI stays the same or increases. Track body fat percentage, waist circumference, strength gains, or performance metrics instead."
      }
    ],
    related: ["bmi-for-women-over-40", "calories-to-lose-weight"]
  },
  "bmi-for-women-over-40": {
    slug: "bmi-for-women-over-40",
    parent: "bmi",
    title: "BMI Calculator for Women Over 40 — Age-Adjusted Interpretation",
    description: "Calculate BMI for women over 40. Understand how menopause and age affect healthy weight ranges and what your BMI means for long-term health.",
    keyword: "BMI calculator for women over 40",
    initial: { units: "us", weight: 150, height: 65 },
    intro: "As women enter their 40s and beyond, hormonal changes (perimenopause, menopause) can shift body composition. Calculate your BMI here, then learn how to interpret it for your age group.",
    howItWorks: [
      "BMI calculation is the same regardless of age or gender: weight (kg) ÷ height² (m²), or (weight (lbs) ÷ height² (in²)) × 703.",
      "However, interpretation changes with age. After 40, estrogen decline during perimenopause/menopause can redistribute fat from hips/thighs to the abdomen — a higher-risk pattern for cardiovascular disease and type 2 diabetes.",
      "A BMI of 25–27 may still be 'healthy' for women over 40 if it's driven by muscle preservation and bone density rather than visceral fat. Waist circumference (>35 inches = elevated risk) is a more actionable metric."
    ],
    faq: [
      {
        q: "What's a healthy BMI for a 45-year-old woman?",
        a: "The standard 'normal' range of 18.5–24.9 still applies, but research suggests a BMI of 25–27 may be protective for women over 40 (reduced osteoporosis risk, better recovery from illness). Focus on waist-to-height ratio rather than BMI alone."
      },
      {
        q: "Why do I gain weight after 40 even though I eat the same?",
        a: "Metabolism slows ~1–2% per decade after 30, and menopause can further reduce lean muscle mass. To maintain weight, increase protein intake (preserves muscle), strength train 2–3x/week, and accept that your 'maintenance calories' may be 300–500 kcal/day lower than in your 20s."
      },
      {
        q: "Is BMI a good health indicator during menopause?",
        a: "It's limited. Menopause causes fat redistribution (to the abdomen) even if total weight stays stable. Waist circumference, fasting glucose, and blood pressure are more actionable indicators of metabolic health during this transition."
      }
    ],
    related: ["bmi-for-athletes"]
  },
  "bmi-calculator-metric": {
    slug: "bmi-calculator-metric",
    parent: "bmi",
    title: "BMI Calculator (Metric) — kg and cm Body Mass Index Tool",
    description: "Free BMI calculator using kilograms and centimeters. No need to convert units — enter weight in kg and height in cm for instant results.",
    keyword: "BMI calculator metric kg cm",
    initial: { units: "metric", weight: 70, height: 175 },
    intro: "Use this metric BMI calculator to find your Body Mass Index. Enter weight in kilograms and height in centimeters — no unit conversion required.",
    howItWorks: [
      "Metric BMI formula: weight (kg) ÷ (height in meters)². Since height is entered in centimeters, convert to meters by dividing by 100.",
      "Example: 70 kg, 175 cm → 70 ÷ (1.75 × 1.75) = 22.86 BMI.",
      "All BMI categories (underweight, normal, overweight, obese) apply identically whether you use metric or US customary units."
    ],
    faq: [
      {
        q: "Which is more accurate: metric or US BMI?",
        a: "Identical — they're the same formula with different unit conversions. 1 kg = 2.205 lbs, 1 cm = 0.39 inches."
      },
      {
        q: "Why use metric BMI instead of US?",
        a: "Simpler math. Metric BMI = kg ÷ m² (two numbers). US BMI = (lbs ÷ in²) × 703 (three numbers). Result is the same."
      }
    ],
    related: ["bmi-for-athletes", "bmi-for-women-over-40"]
  }
};
