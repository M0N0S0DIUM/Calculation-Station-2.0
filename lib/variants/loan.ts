import type { CalcVariant } from "./index";

export const loanVariants: Record<string, CalcVariant> = {
  "car-loan-calculator": {
    slug: "car-loan-calculator",
    parent: "loan",
    title: "Car Loan Calculator — Monthly Payment & Total Interest",
    description: "Calculate your monthly car payment, total interest, and true cost of a car loan. Compare 36, 48, 60, and 72-month terms.",
    keyword: "car loan calculator",
    initial: { amount: 30000, apr: 6.5, years: 5 },
    intro: "Buying a car on finance? See your exact monthly payment and total interest across different loan terms — so you know what you're really paying for that vehicle.",
    howItWorks: [
      "A $30,000 car loan at 6.5% APR for 60 months (5 years) gives you a monthly payment of roughly $587.",
      "Over 5 years you'll pay about $5,215 in interest — making the true cost of the car $35,215.",
      "Shorter terms save significant interest: the same loan at 36 months pays $615/month but only $2,150 in interest.",
      "Used car rates are typically 0.5–1% higher than new car rates, and terms beyond 72 months often carry penalty APRs."
    ],
    faq: [
      { q: "What's a good interest rate on a car loan in 2024?", a: "New cars: 5–7% for good credit (720+). Used cars: 6–9%. Credit scores below 660 push rates to 10–15%, above 780 can qualify for 2–4%." },
      { q: "36, 48, 60, or 72 month car loan?", a: "60 months is the sweet spot — manageable payment without excessive interest. 72 months adds ~$900 in extra interest on a $30k loan. Never go 84 months unless absolutely necessary." },
      { q: "How much car can I afford?", a: "The 20/4/10 rule: 20% down, 4-year term max, payment+insurance under 10% of gross income. By this rule, an $80k salary supports a ~$35k car." }
    ],
    related: ["personal-loan-calculator", "auto-loan-calculator-50k"]
  },

  "personal-loan-calculator": {
    slug: "personal-loan-calculator",
    parent: "loan",
    title: "Personal Loan Calculator — Monthly Payment Estimator",
    description: "Calculate monthly payment and total interest for personal loans from $1,000 to $100,000 at 6–36% APR. Compare short-term and long-term options.",
    keyword: "personal loan calculator",
    initial: { amount: 15000, apr: 11, years: 3 },
    intro: "Personal loans consolidate debt, fund projects, or cover emergencies. This calculator shows exactly what you'll pay monthly at typical APRs.",
    howItWorks: [
      "A $15,000 personal loan at 11% APR for 36 months gives you roughly $490/month payment.",
      "Total interest over 3 years: $2,640 — making the loan cost $17,640. Rates above 15% escalate fast.",
      "APRs on personal loans range 6–36% based on credit score. Sub-700 credit often pushes borrowers to 20%+ rates.",
      "Watch for origination fees (1–8%) — they're deducted upfront, so a $15k loan might only deposit $14,100 to your account."
    ],
    faq: [
      { q: "What credit score do I need for a personal loan?", a: "Minimum: 580-620 (subprime, 20-36% APR). Good: 670+ (11-15% APR). Excellent: 740+ (6-10% APR). Always shop multiple lenders." },
      { q: "Are personal loans worth it for debt consolidation?", a: "Only if your consolidated rate is 5%+ lower than your credit card APRs. CCs typically cost 20-25%, so a 12% personal loan saves real money — but only if you don't run up new balances." },
      { q: "How fast do personal loans get funded?", a: "Most online lenders fund 1-3 business days. Same-day funding often comes with higher rates or fees. Bank/credit union loans can take 1-2 weeks." }
    ],
    related: ["car-loan-calculator", "student-loan-calculator"]
  },

  "student-loan-calculator": {
    slug: "student-loan-calculator",
    parent: "loan",
    title: "Student Loan Calculator — Monthly Payment & Payoff Plan",
    description: "Calculate monthly student loan payments, total interest, and payoff timeline. Supports federal rates (4.99-8.05%) and refinanced rates.",
    keyword: "student loan calculator",
    initial: { amount: 40000, apr: 5.5, years: 10 },
    intro: "Crunch the numbers on your student loans — federal, private, or refinanced. See your true monthly cost and total interest over the life of the loan.",
    howItWorks: [
      "A $40,000 student loan at 5.5% for 10 years gives you roughly $434/month payment with about $12,000 total interest.",
      "Federal loans in 2024: undergraduate 5.50%, graduate 7.05%, PLUS loans 8.05%. Private loans range 4-15% based on credit.",
      "Income-driven repayment on federal loans can lower monthly payments to 10% of discretionary income, but typically extends the term and adds interest.",
      "Refinancing with good credit (700+) can cut rates to 4-7% — but you lose federal benefits like income-driven plans and forgiveness programs."
    ],
    faq: [
      { q: "What's the average student loan payment?", a: "The national average is $300-$400/month on ~$37,000 in debt. Medical school grads average $800-1,200/month on $200k+ in loans." },
      { q: "Should I refinance my student loans?", a: "Consider refinancing if: (1) your credit is 700+, (2) you're not pursuing PSLF, (3) you'll save 1%+ in APR. Federal loans can't be un-refinanced, so be careful." },
      { q: "How long are standard student loans?", a: "Federal standard repayment is 10 years. Extended plans go to 25 years. Income-driven plans extend to 20-25 years with possible forgiveness after." }
    ],
    related: ["personal-loan-calculator", "car-loan-calculator"]
  },

  "auto-loan-calculator-50k": {
    slug: "auto-loan-calculator-50k",
    parent: "loan",
    title: "$50,000 Car Loan Calculator — Monthly Payment",
    description: "See your monthly payment on a $50,000 car loan at 36, 48, 60, and 72-month terms. Know the total interest you'll pay.",
    keyword: "$50000 car loan monthly payment",
    initial: { amount: 50000, apr: 6.5, years: 5 },
    intro: "Financing a $50k vehicle (SUV, truck, or luxury car)? This calculator shows the real monthly cost across different terms.",
    howItWorks: [
      "A $50,000 auto loan at 6.5% APR for 60 months costs roughly $978/month.",
      "Total interest over 5 years: approximately $8,700 — making the real vehicle cost $58,700.",
      "Extending to 72 months drops payment to ~$838 but increases total interest to $10,330.",
      "With 20% down ($10k), your loan drops to $40k — saving ~$1,750 in interest over the loan term."
    ],
    faq: [
      { q: "Can I afford a $50,000 car?", a: "With 10% down and 72-month financing, you need roughly $100-120k annual income (assuming car+insurance stays under 15% of gross). Higher income needed for longer terms or less down." },
      { q: "Is 72 months too long for a car loan?", a: "It's stretched. You'll pay ~$1,630 more in interest on a $50k loan vs 60 months, and you may go underwater if you need to trade early due to negative equity." },
      { q: "What down payment for a $50k car?", a: "20% ($10k) is ideal. 10% is common. Less than 10% pushes you underwater immediately since new cars lose 20% in year 1." }
    ],
    related: ["car-loan-calculator", "personal-loan-calculator"]
  }
};
