import type { Category, CalculatorMeta } from "@/lib/types";

/**
 * Server-safe calculator metadata registry.
 * No component imports - safe for use in generateMetadata, generateStaticParams, etc.
 */
export const CALCULATOR_META: CalculatorMeta[] = [
  { slug: "basic", title: "Basic Calculator", category: "Basic", description: "Free online calculator for addition, subtraction, multiplication, division, and powers. Fast, simple, no install needed.", keywords: ["basic calculator", "online calculator", "free calculator", "add subtract multiply divide", "simple calculator", "arithmetic calculator", "math calculator"] 
  , schema: { calculatorType: "BasicCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "percentage", title: "Percentage Calculator", category: "Basic", description: "Calculate percentage of a number, what percent one number is of another, and percentage increase or decrease. Fast and free.", keywords: ["percentage calculator", "percent calculator", "what is 20 percent of", "percentage increase", "percentage decrease", "percent of a number", "calculate percentage", "percent change"] 
  , schema: { calculatorType: "PercentageCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "fraction-simplifier", title: "Fraction Simplifier", category: "Basic", description: "Reduce a fraction + mixed number + decimal.", keywords: ["fraction", "simplify", "reduce", "mixed number", "decimal", "numerator", "denominator", "gcd"] 
  , schema: { calculatorType: "FractionSimplifierCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "average-stats", title: "Average / Quick Stats", category: "Basic", description: "Average, sum, min, max from a list.", keywords: ["average", "mean", "sum", "min", "max", "statistics", "stats", "numbers", "list"] 
  , schema: { calculatorType: "AverageStatsCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "unit-price", title: "Unit Price", category: "Basic", description: "Cost per item or per unit.", keywords: ["unit price", "cost per item", "price per unit", "comparison", "shopping", "value"] 
  , schema: { calculatorType: "UnitPriceCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "ratio-proportion", title: "Ratio / Proportion", category: "Basic", description: "Solve a:b = c:d for missing value.", keywords: ["ratio", "proportion", "cross multiply", "a:b=c:d", "proportional", "scale"] 
  , schema: { calculatorType: "RatioProportionCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "gcd-lcm", title: "GCD / LCM", category: "Basic", description: "Greatest common divisor and least common multiple.", keywords: ["gcd", "greatest common divisor", "lcm", "least common multiple", "factor", "multiple", "euclid"] 
  , schema: { calculatorType: "GcdLcmCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "rounding", title: "Rounding", category: "Basic", description: "Round a number to N decimals.", keywords: ["round", "rounding", "decimal", "decimals", "precision", "number", "truncate", "math", "significant figures"] 
  , schema: { calculatorType: "RoundingCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "prime-check", title: "Prime Checker", category: "Basic", description: "Check if an integer is prime.", keywords: ["prime", "prime number", "check", "is prime", "prime test", "factor", "divisible", "integer", "math", "number theory"] 
  , schema: { calculatorType: "PrimeCheckCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "area-circle", title: "Area of a Circle", category: "Basic", description: "Area and circumference from radius.", keywords: ["circle", "area", "circumference", "radius", "pi", "geometry", "Ï€"] 
  , schema: { calculatorType: "AreaCircleCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "area-rectangle", title: "Area of a Rectangle", category: "Basic", description: "Area and perimeter from width/height.", keywords: ["rectangle", "area", "perimeter", "width", "height", "geometry", "rectangular"] 
  , schema: { calculatorType: "AreaRectangleCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "power-root", title: "Power & Root", category: "Basic", description: "Compute x^n and n-th root of x.", keywords: ["power", "exponent", "root", "nth root", "x^n", "radical", "exponentiation"] 
  , schema: { calculatorType: "PowerRootCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "tip", title: "Tip Calculator", category: "Financial", description: "Tip amount and total bill.", keywords: ["tip", "gratuity", "bill", "split", "per person", "restaurant", "dining"] 
  , schema: { calculatorType: "TipCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "loan", title: "Loan Calculator", category: "Financial", description: "Monthly payment + total interest.", keywords: ["loan", "monthly payment", "amortization", "principal", "interest", "term", "apr", "installment"], schema: { calculatorType: "LoanCalculator", formula: "M = P * r(1+r)^n / ((1+r)^n - 1)", inputs: [ { name: "Principal", description: "Loan amount (initial principal)", unitText: "USD", minValue: 0, required: true }, { name: "APR", description: "Annual percentage rate", unitText: "%", minValue: 0, maxValue: 100, required: true }, { name: "Term (years)", description: "Loan term in years", unitText: "years", minValue: 0.25, maxValue: 50, required: true } ], outputs: [ { name: "Monthly payment", description: "Monthly payment amount", unitText: "USD" }, { name: "Total paid", description: "Total amount paid over loan term", unitText: "USD" }, { name: "Total interest", description: "Total interest paid", unitText: "USD" } ] } },
  { slug: "mortgage", title: "Mortgage Calculator", category: "Financial", description: "Monthly PITI+HOA estimate.", keywords: ["mortgage", "home loan", "house payment", "piti", "down payment", "property tax", "insurance", "hoa", "pmi", "amortization"], schema: { calculatorType: "MortgageCalculator", formula: "M = P * r(1+r)^n / ((1+r)^n - 1) + T + I + H", inputs: [ { name: "Home price", description: "Purchase price of the home", unitText: "USD", minValue: 0, required: true }, { name: "Down payment %", description: "Down payment as percentage of home price", unitText: "%", minValue: 0, maxValue: 100, required: true }, { name: "APR", description: "Annual percentage rate", unitText: "%", minValue: 0, maxValue: 20, required: true }, { name: "Term (years)", description: "Loan term in years", unitText: "years", minValue: 1, maxValue: 40, required: true }, { name: "Monthly tax", description: "Monthly property tax estimate", unitText: "USD", minValue: 0, required: false }, { name: "Monthly insurance", description: "Monthly insurance estimate", unitText: "USD", minValue: 0, required: false }, { name: "Monthly HOA", description: "Monthly HOA fees", unitText: "USD", minValue: 0, required: false } ], outputs: [ { name: "Principal + Interest", description: "Monthly principal and interest payment", unitText: "USD" }, { name: "Tax + Insurance + HOA", description: "Monthly escrow payment", unitText: "USD" }, { name: "Total monthly (PITI+HOA)", description: "Total monthly payment", unitText: "USD" }, { name: "Total paid", description: "Total amount paid over loan term", unitText: "USD" }, { name: "Total interest", description: "Total interest paid", unitText: "USD" } ] } },
  { slug: "compound-interest", title: "Compound Interest", category: "Financial", description: "Future value with monthly contributions.", keywords: ["compound interest", "future value", "fv", "investment", "savings", "monthly contribution", "apr", "compounding", "time value of money"], schema: { calculatorType: "CompoundInterestCalculator", formula: "FV = P(1+r)^n + PMT * (((1+r)^n - 1) / r)", inputs: [ { name: "Initial principal", description: "Starting investment amount", unitText: "USD", minValue: 0, required: true }, { name: "Monthly contribution", description: "Monthly addition to investment", unitText: "USD", minValue: 0, required: false }, { name: "APR", description: "Annual percentage rate", unitText: "%", minValue: 0, maxValue: 50, required: true }, { name: "Years", description: "Investment period in years", unitText: "years", minValue: 0, maxValue: 100, required: true } ], outputs: [ { name: "Future value", description: "Total value at end of period", unitText: "USD" }, { name: "Total invested", description: "Sum of all contributions", unitText: "USD" }, { name: "Total gain", description: "Earnings from compound interest", unitText: "USD" } ] } },
  { slug: "simple-interest", title: "Simple Interest", category: "Financial", description: "Total = P + PÂ·rÂ·t.", keywords: ["simple interest", "principal", "rate", "time", "interest", "total", "p+r+t", "basic interest"] 
  , schema: { calculatorType: "SimpleInterestCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "roi", title: "ROI Calculator", category: "Financial", description: "Return on investment (%).", keywords: ["roi", "return on investment", "profit", "cost", "investment", "return", "percentage", "gain"] 
  , schema: { calculatorType: "RoiCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "margin-markup", title: "Margin / Markup", category: "Financial", description: "Compute margin% and markup% from cost and price.", keywords: ["margin", "markup", "profit margin", "cost", "price", "profit", "business", "pricing", "wholesale", "retail"] 
  , schema: { calculatorType: "MarginMarkupCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "apr-to-apy", title: "APR â†’ APY", category: "Financial", description: "Convert APR to APY with compounding.", keywords: ["apr", "apy", "annual percentage rate", "annual percentage yield", "compounding", "convert", "effective rate", "nominal rate"] 
  , schema: { calculatorType: "AprToApyCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "present-value", title: "Present Value", category: "Financial", description: "PV of a future amount with discount rate.", keywords: ["present value", "pv", "future value", "discount rate", "time value of money", "discounting", "net present value"] 
  , schema: { calculatorType: "PresentValueCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "future-value", title: "Future Value", category: "Financial", description: "FV from present value with rate.", keywords: ["future value", "fv", "present value", "rate", "years", "compounding", "growth", "investment"] 
  , schema: { calculatorType: "FutureValueCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "credit-card-payoff", title: "Credit Card Payoff", category: "Financial", description: "Estimate months to payoff with fixed monthly payment.", keywords: ["credit card", "payoff", "debt", "balance", "apr", "monthly payment", "interest", "pay off", "credit card debt"] 
  , schema: { calculatorType: "CreditCardPayoffCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "break-even", title: "Break-even Point", category: "Financial", description: "Units to break even: fixed / (price - variable).", keywords: ["break even", "break-even", "fixed cost", "variable cost", "price", "units", "contribution margin", "cvp", "cost volume profit"] 
  , schema: { calculatorType: "BreakEvenCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "bmi", title: "BMI Calculator — Body Mass Index", category: "Health", description: "Calculate your Body Mass Index (BMI) in US or metric units. See your BMI category: underweight, normal, overweight, or obese.", keywords: ["bmi calculator", "body mass index", "bmi chart", "calculate bmi", "healthy weight", "overweight", "obesity", "height weight", "bmi metric"], schema: { calculatorType: "BMICalculator", formula: "US: BMI = (weight_lbs / height_in^2) * 703; Metric: BMI = weight_kg / (height_m)^2", inputs: [ { name: "Weight (US)", description: "Weight in pounds", unitText: "lb", minValue: 1, maxValue: 1000, required: true }, { name: "Height (US)", description: "Height in inches", unitText: "in", minValue: 12, maxValue: 120, required: true }, { name: "Weight (Metric)", description: "Weight in kilograms", unitText: "kg", minValue: 1, maxValue: 500, required: true }, { name: "Height (Metric)", description: "Height in centimeters", unitText: "cm", minValue: 30, maxValue: 300, required: true } ], outputs: [ { name: "BMI", description: "Body Mass Index value", unitText: "kg/m²" }, { name: "Category", description: "BMI classification (Underweight, Normal, Overweight, Obese)", unitText: "" } ] } },
  { slug: "bmr-tdee", title: "BMR / TDEE", category: "Health", description: "Calories/day estimate (Mifflin-St Jeor).", keywords: ["bmr", "basal metabolic rate", "tdee", "total daily energy expenditure", "calories", "mifflin st jeor", "metabolism", "weight loss", "weight gain", "maintenance calories"], schema: { calculatorType: "TDEECalculator", formula: "BMR = 10*weight_kg + 6.25*height_cm - 5*age + s; TDEE = BMR * activity_factor", inputs: [ { name: "Age", description: "Age in years", unitText: "years", minValue: 10, maxValue: 100, required: true }, { name: "Sex", description: "Biological sex", unitText: "", required: true }, { name: "Weight", description: "Body weight", unitText: "kg", minValue: 20, maxValue: 300, required: true }, { name: "Height", description: "Height", unitText: "cm", minValue: 100, maxValue: 250, required: true }, { name: "Activity level", description: "Physical activity level", unitText: "", required: true } ], outputs: [ { name: "BMR", description: "Basal Metabolic Rate", unitText: "kcal/day" }, { name: "TDEE", description: "Total Daily Energy Expenditure", unitText: "kcal/day" } ] } },
  { slug: "heart-rate-zones", title: "Heart Rate Zones", category: "Health", description: "Karvonen zones from age + resting HR.", keywords: ["heart rate", "hr", "zones", "karvonen", "training zones", "max heart rate", "resting heart rate", "cardio", "fitness", "exercise intensity"] 
  , schema: { calculatorType: "HeartRateZonesCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "water-intake", title: "Water Intake", category: "Health", description: "Simple daily water estimate by body weight.", keywords: ["water", "hydration", "daily water", "water intake", "body weight", "oz", "liters", "drink water"] 
  , schema: { calculatorType: "WaterIntakeCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "running-pace", title: "Running Pace", category: "Health", description: "Convert distance/time to pace and speed.", keywords: ["running", "pace", "speed", "distance", "time", "min/km", "min/mi", "km/h", "mph", "jogging", "marathon", "5k", "10k"] 
  , schema: { calculatorType: "RunningPaceCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "calories-met", title: "Calories Burned (MET)", category: "Health", description: "Calories burned from MET, weight, minutes.", keywords: ["calories", "burned", "met", "metabolic equivalent", "exercise", "activity", "weight", "minutes", "energy expenditure", "workout"] 
  , schema: { calculatorType: "CaloriesMetCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "one-rep-max", title: "One Rep Max Calculator (1RM)", category: "Health", description: "Estimate your one rep max from any weight and rep count using the Epley formula. Instantly see your 1RM for squat, bench, deadlift, or any lift.", keywords: ["one rep max", "1rm calculator", "one rep max calculator", "epley formula", "max lift calculator", "bench press max", "squat max", "deadlift max", "powerlifting"] 
  , schema: { calculatorType: "OneRepMaxCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "temp-convert", title: "Temperature Converter", category: "Conversion", description: "Convert Â°C, Â°F, K.", keywords: ["temperature", "convert", "celsius", "fahrenheit", "kelvin", "c", "f", "k", "degrees", "temp", "unit conversion"] 
  , schema: { calculatorType: "TempConvertCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "length-convert", title: "Length Converter", category: "Conversion", description: "Convert mm/cm/m/km/in/ft/yd/mi.", keywords: ["length", "convert", "mm", "cm", "meter", "km", "inch", "foot", "yard", "mile", "distance", "unit conversion"] 
  , schema: { calculatorType: "LengthConvertCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "mass-convert", title: "Mass Converter", category: "Conversion", description: "Convert mg/g/kg/oz/lb.", keywords: ["mass", "convert", "weight", "mg", "g", "kg", "oz", "lb", "ounce", "pound", "gram", "kilogram", "unit conversion"] 
  , schema: { calculatorType: "MassConvertCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "pressure-convert", title: "Pressure Converter", category: "Conversion", description: "Convert Pa/kPa/bar/psi/atm.", keywords: ["pressure", "convert", "pa", "kpa", "bar", "psi", "atm", "pascal", "kilopascal", "pounds per square inch", "atmosphere", "unit conversion"] 
  , schema: { calculatorType: "PressureConvertCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "speed-convert", title: "Speed Converter", category: "Conversion", description: "Convert m/s, km/h, mph, knots.", keywords: ["speed", "convert", "m/s", "km/h", "mph", "knots", "velocity", "meter per second", "kilometer per hour", "miles per hour", "nautical", "unit conversion"] 
  , schema: { calculatorType: "SpeedConvertCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "volume-convert", title: "Volume Converter", category: "Conversion", description: "Convert mL/L/m^3/US gal/US qt/ft^3.", keywords: ["volume", "convert", "ml", "l", "liter", "m3", "cubic meter", "gallon", "quart", "ft3", "cubic foot", "us", "unit conversion"] 
  , schema: { calculatorType: "VolumeConvertCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "energy-convert", title: "Energy Converter", category: "Conversion", description: "Convert J/kJ/Wh/kWh/cal/kcal/BTU.", keywords: ["energy", "convert", "joule", "j", "kj", "wh", "kwh", "calorie", "kcal", "btu", "unit conversion"] 
  , schema: { calculatorType: "EnergyConvertCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "angle-deg-rad", title: "Angle Converter", category: "Conversion", description: "Degrees â†” radians.", keywords: ["angle", "degrees", "radians", "deg", "rad", "convert", "Ï€", "pi", "trigonometry", "geometry"] 
  , schema: { calculatorType: "AngleDegRadCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "ohms-law", title: "Ohm's Law", category: "Electronics", description: "V/I/R + power.", keywords: ["ohm's law", "ohms law", "voltage", "current", "resistance", "power", "v", "i", "r", "watt", "amp", "volt", "ohm", "circuit"] 
  , schema: { calculatorType: "OhmsLawCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "resistor-divider", title: "Resistor Divider", category: "Electronics", description: "Vout, current, resistor power.", keywords: ["resistor divider", "voltage divider", "vout", "vin", "resistor", "current", "power", "top", "bottom", "circuit", "ohms law"] 
  , schema: { calculatorType: "ResistorDividerCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "led-resistor", title: "LED Resistor", category: "Electronics", description: "Series resistor and power for an LED.", keywords: ["led", "resistor", "series", "forward voltage", "vf", "current", "ma", "ohm", "power", "watt", "circuit"] 
  , schema: { calculatorType: "LedResistorCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "rc-cutoff", title: "RC Cutoff", category: "Electronics", description: "RC time constant and cutoff frequency.", keywords: ["rc", "cutoff", "frequency", "time constant", "tau", "resistor", "capacitor", "filter", "low pass", "high pass", "hertz", "hz"] 
  , schema: { calculatorType: "RcCutoffCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "capacitor-charge", title: "Capacitor Charge Time", category: "Electronics", description: "Time to reach a target % of final voltage in RC.", keywords: ["capacitor", "charge", "rc", "time constant", "tau", "voltage", "exponential", "charging curve", "percent", "final voltage"] 
  , schema: { calculatorType: "CapacitorChargeCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "battery-runtime", title: "Battery Runtime", category: "Electronics", description: "Runtime from capacity and load current.", keywords: ["battery", "runtime", "capacity", "mah", "ah", "current", "load", "discharge", "hours", "estimate"] 
  , schema: { calculatorType: "BatteryRuntimeCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "date-diff", title: "Date Difference", category: "Time", description: "Days/weeks between two dates.", keywords: ["date", "difference", "days", "weeks", "between", "duration", "interval", "start", "end", "calendar"] 
  , schema: { calculatorType: "DateDiffCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "epoch-converter", title: "Epoch Converter", category: "Time", description: "Unix seconds â†” ISO date/time (local).", keywords: ["epoch", "unix", "timestamp", "iso", "date", "time", "seconds", "milliseconds", "convert", "unix time"] 
  , schema: { calculatorType: "EpochConverterCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "vat-calculator", title: "VAT / GST Calculator", category: "Financial", description: "Add or remove VAT/GST from an amount with custom rates.", keywords: ["vat", "gst", "sales tax", "value added tax", "tax calculator", "net", "gross", "vat rate"] 
  , schema: { calculatorType: "VatCalculatorCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "savings-goal", title: "Savings Goal Calculator", category: "Financial", description: "Calculate monthly savings needed to reach a financial goal.", keywords: ["savings", "goal", "monthly savings", "target", "financial planning", "compound interest", "retirement", "emergency fund"] 
  , schema: { calculatorType: "SavingsGoalCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "annuity", title: "Annuity Calculator", category: "Financial", description: "Future & present value of regular payments (ordinary or due).", keywords: ["annuity", "future value", "present value", "ordinary annuity", "annuity due", "retirement", "pension", "periodic payments"] 
  , schema: { calculatorType: "AnnuityCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "bsa", title: "Body Surface Area (BSA)", category: "Health", description: "Calculate BSA using Mosteller and Du Bois formulas.", keywords: ["bsa", "body surface area", "mosteller", "du bois", "drug dosing", "chemotherapy", "cardiac index", "medical"] 
  , schema: { calculatorType: "BsaCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "alcohol-units", title: "Alcohol Unit Calculator", category: "Health", description: "Calculate UK units, US standard drinks, and calories from volume and ABV.", keywords: ["alcohol", "units", "standard drinks", "abv", "blood alcohol", "uk units", "us drinks", "calories", "responsible drinking"] 
  , schema: { calculatorType: "AlcoholUnitsCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "fuel-cost", title: "Fuel Cost Calculator", category: "Conversion", description: "Calculate fuel needed and trip cost from distance, efficiency, and fuel price.", keywords: ["fuel", "gas", "cost", "trip", "mileage", "mpg", "l/100km", "fuel economy", "road trip", "gasoline"] 
  , schema: { calculatorType: "FuelCostCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "currency-converter", title: "Currency Converter", category: "Conversion", description: "Convert between major world currencies with custom exchange rates.", keywords: ["currency", "converter", "exchange rate", "forex", "usd", "eur", "gbp", "jpy", "international", "money"] 
  , schema: { calculatorType: "CurrencyConverterCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "torque-converter", title: "Torque Converter", category: "Conversion", description: "Convert between Nm, ft-lb, in-lb, and kgfÂ·m torque units.", keywords: ["torque", "newton meter", "foot pound", "inch pound", "kgf meter", "conversion", "automotive", "engineering", "wrench"] 
  , schema: { calculatorType: "TorqueConverterCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "tire-size", title: "Tire Size Calculator", category: "Conversion", description: "Calculate diameter, circumference, sidewall, and revs/km from tire code.", keywords: ["tire", "tyre", "size", "diameter", "circumference", "sidewall", "revs per km", "speedometer", "plus sizing", "wheel"] 
  , schema: { calculatorType: "TireSizeCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "retirement-withdrawal", title: "Retirement Withdrawal (4% Rule)", category: "Financial", description: "Test if your portfolio can sustain withdrawals for retirement using the 4% rule.", keywords: ["retirement", "withdrawal", "4% rule", "safe withdrawal rate", "swr", "portfolio", "financial independence", "fire", "pension"] 
  , schema: { calculatorType: "RetirementWithdrawalCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "date-calculator", title: "Date Calculator (Add/Subtract)", category: "Time", description: "Add or subtract years, months, weeks, and days from a date.", keywords: ["date", "calculator", "add days", "subtract days", "date math", "deadline", "due date", "anniversary", "calendar"] 
  , schema: { calculatorType: "DateCalculatorCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "loan-amortization", title: "Loan Amortization (Extra Payments)", category: "Financial", description: "See how extra monthly payments reduce loan term and interest.", keywords: ["loan", "amortization", "extra payment", "payoff early", "mortgage", "principal", "interest saved", "loan term"] 
  , schema: { calculatorType: "LoanAmortizationCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "rule-of-72", title: "Rule of 72 / 114 / 144", category: "Financial", description: "Quick mental math: years to double, triple, or quadruple your money.", keywords: ["rule of 72", "rule of 114", "rule of 144", "double money", "triple money", "compound interest", "mental math", "investment"] 
  , schema: { calculatorType: "RuleOf72Calculator", formula: "", inputs: [], outputs: [] }},
  { slug: "rental-yield", title: "Rental Yield Calculator", category: "Financial", description: "Calculate gross yield, net yield, and cash-on-cash return for rental properties.", keywords: ["rental yield", "gross yield", "net yield", "cash on cash", "property investment", "real estate", "roi", "landlord"] 
  , schema: { calculatorType: "RentalYieldCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "dollar-cost-averaging", title: "Dollar Cost Averaging (DCA)", category: "Financial", description: "Compare lump sum vs periodic investing. Calculate per-period investment amounts.", keywords: ["dollar cost averaging", "DCA", "lump sum", "periodic investing", "investment strategy", "market timing", "volatility"] 
  , schema: { calculatorType: "DollarCostAveragingCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "stock-options", title: "Stock Options Calculator", category: "Financial", description: "Calculate intrinsic value, time value, break-even, and total cost for call/put options.", keywords: ["stock options", "call option", "put option", "intrinsic value", "time value", "break even", "option premium", "derivatives"] 
  , schema: { calculatorType: "StockOptionsCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "inflation-calculator", title: "Inflation Calculator", category: "Financial", description: "Calculate future/past purchasing power with custom inflation rates.", keywords: ["inflation", "purchasing power", "cpi", "future value", "past value", "money value", "cost of living", "real value"] 
  , schema: { calculatorType: "InflationCalculatorCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "retirement-age", title: "Retirement Age Calculator", category: "Financial", description: "Project your retirement savings and income based on age, contributions, and returns.", keywords: ["retirement", "retirement age", "when can i retire", "retirement savings", "4% rule", "financial independence", "fire", "pension"] 
  , schema: { calculatorType: "RetirementAgeCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "emergency-fund", title: "Emergency Fund Calculator", category: "Financial", description: "Calculate how much emergency savings you need and how long to build it.", keywords: ["emergency fund", "emergency savings", "rainy day fund", "financial cushion", "months of expenses", "financial security"] 
  , schema: { calculatorType: "EmergencyFundCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "debt-payoff", title: "Debt Payoff Calculator", category: "Financial", description: "Calculate months to become debt-free. Compare your payment vs minimum payment.", keywords: ["debt payoff", "debt free", "credit card payoff", "debt avalanche", "debt snowball", "interest", "minimum payment"] 
  , schema: { calculatorType: "DebtPayoffCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "mortgage-refinance", title: "Mortgage Refinance Calculator", category: "Financial", description: "Compare current vs new mortgage. Calculate break-even point and lifetime savings.", keywords: ["mortgage refinance", "refi", "refinance calculator", "break even", "closing costs", "cash out refi", "mortgage savings", "interest rate"] 
  , schema: { calculatorType: "MortgageRefinanceCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "social-security", title: "Social Security Benefit Estimator", category: "Financial", description: "Estimate your Social Security benefit at different claim ages (62-70).", keywords: ["social security", "SSA", "benefit estimate", "retirement age", "claim age", "PIA", "full retirement age", "social security calculator"] 
  , schema: { calculatorType: "SocialSecurityCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "fire-calculator", title: "FIRE Calculator (Financial Independence)", category: "Financial", description: "Calculate your FIRE number, years to financial independence, and Coast FIRE.", keywords: ["fire", "financial independence", "retire early", "coast fire", "fire number", "safe withdrawal rate", "4% rule", "early retirement"] 
  , schema: { calculatorType: "FireCalculatorCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "tax-bracket", title: "US Federal Tax Bracket Calculator", category: "Financial", description: "Calculate federal tax, effective rate, and marginal bracket for 2024.", keywords: ["tax bracket", "federal tax", "income tax", "marginal rate", "effective rate", "2024 tax brackets", "filing status"] 
  , schema: { calculatorType: "TaxBracketCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "body-fat-percentage", title: "Body Fat % Calculator (Navy Method)", category: "Health", description: "Estimate body fat percentage using US Navy circumference method (gender-specific).", keywords: ["body fat", "body fat percentage", "navy method", "body composition", "lean mass", "fat mass", "fitness", "health"] 
  , schema: { calculatorType: "BodyFatPercentageCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "protein-intake", title: "Protein Intake Calculator", category: "Health", description: "Calculate daily protein needs based on weight, activity level, and fitness goals.", keywords: ["protein", "protein intake", "daily protein", "macro", "muscle building", "weight loss", "nutrition", "fitness", "gym"] 
  , schema: { calculatorType: "ProteinIntakeCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "macro-calculator-advanced", title: "Macro Calculator (TDEE + Split)", category: "Health", description: "Calculate TDEE and macro split (protein/fat/carbs) based on lean mass and goals.", keywords: ["macros", "macro calculator", "tdee", "protein", "carbs", "fat", "lean mass", "body recomposition", "cutting", "bulking", "iifym"] 
  , schema: { calculatorType: "MacroCalculatorAdvancedCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "workout-volume", title: "Workout Volume Calculator", category: "Health", description: "Calculate training volume (sets Ã— reps Ã— weight) with MEV/MAV/MRV landmarks.", keywords: ["workout volume", "training volume", "sets reps weight", "mev", "mav", "mrv", "hypertrophy", "progressive overload", "periodization", "rpe"] 
  , schema: { calculatorType: "WorkoutVolumeCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "wilks-score", title: "Wilks Score Calculator (Wilks2)", category: "Health", description: "Calculate your Wilks score to compare powerlifting strength across different bodyweight classes. Uses the updated Wilks2 formula.", keywords: ["wilks score", "wilks calculator", "wilks2", "powerlifting score", "wilks coefficient", "compare strength", "powerlifting total", "ipf", "wilks formula"] 
  , schema: { calculatorType: "WilksScoreCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "plate-calculator", title: "Barbell Plate Calculator (kg & lb)", category: "Health", description: "Calculate exactly which weight plates to load on each side of the barbell for any target weight. Supports kg and lb, standard Olympic bars.", keywords: ["plate calculator", "barbell plate calculator", "barbell loading calculator", "plates per side", "how to load a barbell", "weight plates", "olympic bar", "gym calculator", "powerlifting"] 
  , schema: { calculatorType: "PlateCalculatorCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "training-max", title: "5/3/1 Training Max Calculator (Wendler)", category: "Health", description: "Calculate your 5/3/1 training max and all working set weights from your one rep max. Based on Jim Wendler's 5/3/1 strength program.", keywords: ["531 calculator", "5 3 1 calculator", "wendler 531", "training max calculator", "531 working sets", "jim wendler", "powerlifting program", "531 percentages"] 
  , schema: { calculatorType: "TrainingMaxCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "vo2-max", title: "VO2 Max Estimator", category: "Health", description: "Estimate aerobic fitness (VO2 max) from heart rate.", keywords: ["vo2 max", "vo2max", "aerobic fitness", "cardio", "heart rate", "max heart rate", "resting heart rate", "endurance", "running", "fitness test"] 
  , schema: { calculatorType: "Vo2MaxCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "strength-standards", title: "Strength Standards Calculator — Squat, Bench, Deadlift", category: "Health", description: "Find out if your squat, bench press, deadlift, and overhead press are Beginner, Novice, Intermediate, Advanced, or Elite based on bodyweight ratios.", keywords: ["strength standards", "powerlifting standards", "squat standards", "bench press standards", "deadlift standards", "am i strong", "strength level calculator", "bodyweight ratio strength"] 
  , schema: { calculatorType: "StrengthStandardsCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "salary-comparison", title: "Salary Cost of Living Comparison", category: "Financial", description: "Compare salary purchasing power between US cities with cost of living adjustment.", keywords: ["salary comparison", "cost of living", "relocation", "col", "equivalent salary", "city comparison", "moving", "purchasing power"] 
  , schema: { calculatorType: "SalaryComparisonCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-abv", title: "ABV Calculator", category: "Brewing", description: "Calculate alcohol by volume from original and final gravity. Includes standard and advanced formulas.", keywords: ["abv", "alcohol by volume", "original gravity", "final gravity", "og fg calculator", "beer abv", "homebrew abv"] 
  , schema: { calculatorType: "BrewAbvCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-priming", title: "Priming Sugar Calculator", category: "Brewing", description: "Calculate priming sugar (corn sugar, table sugar, DME, honey, maple) for bottle conditioning based on batch volume, temperature, and target carbonation.", keywords: ["priming sugar", "bottle conditioning", "carbonation", "corn sugar", "dextrose", "priming calculator", "homebrew priming"] 
  , schema: { calculatorType: "BrewPrimingCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-strike-water", title: "Strike Water Calculator", category: "Brewing", description: "Calculate strike water temperature and volume for infusion mashing. Accounts for grain weight, temperature, equipment loss, and absorption.", keywords: ["strike water", "mash temperature", "infusion mash", "strike temp calculator", "brew strike water", "mash water calculator", "homebrew mash"] 
  , schema: { calculatorType: "BrewStrikeWaterCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-ibu", title: "IBU Calculator", category: "Brewing", description: "Calculate International Bitterness Units (IBU) using Tinseth, Rager, or Garetz formulas. Accounts for hop form, alpha acid, boil time, and gravity.", keywords: ["ibu", "international bitterness units", "bitterness calculator", "hop calculator", "tinseth", "rager", "garetz", "homebrew ibu"] 
  , schema: { calculatorType: "BrewIbuCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-yeast-pitch", title: "Yeast Pitch Rate Calculator", category: "Brewing", description: "Calculate yeast cells needed and packages required based on batch volume, gravity, yeast type, viability, and starter. Supports ale and lager rates.", keywords: ["yeast pitch rate", "yeast calculator", "pitch rate", "yeast starter", "cells needed", "homebrew yeast", "lager pitch rate", "ale pitch rate"] 
  , schema: { calculatorType: "BrewYeastPitchCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-brix-sg", title: "Brix / SG / Plato Converter", category: "Brewing", description: "Convert between Brix, Specific Gravity, and Plato. Includes potential ABV estimate at 75% attenuation.", keywords: ["brix to sg", "sg to brix", "plato to sg", "brix plato converter", "specific gravity converter", "refractometer brix", "brew gravity conversion"] 
  , schema: { calculatorType: "BrewBrixSgCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-attenuation", title: "Attenuation Calculator", category: "Brewing", description: "Calculate apparent and real attenuation from OG/FG. Predict expected FG and ABV from yeast attenuation rating.", keywords: ["attenuation calculator", "apparent attenuation", "real attenuation", "yeast attenuation", "fg prediction", "brew attenuation"] 
  , schema: { calculatorType: "BrewAttenuationCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-grain-bill", title: "Grain Bill Calculator", category: "Brewing", description: "Calculate total grain weight and per-grain amounts for a target OG, volume, and efficiency. Includes SRM color estimate via Morey formula.", keywords: ["grain bill calculator", "grain weight calculator", "brew grain calculator", "malt calculator", "og calculator", "brewhouse efficiency", "srm calculator"] 
  , schema: { calculatorType: "BrewGrainBillCalculator", formula: "", inputs: [], outputs: [] }},
  { slug: "brew-boil-off", title: "Boil-off Calculator", category: "Brewing", description: "Calculate boil-off rate, total evaporation, and required pre-boil volume. Work forward from volumes or backward from target rate.", keywords: ["boil off calculator", "evaporation rate", "pre boil volume", "boil off rate", "homebrew boil off", "kettle evaporation"] 
  , schema: { calculatorType: "BrewBoilOffCalculator", formula: "", inputs: [], outputs: [] }},
    { slug: "brew-calories", title: "Beer Calories Calculator", category: "Brewing", description: "Estimate beer calories from OG/FG or ABV. Breaks down alcohol vs carb calories. Supports oz/ml serving sizes.", keywords: ["beer calories", "calorie calculator beer", "abv calories", "homebrew calories", "alcohol calories", "carb calories beer", "beer nutrition"] 
  , schema: { calculatorType: "BrewCaloriesCalculator", formula: "", inputs: [], outputs: [] }},
  ];

/** All unique categories */
export const CATEGORIES: Category[] = [
  ...new Set(CALCULATOR_META.map((c) => c.category)),
].sort();

/** Category metadata for UI */
export const CATEGORY_INFO: Record<Category, { 
  description: string; 
  icon: string;
  longDescription?: string;
  useCases?: string[];
  keywords?: string[];
}> = {
  Basic: { 
    description: "Fundamental math tools for everyday calculations — arithmetic, percentages, fractions, geometry, and number theory.",
    icon: "🔢",
    longDescription: "Master fundamental calculations with our comprehensive suite of basic math tools. From simple arithmetic to complex fraction simplification, these calculators handle the essential mathematical operations you use daily. Whether you're managing finances, checking homework, or making quick calculations at the store, our basic calculators provide instant, accurate results without the need for pen and paper.",
    useCases: [
      "Quick percentage calculations for tips, discounts, and taxes",
      "Simplifying complex fractions for recipes and measurements",
      "Finding greatest common divisors and least common multiples",
      "Working with geometric shapes for home projects and crafts",
      "Rounding numbers to specified decimal places"
    ],
    keywords: ["basic calculator", "arithmetic", "percentage calculator", "fraction calculator", "simple math"]
  },
  Financial: { 
    description: "Money calculators for loans, mortgages, investments, interest, ROI, and business metrics.",
    icon: "💰",
    longDescription: "Take control of your finances with powerful calculators designed for loans, investments, and business decisions. Our financial tools help you understand the true cost of borrowing, project investment returns, and make data-driven decisions about major purchases. Whether you're evaluating a mortgage, planning for retirement, or analyzing business performance, these calculators provide the clarity you need to make confident financial choices.",
    useCases: [
      "Calculate monthly mortgage payments and total interest costs",
      "Compare investment returns with compound interest projections",
      "Determine loan payoff timelines with extra payments",
      "Evaluate business ROI and break-even points",
      "Plan retirement savings goals and withdrawal strategies"
    ],
    keywords: ["loan calculator", "mortgage calculator", "compound interest", "investment calculator", "financial planning"]
  },
  Health: { 
    description: "Fitness and wellness estimators — BMI, calories, macros, heart rate zones, body fat, and hydration.",
    icon: "❤️",
    longDescription: "Optimize your fitness and wellness journey with science-based health calculators. These tools translate medical research and exercise physiology into actionable numbers for your daily life. From calculating your ideal caloric intake to determining optimal training zones, our health calculators help you make informed decisions about nutrition, exercise, and overall wellness based on your unique body metrics and goals.",
    useCases: [
      "Calculate Body Mass Index (BMI) and healthy weight ranges",
      "Determine daily caloric needs based on activity level",
      "Find optimal heart rate zones for cardio training",
      "Estimate body fat percentage using Navy method",
      "Calculate daily water intake requirements"
    ],
    keywords: ["BMI calculator", "calorie calculator", "TDEE calculator", "body fat calculator", "fitness tracker"]
  },
  Conversion: { 
    description: "Unit converters for length, mass, temperature, speed, pressure, energy, volume, and angles.",
    icon: "🔄",
    longDescription: "Seamlessly convert between measurement systems with our comprehensive unit conversion toolkit. Whether you're working with metric, imperial, or specialized units, these converters provide instant, accurate transformations across dozens of measurement types. Perfect for cooking, engineering, science homework, travel planning, or any situation where you need to translate between different measurement systems quickly and accurately.",
    useCases: [
      "Convert temperatures between Celsius, Fahrenheit, and Kelvin",
      "Transform lengths between metric and imperial units",
      "Convert cooking measurements for international recipes",
      "Calculate fuel efficiency in different measurement systems",
      "Convert speed, pressure, and energy units for engineering work"
    ],
    keywords: ["unit converter", "measurement converter", "metric to imperial", "temperature converter", "unit conversion"]
  },
  Electronics: { 
    description: "Circuit calculators for Ohm's law, resistor dividers, LEDs, RC filters, capacitors, and battery runtime.",
    icon: "⚡",
    longDescription: "Accelerate your electronics projects with specialized calculators for circuit design and analysis. These tools apply fundamental electrical engineering principles to solve common design challenges instantly. Whether you're building LED circuits, designing filters, calculating component values, or estimating battery life, our electronics calculators help hobbyists and professionals alike avoid tedious manual calculations and focus on building great projects.",
    useCases: [
      "Calculate resistor values for LED circuits using Ohm's law",
      "Design voltage dividers for sensor interfacing",
      "Determine RC filter cutoff frequencies",
      "Calculate capacitor charge and discharge times",
      "Estimate battery runtime for portable projects"
    ],
    keywords: ["electronics calculator", "Ohm's law calculator", "LED resistor calculator", "circuit calculator", "voltage divider"]
  },
  Time: { 
    description: "Date and timestamp utilities — difference between dates, Unix epoch conversion.",
    icon: "⏱️",
    longDescription: "Master date and time calculations with precision tools for developers, project managers, and anyone who needs accurate time-based computations. These utilities handle the complexity of calendar math, from calculating days between events to converting between human-readable dates and Unix timestamps. Essential for programming, project planning, age calculations, and any task requiring accurate date arithmetic.",
    useCases: [
      "Calculate days, weeks, or months between two dates",
      "Convert Unix timestamps to human-readable dates",
      "Add or subtract days from a specific date",
      "Calculate age from birthdate",
      "Determine project milestones and deadlines"
    ],
    keywords: ["date calculator", "days between dates", "Unix timestamp converter", "date difference", "time calculator"]
  },
  Brewing: { 
    description: "Brewing calculators for ABV, priming, strike water, IBU, yeast pitch, gravity conversion, attenuation, grain bills, boil-off, and calories.",
    icon: "🍺",
    longDescription: "Brew better beer with professional-grade calculators designed for homebrewers and craft brewers. These tools handle the complex chemistry and calculations involved in every stage of the brewing process, from mashing and boiling to fermentation and bottling. Whether you're formulating recipes, calculating alcohol content, or ensuring proper carbonation, our brewing calculators help you achieve consistent, high-quality results batch after batch.",
    useCases: [
      "Calculate alcohol by volume (ABV) from original and final gravity",
      "Determine strike water temperature and volume for mashing",
      "Calculate International Bitterness Units (IBU) for hop additions",
      "Compute priming sugar amounts for bottle carbonation",
      "Estimate yeast pitch rates based on wort gravity and volume"
    ],
    keywords: ["brewing calculator", "ABV calculator", "homebrew calculator", "IBU calculator", "beer calculator"]
  }
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
