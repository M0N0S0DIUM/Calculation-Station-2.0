import type { CalcVariant } from "./index";

export const oneRepMaxVariants: Record<string, CalcVariant> = {
  "bench-press-max-calculator": {
    slug: "bench-press-max-calculator",
    parent: "one-rep-max",
    title: "Bench Press Max Calculator — Estimate Your 1RM",
    description: "Calculate your bench press one rep max (1RM) from any weight and reps. Uses the Epley formula for accurate powerlifting estimates.",
    keyword: "bench press max calculator",
    initial: { weight: 225, reps: 5 },
    intro: "Enter your best bench press set (weight and reps) to estimate your true one rep max. Useful for programming and tracking strength progress.",
    howItWorks: [
      "The Epley formula: 1RM = weight × (1 + reps/30). This is one of the most accurate 1RM estimation methods for reps in the 1–10 range.",
      "Alternative formulas (Brzycki, Lombardi) give similar results but diverge at higher rep counts. Epley is the standard in powerlifting contexts.",
      "Average male lifter: 135 lbs bench press 1RM. Novice: 95–135 lbs. Intermediate: 185–225 lbs. Advanced: 275+ lbs. These vary significantly by bodyweight."
    ],
    faq: [
      {
        q: "How accurate is a bench press max calculator?",
        a: "Very accurate for reps 1–5. For reps 6–10, estimates are typically within 5–10 lbs of your true 1RM. Above 10 reps, accuracy drops significantly — the formula assumes fast-twitch muscle recruitment."
      },
      {
        q: "What's a good bench press max for a 180 lb male?",
        a: "Intermediate: 185–225 lbs (1x–1.25x bodyweight). Advanced: 275–315 lbs (1.5x–1.75x). Elite: 365+ lbs (2x+). These are general benchmarks; your actual 1RM depends on training history and genetics."
      }
    ],
    related: ["squat-max-calculator", "deadlift-max-calculator"]
  },
  "squat-max-calculator": {
    slug: "squat-max-calculator",
    parent: "one-rep-max",
    title: "Squat Max Calculator — Estimate Your 1RM Squat",
    description: "Calculate your squat one rep max from any weight and reps. Track your lower body strength progress over time.",
    keyword: "squat max calculator",
    initial: { weight: 315, reps: 3 },
    intro: "Use this calculator to estimate your squat one rep max. Enter any set you've completed (weight and reps) and we'll calculate your estimated 1RM.",
    howItWorks: [
      "Squat 1RM is typically 20–40% higher than bench press 1RM for trained lifters due to larger muscle groups (quads, glutes, hamstrings).",
      "The Epley formula works well for squats in the 1–8 rep range. For higher reps (10+), consider using a lower-weight test set for better accuracy."
    ],
    faq: [
      {
        q: "What's a good squat max for a beginner?",
        a: "Beginner: bodyweight squat (1x bodyweight). Example: 180 lb lifter → 185 lb squat 1RM. Intermediate: 1.5x bodyweight. Advanced: 2x+ bodyweight."
      },
      {
        q: "Should I test my squat 1RM regularly?",
        a: "Every 3–6 months for most lifters. Testing too frequently (monthly) increases injury risk and disrupts training cycles. Track progress via AMRAP sets (as many reps as possible) instead."
      }
    ],
    related: ["bench-press-max-calculator", "deadlift-max-calculator"]
  },
  "deadlift-max-calculator": {
    slug: "deadlift-max-calculator",
    parent: "one-rep-max",
    title: "Deadlift Max Calculator — Estimate Your 1RM Deadlift",
    description: "Calculate your deadlift one rep max from any weight and reps. Deadlift is typically your strongest lift due to full posterior chain engagement.",
    keyword: "deadlift max calculator",
    initial: { weight: 405, reps: 2 },
    intro: "Deadlift is typically your strongest of the 'big three' lifts (squat, bench, deadlift). Enter any set to estimate your 1RM.",
    howItWorks: [
      "Deadlift 1RM is usually 30–50% higher than squat 1RM because you're pulling from the floor with maximal mechanical advantage.",
      "The Epley formula is most accurate for deadlift in the 1–5 rep range. Higher-rep deadlifts are rare due to fatigue, so most lifters test low-rep sets."
    ],
    faq: [
      {
        q: "What's a good deadlift max for an intermediate lifter?",
        a: "Intermediate: 2x bodyweight deadlift. Example: 180 lb lifter → 365 lb deadlift 1RM. Advanced: 2.5x bodyweight. Elite: 3x+ bodyweight."
      },
      {
        q: "Why is my deadlift stronger than my squat?",
        a: "Deadlift starts from a dead stop at the floor, allowing you to use full posterior chain (hamstrings, glutes, lower back) without the stretch reflex you get in squats. Also, deadlift grip and stance allow heavier loads before technical failure."
      }
    ],
    related: ["bench-press-max-calculator", "squat-max-calculator"]
  }
};
