import bmiCalculator from "./bmi-calculator";
import calorieCalculator from "./calorie-calculator";
import bodyFatCalculator from "./body-fat-calculator";
import idealWeightCalculator from "./ideal-weight-calculator";
import oneRepMaxCalculator from "./one-rep-max-calculator";
import paceCalculator from "./pace-calculator";

/** FitCalc 全部工具:注册表、sitemap、分类页、内链全部从这里派生 */
export const FITCALC_TOOLS = [
  bmiCalculator,
  calorieCalculator,
  bodyFatCalculator,
  idealWeightCalculator,
  oneRepMaxCalculator,
  paceCalculator,
];
