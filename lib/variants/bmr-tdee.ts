import type { CalcVariant } from './index';

export const bmrTdeeVariants: Record<string, CalcVariant> = {
  'tdee-sedentary': {
    slug: 'tdee-sedentary',
    parent: 'bmr-tdee',
    title: 'TDEE Calculator for Sedentary Lifestyle',
    description: 'Calculate daily calorie needs for sedentary lifestyle. Office workers and minimal activity.',
    keyword: 'tdee sedentary office workers',
    intro: 'Most office workers and people with desk jobs fall into the sedentary activity category. This calculator gives you accurate TDEE numbers for minimal activity lifestyles.',
    initial: { weight: 170, height: 70, age: 35, gender: 'male', activityFactor: 1.2 },
    howItWorks: [
      'Sedentary multiplier: 1.2x BMR',
      'Assumes little to no exercise, desk job',
      'Walking less than 5,000 steps per day',
      'To lose weight: TDEE - 500 calories for 1 lb/week loss'
    ],
    faq: [
      { q: 'What counts as sedentary activity level?', a: 'Sedentary means sitting most of the day with little to no intentional exercise. If you work a desk job and walk less than 5,000 steps daily, you\'re sedentary.' },
      { q: 'How many calories does a sedentary person burn?', a: 'A sedentary person burns about 1.2x their BMR. For a 35-year-old male (170 lbs, 70"), that\'s roughly 2,040 calories/day. Females typically burn 1,600-1,800 calories/day sedentary.' },
      { q: 'Can I increase my TDEE without exercising?', a: 'Yes. Walking more (aim for 8,000+ steps), standing while working, taking stairs, and doing light household chores can bump you from sedentary to lightly active, adding 200-300 calories to your daily burn.' }
    ],
    related: ['tdee-lightly-active', 'tdee-very-active', 'bmi-calculator']
  },
  'tdee-lightly-active': {
    slug: 'tdee-lightly-active',
    parent: 'bmr-tdee',
    title: 'TDEE Calculator for Lightly Active People',
    description: 'Calculate daily calorie needs for lightly active individuals. Exercise 1-3 days per week.',
    keyword: 'tdee lightly active 1-3 days exercise',
    intro: 'If you exercise 1-3 days per week or have a job with some walking, you\'re lightly active. This calculator accounts for that moderate activity level.',
    initial: { weight: 170, height: 70, age: 35, gender: 'male', activityFactor: 1.375 },
    howItWorks: [
      'Lightly active multiplier: 1.375x BMR',
      'Exercise 1-3 days per week',
      'Walking 5,000-8,000 steps daily',
      'Includes light sports or recreational activities'
    ],
    faq: [
      { q: 'What makes someone lightly active?', a: 'Lightly active means exercising 1-3 days per week (30-45 minutes per session) or having a job with moderate walking (teacher, retail, healthcare). You\'re not sedentary, but not training intensely either.' },
      { q: 'How many more calories do I burn being lightly active vs sedentary?', a: 'About 15-20% more. If your sedentary TDEE is 2,040 calories, lightly active would be around 2,350 calories/day — that\'s 310 extra calories burned.' },
      { q: 'Should I use lightly active or moderately active if I exercise 3 days?', a: 'If it\'s 30 minutes of moderate exercise (brisk walking, light weights), use lightly active. If it\'s 45+ minutes of vigorous exercise (running, heavy lifting, sports), use moderately active.' }
    ],
    related: ['tdee-sedentary', 'tdee-moderately-active', 'workout-volume-beginner']
  },
  'tdee-moderately-active': {
    slug: 'tdee-moderately-active',
    parent: 'bmr-tdee',
    title: 'TDEE Calculator for Moderately Active People',
    description: 'Calculate daily calorie needs for moderately active individuals. Exercise 3-5 days per week.',
    keyword: 'tdee moderately active 3-5 days exercise',
    intro: 'Regular exercisers who train 3-5 days per week fall into the moderately active category. This is the most common activity level for fitness enthusiasts.',
    initial: { weight: 170, height: 70, age: 35, gender: 'male', activityFactor: 1.55 },
    howItWorks: [
      'Moderately active multiplier: 1.55x BMR',
      'Exercise 3-5 days per week at moderate intensity',
      'Walking 8,000-12,000 steps daily',
      'Active job or regular sports participation'
    ],
    faq: [
      { q: 'What counts as moderately active?', a: 'Exercising 3-5 days per week for 45-60 minutes at moderate-to-high intensity. This includes weight training, running, cycling, swimming, or playing sports regularly.' },
      { q: 'How accurate is the moderately active TDEE?', a: 'Very accurate for most people. If you\'re losing weight faster than expected, you might actually be lightly active. If you\'re gaining weight on maintenance calories, you might be very active.' },
      { q: 'Do I need to recalculate TDEE when my activity changes?', a: 'Yes. If you go from 3 days/week to 5 days/week, switch from moderately active to very active. This can add 300-400 calories to your daily TDEE.' }
    ],
    related: ['tdee-lightly-active', 'tdee-very-active', 'workout-volume-intermediate']
  },
  'tdee-very-active': {
    slug: 'tdee-very-active',
    parent: 'bmr-tdee',
    title: 'TDEE Calculator for Very Active People',
    description: 'Calculate daily calorie needs for very active individuals. Exercise 6-7 days per week.',
    keyword: 'tdee very active 6-7 days exercise',
    intro: 'If you exercise 6-7 days per week or have a physically demanding job plus training, you\'re very active. This calculator accounts for high activity levels.',
    initial: { weight: 170, height: 70, age: 35, gender: 'male', activityFactor: 1.725 },
    howItWorks: [
      'Very active multiplier: 1.725x BMR',
      'Exercise 6-7 days per week with high intensity',
      'Walking 12,000+ steps daily',
      'Physically demanding job or athlete training'
    ],
    faq: [
      { q: 'Who qualifies as very active?', a: 'People who exercise 6-7 days per week at high intensity (60+ minutes), have physically demanding jobs (construction, farming), or combine both. Competitive amateur athletes often fall here.' },
      { q: 'How many calories does a very active person burn?', a: 'About 72.5% more than BMR. For a 35-year-old male (170 lbs, 70"), that\'s roughly 2,930 calories/day. Females typically burn 2,300-2,500 calories/day very active.' },
      { q: 'Should I use very active or extra active?', a: 'Very active if you train 6-7 days but have rest days or moderate-intensity workouts. Extra active if you train twice daily, are a professional athlete, or do intense physical labor 10+ hours/day.' }
    ],
    related: ['tdee-moderately-active', 'tdee-extra-active', 'calories-burned-running']
  },
  'tdee-extra-active': {
    slug: 'tdee-extra-active',
    parent: 'bmr-tdee',
    title: 'TDEE Calculator for Extra Active Athletes',
    description: 'Calculate daily calorie needs for extra active individuals. Professional athletes and intense daily training.',
    keyword: 'tdee extra active professional athlete',
    intro: 'Elite athletes, professional sports players, and people doing intense training twice daily need this extra active TDEE calculation for accurate calorie needs.',
    initial: { weight: 180, height: 72, age: 28, gender: 'male', activityFactor: 1.9 },
    howItWorks: [
      'Extra active multiplier: 1.9x BMR',
      'Intense exercise daily or twice daily',
      'Professional athletes, elite competitors',
      'Physical labor job plus training regimen'
    ],
    faq: [
      { q: 'Who should use extra active TDEE?', a: 'Professional athletes, Olympic-level competitors, people doing 2+ training sessions daily, or those with extremely physically demanding jobs (logging, mining) plus additional training.' },
      { q: 'Is extra active TDEE accurate for most people?', a: 'No — this is for the top 1-2% of active individuals. Most people who think they\'re extra active are actually very active. Only use this if you train 15+ hours per week at high intensity.' },
      { q: 'How do professional athletes calculate their TDEE?', a: 'Many use metabolic carts and activity monitors for precision. The 1.9x multiplier is a general estimate. Elite athletes often track intake vs performance to dial in their actual needs.' }
    ],
    related: ['tdee-very-active', 'macros-for-athletes', 'calories-burned-running']
  }
};
