import type { CalcVariant } from "./index";

export const bmrVariants: Record<string, CalcVariant> = {
  "tdee-calculator-for-weight-loss": {
    slug: "tdee-calculator-for-weight-loss",
    parent: "bmr-tdee",
    title: "TDEE Calculator for Weight Loss — Daily Calorie Target",
    description: "Calculate your TDEE and get a specific calorie target for fat loss. Includes deficit recommendations and expected weekly weight loss.",
    keyword: "TDEE calculator for weight loss",
    initial: { sex: "female", age: 32, kg: 75, cm: 165, activity: "1.375" },
    intro: "Your TDEE (Total Daily Energy Expenditure) tells you how many calories you burn per day. Subtract a deficit from this number to calculate your weight loss calories.",
    howItWorks: [
      "TDEE = BMR × Activity Factor. BMR (basal metabolic rate) is calculated using the Mifflin-St Jeor equation: (10 × kg) + (6.25 × cm) – (5 × age) + 5 for men, –161 for women.",
      "Activity factors range from 1.2 (sedentary desk job) to 1.9 (professional athlete training 2x/day). Pick conservatively — most people overestimate their activity level.",
      "For fat loss, subtract 500 kcal from TDEE for ~0.5 kg/week loss, or 250 kcal for a slower 0.25 kg/week. Don't go below BMR (your body resists this and metabolism slows)."
    ],
    faq: [
      {
        q: "What TDEE should I eat to lose weight?",
        a: "TDEE minus 500 calories = ~0.5 kg/week loss. Example: TDEE of 2,400 kcal → eat 1,900 kcal/day. Larger deficits (>750 kcal) often cause muscle loss and metabolic slowdown."
      },
      {
        q: "Why am I not losing weight at my calculated TDEE deficit?",
        a: "Three main reasons: (1) underestimating calories eaten — track everything for 2 weeks, (2) overestimating activity factor — drop one level, (3) metabolic adaptation if you've been dieting >6 months — take a 2-week diet break."
      },
      {
        q: "Should I recalculate TDEE as I lose weight?",
        a: "Yes. Every 5–10 kg lost, your BMR drops ~50–100 kcal/day from less tissue to maintain plus metabolic adaptation. Recalculate TDEE and adjust your deficit every 4–6 weeks."
      }
    ],
    related: ["calories-to-gain-muscle", "tdee-for-men"]
  },
  "calories-to-gain-muscle": {
    slug: "calories-to-gain-muscle",
    parent: "bmr-tdee",
    title: "Calories to Gain Muscle — TDEE + Surplus Calculator",
    description: "Calculate how many calories to eat to build muscle without gaining excess fat. Includes lean bulk surplus and nutrition tips.",
    keyword: "calories to gain muscle",
    initial: { sex: "male", age: 28, kg: 80, cm: 180, activity: "1.55" },
    intro: "To build muscle, you need a caloric surplus — but too much surplus leads to fat gain. Calculate your TDEE, then add the right surplus for lean muscle gains.",
    howItWorks: [
      "Muscle requires energy beyond maintenance to synthesize new tissue. Research shows 250–350 kcal/day surplus maximizes muscle gain while minimizing fat gain for most lifters.",
      "Beginners (first 1–2 years of serious training) can gain ~1 kg muscle/month in a surplus. Intermediates drop to ~0.5 kg/month. Beyond that, 'recomp' (maintaining or cutting) is often more effective."
    ],
    faq: [
      {
        q: "How many extra calories to build muscle?",
        a: "250–350 kcal above TDEE for lean bulk. Example: TDEE 2,800 → eat 3,100 kcal. Larger surpluses (500+) lead to mostly fat gain, not additional muscle."
      },
      {
        q: "Do I need a surplus to build muscle?",
        a: "Not always. Beginners and over-fat individuals can build muscle at maintenance or even in a deficit ('body recomposition'). Intermediate+ lifters generally need a surplus for meaningful muscle gains."
      }
    ],
    related: ["tdee-calculator-for-weight-loss", "tdee-for-men"]
  },
  "tdee-for-men": {
    slug: "tdee-for-men",
    parent: "bmr-tdee",
    title: "TDEE Calculator for Men — Daily Calorie Needs",
    description: "Calculate TDEE (Total Daily Energy Expenditure) for men. Accounts for sex-specific BMR and activity multipliers.",
    keyword: "TDEE calculator for men",
    initial: { sex: "male", age: 35, kg: 85, cm: 180, activity: "1.55" },
    intro: "Men have higher BMR than women due to more muscle mass and different hormonal profiles. Use this sex-calibrated TDEE calculator with pre-set defaults for men.",
    howItWorks: [
      "Mifflin-St Jeor BMR for men: (10 × weight kg) + (6.25 × height cm) – (5 × age years) + 5. The '+5' constant reflects higher lean mass and androgen levels.",
      "Average male TDEE ranges from 2,200–3,200 kcal/day depending on activity. Sedentary 180 lb man ≈ 2,100 kcal; active 180 lb man ≈ 2,800 kcal."
    ],
    faq: [
      {
        q: "What's the average TDEE for a man?",
        a: "Moderately active 30-year-old man (80 kg, 180 cm) ≈ 2,600 kcal/day. Sedentary ≈ 2,100 kcal. Very active ≈ 3,100 kcal."
      },
      {
        q: "Why is male TDEE higher than female?",
        a: "Men typically have 10–15% more muscle mass and different hormonal profiles (testosterone drives higher BMR). The difference is ~200–400 kcal/day at equal body weight."
      }
    ],
    related: ["tdee-calculator-for-weight-loss", "calories-to-gain-muscle"]
  }
};
