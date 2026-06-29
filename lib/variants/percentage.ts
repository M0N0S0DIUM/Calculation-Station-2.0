import type { CalcVariant } from "./index";

export const percentageVariants: Record<string, CalcVariant> = {
  "percentage-calculator-discount": {
    slug: "percentage-calculator-discount",
    parent: "percentage",
    title: "Discount Percentage Calculator — How Much Will I Save?",
    description: "Calculate exactly how much you save with a 10%, 20%, 25%, or 30% discount on any price. Perfect for shopping, sales, and coupon math.",
    keyword: "discount percentage calculator",
    initial: { base: 100, pct: 20, part: 20 },
    intro: "Shopping a sale? Calculate the exact dollar savings and final price for any percentage discount on any price tag.",
    howItWorks: [
      "A 20% discount on $100 saves you $20 — your final price is $80. For a different price, multiply original price × discount% (as a decimal) = savings.",
      "The mental math shortcut: move the decimal two places left in the percentage, then multiply. 25% of $80 → 0.25 × 80 = $20 savings → $60 final price.",
      "Stacking discounts doesn't work additively. 20% + 10% off is NOT 30% off — it's 20% then 10% on the reduced price, totaling 28% off.",
      "For quick 10% estimates, just move one decimal place: $79 becomes ~$7.90 savings. Double that for 20%, half it for 5%."
    ],
    faq: [
      { q: "How do I calculate a 30% discount?", a: "Multiply the price by 0.30 to get your savings. $50 × 0.30 = $15 savings, so you pay $35. Or use the shortcut: 30% of 50 = 15." },
      { q: "Is 20% off a good discount?", a: "For everyday retail, yes. Black Friday/Cyber Monday typically offers 20–40% off most items. Electronics rarely exceed 15–20%." },
      { q: "How to calculate percentage off on sale items?", a: "Subtract the sale price from original price, divide by original, multiply by 100. Example: $80 → $60 saves $20 → 20/80 × 100 = 25% off." }
    ],
    related: ["percentage-calculator-tip", "percentage-calculator-gpa"]
  },

  "percentage-calculator-tip": {
    slug: "percentage-calculator-tip",
    parent: "percentage",
    title: "Tip Percentage Calculator — How Much Should I Tip?",
    description: "Calculate 15%, 18%, 20%, or 25% tip on any bill. See tip amounts and total for restaurants, bars, delivery, and rideshare.",
    keyword: "tip percentage calculator",
    initial: { base: 50, pct: 20, part: 10 },
    intro: "Dining out or taking a ride? Quickly calculate the exact tip amount and total bill for 15%, 18%, 20%, and 25% tipping.",
    howItWorks: [
      "Standard US restaurant tip is 18–20% of the pre-tax bill. Good service: 20%. Average: 15%. Exceptional: 25%+.",
      "For a $50 bill, a 20% tip is $10 making your total $60. For a $100 bill, 20% = $20 tip = $120 total.",
      "Delivery tips: 15–20% or $3–5 minimum (whichever is higher). Rideshare: 15–20%. Bartender: $1–2 per drink or 20% of tab.",
      "Splitting with friends? Tip on the full bill amount first, then divide total (bill + tip) by the number of people."
    ],
    faq: [
      { q: "What is the standard tip percentage in 2024?", a: "18–20% for full-service restaurants, 15% for counter service/cafes, and $1–2 per drink for bartenders. Pre-tax amount is standard." },
      { q: "Do you tip on tax?", a: "Generally no — tip on the pre-tax subtotal. Some calculators use post-tax, which adds ~8–10% to your tip." },
      { q: "How much is a 20% tip on $75?", a: "$15 — making your total $90. Quick mental math: 10% of $75 is $7.50, double it for $15." }
    ],
    related: ["percentage-calculator-discount"]
  },

  "percentage-calculator-gpa": {
    slug: "percentage-calculator-gpa",
    parent: "percentage",
    title: "Percentage to GPA Calculator — Letter Grade Conversion",
    description: "Convert percentages to GPA and letter grades. See the standard 4.0 scale breakdown plus common A, B, C, D, F cutoffs.",
    keyword: "percentage to gpa calculator",
    initial: { base: 100, pct: 85, part: 85 },
    intro: "Convert your class percentages into a 4.0 GPA and determine your letter grade. Useful for college applications and scholarship tracking.",
    howItWorks: [
      "Standard 4.0 scale: A = 93–100% (4.0), A- = 90–92% (3.7), B+ = 87–89% (3.3), B = 83–86% (3.0), B- = 80–82% (2.7), and so on.",
      "To calculate GPA: convert each grade to its point value, sum them, and divide by the number of classes. Weighted classes (AP/Honors) add 1.0.",
      "For a 12-class schedule with 8 A's and 4 B's: (8×4.0 + 4×3.0) ÷ 12 = 3.67 GPA.",
      "Grad school typically requires 3.0+, scholarships often want 3.5+, and top programs look for 3.8+."
    ],
    faq: [
      { q: "What percentage is a 3.0 GPA?", a: "A 3.0 GPA corresponds to a B letter grade, typically 83–86% on most scales." },
      { q: "What is a 4.0 GPA percentage?", a: "An unweighted 4.0 is typically 93%+ in all classes. With weighted (AP/Honors) classes, 4.0+ GPAs are possible." },
      { q: "Is 85% a B?", a: "Usually yes — 85% is typically a solid B (3.0 on the 4.0 scale). Exact cutoffs vary by school; some use 83–86%, others 80–89%." }
    ],
    related: ["percentage-calculator-discount", "percentage-calculator-tip"]
  },

  "percentage-calculator-increase": {
    slug: "percentage-calculator-increase",
    parent: "percentage",
    title: "Percentage Increase Calculator — Year-Over-Year & Growth",
    description: "Calculate percentage increase between two numbers. Perfect for salary raises, stock gains, revenue growth, and year-over-year comparisons.",
    keyword: "percentage increase calculator",
    initial: { base: 50000, pct: 5, part: 2500 },
    intro: "Figure out the exact percentage increase between two values — useful for salary raises, investment returns, and business growth metrics.",
    howItWorks: [
      "Percentage increase = ((new - old) ÷ old) × 100. Example: $50,000 → $55,000 salary = ($5,000 ÷ $50,000) × 100 = 10% raise.",
      "A 5% annual increase compounded over 10 years turns $50k into ~$81k — compounding adds $31k even though individual years only show 5%.",
      "Year-over-year (YoY) growth compares the same period in consecutive years: Q1 2023 vs Q1 2024 revenue.",
      "Be careful with small numbers going to large ones — a $10 stock going to $15 is 50% growth, but $150 to $155 is only 3.3%."
    ],
    faq: [
      { q: "How do I calculate percentage increase?", a: "Subtract old from new, divide by old, multiply by 100. Example: 50 → 65: (65-50)/50 × 100 = 30% increase." },
      { q: "What is a good annual salary raise percentage?", a: "3–5% is standard, matching or slightly beating inflation. Job-hopping can yield 10–20% jumps. Internal promotions often average 8–12%." },
      { q: "What is the percentage increase from 100 to 125?", a: "25% — you added 25 to the original 100, and 25/100 = 0.25 = 25%." }
    ],
    related: ["percentage-calculator-decrease", "percentage-calculator-discount"]
  },

  "percentage-calculator-decrease": {
    slug: "percentage-calculator-decrease",
    parent: "percentage",
    title: "Percentage Decrease Calculator — Loss, Drop, & Decline Math",
    description: "Calculate percentage decrease between two numbers. Useful for tracking weight loss, stock losses, expense reduction, and price drops.",
    keyword: "percentage decrease calculator",
    initial: { base: 100, pct: 15, part: 15 },
    intro: "Calculate how much a value has decreased, expressed as a percentage. Perfect for tracking weight loss, investment drops, and price reductions.",
    howItWorks: [
      "Percentage decrease = ((old - new) ÷ old) × 100. Example: $100 → $85 = (15 ÷ 100) × 100 = 15% decrease.",
      "Weight loss: Losing 10 lbs from 200 lbs is (10 ÷ 200) × 100 = 5% weight loss.",
      "A stock falling from $50 to $35 lost (15 ÷ 50) × 100 = 30%. To break even, it needs to rise ~43% — illustrating why drawdowns are brutal.",
      "Expense reduction uses the same formula: cutting $500/month expenses from a $5,000 budget = 10% reduction."
    ],
    faq: [
      { q: "How do I calculate percentage decrease?", a: "(old - new) ÷ old × 100. Example: 200 → 160 = (40/200) × 100 = 20% decrease." },
      { q: "What's the difference between percent and percentage points?", a: "Percent is proportional change; percentage points are absolute differences. Going from 5% to 7% interest is a 2 percentage point increase but a 40% percent increase." },
      { q: "If a stock drops 50% then rises 50%, am I back to even?", a: "No — you're down 25%. $100 → $50 → $75. This is the asymmetric nature of losses: you need a 100% gain to recover a 50% loss." }
    ],
    related: ["percentage-calculator-increase", "percentage-calculator-discount"]
  }
};
