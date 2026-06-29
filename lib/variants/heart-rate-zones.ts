import type { CalcVariant } from "./index";

/** Heart rate zones variants for different sports and activities */
export const heartRateZonesVariants: Record<string, CalcVariant> = {
  "heart-rate-zones-running": {
    slug: "heart-rate-zones-running",
    parent: "heart-rate-zones",
    title: "Heart Rate Zones for Running — Karvonen Training Calculator",
    description: "Calculate your running heart rate zones using the Karvonen method. Find zone 2 base training, tempo, and VO2 max zones for your runs.",
    keyword: "heart rate zones for running",
    initial: { age: 35, rest: 55 },
    intro: "Runners build aerobic base in Zone 2 and race performance in Zones 4-5. Use the Karvonen method for accurate training zones based on your resting heart rate.",
    howItWorks: [
      "Runners typically have lower resting HR (45-60 bpm) due to cardiovascular conditioning. Enter your true morning resting HR for best results.",
      "Zone 2 (60-70% HRR) is your endurance base — 80% of weekly miles should be here at conversational pace.",
      "Zone 3 (70-80% HRR) is tempo pace — the 'comfortably hard' effort used for tempo runs and marathon pace work.",
      "Zones 4-5 (80-100% HRR) are for intervals, hills, and race-pace work. Limit to 20% of weekly training volume."
    ],
    faq: [
      { q: "Why is my Zone 2 so slow when I run?", a: "Zone 2 running feels slow because it's 60-70% of heart rate reserve — this is correct. Elite runners build huge aerobic bases doing 80%+ of miles in Zone 2 at very low intensity. Slow down and talk-test to ensure you're in zone." },
      { q: "Is the 220-minus-age formula accurate for runners?", a: "It's an estimate with ±10 bpm error. Runners often have higher max HRs than predicted. For best accuracy, do a hard 3x3-minute test or use a recent race effort." },
      { q: "Should I use heart rate or pace for running?", a: "Heart rate for easy/recovery runs (Zones 1-2). Pace for tempo and intervals (Zones 3-5). HR lags behind effort, so pace is better for structured workouts." }
    ],
    related: ["heart-rate-zones-cycling", "heart-rate-zones-weight-loss", "vo2-max"]
  },
  "heart-rate-zones-cycling": {
    slug: "heart-rate-zones-cycling",
    parent: "heart-rate-zones",
    title: "Heart Rate Zones for Cycling — Bike Training Calculator",
    description: "Find your cycling heart rate zones with Karvonen method. Base miles, tempo, and threshold zones for road and mountain biking.",
    keyword: "heart rate zones for cycling",
    initial: { age: 35, rest: 50 },
    intro: "Cyclists benefit from lower resting HR due to sustained aerobic training. Use Karvonen zones to structure your endurance, tempo, and threshold workouts.",
    howItWorks: [
      "Cyclists often have very low resting HR (45-55 bpm) from sustained aerobic work. Use morning measurements for accuracy.",
      "Zone 2 cycling is your long-ride base — 2-4 hour rides at conversational effort build aerobic capacity.",
      "Zone 4 (threshold) is where you do FTP work and sweet-spot intervals — the bread and butter of cycling improvement.",
      "Zone 5 is for VO2 max intervals and sprint efforts — use sparingly for maximal adaptation."
    ],
    faq: [
      { q: "Why are my cycling HR zones different from running?", a: "Most cyclists have 5-10 bpm lower max HR in cycling vs running because cycling uses smaller muscle mass. If you do both, measure zones separately for each sport." },
      { q: "What's sweet spot training?", a: "Sweet spot is high Zone 3 to low Zone 4 (88-93% FTP) — it delivers most of the benefits of threshold work with less fatigue. Typically 2x20 min intervals." },
      { q: "Should cyclists train by HR or power?", a: "Power is more accurate than HR for cycling because it measures output directly, not response. Use HR as a secondary check for fatigue and hydration." }
    ],
    related: ["heart-rate-zones-running", "heart-rate-zones-weight-loss", "calories-met"]
  },
  "heart-rate-zones-weight-loss": {
    slug: "heart-rate-zones-weight-loss",
    parent: "heart-rate-zones",
    title: "Heart Rate Zones for Weight Loss — Fat Burn Zone Calculator",
    description: "Find the best heart rate zones for fat loss. See why Zone 2 and Zone 3 are optimal for weight loss vs the 'fat burn zone' myth.",
    keyword: "heart rate zones weight loss",
    initial: { age: 40, rest: 70 },
    intro: "The 'fat burn zone' myth misleads many. Higher intensity zones burn more total calories and more total fat — even though the percentage from fat is lower.",
    howItWorks: [
      "Total calorie burn matters more than fuel source. A 30-minute Zone 4 workout burns more fat than a 30-minute Zone 2 session.",
      "Zone 2 (60-70%) is still valuable for longer sessions (60+ minutes) where you can sustain the effort for more total calories.",
      "Zone 3-4 (70-90%) maximizes calorie burn per minute — ideal for time-efficient 30-45 minute workouts.",
      "Combine 2-3 Zone 3-4 sessions with 1-2 long Zone 2 sessions per week for optimal weight loss and fitness."
    ],
    faq: [
      { q: "Is Zone 2 really the best for fat burning?", a: "Zone 2 burns the highest PERCENTAGE from fat (~60%), but Zone 4 burns more TOTAL fat because calorie burn is 2-3x higher. For weight loss, total calories matter more than fuel source." },
      { q: "How long should I exercise for weight loss?", a: "Aim for 150-300 minutes/week of moderate-to-vigorous activity. Split between Zone 2 (longer, 45-60 min) and Zone 3-4 (shorter, 30 min) for best results." },
      { q: "Can I exercise too hard for weight loss?", a: "Very high Zone 5 work is hard to sustain and causes significant fatigue. Stick primarily to Zones 2-4 for sustainable weight loss. Use Zone 5 sparingly for fitness." }
    ],
    related: ["heart-rate-zones-running", "heart-rate-zones-cycling", "calories-met"]
  }
};
