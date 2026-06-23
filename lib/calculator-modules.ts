"use client";

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
import { runningPace } from "@/calculators/running-pace";
import { caloriesMet } from "@/calculators/calories-met";
import { oneRepMax } from "@/calculators/one-rep-max";
import { tempConvert } from "@/calculators/temp-convert";
import { lengthConvert } from "@/calculators/length-convert";
import { massConvert } from "@/calculators/mass-convert";
import { speedConvert } from "@/calculators/speed-convert";
import { pressureConvert } from "@/calculators/pressure-convert";
import { volumeConvert } from "@/calculators/volume-convert";
import { energyConvert } from "@/calculators/energy-convert";
import { angleDegRad } from "@/calculators/angle-deg-rad";
import { ohmsLaw } from "@/calculators/ohms-law";
import { resistorDivider } from "@/calculators/resistor-divider";
import { ledResistor } from "@/calculators/led-resistor";
import { rcCutoff } from "@/calculators/rc-cutoff";
import { capacitorCharge } from "@/calculators/capacitor-charge";
import { batteryRuntime } from "@/calculators/battery-runtime";
import { dateDiff } from "@/calculators/date-diff";
import { epochConverter } from "@/calculators/epoch-converter";

const calculatorModules: Record<string, CalculatorModule> = {
  basic,
  percentage,
  "fraction-simplifier": fractionSimplifier,
  "average-stats": averageStats,
  "unit-price": unitPrice,
  "ratio-proportion": ratioProportion,
  "gcd-lcm": gcdLcm,
  rounding,
  "prime-check": primeCheck,
  "area-circle": areaCircle,
  "area-rectangle": areaRectangle,
  "power-root": powerRoot,
  tip,
  "sales-tax": salesTax,
  loan,
  mortgage,
  "compound-interest": compoundInterest,
  "simple-interest": simpleInterest,
  roi,
  "margin-markup": marginMarkup,
  "apr-to-apy": aprToApy,
  "present-value": presentValue,
  "future-value": futureValue,
  "credit-card-payoff": creditCardPayoff,
  "break-even": breakEven,
  bmi,
  "bmr-tdee": bmrTdee,
  macros,
  "heart-rate-zones": heartRateZones,
  "water-intake": waterIntake,
  "running-pace": runningPace,
  "calories-met": caloriesMet,
  "one-rep-max": oneRepMax,
  "temp-convert": tempConvert,
  "length-convert": lengthConvert,
  "mass-convert": massConvert,
  "speed-convert": speedConvert,
  "pressure-convert": pressureConvert,
  "volume-convert": volumeConvert,
  "energy-convert": energyConvert,
  "angle-deg-rad": angleDegRad,
  "ohms-law": ohmsLaw,
  "resistor-divider": resistorDivider,
  "led-resistor": ledResistor,
  "rc-cutoff": rcCutoff,
  "capacitor-charge": capacitorCharge,
  "battery-runtime": batteryRuntime,
  "date-diff": dateDiff,
  "epoch-converter": epochConverter,
};

export function getCalculatorModule(slug: string): CalculatorModule | undefined {
  return calculatorModules[slug];
}

export function getAllCalculatorSlugs(): string[] {
  return Object.keys(calculatorModules);
}