import type { Category, CalculatorMeta } from "@/lib/types";

/**
 * Server-safe calculator metadata registry.
 * No component imports - safe for use in generateMetadata, generateStaticParams, etc.
 */
export const CALCULATOR_META: CalculatorMeta[] = [
  { slug: "basic", title: "Basic Calculator", category: "Basic", description: "Free online calculator for addition, subtraction, multiplication, division, and powers. Fast, simple, no install needed.", keywords: ["basic calculator", "online calculator", "free calculator", "add subtract multiply divide", "simple calculator", "arithmetic calculator", "math calculator"] },
  { slug: "percentage", title: "Percentage Calculator", category: "Basic", description: "Calculate percentage of a number, what percent one number is of another, and percentage increase or decrease. Fast and free.", keywords: ["percentage calculator", "percent calculator", "what is 20 percent of", "percentage increase", "percentage decrease", "percent of a number", "calculate percentage", "percent change"] },
  { slug: "fraction-simplifier", title: "Fraction Simplifier", category: "Basic", description: "Reduce a fraction + mixed number + decimal.", keywords: ["fraction", "simplify", "reduce", "mixed number", "decimal", "numerator", "denominator", "gcd"] },
  { slug: "average-stats", title: "Average / Quick Stats", category: "Basic", description: "Average, sum, min, max from a list.", keywords: ["average", "mean", "sum", "min", "max", "statistics", "stats", "numbers", "list"] },
  { slug: "unit-price", title: "Unit Price", category: "Basic", description: "Cost per item or per unit.", keywords: ["unit price", "cost per item", "price per unit", "comparison", "shopping", "value"] },
  { slug: "ratio-proportion", title: "Ratio / Proportion", category: "Basic", description: "Solve a:b = c:d for missing value.", keywords: ["ratio", "proportion", "cross multiply", "a:b=c:d", "proportional", "scale"] },
  { slug: "gcd-lcm", title: "GCD / LCM", category: "Basic", description: "Greatest common divisor and least common multiple.", keywords: ["gcd", "greatest common divisor", "lcm", "least common multiple", "factor", "multiple", "euclid"] },
  { slug: "rounding", title: "Rounding", category: "Basic", description: "Round a number to N decimals.", keywords: ["round", "rounding", "decimal", "decimals", "precision", "number", "truncate", "math", "significant figures"] },
  { slug: "prime-check", title: "Prime Checker", category: "Basic", description: "Check if an integer is prime.", keywords: ["prime", "prime number", "check", "is prime", "prime test", "factor", "divisible", "integer", "math", "number theory"] },
  { slug: "area-circle", title: "Area of a Circle", category: "Basic", description: "Area and circumference from radius.", keywords: ["circle", "area", "circumference", "radius", "pi", "geometry", "Ï€"] },
  { slug: "area-rectangle", title: "Area of a Rectangle", category: "Basic", description: "Area and perimeter from width/height.", keywords: ["rectangle", "area", "perimeter", "width", "height", "geometry", "rectangular"] },
  { slug: "power-root", title: "Power & Root", category: "Basic", description: "Compute x^n and n-th root of x.", keywords: ["power", "exponent", "root", "nth root", "x^n", "radical", "exponentiation"] },
  { slug: "tip", title: "Tip Calculator", category: "Financial", description: "Tip amount and total bill.", keywords: ["tip", "gratuity", "bill", "split", "per person", "restaurant", "dining"] },
  { slug: "loan", title: "Loan Calculator", category: "Financial", description: "Monthly payment + total interest.", keywords: ["loan", "monthly payment", "amortization", "principal", "interest", "term", "apr", "installment"] },
  { slug: "mortgage", title: "Mortgage Calculator", category: "Financial", description: "Monthly PITI+HOA estimate.", keywords: ["mortgage", "home loan", "house payment", "piti", "down payment", "property tax", "insurance", "hoa", "pmi", "amortization"] },
  { slug: "compound-interest", title: "Compound Interest", category: "Financial", description: "Future value with monthly contributions.", keywords: ["compound interest", "future value", "fv", "investment", "savings", "monthly contribution", "apr", "compounding", "time value of money"] },
  { slug: "simple-interest", title: "Simple Interest", category: "Financial", description: "Total = P + PÂ·rÂ·t.", keywords: ["simple interest", "principal", "rate", "time", "interest", "total", "p+r+t", "basic interest"] },
  { slug: "roi", title: "ROI Calculator", category: "Financial", description: "Return on investment (%).", keywords: ["roi", "return on investment", "profit", "cost", "investment", "return", "percentage", "gain"] },
  { slug: "margin-markup", title: "Margin / Markup", category: "Financial", description: "Compute margin% and markup% from cost and price.", keywords: ["margin", "markup", "profit margin", "cost", "price", "profit", "business", "pricing", "wholesale", "retail"] },
  { slug: "apr-to-apy", title: "APR â†’ APY", category: "Financial", description: "Convert APR to APY with compounding.", keywords: ["apr", "apy", "annual percentage rate", "annual percentage yield", "compounding", "convert", "effective rate", "nominal rate"] },
  { slug: "present-value", title: "Present Value", category: "Financial", description: "PV of a future amount with discount rate.", keywords: ["present value", "pv", "future value", "discount rate", "time value of money", "discounting", "net present value"] },
  { slug: "future-value", title: "Future Value", category: "Financial", description: "FV from present value with rate.", keywords: ["future value", "fv", "present value", "rate", "years", "compounding", "growth", "investment"] },
  { slug: "credit-card-payoff", title: "Credit Card Payoff", category: "Financial", description: "Estimate months to payoff with fixed monthly payment.", keywords: ["credit card", "payoff", "debt", "balance", "apr", "monthly payment", "interest", "pay off", "credit card debt"] },
  { slug: "break-even", title: "Break-even Point", category: "Financial", description: "Units to break even: fixed / (price - variable).", keywords: ["break even", "break-even", "fixed cost", "variable cost", "price", "units", "contribution margin", "cvp", "cost volume profit"] },
  { slug: "bmi", title: "BMI Calculator — Body Mass Index", category: "Health", description: "Calculate your Body Mass Index (BMI) in US or metric units. See your BMI category: underweight, normal, overweight, or obese.", keywords: ["bmi calculator", "body mass index", "bmi chart", "calculate bmi", "healthy weight", "overweight", "obesity", "height weight", "bmi metric"] },
  { slug: "bmr-tdee", title: "BMR / TDEE", category: "Health", description: "Calories/day estimate (Mifflin-St Jeor).", keywords: ["bmr", "basal metabolic rate", "tdee", "total daily energy expenditure", "calories", "mifflin st jeor", "metabolism", "weight loss", "weight gain", "maintenance calories"] },
  { slug: "heart-rate-zones", title: "Heart Rate Zones", category: "Health", description: "Karvonen zones from age + resting HR.", keywords: ["heart rate", "hr", "zones", "karvonen", "training zones", "max heart rate", "resting heart rate", "cardio", "fitness", "exercise intensity"] },
  { slug: "water-intake", title: "Water Intake", category: "Health", description: "Simple daily water estimate by body weight.", keywords: ["water", "hydration", "daily water", "water intake", "body weight", "oz", "liters", "drink water"] },
  { slug: "running-pace", title: "Running Pace", category: "Health", description: "Convert distance/time to pace and speed.", keywords: ["running", "pace", "speed", "distance", "time", "min/km", "min/mi", "km/h", "mph", "jogging", "marathon", "5k", "10k"] },
  { slug: "calories-met", title: "Calories Burned (MET)", category: "Health", description: "Calories burned from MET, weight, minutes.", keywords: ["calories", "burned", "met", "metabolic equivalent", "exercise", "activity", "weight", "minutes", "energy expenditure", "workout"] },
  { slug: "one-rep-max", title: "One Rep Max Calculator (1RM)", category: "Health", description: "Estimate your one rep max from any weight and rep count using the Epley formula. Instantly see your 1RM for squat, bench, deadlift, or any lift.", keywords: ["one rep max", "1rm calculator", "one rep max calculator", "epley formula", "max lift calculator", "bench press max", "squat max", "deadlift max", "powerlifting"] },
  { slug: "temp-convert", title: "Temperature Converter", category: "Conversion", description: "Convert Â°C, Â°F, K.", keywords: ["temperature", "convert", "celsius", "fahrenheit", "kelvin", "c", "f", "k", "degrees", "temp", "unit conversion"] },
  { slug: "length-convert", title: "Length Converter", category: "Conversion", description: "Convert mm/cm/m/km/in/ft/yd/mi.", keywords: ["length", "convert", "mm", "cm", "meter", "km", "inch", "foot", "yard", "mile", "distance", "unit conversion"] },
  { slug: "mass-convert", title: "Mass Converter", category: "Conversion", description: "Convert mg/g/kg/oz/lb.", keywords: ["mass", "convert", "weight", "mg", "g", "kg", "oz", "lb", "ounce", "pound", "gram", "kilogram", "unit conversion"] },
  { slug: "pressure-convert", title: "Pressure Converter", category: "Conversion", description: "Convert Pa/kPa/bar/psi/atm.", keywords: ["pressure", "convert", "pa", "kpa", "bar", "psi", "atm", "pascal", "kilopascal", "pounds per square inch", "atmosphere", "unit conversion"] },
  { slug: "speed-convert", title: "Speed Converter", category: "Conversion", description: "Convert m/s, km/h, mph, knots.", keywords: ["speed", "convert", "m/s", "km/h", "mph", "knots", "velocity", "meter per second", "kilometer per hour", "miles per hour", "nautical", "unit conversion"] },
  { slug: "volume-convert", title: "Volume Converter", category: "Conversion", description: "Convert mL/L/m^3/US gal/US qt/ft^3.", keywords: ["volume", "convert", "ml", "l", "liter", "m3", "cubic meter", "gallon", "quart", "ft3", "cubic foot", "us", "unit conversion"] },
  { slug: "energy-convert", title: "Energy Converter", category: "Conversion", description: "Convert J/kJ/Wh/kWh/cal/kcal/BTU.", keywords: ["energy", "convert", "joule", "j", "kj", "wh", "kwh", "calorie", "kcal", "btu", "unit conversion"] },
  { slug: "angle-deg-rad", title: "Angle Converter", category: "Conversion", description: "Degrees â†” radians.", keywords: ["angle", "degrees", "radians", "deg", "rad", "convert", "Ï€", "pi", "trigonometry", "geometry"] },
  { slug: "ohms-law", title: "Ohm's Law", category: "Electronics", description: "V/I/R + power.", keywords: ["ohm's law", "ohms law", "voltage", "current", "resistance", "power", "v", "i", "r", "watt", "amp", "volt", "ohm", "circuit"] },
  { slug: "resistor-divider", title: "Resistor Divider", category: "Electronics", description: "Vout, current, resistor power.", keywords: ["resistor divider", "voltage divider", "vout", "vin", "resistor", "current", "power", "top", "bottom", "circuit", "ohms law"] },
  { slug: "led-resistor", title: "LED Resistor", category: "Electronics", description: "Series resistor and power for an LED.", keywords: ["led", "resistor", "series", "forward voltage", "vf", "current", "ma", "ohm", "power", "watt", "circuit"] },
  { slug: "rc-cutoff", title: "RC Cutoff", category: "Electronics", description: "RC time constant and cutoff frequency.", keywords: ["rc", "cutoff", "frequency", "time constant", "tau", "resistor", "capacitor", "filter", "low pass", "high pass", "hertz", "hz"] },
  { slug: "capacitor-charge", title: "Capacitor Charge Time", category: "Electronics", description: "Time to reach a target % of final voltage in RC.", keywords: ["capacitor", "charge", "rc", "time constant", "tau", "voltage", "exponential", "charging curve", "percent", "final voltage"] },
  { slug: "battery-runtime", title: "Battery Runtime", category: "Electronics", description: "Runtime from capacity and load current.", keywords: ["battery", "runtime", "capacity", "mah", "ah", "current", "load", "discharge", "hours", "estimate"] },
  { slug: "date-diff", title: "Date Difference", category: "Time", description: "Days/weeks between two dates.", keywords: ["date", "difference", "days", "weeks", "between", "duration", "interval", "start", "end", "calendar"] },
  { slug: "epoch-converter", title: "Epoch Converter", category: "Time", description: "Unix seconds â†” ISO date/time (local).", keywords: ["epoch", "unix", "timestamp", "iso", "date", "time", "seconds", "milliseconds", "convert", "unix time"] },
  { slug: "vat-calculator", title: "VAT / GST Calculator", category: "Financial", description: "Add or remove VAT/GST from an amount with custom rates.", keywords: ["vat", "gst", "sales tax", "value added tax", "tax calculator", "net", "gross", "vat rate"] },
  { slug: "savings-goal", title: "Savings Goal Calculator", category: "Financial", description: "Calculate monthly savings needed to reach a financial goal.", keywords: ["savings", "goal", "monthly savings", "target", "financial planning", "compound interest", "retirement", "emergency fund"] },
  { slug: "annuity", title: "Annuity Calculator", category: "Financial", description: "Future & present value of regular payments (ordinary or due).", keywords: ["annuity", "future value", "present value", "ordinary annuity", "annuity due", "retirement", "pension", "periodic payments"] },
  { slug: "bsa", title: "Body Surface Area (BSA)", category: "Health", description: "Calculate BSA using Mosteller and Du Bois formulas.", keywords: ["bsa", "body surface area", "mosteller", "du bois", "drug dosing", "chemotherapy", "cardiac index", "medical"] },
  { slug: "alcohol-units", title: "Alcohol Unit Calculator", category: "Health", description: "Calculate UK units, US standard drinks, and calories from volume and ABV.", keywords: ["alcohol", "units", "standard drinks", "abv", "blood alcohol", "uk units", "us drinks", "calories", "responsible drinking"] },
  { slug: "fuel-cost", title: "Fuel Cost Calculator", category: "Conversion", description: "Calculate fuel needed and trip cost from distance, efficiency, and fuel price.", keywords: ["fuel", "gas", "cost", "trip", "mileage", "mpg", "l/100km", "fuel economy", "road trip", "gasoline"] },
  { slug: "currency-converter", title: "Currency Converter", category: "Conversion", description: "Convert between major world currencies with custom exchange rates.", keywords: ["currency", "converter", "exchange rate", "forex", "usd", "eur", "gbp", "jpy", "international", "money"] },
  { slug: "torque-converter", title: "Torque Converter", category: "Conversion", description: "Convert between Nm, ft-lb, in-lb, and kgfÂ·m torque units.", keywords: ["torque", "newton meter", "foot pound", "inch pound", "kgf meter", "conversion", "automotive", "engineering", "wrench"] },
  { slug: "tire-size", title: "Tire Size Calculator", category: "Conversion", description: "Calculate diameter, circumference, sidewall, and revs/km from tire code.", keywords: ["tire", "tyre", "size", "diameter", "circumference", "sidewall", "revs per km", "speedometer", "plus sizing", "wheel"] },
  { slug: "retirement-withdrawal", title: "Retirement Withdrawal (4% Rule)", category: "Financial", description: "Test if your portfolio can sustain withdrawals for retirement using the 4% rule.", keywords: ["retirement", "withdrawal", "4% rule", "safe withdrawal rate", "swr", "portfolio", "financial independence", "fire", "pension"] },
  { slug: "date-calculator", title: "Date Calculator (Add/Subtract)", category: "Time", description: "Add or subtract years, months, weeks, and days from a date.", keywords: ["date", "calculator", "add days", "subtract days", "date math", "deadline", "due date", "anniversary", "calendar"] },
  { slug: "loan-amortization", title: "Loan Amortization (Extra Payments)", category: "Financial", description: "See how extra monthly payments reduce loan term and interest.", keywords: ["loan", "amortization", "extra payment", "payoff early", "mortgage", "principal", "interest saved", "loan term"] },
  { slug: "rule-of-72", title: "Rule of 72 / 114 / 144", category: "Financial", description: "Quick mental math: years to double, triple, or quadruple your money.", keywords: ["rule of 72", "rule of 114", "rule of 144", "double money", "triple money", "compound interest", "mental math", "investment"] },
  { slug: "rental-yield", title: "Rental Yield Calculator", category: "Financial", description: "Calculate gross yield, net yield, and cash-on-cash return for rental properties.", keywords: ["rental yield", "gross yield", "net yield", "cash on cash", "property investment", "real estate", "roi", "landlord"] },
  { slug: "dollar-cost-averaging", title: "Dollar Cost Averaging (DCA)", category: "Financial", description: "Compare lump sum vs periodic investing. Calculate per-period investment amounts.", keywords: ["dollar cost averaging", "DCA", "lump sum", "periodic investing", "investment strategy", "market timing", "volatility"] },
  { slug: "stock-options", title: "Stock Options Calculator", category: "Financial", description: "Calculate intrinsic value, time value, break-even, and total cost for call/put options.", keywords: ["stock options", "call option", "put option", "intrinsic value", "time value", "break even", "option premium", "derivatives"] },
  { slug: "inflation-calculator", title: "Inflation Calculator", category: "Financial", description: "Calculate future/past purchasing power with custom inflation rates.", keywords: ["inflation", "purchasing power", "cpi", "future value", "past value", "money value", "cost of living", "real value"] },
  { slug: "retirement-age", title: "Retirement Age Calculator", category: "Financial", description: "Project your retirement savings and income based on age, contributions, and returns.", keywords: ["retirement", "retirement age", "when can i retire", "retirement savings", "4% rule", "financial independence", "fire", "pension"] },
  { slug: "emergency-fund", title: "Emergency Fund Calculator", category: "Financial", description: "Calculate how much emergency savings you need and how long to build it.", keywords: ["emergency fund", "emergency savings", "rainy day fund", "financial cushion", "months of expenses", "financial security"] },
  { slug: "debt-payoff", title: "Debt Payoff Calculator", category: "Financial", description: "Calculate months to become debt-free. Compare your payment vs minimum payment.", keywords: ["debt payoff", "debt free", "credit card payoff", "debt avalanche", "debt snowball", "interest", "minimum payment"] },
  { slug: "mortgage-refinance", title: "Mortgage Refinance Calculator", category: "Financial", description: "Compare current vs new mortgage. Calculate break-even point and lifetime savings.", keywords: ["mortgage refinance", "refi", "refinance calculator", "break even", "closing costs", "cash out refi", "mortgage savings", "interest rate"] },
  { slug: "social-security", title: "Social Security Benefit Estimator", category: "Financial", description: "Estimate your Social Security benefit at different claim ages (62-70).", keywords: ["social security", "SSA", "benefit estimate", "retirement age", "claim age", "PIA", "full retirement age", "social security calculator"] },
  { slug: "fire-calculator", title: "FIRE Calculator (Financial Independence)", category: "Financial", description: "Calculate your FIRE number, years to financial independence, and Coast FIRE.", keywords: ["fire", "financial independence", "retire early", "coast fire", "fire number", "safe withdrawal rate", "4% rule", "early retirement"] },
  { slug: "tax-bracket", title: "US Federal Tax Bracket Calculator", category: "Financial", description: "Calculate federal tax, effective rate, and marginal bracket for 2024.", keywords: ["tax bracket", "federal tax", "income tax", "marginal rate", "effective rate", "2024 tax brackets", "filing status"] },
  { slug: "body-fat-percentage", title: "Body Fat % Calculator (Navy Method)", category: "Health", description: "Estimate body fat percentage using US Navy circumference method (gender-specific).", keywords: ["body fat", "body fat percentage", "navy method", "body composition", "lean mass", "fat mass", "fitness", "health"] },
  { slug: "protein-intake", title: "Protein Intake Calculator", category: "Health", description: "Calculate daily protein needs based on weight, activity level, and fitness goals.", keywords: ["protein", "protein intake", "daily protein", "macro", "muscle building", "weight loss", "nutrition", "fitness", "gym"] },
  { slug: "macro-calculator-advanced", title: "Macro Calculator (TDEE + Split)", category: "Health", description: "Calculate TDEE and macro split (protein/fat/carbs) based on lean mass and goals.", keywords: ["macros", "macro calculator", "tdee", "protein", "carbs", "fat", "lean mass", "body recomposition", "cutting", "bulking", "iifym"] },
  { slug: "workout-volume", title: "Workout Volume Calculator", category: "Health", description: "Calculate training volume (sets Ã— reps Ã— weight) with MEV/MAV/MRV landmarks.", keywords: ["workout volume", "training volume", "sets reps weight", "mev", "mav", "mrv", "hypertrophy", "progressive overload", "periodization", "rpe"] },
  { slug: "wilks-score", title: "Wilks Score Calculator (Wilks2)", category: "Health", description: "Calculate your Wilks score to compare powerlifting strength across different bodyweight classes. Uses the updated Wilks2 formula.", keywords: ["wilks score", "wilks calculator", "wilks2", "powerlifting score", "wilks coefficient", "compare strength", "powerlifting total", "ipf", "wilks formula"] },
  { slug: "plate-calculator", title: "Barbell Plate Calculator (kg & lb)", category: "Health", description: "Calculate exactly which weight plates to load on each side of the barbell for any target weight. Supports kg and lb, standard Olympic bars.", keywords: ["plate calculator", "barbell plate calculator", "barbell loading calculator", "plates per side", "how to load a barbell", "weight plates", "olympic bar", "gym calculator", "powerlifting"] },
  { slug: "training-max", title: "5/3/1 Training Max Calculator (Wendler)", category: "Health", description: "Calculate your 5/3/1 training max and all working set weights from your one rep max. Based on Jim Wendler's 5/3/1 strength program.", keywords: ["531 calculator", "5 3 1 calculator", "wendler 531", "training max calculator", "531 working sets", "jim wendler", "powerlifting program", "531 percentages"] },
  { slug: "vo2-max", title: "VO2 Max Estimator", category: "Health", description: "Estimate aerobic fitness (VO2 max) from heart rate.", keywords: ["vo2 max", "vo2max", "aerobic fitness", "cardio", "heart rate", "max heart rate", "resting heart rate", "endurance", "running", "fitness test"] },
  { slug: "strength-standards", title: "Strength Standards Calculator — Squat, Bench, Deadlift", category: "Health", description: "Find out if your squat, bench press, deadlift, and overhead press are Beginner, Novice, Intermediate, Advanced, or Elite based on bodyweight ratios.", keywords: ["strength standards", "powerlifting standards", "squat standards", "bench press standards", "deadlift standards", "am i strong", "strength level calculator", "bodyweight ratio strength"] },
  { slug: "salary-comparison", title: "Salary Cost of Living Comparison", category: "Financial", description: "Compare salary purchasing power between US cities with cost of living adjustment.", keywords: ["salary comparison", "cost of living", "relocation", "col", "equivalent salary", "city comparison", "moving", "purchasing power"] },
  { slug: "brew-abv", title: "ABV Calculator", category: "Brewing", description: "Calculate alcohol by volume from original and final gravity. Includes standard and advanced formulas.", keywords: ["abv", "alcohol by volume", "original gravity", "final gravity", "og fg calculator", "beer abv", "homebrew abv"] },
  { slug: "brew-priming", title: "Priming Sugar Calculator", category: "Brewing", description: "Calculate priming sugar (corn sugar, table sugar, DME, honey, maple) for bottle conditioning based on batch volume, temperature, and target carbonation.", keywords: ["priming sugar", "bottle conditioning", "carbonation", "corn sugar", "dextrose", "priming calculator", "homebrew priming"] },
  { slug: "brew-strike-water", title: "Strike Water Calculator", category: "Brewing", description: "Calculate strike water temperature and volume for infusion mashing. Accounts for grain weight, temperature, equipment loss, and absorption.", keywords: ["strike water", "mash temperature", "infusion mash", "strike temp calculator", "brew strike water", "mash water calculator", "homebrew mash"] },
  { slug: "brew-ibu", title: "IBU Calculator", category: "Brewing", description: "Calculate International Bitterness Units (IBU) using Tinseth, Rager, or Garetz formulas. Accounts for hop form, alpha acid, boil time, and gravity.", keywords: ["ibu", "international bitterness units", "bitterness calculator", "hop calculator", "tinseth", "rager", "garetz", "homebrew ibu"] },
  { slug: "brew-yeast-pitch", title: "Yeast Pitch Rate Calculator", category: "Brewing", description: "Calculate yeast cells needed and packages required based on batch volume, gravity, yeast type, viability, and starter. Supports ale and lager rates.", keywords: ["yeast pitch rate", "yeast calculator", "pitch rate", "yeast starter", "cells needed", "homebrew yeast", "lager pitch rate", "ale pitch rate"] },
  { slug: "brew-brix-sg", title: "Brix / SG / Plato Converter", category: "Brewing", description: "Convert between Brix, Specific Gravity, and Plato. Includes potential ABV estimate at 75% attenuation.", keywords: ["brix to sg", "sg to brix", "plato to sg", "brix plato converter", "specific gravity converter", "refractometer brix", "brew gravity conversion"] },
  { slug: "brew-attenuation", title: "Attenuation Calculator", category: "Brewing", description: "Calculate apparent and real attenuation from OG/FG. Predict expected FG and ABV from yeast attenuation rating.", keywords: ["attenuation calculator", "apparent attenuation", "real attenuation", "yeast attenuation", "fg prediction", "brew attenuation"] },
  { slug: "brew-grain-bill", title: "Grain Bill Calculator", category: "Brewing", description: "Calculate total grain weight and per-grain amounts for a target OG, volume, and efficiency. Includes SRM color estimate via Morey formula.", keywords: ["grain bill calculator", "grain weight calculator", "brew grain calculator", "malt calculator", "og calculator", "brewhouse efficiency", "srm calculator"] },
  { slug: "brew-boil-off", title: "Boil-off Calculator", category: "Brewing", description: "Calculate boil-off rate, total evaporation, and required pre-boil volume. Work forward from volumes or backward from target rate.", keywords: ["boil off calculator", "evaporation rate", "pre boil volume", "boil off rate", "homebrew boil off", "kettle evaporation"] },
    { slug: "brew-calories", title: "Beer Calories Calculator", category: "Brewing", description: "Estimate beer calories from OG/FG or ABV. Breaks down alcohol vs carb calories. Supports oz/ml serving sizes.", keywords: ["beer calories", "calorie calculator beer", "abv calories", "homebrew calories", "alcohol calories", "carb calories beer", "beer nutrition"] },
  ];

/** All unique categories */
export const CATEGORIES: Category[] = [
  ...new Set(CALCULATOR_META.map((c) => c.category)),
].sort();

/** Category metadata for UI */
export const CATEGORY_INFO: Record<Category, { description: string; icon: string }> = {
  Basic: { description: "Fundamental math tools for everyday calculations — arithmetic, percentages, fractions, geometry, and number theory.", icon: "🔢" },
  Financial: { description: "Money calculators for loans, mortgages, investments, interest, ROI, and business metrics.", icon: "💰" },
  Health: { description: "Fitness and wellness estimators — BMI, calories, macros, heart rate zones, body fat, and hydration.", icon: "❤️" },
  Conversion: { description: "Unit converters for length, mass, temperature, speed, pressure, energy, volume, and angles.", icon: "🔄" },
  Electronics: { description: "Circuit calculators for Ohm's law, resistor dividers, LEDs, RC filters, capacitors, and battery runtime.", icon: "⚡" },
  Time: { description: "Date and timestamp utilities — difference between dates, Unix epoch conversion.", icon: "⏱️" },
    Brewing: { description: "Brewing calculators for ABV, priming, strike water, IBU, yeast pitch, gravity conversion, attenuation, grain bills, boil-off, and calories.", icon: "🍺" },
  };

/** Lookup map for O(1) slug access */
const SLUG_MAP = new Map(CALCULATOR_META.map((c) => [c.slug, c]));

/** Get calculator metadata by slug */
export function getCalculatorMeta(slug: string): CalculatorMeta | undefined {
  return SLUG_MAP.get(slug);
}

/** Get all calculators in a category */
export function getCalculatorsByCategory(category: Category): CalculatorMeta[] {
  return CALCULATOR_META
    .filter((c) => c.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Get all calculators */
export function getAllCalculators(): CalculatorMeta[] {
  return [...CALCULATOR_META].sort((a, b) => a.title.localeCompare(b.title));
}

/** Get all calculator slugs (for static generation, sitemaps, etc.) */
export function getAllCalculatorSlugs(): string[] {
  return CALCULATOR_META.map((c) => c.slug);
}

/** Validate registry integrity - throws if issues found (runs at build time) */
export function validateRegistry(): void {
  const errors: string[] = [];
  const seenSlugs = new Set<string>();

  for (const meta of CALCULATOR_META) {
    const { slug, title, category, description } = meta;

    if (!slug) errors.push(`Missing slug in calculator: ${title}`);
    if (!title) errors.push(`Missing title for slug: ${slug}`);
    if (!category) errors.push(`Missing category for: ${title}`);
    if (!description) errors.push(`Missing description for: ${title}`);

    if (seenSlugs.has(slug)) errors.push(`Duplicate slug: ${slug}`);
    seenSlugs.add(slug);

    if (!CATEGORIES.includes(category)) {
      errors.push(`Unknown category "${category}" for: ${title}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Calculator registry validation failed:\n${errors.join("\n")}`);
  }
}

validateRegistry();
