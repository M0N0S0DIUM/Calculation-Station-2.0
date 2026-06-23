"use client";

import type { CalculatorModule, CalculatorMeta } from "@/lib/types";
import { CALCULATOR_META, getCalculatorMeta, CATEGORIES, CATEGORY_INFO } from "@/lib/registry";

export { CALCULATOR_META, getCalculatorMeta, CATEGORIES, CATEGORY_INFO };

import { alcoholUnits } from "@/calculators/alcohol-units";
import { angleDegRad } from "@/calculators/angle-deg-rad";
import { annuity } from "@/calculators/annuity";
import { aprToApy } from "@/calculators/apr-to-apy";
import { areaCircle } from "@/calculators/area-circle";
import { areaRectangle } from "@/calculators/area-rectangle";
import { averageStats } from "@/calculators/average-stats";
import { basic } from "@/calculators/basic";
import { batteryRuntime } from "@/calculators/battery-runtime";
import { bmi } from "@/calculators/bmi";
import { bmrTdee } from "@/calculators/bmr-tdee";
import { bodyFatNavy } from "@/calculators/body-fat-navy";
import { bodyFatNavy2 } from "@/calculators/body-fat-percentage";
import { breakEven } from "@/calculators/break-even";
import { bsa } from "@/calculators/bsa";
import { caloriesMet } from "@/calculators/calories-met";
import { capacitorCharge } from "@/calculators/capacitor-charge";
import { compoundInterest } from "@/calculators/compound-interest";
import { creditCardPayoff } from "@/calculators/credit-card-payoff";
import { currencyConverter } from "@/calculators/currency-converter";
import { dateCalculator } from "@/calculators/date-calculator";
import { dateDiff } from "@/calculators/date-diff";
import { debtPayoff } from "@/calculators/debt-payoff";
import { dollarCostAveraging } from "@/calculators/dollar-cost-averaging";
import { emergencyFund } from "@/calculators/emergency-fund";
import { energyConvert } from "@/calculators/energy-convert";
import { epochConverter } from "@/calculators/epoch-converter";
import { fireCalculator } from "@/calculators/fire-calculator";
import { fractionSimplifier } from "@/calculators/fraction-simplifier";
import { fuelCost } from "@/calculators/fuel-cost";
import { futureValue } from "@/calculators/future-value";
import { gcdLcm } from "@/calculators/gcd-lcm";
import { heartRateZones } from "@/calculators/heart-rate-zones";
import { inflationCalculator } from "@/calculators/inflation-calculator";
import { ledResistor } from "@/calculators/led-resistor";
import { lengthConvert } from "@/calculators/length-convert";
import { loan } from "@/calculators/loan";
import { loanAmortization } from "@/calculators/loan-amortization";
import { macrosCalculator2 } from "@/calculators/macro-calculator-advanced";
import { macros } from "@/calculators/macros";
import { marginMarkup } from "@/calculators/margin-markup";
import { massConvert } from "@/calculators/mass-convert";
import { mortgage } from "@/calculators/mortgage";
import { mortgageRefinance } from "@/calculators/mortgage-refinance";
import { ohmsLaw } from "@/calculators/ohms-law";
import { oneRepMax } from "@/calculators/one-rep-max";
import { percentage } from "@/calculators/percentage";
import { powerRoot } from "@/calculators/power-root";
import { presentValue } from "@/calculators/present-value";
import { pressureConvert } from "@/calculators/pressure-convert";
import { primeCheck } from "@/calculators/prime-check";
import { proteinIntake } from "@/calculators/protein-intake";
import { ratioProportion } from "@/calculators/ratio-proportion";
import { rcCutoff } from "@/calculators/rc-cutoff";
import { rentalYield } from "@/calculators/rental-yield";
import { resistorDivider } from "@/calculators/resistor-divider";
import { retirementAge } from "@/calculators/retirement-age";
import { retirementWithdrawal } from "@/calculators/retirement-withdrawal";
import { roi } from "@/calculators/roi";
import { rounding } from "@/calculators/rounding";
import { ruleOf72 } from "@/calculators/rule-of-72";
import { runningPace } from "@/calculators/running-pace";
import { salaryComparison } from "@/calculators/salary-comparison";
import { salesTax } from "@/calculators/sales-tax";
import { savingsGoal } from "@/calculators/savings-goal";
import { simpleInterest } from "@/calculators/simple-interest";
import { socialSecurity } from "@/calculators/social-security";
import { speedConvert } from "@/calculators/speed-convert";
import { stockOptions } from "@/calculators/stock-options";
import { taxBracket } from "@/calculators/tax-bracket";
import { tempConvert } from "@/calculators/temp-convert";
import { tip } from "@/calculators/tip";
import { tireSize } from "@/calculators/tire-size";
import { torqueConverter } from "@/calculators/torque-converter";
import { unitPrice } from "@/calculators/unit-price";
import { vatCalculator } from "@/calculators/vat-calculator";
import { volumeConvert } from "@/calculators/volume-convert";
import { waterIntake } from "@/calculators/water-intake";
import { workoutVolume } from "@/calculators/workout-volume";
import { wilksScore } from "@/calculators/wilks-score";
import { plateCalculator } from "@/calculators/plate-calculator";
import { trainingMax } from "@/calculators/training-max";
import { vo2Max } from "@/calculators/vo2-max";
import { strengthStandards } from "@/calculators/strength-standards";

const MODULE_MAP = new Map<string, CalculatorModule>([
  ["alcohol-units", alcoholUnits],
  ["angle-deg-rad", angleDegRad],
  ["annuity", annuity],
  ["apr-to-apy", aprToApy],
  ["area-circle", areaCircle],
  ["area-rectangle", areaRectangle],
  ["average-stats", averageStats],
  ["basic", basic],
  ["battery-runtime", batteryRuntime],
  ["bmi", bmi],
  ["bmr-tdee", bmrTdee],
  ["body-fat-navy", bodyFatNavy],
  ["body-fat-percentage", bodyFatNavy2],
  ["break-even", breakEven],
  ["bsa", bsa],
  ["calories-met", caloriesMet],
  ["capacitor-charge", capacitorCharge],
  ["compound-interest", compoundInterest],
  ["credit-card-payoff", creditCardPayoff],
  ["currency-converter", currencyConverter],
  ["date-calculator", dateCalculator],
  ["date-diff", dateDiff],
  ["debt-payoff", debtPayoff],
  ["dollar-cost-averaging", dollarCostAveraging],
  ["emergency-fund", emergencyFund],
  ["energy-convert", energyConvert],
  ["epoch-converter", epochConverter],
  ["fire-calculator", fireCalculator],
  ["fraction-simplifier", fractionSimplifier],
  ["fuel-cost", fuelCost],
  ["future-value", futureValue],
  ["gcd-lcm", gcdLcm],
  ["heart-rate-zones", heartRateZones],
  ["inflation-calculator", inflationCalculator],
  ["led-resistor", ledResistor],
  ["length-convert", lengthConvert],
  ["loan", loan],
  ["loan-amortization", loanAmortization],
  ["macro-calculator-advanced", macrosCalculator2],
  ["macros", macros],
  ["margin-markup", marginMarkup],
  ["mass-convert", massConvert],
  ["mortgage", mortgage],
  ["mortgage-refinance", mortgageRefinance],
  ["ohms-law", ohmsLaw],
  ["one-rep-max", oneRepMax],
  ["percentage", percentage],
  ["power-root", powerRoot],
  ["present-value", presentValue],
  ["pressure-convert", pressureConvert],
  ["prime-check", primeCheck],
  ["protein-intake", proteinIntake],
  ["ratio-proportion", ratioProportion],
  ["rc-cutoff", rcCutoff],
  ["rental-yield", rentalYield],
  ["resistor-divider", resistorDivider],
  ["retirement-age", retirementAge],
  ["retirement-withdrawal", retirementWithdrawal],
  ["roi", roi],
  ["rounding", rounding],
  ["rule-of-72", ruleOf72],
  ["running-pace", runningPace],
  ["salary-comparison", salaryComparison],
  ["sales-tax", salesTax],
  ["savings-goal", savingsGoal],
  ["simple-interest", simpleInterest],
  ["social-security", socialSecurity],
  ["speed-convert", speedConvert],
  ["stock-options", stockOptions],
  ["tax-bracket", taxBracket],
  ["temp-convert", tempConvert],
  ["tip", tip],
  ["tire-size", tireSize],
  ["torque-converter", torqueConverter],
  ["unit-price", unitPrice],
  ["vat-calculator", vatCalculator],
  ["volume-convert", volumeConvert],
  ["water-intake", waterIntake],
  ["workout-volume", workoutVolume],
  ["wilks-score", wilksScore],
  ["plate-calculator", plateCalculator],
  ["training-max", trainingMax],
  ["vo2-max", vo2Max],
  ["strength-standards", strengthStandards],
]);

export const CALCULATOR_MODULES: CalculatorModule[] = CALCULATOR_META.map(
  (meta) => MODULE_MAP.get(meta.slug)!
).filter(Boolean);

export function getCalculator(slug: string): CalculatorModule | undefined {
  return MODULE_MAP.get(slug);
}

