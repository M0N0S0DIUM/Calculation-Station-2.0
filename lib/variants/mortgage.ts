import type { CalcVariant } from "./index";

export const mortgageVariants: Record<string, CalcVariant> = {
  "mortgage-calculator-300k": {
    slug: "mortgage-calculator-300k",
    parent: "mortgage",
    title: "$300,000 Mortgage Calculator — Monthly Payment & Total Interest",
    description: "Calculate the monthly payment, total interest, and PITI for a $300,000 mortgage. See income requirements and down payment options at current rates.",
    keyword: "$300000 mortgage calculator",
    initial: { home: 300000, downPct: 20, apr: 6.75, years: 30, tax: 300, ins: 100, hoa: 0 },
    intro: "Buying a $300,000 home? This calculator shows your exact monthly payment, total interest over 30 years, and true PITI cost including taxes and insurance.",
    howItWorks: [
      "A $300,000 home with 20% down ($60k) gives you a $240,000 loan. At 6.75% APR for 30 years, your principal + interest is about $1,556/month.",
      "Adding typical property taxes ($300/mo), homeowners insurance ($100/mo), and no HOA brings your total PITI to roughly $1,956/month.",
      "Over 30 years you'll pay approximately $320,000 in interest — more than the loan itself. A 15-year term cuts interest by ~60% but nearly doubles your monthly payment.",
      "Most lenders want your housing cost under 28% of gross income, so a $300k mortgage typically requires $85k–95k annual income depending on debts and credit."
    ],
    faq: [
      { q: "What income do I need for a $300,000 house?", a: "With 20% down and a strong credit score, plan on $85k–95k annual income. With FHA's 3.5% down program you can buy with less upfront but your monthly payment rises due to PMI, pushing income need to ~$95k–110k." },
      { q: "How much is the monthly payment on a $300k mortgage?", a: "At 6.75% APR for 30 years, principal + interest alone is ~$1,945/month on a $300k loan (0% down). With 20% down, PITI typically lands around $1,900–2,100/month including taxes and insurance." },
      { q: "How much interest is paid on a $300k mortgage?", a: "At 6.75% for 30 years with 20% down ($240k loan), total interest is approximately $360,000. Every $1,000 in extra monthly payment toward principal can save tens of thousands in interest." },
      { q: "Is 20% down required for a $300,000 home?", a: "No. Conventional loans accept 3–5% down ($9k–15k), FHA requires 3.5% ($10.5k), and VA loans offer 0% down for eligible veterans — though less down means higher monthly costs via PMI." }
    ],
    related: ["mortgage-calculator-500k", "mortgage-calculator-250k", "mortgage-calculator-200k"]
  },

  "mortgage-calculator-400k": {
    slug: "mortgage-calculator-400k",
    parent: "mortgage",
    title: "$400,000 Mortgage Calculator — Monthly Payment Breakdown",
    description: "See your monthly payment, total interest, and income requirements for a $400,000 mortgage at today's rates. Includes PITI with taxes and insurance.",
    keyword: "$400000 mortgage calculator",
    initial: { home: 400000, downPct: 20, apr: 6.75, years: 30, tax: 400, ins: 125, hoa: 0 },
    intro: "Planning to buy a $400,000 home? Use this calculator to see exactly what your monthly payment will be and how much income you'll need to qualify.",
    howItWorks: [
      "With 20% down ($80k) on a $400k home, your loan is $320,000. At 6.75% for 30 years your P+I payment is roughly $2,075/month.",
      "Add taxes (~$400/mo) and insurance (~$125/mo) and your real PITI payment is around $2,600/month — the number lenders actually care about.",
      "Lenders target a 28% front-end debt-to-income ratio, which generally means ~$110k–130k annual income is needed to comfortably qualify.",
      "A 15-year term would raise your P+I to ~$2,830/month but cut total interest from ~$428k down to roughly $185k."
    ],
    faq: [
      { q: "What income do I need for a $400,000 house?", a: "Expect to need $110k–130k annual income with 20% down and minimal other debt. Drop to 3.5% down via FHA and income requirements can push toward $135k–150k due to PMI and a larger loan." },
      { q: "How much is a $400k mortgage payment per month?", a: "With 20% down at 6.75% for 30 years, PITI lands around $2,600/month including typical property taxes and homeowners insurance." },
      { q: "Should I put 10% or 20% down on $400k?", a: "20% avoids PMI ($200–300/month savings) and gets you better rates. 10% down lets you buy sooner but costs ~$200/mo more in PMI until you hit 20% equity." }
    ],
    related: ["mortgage-calculator-300k", "mortgage-calculator-500k"]
  },

  "mortgage-calculator-500k": {
    slug: "mortgage-calculator-500k",
    parent: "mortgage",
    title: "$500,000 Mortgage Calculator — Payment & Income Requirements",
    description: "Calculate the monthly payment, total interest, and income needed to qualify for a $500,000 mortgage. See 15 vs 30-year comparisons.",
    keyword: "$500000 mortgage calculator",
    initial: { home: 500000, downPct: 20, apr: 6.75, years: 30, tax: 500, ins: 150, hoa: 0 },
    intro: "For buyers eyeing a $500,000 home, this calculator reveals your true monthly cost, qualification income, and the tradeoff between 15- and 30-year terms.",
    howItWorks: [
      "With 20% down ($100k) your loan is $400,000. At 6.75% for 30 years that's ~$2,594/month in principal + interest.",
      "Add taxes (~$500/mo) and insurance (~$150/mo) and total PITI lands around $3,250/month.",
      "Most lenders want PITI under 28% of gross income — translating to roughly $140k–165k annual income needed.",
      "Switching to a 15-year term drops total interest from ~$535k to ~$232k but pushes your monthly P+I to ~$3,536."
    ],
    faq: [
      { q: "What income do I need for a $500,000 house?", a: "Typically $140k–165k annually with 20% down and a strong credit score. Larger existing debts push the requirement higher." },
      { q: "Is a $500k mortgage too much?", a: "Not if your PITI stays under 28% of income and total DTI below 36%. Stretching either ratio significantly increases default risk." },
      { q: "15-year or 30-year for a $500k house?", a: "15-year saves ~$300k in interest but your P+I is ~$940/mo higher. If cash flow is tight, 30-year with extra principal payments is often the smarter middle ground." }
    ],
    related: ["mortgage-calculator-400k", "mortgage-calculator-300k"]
  },

  "mortgage-calculator-200k": {
    slug: "mortgage-calculator-200k",
    parent: "mortgage",
    title: "$200,000 Mortgage Calculator — Monthly Payment & Affordability",
    description: "Figure out the monthly payment, total interest, and income needed for a $200,000 mortgage — great for first-time buyers.",
    keyword: "$200000 mortgage calculator",
    initial: { home: 200000, downPct: 20, apr: 6.75, years: 30, tax: 200, ins: 75, hoa: 0 },
    intro: "A $200,000 home is an achievable first purchase. See exactly what you'll pay monthly and what income you'll need to qualify.",
    howItWorks: [
      "20% down ($40k) puts you at a $160,000 loan. At 6.75% for 30 years your P+I is roughly $1,037/month.",
      "Add taxes (~$200/mo) and insurance (~$75/mo) for a PITI around $1,312/month.",
      "Lenders typically want PITI under 28% of income, so ~$55k–65k annual income is usually enough.",
      "Going FHA with 3.5% down ($7k) means a larger loan (~$193k) plus PMI, pushing monthly payments up ~$150–200."
    ],
    faq: [
      { q: "Can I afford a $200k house on $60k salary?", a: "Yes — with minimal other debt and 20% down, a $60k income usually qualifies. With FHA 3.5% down it gets tighter but still possible." },
      { q: "How much down payment on a $200k house?", a: "20% is $40k (ideal, avoids PMI). FHA 3.5% is just $7k, conventional 3% is $6k, and VA loans can be $0 for veterans." },
      { q: "Monthly payment on a $200k house?", a: "With 20% down, 30-year term at 6.75%, expect approximately $1,300–1,350/month PITI including taxes and insurance." }
    ],
    related: ["mortgage-calculator-250k", "mortgage-calculator-300k"]
  },

  "mortgage-calculator-250k": {
    slug: "mortgage-calculator-250k",
    parent: "mortgage",
    title: "$250,000 Mortgage Calculator — Payment & Qualification",
    description: "Calculate your monthly payment, total cost, and income requirements for a $250,000 mortgage at current rates.",
    keyword: "$250000 mortgage calculator",
    initial: { home: 250000, downPct: 20, apr: 6.75, years: 30, tax: 250, ins: 90, hoa: 0 },
    intro: "A $250,000 home sits in the starter-to-mid range. Use this calculator to see your true monthly cost and qualification requirements.",
    howItWorks: [
      "20% down ($50k) leaves a $200,000 loan. At 6.75% for 30 years that's ~$1,297/month in P+I.",
      "Including taxes (~$250/mo) and insurance (~$90/mo), your PITI lands around $1,637/month.",
      "Typical income needed is roughly $65k–80k annually with minimal other debt.",
      "FHA with 3.5% down ($8,750) increases the loan to ~$241k and adds PMI, pushing monthly costs up around $200."
    ],
    faq: [
      { q: "What income is needed for a $250k house?", a: "Usually $65k–80k annually with 20% down. FHA loans with minimal down let you buy with less cash but require similar income due to higher monthly costs." },
      { q: "Is $250k a good first home price?", a: "For many markets it's ideal — manageable monthly payments, quick equity build-up, and room to move up later." },
      { q: "How much interest on a $250k mortgage?", a: "With 20% down ($200k loan) at 6.75% for 30 years, total interest is approximately $267,000 — more than the original loan." }
    ],
    related: ["mortgage-calculator-200k", "mortgage-calculator-300k"]
  }
};
