import { z } from "zod";
import { bmi, whoCategory, BMI_LIMITS } from "../tools/_lib/bmi";
import {
  ACTIVITY_FACTORS,
  bmr, tdee, calorieGoal, navyBodyFat, idealWeightRange,
  type ActivityKey, type GoalKey, type Sex,
} from "../tools/_lib/health";
import { formatDuration, oneRepMax, paceFor, riegelPredict } from "../tools/_lib/pace";

/**
 * FitCalc MCP 工具注册表:把 tools/_lib 的纯函数暴露为 AI 可执行工具。
 * 站上的同名工具在浏览器里跑(交互式),这里跑同一份经过测试的实现——
 * 人和 AI 用同一套逻辑,而不是两套各写各的。
 *
 * YMYL 纪律:所有健康/健身工具的 description 都写明公式来源,
 * 并声明"estimate only, not medical advice";可能非有限的结果
 * 一律先守卫并返回 isError(JSON.stringify 会把 NaN 变 null,客户端无法判别)。
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const round2 = (n: number) => Math.round(n * 100) / 100;

/** 逻辑层错误:合法 schema 但公式算不出有意义结果 */
const bad = (msg: string) => ({ content: [{ type: "text" as const, text: msg }], isError: true as const });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

/** API 友好的活动档位 → health.ts 的 ActivityKey */
const ACTIVITY_MAP: Record<string, ActivityKey> = {
  sedentary: "sedentary",
  lightly_active: "lightlyActive",
  moderately_active: "moderatelyActive",
  very_active: "veryActive",
  extra_active: "extraActive",
};

/** 目标 → health.ts 的 GoalKey(±500 kcal/天) */
const GOAL_MAP: Record<string, GoalKey> = {
  lose: "lose",
  maintain: "maintain",
  gain: "gain",
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "bmi",
    title: "BMI (Body Mass Index)",
    description:
      "BMI from metric weight (kg) and height (cm): weight ÷ height in m², graded by the WHO adult cut-offs (<18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, ≥30 obesity). Also returns the healthy weight band for the height. Screening estimate only — not medical advice. Valid ranges: weight 2–700 kg, height 50–272 cm.",
    schema: {
      weight_kg: z.number().positive().max(700).describe("body weight in kilograms"),
      height_cm: z.number().positive().max(272).describe("height in centimeters"),
    },
    run: (a) => {
      const v = bmi(a.weight_kg, a.height_cm);
      if (!Number.isFinite(v)) return bad("invalid input — weight must be 2–700 kg and height 50–272 cm");
      const band = idealWeightRange(a.height_cm);
      return json({
        bmi: round2(v),
        who_category: whoCategory(v),
        healthy_weight_kg:
          Number.isFinite(band.bmiMin)
            ? { min: round2(band.bmiMin), max: round2(band.bmiMax) }
            : undefined,
      });
    },
  },
  {
    name: "tdee",
    title: "BMR & daily calorie needs (TDEE)",
    description:
      "BMR via the Mifflin-St Jeor equation (1990): 10·kg + 6.25·cm − 5·age, +5 male / −161 female; then TDEE = BMR × activity factor (sedentary 1.2 … extra active 1.9), plus an optional goal adjustment of ∓500 kcal/day. Estimate only — not medical advice. Valid ranges: weight 2–700 kg, height 50–272 cm, age 10–130.",
    schema: {
      weight_kg: z.number().positive().max(700),
      height_cm: z.number().positive().max(272),
      age: z.number().int().min(10).max(130),
      sex: z.enum(["male", "female"]),
      activity: z
        .enum(["sedentary", "lightly_active", "moderately_active", "very_active", "extra_active"])
        .default("moderately_active"),
      goal: z.enum(["lose", "maintain", "gain"]).default("maintain"),
    },
    run: (a) => {
      const b = bmr(a.weight_kg, a.height_cm, a.age, a.sex as Sex);
      if (!Number.isFinite(b)) {
        return bad("invalid input — weight must be 2–700 kg, height 50–272 cm and age 10–130 years");
      }
      const activity = ACTIVITY_MAP[a.activity];
      if (!activity) return bad(`unknown activity: ${a.activity}`);
      const t = tdee(b, activity);
      const goal = GOAL_MAP[a.goal];
      if (!goal) return bad(`unknown goal: ${a.goal}`);
      const target = calorieGoal(t, goal);
      return json({
        bmr_kcal_per_day: Math.round(b),
        bmr_formula: "Mifflin-St Jeor (1990)",
        activity_factor: ACTIVITY_FACTORS[activity],
        tdee_kcal_per_day: Number.isFinite(t) ? Math.round(t) : null,
        goal: a.goal,
        goal_kcal_per_day: Number.isFinite(target) ? Math.round(target) : null,
        note: "Population-average estimate — adjust against real weight change over 2–3 weeks. Not medical advice.",
      });
    },
  },
  {
    name: "body_fat_navy",
    title: "Body fat % (US Navy method)",
    description:
      "Body fat percentage via the US Navy circumference method (Hodgdon & Beckett, 1984), metric cm. Male: girth = waist − neck; female: girth = waist + hip − neck (hip required). Waist must exceed neck for the log term to be defined. Estimate only — tape-measure accuracy, a few percentage points.",
    schema: {
      sex: z.enum(["male", "female"]),
      height_cm: z.number().positive().max(272),
      waist_cm: z.number().positive(),
      neck_cm: z.number().positive(),
      hip_cm: z.number().positive().optional().describe("required for female"),
    },
    run: (a) => {
      if (a.sex === "female" && !(a.hip_cm > 0)) {
        return bad("female body fat requires hip_cm (waist + hip − neck forms the girth term)");
      }
      const v = navyBodyFat(a.sex as Sex, a.height_cm, a.waist_cm, a.neck_cm, a.hip_cm ?? 0);
      if (!Number.isFinite(v)) {
        return bad("invalid input — check that waist exceeds neck (male) or waist + hip exceeds neck (female), and that height is 50–272 cm");
      }
      return text(`${round2(v)} % body fat (US Navy method estimate, not medical advice)`);
    },
  },
  {
    name: "ideal_weight",
    title: "Ideal weight (Devine + healthy BMI band)",
    description:
      "Ideal weight for a height: Devine formula (1975) — 50 kg + 2.3 kg per inch over 5 ft male, 45.5 kg + 2.3 kg female — plus the weight band keeping BMI between the WHO limits 18.5–24.9. Metric cm. Textbook estimates, not a prescription; not medical advice. Valid heights: 120–272 cm.",
    schema: {
      height_cm: z.number().positive().max(272).describe("height in centimeters (120–272)"),
    },
    run: (a) => {
      const r = idealWeightRange(a.height_cm);
      if (!Number.isFinite(r.devineMale)) return bad("invalid input — height must be 120–272 cm");
      return json({
        devine_male_kg: round2(r.devineMale),
        devine_female_kg: round2(r.devineFemale),
        healthy_bmi_band_kg: { min: round2(r.bmiMin), max: round2(r.bmiMax) },
      });
    },
  },
  {
    name: "one_rep_max",
    title: "One-rep max (Epley & Brzycki)",
    description:
      "Estimated 1RM from a submaximal set: Epley w × (1 + reps/30) and Brzycki w × 36/(37 − reps). Weight in any unit, result in the same unit. Valid reps: whole numbers 1–20; estimates are most reliable at 3–8 reps. Training-planning estimate only — attempting a true max carry injury risk.",
    schema: {
      weight: z.number().positive().describe("weight lifted, kg or lb (result uses the same unit)"),
      reps: z.number().int().min(1).max(20).describe("clean repetitions completed (1–20)"),
    },
    run: (a) => {
      const r = oneRepMax(a.weight, a.reps);
      if (!Number.isFinite(r.epley)) {
        return bad("invalid input — weight must be above zero and reps a whole number from 1 to 20");
      }
      return json({
        epley: round2(r.epley),
        brzycki: round2(r.brzycki),
        unit_note: "same unit as the weight argument",
      });
    },
  },
  {
    name: "running_pace",
    title: "Running pace & race prediction",
    description:
      "Pace (per km and per mile) and speed from a distance and finish time; distance is '5k', '10k', 'half', 'marathon' or a custom number of km. time_seconds: e.g. 1500 for 25:00. Also returns Riegel (1977) predicted times, which are statistical estimates that assume specific training for the target distance — not coaching or medical advice.",
    schema: {
      distance: z.union([z.enum(["5k", "10k", "half", "marathon"]), z.number().positive().describe("custom distance in km")]),
      time_seconds: z.number().positive(),
    },
    run: (a) => {
      const km = a.distance === "5k" ? 5 : a.distance === "10k" ? 10 : a.distance === "half" ? 21.0975 : a.distance === "marathon" ? 42.195 : a.distance;
      const p = paceFor(km, a.time_seconds);
      if (!Number.isFinite(p.secPerKm)) return bad("invalid input — distance must be positive and time above 0 seconds");
      const predict = (d: number) => formatDuration(riegelPredict(a.time_seconds, km, d));
      return json({
        distance_km: km,
        time: formatDuration(a.time_seconds),
        pace_per_km: formatDuration(p.secPerKm),
        pace_per_mile: formatDuration(p.secPerMi),
        speed_kmh: round2(p.kmh),
        speed_mph: round2(p.mph),
        riegel_prediction: {
          "5k": predict(5),
          "10k": predict(10),
          half_marathon: predict(21.0975),
          marathon: predict(42.195),
          formula: "T2 = T1 × (D2/D1)^1.06 (Riegel, 1977)",
        },
      });
    },
  },
];
