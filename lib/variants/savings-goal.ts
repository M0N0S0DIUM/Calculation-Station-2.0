import type { CalcVariant } from './index';

export const savingsGoalVariants: Record<string, CalcVariant> = {
  'emergency-fund-calculator': {
    slug: 'emergency-fund-calculator',
    parent: 'savings-goal',
    title: 'Emergency Fund Calculator',
    description: 'Calculate how much you need in your emergency fund based on monthly expenses and job security.',
    keyword: 'emergency fund calculator',
    intro: 'Financial experts recommend keeping 3-6 months of expenses in an emergency fund. This calculator helps you determine your ideal target.',
    initial: { monthlyExpenses: 5000, targetMonths: 6 },
    howItWorks: [
      'Start by calculating your essential monthly expenses (housing, food, utilities, transportation, insurance)',
      'Multiply by 3-6 months depending on your job stability and risk tolerance',
      'Single income households should target 6 months; dual income can target 3-4 months',
      'Self-employed or commission-based workers should aim for 6-12 months'
    ],
    faq: [
      { q: 'How much should I save for emergencies?', a: 'Most experts recommend 3-6 months of essential expenses. If you have a stable job and multiple income sources, 3-4 months may suffice. For freelancers or single-income households, target 6-12 months.' },
      { q: 'Where should I keep my emergency fund?', a: 'High-yield savings accounts (4-5% APY) are ideal. They offer liquidity and some interest earnings. Avoid tying up emergency funds in stocks or CDs with early withdrawal penalties.' },
      { q: 'What counts as an emergency expense?', a: 'True emergencies: job loss, medical bills, major car/home repairs, essential travel. Non-emergencies: vacations, holiday gifts, planned purchases. Use your emergency fund only for unexpected, necessary expenses.' }
    ],
    related: ['savings-account-compound-interest', 'high-yield-savings-account-comparison']
  },
  'house-down-payment-calculator': {
    slug: 'house-down-payment-calculator',
    parent: 'savings-goal',
    title: 'House Down Payment Calculator',
    description: 'Calculate how much to save for a house down payment and how long it will take.',
    keyword: 'house down payment calculator',
    intro: 'Determine your down payment goal based on home price, loan type, and timeline. See how much you need to save monthly to reach your target.',
    initial: { homePrice: 400000, downPaymentPercent: 20, yearsToSave: 5 },
    howItWorks: [
      'Conventional loans typically require 5-20% down payment',
      'FHA loans allow 3.5% down but require mortgage insurance',
      '20% down avoids PMI (private mortgage insurance) and gets better rates',
      'Factor in closing costs (2-5% of home price) on top of down payment'
    ],
    faq: [
      { q: 'How much down payment do I need for a house?', a: 'Conventional loans: 5-20%. FHA loans: 3.5%. VA loans: 0% for eligible veterans. 20% down is ideal to avoid PMI and get the best rates.' },
      { q: 'How long does it take to save for a house?', a: 'Depends on your income, expenses, and target down payment. Saving $80,000 (20% on $400k home) at $1,500/month takes about 4.5 years. Increase savings rate or reduce timeline by choosing a lower down payment option.' },
      { q: 'Should I save for 20% down or buy now with less?', a: '20% down saves thousands in PMI and interest. But waiting 3-5 years means paying rent and potentially missing home price appreciation. Run the numbers: if rent is high and prices are rising, buying sooner with 10% down may make more sense.' }
    ],
    related: ['mortgage-calculator', 'pmi-calculator']
  },
  'retirement-savings-calculator': {
    slug: 'retirement-savings-calculator',
    parent: 'savings-goal',
    title: 'Retirement Savings Calculator',
    description: 'Calculate how much to save for retirement and whether you\'re on track to meet your goals.',
    keyword: 'retirement savings calculator',
    intro: 'Determine your retirement savings target based on your desired retirement age, lifestyle, and expected returns.',
    initial: { currentAge: 30, retirementAge: 65, annualIncome: 75000, replacementPercent: 80 },
    howItWorks: [
      'Estimate annual retirement expenses (typically 70-80% of pre-retirement income)',
      'Multiply by expected retirement years (20-30 years)',
      'Subtract expected Social Security and pension income',
      'Remaining gap is your retirement savings target'
    ],
    faq: [
      { q: 'How much do I need to save for retirement?', a: 'A common rule: 25x your annual retirement expenses. If you need $60k/year in retirement, aim for $1.5M saved. This assumes 4% annual withdrawal rate and 30-year retirement.' },
      { q: 'Am I saving enough for retirement?', a: 'Benchmarks by age: 1x salary by 30, 3x by 40, 6x by 50, 8x by 60, 10x by 67. If you\'re behind, increase savings rate by 1-2% annually and delay retirement if possible.' },
      { q: 'What\'s a good retirement savings rate?', a: '15-20% of gross income is ideal. This includes employer 401(k) match. If starting late (40+), aim for 25-30% to catch up.' }
    ],
    related: ['401k-calculator', 'compound-interest-calculator']
  }
};
