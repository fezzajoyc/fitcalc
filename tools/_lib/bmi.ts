/**
 * BMI(体重指数)纯逻辑:WHO 分级与 kg/cm 核心计算。
 * 公式与来源:BMI = 体重(kg) ÷ 身高(m)²;分级采用 WHO Adult BMI
 * cutoffs(BMI classification, 1995/2004 沿用):<18.5 偏瘦、18.5–24.9
 * 正常、25–29.9 超重、≥30 肥胖。同一界值适用于成年男女。
 * 非法输入(非有限数、超出生理范围)一律返回 NaN / null,不抛异常。
 * 身高体重范围与 health.ts 保持一致(50–272 cm、2–700 kg)。
 * BMI 是筛查指标不是诊断:分不清肌肉和脂肪,运动员会偏高。
 */

/** 与 tools/_lib/health.ts 同一套生理范围,保证跨工具一致 */
export const BMI_LIMITS = {
  minHeightCm: 50,
  maxHeightCm: 272,
  minWeightKg: 2,
  maxWeightKg: 700,
} as const;

/** 身高体重合法才计算;否则 NaN(引擎据此显示空态,而不是假结果) */
export function bmi(weightKg: number, heightCm: number): number {
  const hOk =
    Number.isFinite(heightCm) && heightCm >= BMI_LIMITS.minHeightCm && heightCm <= BMI_LIMITS.maxHeightCm;
  const wOk =
    Number.isFinite(weightKg) && weightKg >= BMI_LIMITS.minWeightKg && weightKg <= BMI_LIMITS.maxWeightKg;
  if (!hOk || !wOk) return NaN;
  return weightKg / (heightCm / 100) ** 2;
}

export type WhoCategory = "underweight" | "normal" | "overweight" | "obese";

/** WHO 分级界值:区间左闭右开,恰好 18.5/25/30 落入更高一档 */
export const WHO_CUTOFFS = { underweightBelow: 18.5, overweightFrom: 25, obeseFrom: 30 } as const;

/** 非有限 BMI(输入未填好)→ null;其余按 WHO 界值分档 */
export function whoCategory(bmiValue: number): WhoCategory | null {
  if (!Number.isFinite(bmiValue)) return null;
  if (bmiValue < WHO_CUTOFFS.underweightBelow) return "underweight";
  if (bmiValue < WHO_CUTOFFS.overweightFrom) return "normal";
  if (bmiValue < WHO_CUTOFFS.obeseFrom) return "overweight";
  return "obese";
}

/** WHO 四档的稳定 id 顺序,引擎/测试共用 */
export const WHO_CATEGORIES: WhoCategory[] = ["underweight", "normal", "overweight", "obese"];
