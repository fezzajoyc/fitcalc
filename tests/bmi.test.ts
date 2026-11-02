import { describe, expect, it } from "vitest";
import { WHO_CATEGORIES, WHO_CUTOFFS, bmi, whoCategory } from "@/tools/_lib/bmi";
import { CM_PER_INCH, KG_PER_LB, cmFromFtIn, kgFromLb } from "@/tools/_lib/health";

/**
 * BMI 纯逻辑的手算向量与 WHO 界值边界。
 * 参考:WHO Adult BMI classification;<18.5 / 18.5–24.9 / 25–29.9 / ≥30。
 */

const relDiff = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b);

describe("bmi: hand-computed vectors", () => {
  it("70 kg / 175 cm = 22.857… (weight over meters squared)", () => {
    expect(bmi(70, 175)).toBeCloseTo(22.8571428571, 9);
    expect(bmi(70, 175)).toBeCloseTo(70 / 1.75 ** 2, 12);
  });

  it("agrees with the independent implementation across a spread of bodies", () => {
    const cases: Array<[number, number]> = [
      [50, 155], [65, 165], [80, 180], [95, 190], [110, 200], [45, 150],
    ];
    for (const [w, h] of cases) {
      expect(bmi(w, h)).toBeCloseTo(w / (h / 100) ** 2, 12);
    }
  });

  it("scales as documented: doubling weight doubles BMI; BMI falls with the square of height", () => {
    expect(bmi(140, 175)).toBeCloseTo(2 * bmi(70, 175), 12);
    expect(bmi(70, 140)).toBeCloseTo(70 / 1.4 ** 2, 12); // 35.714…
    expect(bmi(70, 140)).toBeCloseTo(bmi(70, 175) * (175 / 140) ** 2, 12);
  });

  it("the healthy-weight band for 175 cm reproduces BMI 18.5 and 24.9 exactly", () => {
    // 与 idealWeightRange(health.ts)的 bmiMin/bmiMax 互相印证
    const min = 18.5 * 1.75 ** 2; // 56.65625
    const max = 24.9 * 1.75 ** 2; // 76.25625
    expect(bmi(min, 175)).toBeCloseTo(18.5, 9);
    expect(bmi(max, 175)).toBeCloseTo(24.9, 9);
  });
});

describe("bmi: imperial parity (same person, both systems)", () => {
  it("5 ft 9 in / 154 lb equals its metric equivalent (69.85 kg / 175.26 cm)", () => {
    const metric = bmi(kgFromLb(154), cmFromFtIn(5, 9));
    const direct = bmi(154 * KG_PER_LB, 69 * CM_PER_INCH);
    expect(metric).toBeCloseTo(direct, 12);
    expect(relDiff(metric, bmi(69.853, 175.26))).toBeLessThan(0.001);
  });

  it("6 ft / 200 lb lands in the overweight band just like its metric twin", () => {
    const v = bmi(kgFromLb(200), cmFromFtIn(6, 0));
    expect(v).toBeCloseTo(200 * KG_PER_LB / (1.8288 ** 2), 9);
    expect(whoCategory(v)).toBe("overweight");
  });
});

describe("whoCategory: WHO boundaries are exact (left-closed intervals)", () => {
  it("uses the documented cut-offs 18.5 / 25 / 30", () => {
    expect(WHO_CUTOFFS).toEqual({ underweightBelow: 18.5, overweightFrom: 25, obeseFrom: 30 });
    expect(WHO_CATEGORIES).toEqual(["underweight", "normal", "overweight", "obese"]);
  });

  it("exactly 18.5 is normal (not underweight)", () => {
    expect(whoCategory(18.5)).toBe("normal");
    expect(whoCategory(18.49)).toBe("underweight");
  });

  it("exactly 25 is overweight (not normal)", () => {
    expect(whoCategory(25)).toBe("overweight");
    expect(whoCategory(24.9)).toBe("normal");
  });

  it("exactly 30 is obese (not overweight)", () => {
    expect(whoCategory(30)).toBe("obese");
    expect(whoCategory(29.9)).toBe("overweight");
  });

  it("maps every grade end to end: 15 → underweight, 22 → normal, 27 → overweight, 40 → obese", () => {
    expect(whoCategory(15)).toBe("underweight");
    expect(whoCategory(22)).toBe("normal");
    expect(whoCategory(27)).toBe("overweight");
    expect(whoCategory(40)).toBe("obese");
  });

  it("round-trips: the weight that produces a boundary BMI classifies on the higher side", () => {
    // 175 cm 的人吃胖到 BMI 恰好 30 →肥胖档,而不是超重档
    const w = 30 * 1.75 ** 2;
    expect(whoCategory(bmi(w, 175))).toBe("obese");
  });

  it("non-finite BMI (unfinished input) → null, never a throw", () => {
    expect(whoCategory(NaN)).toBeNull();
    expect(whoCategory(Infinity)).toBeNull();
    expect(() => whoCategory(NaN)).not.toThrow();
  });
});

describe("bmi: invalid inputs return NaN (documented physiological limits)", () => {
  it("accepts the full documented ranges 2–700 kg and 50–272 cm", () => {
    expect(Number.isFinite(bmi(2, 50))).toBe(true);
    expect(Number.isFinite(bmi(700, 272))).toBe(true);
  });

  it("rejects weights and heights just outside the ranges", () => {
    expect(bmi(1.9, 175)).toBeNaN();
    expect(bmi(700.5, 175)).toBeNaN();
    expect(bmi(70, 49.9)).toBeNaN();
    expect(bmi(70, 272.5)).toBeNaN();
  });

  it("zero, negative and non-finite inputs → NaN, never a throw", () => {
    for (const [w, h] of [[0, 175], [-70, 175], [70, 0], [70, -175], [NaN, 175], [70, NaN], [Infinity, 175], [70, Infinity]] as const) {
      expect(bmi(w, h)).toBeNaN();
    }
    expect(() => bmi(NaN, NaN)).not.toThrow();
  });

  it("whoCategory stays null for anything bmi refuses", () => {
    expect(whoCategory(bmi(0, 175))).toBeNull();
    expect(whoCategory(bmi(70, -175))).toBeNull();
  });
});
