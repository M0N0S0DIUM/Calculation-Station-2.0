export type Category =
  | "Basic"
  | "Financial"
  | "Health"
  | "Conversion"
  | "Electronics"
  | "Time";

export type CalculatorMeta = {
  slug: string;
  title: string;
  category: Category;
  description: string;
  keywords?: string[];
};

export type CalculatorModule = {
  meta: CalculatorMeta;
  Calculator: any;
};

const calculators: CalculatorModule[] = [
  { meta: { slug: "basic", title: "Basic Calculator", category: "Basic", description: "Add/subtract/multiply/divide/powers.", keywords: ["add", "subtract", "multiply", "divide", "power", "arithmetic", "math"] }, Calculator: () => null },
  { meta: { slug: "percentage", title: "Percentage Calculator", category: "Basic", description: "Percent of, what percent, increase/decrease.", keywords: ["percent", "percentage", "increase", "decrease", "percent of", "what percent", "ratio"] }, Calculator: () => null },
  { meta: { slug: "fraction-simplifier", title: "Fraction Simplifier", category: "Basic", description: "Reduce a fraction + mixed number + decimal.", keywords: ["fraction", "simplify", "reduce", "mixed number", "decimal", "numerator", "denominator", "gcd"] }, Calculator: () => null },
  { meta: { slug: "average-stats", title: "Average / Quick Stats", category: "Basic", description: "Average, sum, min, max from a list.", keywords: ["average", "mean", "sum", "min", "max", "statistics", "stats", "numbers", "list"] }, Calculator: () => null },
  { meta: { slug: "unit-price", title: "Unit Price", category: "Basic", description: "Cost per item or per unit.", keywords: ["unit price", "cost per item", "price per unit", "comparison", "shopping", "value"] }, Calculator: () => null },
  { meta: { slug: "ratio-proportion", title: "Ratio / Proportion", category: "Basic", description: "Solve a:b = c:d for missing value.", keywords: ["ratio", "proportion", "cross multiply", "a:b=c:d", "proportional", "scale"] }, Calculator: () => null },
  { meta: { slug: "gcd-lcm", title: "GCD / LCM", category: "Basic", description: "Greatest common divisor and least common multiple.", keywords: ["gcd", "greatest common divisor", "lcm", "least common multiple", "factor", "multiple", "euclid"] }, Calculator: () => null },
  { meta: { slug: "rounding", title: "Rounding", category: "Basic", description: "Round a number to N decimals.", keywords: ["round", "rounding", "decimal", "decimals", "precision", "number", "truncate", "math", "significant figures"] }, Calculator: () => null },
  { meta: { slug: "prime-check", title: "Prime Checker", category: "Basic", description: "Check if an integer is prime.", keywords: ["prime", "prime number", "check", "is prime", "prime test", "factor", "divisible", "integer", "math", "number theory"] }, Calculator: () => null },
  { meta: { slug: "area-circle", title: "Area of a Circle", category: "Basic", description: "Area and circumference from radius.", keywords: ["circle", "area", "circumference", "radius", "pi", "geometry", "π"] }, Calculator: () => null },
  { meta: { slug: "area-rectangle", title: "Area of a Rectangle", category: "Basic", description: "Area and perimeter from width/height.", keywords: ["rectangle", "area", "perimeter", "width", "height", "geometry", "rectangular"] }, Calculator: () => null },
  { meta: { slug: "power-root", title: "Power & Root", category: "Basic", description: "Compute x^n and n-th root of x.", keywords: ["power", "exponent", "root", "nth root", "x^n", "radical", "exponentiation"] }, Calculator: () => null },
  { meta: { slug: "tip", title: "Tip Calculator", category: "Financial", description: "Tip amount and total bill.", keywords: ["tip", "gratuity", "bill", "split", "per person", "restaurant", "dining"] }, Calculator: () => null },
  { meta: { slug: "sales-tax", title: "Sales Tax", category: "Financial", description: "Add/remove sales tax.", keywords: ["sales tax", "tax", "vat", "gst", "add tax", "remove tax", "pre-tax", "post-tax", "total"] }, Calculator: () => null },
  { meta: { slug: "loan", title: "Loan Calculator", category: "Financial", description: "Monthly payment + total interest.", keywords: ["loan", "monthly payment", "amortization", "principal", "interest", "term", "apr", "installment"] }, Calculator: () => null },
  { meta: { slug: "mortgage", title: "Mortgage Calculator", category: "Financial", description: "Monthly PITI+HOA estimate.", keywords: ["mortgage", "home loan", "house payment", "piti", "down payment", "property tax", "insurance", "hoa", "pmi", "amortization"] }, Calculator: () => null },
  { meta: { slug: "compound-interest", title: "Compound Interest", category: "Financial", description: "Future value with monthly contributions.", keywords: ["compound interest", "future value", "fv", "investment", "savings", "monthly contribution", "apr", "compounding", "time value of money"] }, Calculator: () => null },
  { meta: { slug: "simple-interest", title: "Simple Interest", category: "Financial", description: "Total = P + P·r·t.", keywords: ["simple interest", "principal", "rate", "time", "interest", "total", "p+r+t", "basic interest"] }, Calculator: () => null },
  { meta: { slug: "roi", title: "ROI Calculator", category: "Financial", description: "Return on investment (%).", keywords: ["roi", "return on investment", "profit", "cost", "investment", "return", "percentage", "gain"] }, Calculator: () => null },
  { meta: { slug: "margin-markup", title: "Margin / Markup", category: "Financial", description: "Compute margin% and markup% from cost and price.", keywords: ["margin", "markup", "profit margin", "cost", "price", "profit", "business", "pricing", "wholesale", "retail"] }, Calculator: () => null },
  { meta: { slug: "apr-to-apy", title: "APR → APY", category: "Financial", description: "Convert APR to APY with compounding.", keywords: ["apr", "apy", "annual percentage rate", "annual percentage yield", "compounding", "convert", "effective rate", "nominal rate"] }, Calculator: () => null },
  { meta: { slug: "present-value", title: "Present Value", category: "Financial", description: "PV of a future amount with discount rate.", keywords: ["present value", "pv", "future value", "discount rate", "time value of money", "discounting", "net present value"] }, Calculator: () => null },
  { meta: { slug: "future-value", title: "Future Value", category: "Financial", description: "FV from present value with rate.", keywords: ["future value", "fv", "present value", "rate", "years", "compounding", "growth", "investment"] }, Calculator: () => null },
  { meta: { slug: "credit-card-payoff", title: "Credit Card Payoff", category: "Financial", description: "Estimate months to payoff with fixed monthly payment.", keywords: ["credit card", "payoff", "debt", "balance", "apr", "monthly payment", "interest", "pay off", "credit card debt"] }, Calculator: () => null },
  { meta: { slug: "break-even", title: "Break-even Point", category: "Financial", description: "Units to break even: fixed / (price - variable).", keywords: ["break even", "break-even", "fixed cost", "variable cost", "price", "units", "contribution margin", "cvp", "cost volume profit"] }, Calculator: () => null },
  { meta: { slug: "bmi", title: "BMI Calculator", category: "Health", description: "Body mass index (US/Metric).", keywords: ["bmi", "body mass index", "weight", "height", "health", "body fat", "obesity", "underweight", "normal weight", "overweight"] }, Calculator: () => null },
  { meta: { slug: "bmr-tdee", title: "BMR / TDEE", category: "Health", description: "Calories/day estimate (Mifflin-St Jeor).", keywords: ["bmr", "basal metabolic rate", "tdee", "total daily energy expenditure", "calories", "mifflin st jeor", "metabolism", "weight loss", "weight gain", "maintenance calories"] }, Calculator: () => null },
  { meta: { slug: "macros", title: "Macro Split", category: "Health", description: "Convert macro % to grams/day.", keywords: ["macros", "macronutrients", "protein", "carbs", "carbohydrates", "fat", "grams", "percentage", "split", "diet", "nutrition"] }, Calculator: () => null },
  { meta: { slug: "heart-rate-zones", title: "Heart Rate Zones", category: "Health", description: "Karvonen zones from age + resting HR.", keywords: ["heart rate", "hr", "zones", "karvonen", "training zones", "max heart rate", "resting heart rate", "cardio", "fitness", "exercise intensity"] }, Calculator: () => null },
  { meta: { slug: "water-intake", title: "Water Intake", category: "Health", description: "Simple daily water estimate by body weight.", keywords: ["water", "hydration", "daily water", "water intake", "body weight", "oz", "liters", "drink water"] }, Calculator: () => null },
  { meta: { slug: "body-fat-navy", title: "Body Fat (Navy Method)", category: "Health", description: "Estimate body fat % from measurements.", keywords: ["body fat", "navy method", "body fat percentage", "measurements", "neck", "waist", "hip", "height", "military", "fitness"] }, Calculator: () => null },
  { meta: { slug: "running-pace", title: "Running Pace", category: "Health", description: "Convert distance/time to pace and speed.", keywords: ["running", "pace", "speed", "distance", "time", "min/km", "min/mi", "km/h", "mph", "jogging", "marathon", "5k", "10k"] }, Calculator: () => null },
  { meta: { slug: "calories-met", title: "Calories Burned (MET)", category: "Health", description: "Calories burned from MET, weight, minutes.", keywords: ["calories", "burned", "met", "metabolic equivalent", "exercise", "activity", "weight", "minutes", "energy expenditure", "workout"] }, Calculator: () => null },
  { meta: { slug: "one-rep-max", title: "One-Rep Max (Epley)", category: "Health", description: "Estimate 1RM from weight and reps.", keywords: ["one rep max", "1rm", "epley", "weight lifting", "strength", "reps", "weight", "powerlifting", "bodybuilding", "max lift"] }, Calculator: () => null },
  { meta: { slug: "angle-deg-rad", title: "Angle Converter", category: "Conversion", description: "Degrees ↔ radians.", keywords: ["angle", "degrees", "radians", "deg", "rad", "convert", "π", "pi", "trigonometry", "geometry"] }, Calculator: () => null },
  { meta: { slug: "energy-convert", title: "Energy Converter", category: "Conversion", description: "Convert J/kJ/Wh/kWh/cal/kcal/BTU.", keywords: ["energy", "convert", "joule", "j", "kj", "wh", "kwh", "calorie", "kcal", "btu", "unit conversion"] }, Calculator: () => null },
  { meta: { slug: "length-convert", title: "Length Converter", category: "Conversion", description: "Convert mm/cm/m/km/in/ft/yd/mi.", keywords: ["length", "convert", "mm", "cm", "meter", "km", "inch", "foot", "yard", "mile", "distance", "unit conversion"] }, Calculator: () => null },
  { meta: { slug: "mass-convert", title: "Mass Converter", category: "Conversion", description: "Convert mg/g/kg/oz/lb.", keywords: ["mass", "convert", "weight", "mg", "g", "kg", "oz", "lb", "ounce", "pound", "gram", "kilogram", "unit conversion"] }, Calculator: () => null },
  { meta: { slug: "pressure-convert", title: "Pressure Converter", category: "Conversion", description: "Convert Pa/kPa/bar/psi/atm.", keywords: ["pressure", "convert", "pa", "kpa", "bar", "psi", "atm", "pascal", "kilopascal", "pounds per square inch", "atmosphere", "unit conversion"] }, Calculator: () => null },
  { meta: { slug: "speed-convert", title: "Speed Converter", category: "Conversion", description: "Convert m/s, km/h, mph, knots.", keywords: ["speed", "convert", "m/s", "km/h", "mph", "knots", "velocity", "meter per second", "kilometer per hour", "miles per hour", "nautical", "unit conversion"] }, Calculator: () => null },
  { meta: { slug: "temp-convert", title: "Temperature Converter", category: "Conversion", description: "Convert °C, °F, K.", keywords: ["temperature", "convert", "celsius", "fahrenheit", "kelvin", "c", "f", "k", "degrees", "temp", "unit conversion"] }, Calculator: () => null },
  { meta: { slug: "volume-convert", title: "Volume Converter", category: "Conversion", description: "Convert mL/L/m^3/US gal/US qt/ft^3.", keywords: ["volume", "convert", "ml", "l", "liter", "m3", "cubic meter", "gallon", "quart", "ft3", "cubic foot", "us", "unit conversion"] }, Calculator: () => null },
  { meta: { slug: "ohms-law", title: "Ohm's Law", category: "Electronics", description: "V/I/R + power.", keywords: ["ohm's law", "ohms law", "voltage", "current", "resistance", "power", "v", "i", "r", "watt", "amp", "volt", "ohm", "circuit"] }, Calculator: () => null },
  { meta: { slug: "resistor-divider", title: "Resistor Divider", category: "Electronics", description: "Vout, current, resistor power.", keywords: ["resistor divider", "voltage divider", "vout", "vin", "resistor", "current", "power", "top", "bottom", "circuit", "ohms law"] }, Calculator: () => null },
  { meta: { slug: "led-resistor", title: "LED Resistor", category: "Electronics", description: "Series resistor and power for an LED.", keywords: ["led", "resistor", "series", "forward voltage", "vf", "current", "ma", "ohm", "power", "watt", "circuit"] }, Calculator: () => null },
  { meta: { slug: "rc-cutoff", title: "RC Cutoff", category: "Electronics", description: "RC time constant and cutoff frequency.", keywords: ["rc", "cutoff", "frequency", "time constant", "tau", "resistor", "capacitor", "filter", "low pass", "high pass", "hertz", "hz"] }, Calculator: () => null },
  { meta: { slug: "capacitor-charge", title: "Capacitor Charge Time", category: "Electronics", description: "Time to reach a target % of final voltage in RC.", keywords: ["capacitor", "charge", "rc", "time constant", "tau", "voltage", "exponential", "charging curve", "percent", "final voltage"] }, Calculator: () => null },
  { meta: { slug: "battery-runtime", title: "Battery Runtime", category: "Electronics", description: "Runtime from capacity and load current.", keywords: ["battery", "runtime", "capacity", "mah", "ah", "current", "load", "discharge", "hours", "estimate"] }, Calculator: () => null },
  { meta: { slug: "date-diff", title: "Date Difference", category: "Time", description: "Days/weeks between two dates.", keywords: ["date", "difference", "days", "weeks", "between", "duration", "interval", "start", "end", "calendar"] }, Calculator: () => null },
  { meta: { slug: "epoch-converter", title: "Epoch Converter", category: "Time", description: "Unix seconds ↔ ISO date/time (local).", keywords: ["epoch", "unix", "timestamp", "iso", "date", "time", "seconds", "milliseconds", "convert", "unix time"] }, Calculator: () => null },
];

export const CATEGORY_INFO: Record<string, { description: string; icon: string }> = {
  Basic: {
    description: "Fundamental math tools for everyday calculations — arithmetic, percentages, fractions, geometry, and number theory.",
    icon: "🔢",
  },
  Financial: {
    description: "Money calculators for loans, mortgages, investments, interest, ROI, and business metrics.",
    icon: "💰",
  },
  Health: {
    description: "Fitness and wellness estimators — BMI, calories, macros, heart rate zones, body fat, and hydration.",
    icon: "❤️",
  },
  Conversion: {
    description: "Unit converters for length, mass, temperature, speed, pressure, energy, volume, and angles.",
    icon: "🔄",
  },
  Electronics: {
    description: "Circuit calculators for Ohm's law, resistor dividers, LEDs, RC filters, capacitors, and battery runtime.",
    icon: "⚡",
  },
  Time: {
    description: "Date and timestamp utilities — difference between dates, Unix epoch conversion.",
    icon: "⏱️",
  },
};

export function getCalculatorMeta(slug: string): CalculatorMeta | undefined {
  const mod = calculators.find(c => c.meta.slug === slug);
  return mod?.meta;
}

export function getCalculatorsByCategory(category: Category): CalculatorMeta[] {
  return calculators
    .filter(c => c.meta.category === category)
    .map(c => c.meta);
}

export function getAllCategories(): Category[] {
  return ["Basic", "Financial", "Health", "Conversion", "Electronics", "Time"];
}