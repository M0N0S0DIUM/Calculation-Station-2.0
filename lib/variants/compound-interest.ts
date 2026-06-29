import type { CalcVariant } from "./index";

export const compoundInterestVariants: Record<string, CalcVariant> = {
  "compound-interest-calculator-10-years": {
    slug: "compound-interest-calculator-10-years",
    parent: "compound-interest",
    title: "10-Year Compound Interest Calculator — See Your Growth",
    description: "Calculate exactly how much $10,000 invested today will be worth in 10 years with monthly contributions. Compare growth at 4%, 7%, and 10% returns.",
    keyword: "compound interest calculator 10 years",
    initial: { principal: 10000, monthly: 200, apr: 7, years: 10 },
    intro: "Planning a 10-year investment horizon? See exactly how compound interest turns your initial deposit and monthly contributions into serious wealth over a decade.",
    howItWorks: [
      "Compound interest earns you returns on both your principal AND previous returns. That's why $10k invested for 10 years can more than double at just 7% APR.",
      "Monthly contributions supercharge compounding. $200/month over 10 years at 7% contributes $24k of your own money but grows to ~$51k total — $17k is pure compound growth.",
      "The Rule of 72 says money at 7% doubles roughly every 10.3 years, so a decade gives you approximately one doubling cycle on your principal alone.",
      "Time in the market beats timing the market. Starting 10 years early can double your retirement nest egg compared to waiting."
    ],
    faq: [
      { q: "How much will $10,000 be worth in 10 years at 7%?", a: "Approximately $19,672 with no additional contributions. Add $200/month and the total grows to around $54,000." },
      { q: "What is compound interest?", a: "Earning returns on your returns. Your interest earns interest, creating exponential growth over time. It's the #1 wealth-building force in finance." },
      { q: "Is 10 years long enough to invest?", a: "Absolutely. 10 years is long enough to ride out market volatility and let compounding do most of the work. Stocks historically return 7–10% annually over 10+ year periods." }
    ],
    related: ["compound-interest-1-million", "compound-interest-retirement"]
  },

  "compound-interest-1-million": {
    slug: "compound-interest-1-million",
    parent: "compound-interest",
    title: "How to Invest to $1 Million — Compound Interest Calculator",
    description: "Calculate how many years it takes to reach $1,000,000 with monthly contributions. See the savings rate and time needed at various return rates.",
    keyword: "compound interest to reach 1 million",
    initial: { principal: 10000, monthly: 1000, apr: 8, years: 25 },
    intro: "Want to reach a $1 million portfolio? This calculator shows the monthly contribution, time, and return rate needed to hit that milestone.",
    howItWorks: [
      "At 8% annual returns, $1,000/month grows to $1 million in roughly 24 years. Without compounding, it would take 83 years of straight contributions.",
      "Start with even $20k principal and you can reach $1M faster — that initial $20k alone grows to ~$137k at 8% over 25 years.",
      "The math behind becoming a millionaire is simple: consistency × time × a reasonable return. You don't need to be lucky — just patient.",
      "Maxing a 401(k) (~$1,875/month in 2024) with a 7% return hits $1M in about 21 years. Add the employer match and it's even faster."
    ],
    faq: [
      { q: "How long to invest $1,000/month to reach $1 million?", a: "Approximately 24 years at 8% returns, 26 years at 7%, or 21 years at 10%. The earlier you start, the shorter the runway needed." },
      { q: "How much do I need to save monthly to be a millionaire?", a: "At 7% returns over 30 years, just $820/month reaches $1M. Over 20 years, you'd need $1,920/month. Time does most of the work." },
      { q: "Is $1 million enough to retire on?", a: "Using the 4% rule, $1M provides ~$40k/year in retirement income. Combined with Social Security, it's sufficient for many retirees in moderate-cost areas." }
    ],
    related: ["compound-interest-calculator-10-years", "compound-interest-retirement"]
  },

  "compound-interest-retirement": {
    slug: "compound-interest-retirement",
    parent: "compound-interest",
    title: "Retirement Compound Interest Calculator — How Much Will I Have?",
    description: "Calculate your retirement nest egg using compound interest. See how much you'll have at 65 based on your current savings rate and expected returns.",
    keyword: "compound interest retirement calculator",
    initial: { principal: 50000, monthly: 500, apr: 7, years: 30 },
    intro: "Planning retirement? See exactly how much your current savings and monthly contributions will grow to by the time you stop working.",
    howItWorks: [
      "A 35-year-old with $50k saved, contributing $500/month at 7% returns, will have roughly $1.1M by age 65 — enough for a comfortable retirement.",
      "The earlier you start, the less you need to save monthly. Starting at 25 vs 35 with the same monthly contribution roughly doubles your end nest egg.",
      "Most advisors suggest 7% as a realistic long-term return (10% historical stock market minus ~3% inflation). Avoid using overly optimistic 10%+ numbers.",
      "A common target is 10–12× your annual spending at retirement. If you spend $60k/year, aim for $600k–720k invested."
    ],
    faq: [
      { q: "What return rate should I use for retirement planning?", a: "7% after inflation is the conservative baseline. 8% is reasonable for a balanced portfolio. Never plan on more than 8–9% for long-term projections." },
      { q: "How much do I need to retire at 65?", a: "Multiply your desired annual retirement spending by 25 (the inverse of the 4% rule). $80k/year spending = $2M target. $50k/year = $1.25M." },
      { q: "Is compound interest enough for retirement?", a: "Yes — compounding is the entire reason retirement works. Saving 15% of income from age 25 almost always reaches your target by 65. The problem is most people delay." }
    ],
    related: ["compound-interest-1-million", "compound-interest-calculator-10-years"]
  },

  "compound-interest-savings-account": {
    slug: "compound-interest-savings-account",
    parent: "compound-interest",
    title: "Savings Account Compound Interest Calculator",
    description: "See how much your savings account will grow with compound interest at current high-yield rates (4–5% APY). Compare banks and term lengths.",
    keyword: "savings account compound interest calculator",
    initial: { principal: 10000, monthly: 0, apr: 4.5, years: 5 },
    intro: "High-yield savings accounts now pay 4–5% APY. Calculate how much your savings account will grow over 5, 10, or 20 years with compound interest.",
    howItWorks: [
      "At 4.5% APY, $10,000 grows to $12,462 in 5 years with no additional deposits — $2,462 in free money just for leaving it alone.",
      "Compound frequency matters. Monthly compounding at 4.5% APR yields slightly more than annual compounding, but savings account APY already accounts for this.",
      "Adding $200/month for 5 years at 4.5% turns $10k into ~$25,700 — your contributions ($12k) plus $3,700 in interest.",
      "For short-term goals (1–3 years), a HYSA is safer than stocks. For 10+ years, investing beats savings by a wide margin."
    ],
    faq: [
      { q: "How often is savings account interest compounded?", a: "Most HYSAs compound daily and credit monthly. Some compound monthly. APY already accounts for compounding, so a 4.5% APY means exactly that — 4.5% over the year." },
      { q: "Is 4.5% a good savings rate?", a: "Yes — it's near the top of current HYSA offerings. Anything above 4% in 2024 is excellent. Rates below 1% (big banks) leave free money on the table." },
      { q: "Should I use savings or invest?", a: "Use savings for money you need within 3 years (emergency fund, down payment). Invest for anything beyond 5 years — stocks historically outperform savings by 5–6%." }
    ],
    related: ["compound-interest-calculator-10-years", "compound-interest-retirement"]
  },

  "compound-interest-monthly": {
    slug: "compound-interest-monthly",
    parent: "compound-interest",
    title: "Monthly Compound Interest Calculator — See Your Growth",
    description: "Calculate compound interest with monthly contributions. See how $100, $500, or $1,000/month grows over 5, 10, 20, or 30 years.",
    keyword: "monthly compound interest calculator",
    initial: { principal: 5000, monthly: 500, apr: 7, years: 20 },
    intro: "Monthly contributions are the most powerful way to build wealth. Calculate exactly how much your monthly savings will grow with compound interest.",
    howItWorks: [
      "Monthly contributions combined with compounding create a snowball effect. $500/month at 7% for 20 years turns $126k of your money into ~$260k total.",
      "Every $100/month at 7% grows to ~$52k over 20 years. Bump to $500/month and you hit ~$260k. At $1,000/month you reach ~$520k.",
      "Dollar-cost averaging (investing a fixed amount monthly) smooths out market volatility and removes emotion from investing.",
      "Automate your contributions — 'pay yourself first' by investing the day after each paycheck. You can't spend what you can't see."
    ],
    faq: [
      { q: "How much will $500/month be worth in 20 years?", a: "At 7% annual returns, roughly $260,000. You'll have contributed $120,000 and earned ~$140,000 in compound growth." },
      { q: "What's the best monthly contribution amount?", a: "Whatever you can sustain for 20+ years. $500/month is a sweet spot — aggressive enough to build real wealth but manageable on a median salary." },
      { q: "Does compounding work better with monthly or yearly contributions?", a: "Monthly, because your money starts working earlier. $12k/year contributed monthly beats annual lump-sum contributions by ~0.5% annually on average." }
    ],
    related: ["compound-interest-retirement", "compound-interest-1-million", "compound-interest-calculator-10-years"]
  }
};
