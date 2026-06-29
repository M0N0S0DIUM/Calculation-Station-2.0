import type { CalcVariant } from "./index";

export const fireVariants: Record<string, CalcVariant> = {
  "fire-number-calculator": {
    slug: "fire-number-calculator",
    parent: "fire-calculator",
    title: "FIRE Number Calculator — How Much Do You Need to Retire?",
    description: "Calculate your exact FIRE (Financial Independence Retire Early) number based on your annual spending and the 4% safe withdrawal rate.",
    keyword: "FIRE number calculator",
    initial: { expenses: 60000, savingsRate: 50, currentSavings: 100000, returns: 7 },
    intro: "Wondering how much you need to retire? Your FIRE number is the portfolio size that lets you live off investments forever without depleting the principal.",
    howItWorks: [
      "Your FIRE number = annual spending × 25. Spending $60k/year? Your FIRE number is $1.5 million.",
      "The 4% rule (Trinity Study) says you can safely withdraw 4% of your portfolio in year 1, then adjust for inflation, with ~95% success over 30 years.",
      "Lean FIRE ($40k/year spending) = $1M target. Fat FIRE ($120k/year) = $3M. Barista FIRE (part-time work) can be $500k-$750k.",
      "Your FIRE number doesn't include Social Security — it's pure portfolio income. Factor SS in after for additional buffer."
    ],
    faq: [
      { q: "What is a FIRE number?", a: "The portfolio balance needed to cover all living expenses from investment returns alone — typically 25× your annual spending based on the 4% rule." },
      { q: "Is FIRE realistic on a normal salary?", a: "Yes, but it requires a high savings rate (40-60%+). Someone saving 50% on a $75k salary can reach FIRE in ~17 years at 7% returns." },
      { q: "What's the difference between lean, fat, and barista FIRE?", a: "Lean FIRE (~$1M) covers bare essentials. Fat FIRE ($2-3M) covers luxury spending. Barista FIRE (~$500-750k) plus part-time work income." },
      { q: "Is the 4% rule still valid in 2024?", a: "Yes for 30-year retirements. For 40+ year retirements, many advisors suggest 3.5% to be safer. Market valuations matter too — high CAPE ratios may warrant lower withdrawal rates." }
    ],
    related: ["retire-at-40-calculator", "retire-at-50-calculator", "lean-fire-calculator"]
  },

  "retire-at-40-calculator": {
    slug: "retire-at-40-calculator",
    parent: "fire-calculator",
    title: "Retire at 40 Calculator — Your Path to Early Retirement",
    description: "Calculate what it takes to retire by age 40: savings rate, annual contributions needed, and total portfolio required.",
    keyword: "retire at 40 calculator",
    initial: { expenses: 50000, savingsRate: 60, currentSavings: 100000, returns: 7 },
    intro: "Retiring at 40 requires aggressive saving and smart investing. This calculator shows the exact savings rate and timeline needed to make it happen.",
    howItWorks: [
      "Retiring at 40 means planning for 40-50 years of retirement — a longer horizon than the 30-year Trinity Study.",
      "Most people retiring at 40 need a 60-70% savings rate. That means spending only 30-40% of take-home income.",
      "A 30-year-old saving 65% of a $100k income (~$42k/year) at 7% returns could reach a $1.25M FIRE number by 40.",
      "The earlier you start, the easier the math: starting at 22 gives you 18 years of compound growth vs starting at 30 (only 10 years)."
    ],
    faq: [
      { q: "Can I realistically retire at 40?", a: "Yes, if you have $1.5-2M saved OR can save 60%+ of a high income for 15+ years. Most who achieve it started in their early 20s with high savings rates." },
      { q: "How much money do I need to retire at 40?", a: "At least 25× your annual spending — but ideally 30-33× because you're planning for 45-50 years instead of 30. For $60k/year spending, target $1.8-2M." },
      { q: "What's the biggest risk of retiring at 40?", a: "Sequence-of-returns risk (bad markets early in retirement), healthcare costs before Medicare at 65, and lifestyle inflation. Plan for at least one of these." }
    ],
    related: ["fire-number-calculator", "retire-at-50-calculator"]
  },

  "retire-at-50-calculator": {
    slug: "retire-at-50-calculator",
    parent: "fire-calculator",
    title: "Retire at 50 Calculator — Early Retirement Planning",
    description: "Figure out the savings rate, contributions, and portfolio needed to retire by age 50 with enough to last until 90+.",
    keyword: "retire at 50 calculator",
    initial: { expenses: 60000, savingsRate: 45, currentSavings: 250000, returns: 7 },
    intro: "Retiring at 50 is an ambitious but achievable goal. See how your current savings rate and contributions stack up against your target.",
    howItWorks: [
      "Retiring at 50 typically requires a 40-50% savings rate over 20-25 years, starting from your mid-20s.",
      "A 40-year-old with $250k saved, maxing 401(k) + IRA (~$40k/year) at 7% returns, could reach $1.8M by age 55.",
      "Healthcare is a major concern — you're 15 years from Medicare. Budget $1,000-1,500/month for private insurance.",
      "The 4% rule is more applicable here (~35-40 year retirement) than for age 40 retirement."
    ],
    faq: [
      { q: "How much do I need to retire at 50?", a: "25× annual spending at minimum, ideally 28-30× to cover a 35-40 year retirement. At $60k/year spending, target $1.5-1.8M." },
      { q: "What savings rate is needed to retire at 50?", a: "Starting from zero at age 25: ~45% savings rate. Starting with existing savings at 35: 50-55%. The earlier you start, the lower the rate needed." },
      { q: "Can I use Social Security at 50?", a: "No. SS earliest is 62, full benefit at 66-67. Plan your retirement income without counting SS — it's just extra when you hit 62." }
    ],
    related: ["fire-number-calculator", "retire-at-40-calculator"]
  },

  "lean-fire-calculator": {
    slug: "lean-fire-calculator",
    parent: "fire-calculator",
    title: "Lean FIRE Calculator — Retire on $1 Million or Less",
    description: "Calculate how to retire with lean spending ($40-50k/year). Lower FIRE number means faster financial independence.",
    keyword: "lean FIRE calculator",
    initial: { expenses: 45000, savingsRate: 55, currentSavings: 150000, returns: 7 },
    intro: "Lean FIRE means living modestly in retirement with a lower spending target. For many, it's the fastest path to financial freedom.",
    howItWorks: [
      "Lean FIRE targets $40-50k/year spending, requiring a portfolio of just $1-1.25M.",
      "The tradeoff: modest housing, used car, minimal travel. But many find contentment in simplicity.",
      "High-cost areas are tough on lean budgets. Consider locations with lower COL: Midwest, Southeast US, or abroad (Portugal, Mexico).",
      "With 50%+ savings rate, lean FIRE is achievable in 15-20 years even on median income."
    ],
    faq: [
      { q: "What is lean FIRE?", a: "Financial independence with modest spending — typically $40-50k/year or $1-1.25M portfolio. Contrasts with fat FIRE ($2-3M+)." },
      { q: "Is lean FIRE realistic in 2024?", a: "Yes, but location matters enormously. $45k/year works great in rural Ohio; it's tight in San Francisco. Consider moving in retirement." },
      { q: "How long to reach lean FIRE?", a: "With 50% savings rate on median income: ~17 years. With higher income + investments: as fast as 10-12 years." }
    ],
    related: ["fire-number-calculator", "retire-at-50-calculator"]
  }
};
