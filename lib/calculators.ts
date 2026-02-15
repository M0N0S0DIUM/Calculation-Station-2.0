import type { CalculatorModule } from "@/lib/types";
import { basic } from "@/calculators/basic";
import { percentage } from "@/calculators/percentage";
import { fractionSimplifier } from "@/calculators/fraction-simplifier";
import { averageStats } from "@/calculators/average-stats";
import { unitPrice } from "@/calculators/unit-price";
import { ratioProportion } from "@/calculators/ratio-proportion";
import { gcdLcm } from "@/calculators/gcd-lcm";
import { rounding } from "@/calculators/rounding";
import { primeCheck } from "@/calculators/prime-check";
import { areaCircle } from "@/calculators/area-circle";
import { areaRectangle } from "@/calculators/area-rectangle";
import { powerRoot } from "@/calculators/power-root";
import { tip } from "@/calculators/tip";
import { salesTax } from "@/calculators/sales-tax";
import { loan } from "@/calculators/loan";
import { mortgage } from "@/calculators/mortgage";
import { compoundInterest } from "@/calculators/compound-interest";
import { simpleInterest } from "@/calculators/simple-interest";
import { roi } from "@/calculators/roi";
import { marginMarkup } from "@/calculators/margin-markup";
import { aprToApy } from "@/calculators/apr-to-apy";
import { presentValue } from "@/calculators/present-value";
import { futureValue } from "@/calculators/future-value";
import { creditCardPayoff } from "@/calculators/credit-card-payoff";
import { breakEven } from "@/calculators/break-even";
import { bmi } from "@/calculators/bmi";
import { bmrTdee } from "@/calculators/bmr-tdee";
import { macros } from "@/calculators/macros";
import { heartRateZones } from "@/calculators/heart-rate-zones";
import { waterIntake } from "@/calculators/water-intake";
import { bodyFatNavy } from "@/calculators/body-fat-navy";
import { runningPace } from "@/calculators/running-pace";
import { caloriesMet } from "@/calculators/calories-met";
import { oneRepMax } from "@/calculators/one-rep-max";
import { tempConvert } from "@/calculators/temp-convert";
import { lengthconvert } from "@/calculators/length-convert";
import { massconvert } from "@/calculators/mass-convert";
import { speedconvert } from "@/calculators/speed-convert";
import { pressureconvert } from "@/calculators/pressure-convert";
import { volumeconvert } from "@/calculators/volume-convert";
import { energyconvert } from "@/calculators/energy-convert";
import { angleDegRad } from "@/calculators/angle-deg-rad";
import { ohmsLaw } from "@/calculators/ohms-law";
import { resistorDivider } from "@/calculators/resistor-divider";
import { ledResistor } from "@/calculators/led-resistor";
import { rcCutoff } from "@/calculators/rc-cutoff";
import { capacitorCharge } from "@/calculators/capacitor-charge";
import { batteryRuntime } from "@/calculators/battery-runtime";
import { dateDiff } from "@/calculators/date-diff";
import { epochConverter } from "@/calculators/epoch-converter";

export const CALCULATORS: CalculatorModule[] = [
  basic,
  percentage,
  fractionSimplifier,
  averageStats,
  unitPrice,
  ratioProportion,
  gcdLcm,
  rounding,
  primeCheck,
  areaCircle,
  areaRectangle,
  powerRoot,
  tip,
  salesTax,
  loan,
  mortgage,
  compoundInterest,
  simpleInterest,
  roi,
  marginMarkup,
  aprToApy,
  presentValue,
  futureValue,
  creditCardPayoff,
  breakEven,
  bmi,
  bmrTdee,
  macros,
  heartRateZones,
  waterIntake,
  bodyFatNavy,
  runningPace,
  caloriesMet,
  oneRepMax,
  tempConvert,
  lengthconvert,
  massconvert,
  speedconvert,
  pressureconvert,
  volumeconvert,
  energyconvert,
  angleDegRad,
  ohmsLaw,
  resistorDivider,
  ledResistor,
  rcCutoff,
  capacitorCharge,
  batteryRuntime,
  dateDiff,
  epochConverter
].sort((a,b)=> a.meta.title.localeCompare(b.meta.title));

export function getCalculator(slug: string) {
  return CALCULATORS.find(c => c.meta.slug === slug);
}
