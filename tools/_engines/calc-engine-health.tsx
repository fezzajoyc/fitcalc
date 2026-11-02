"use client";
import { parseLocaleNumber } from "../_lib/numparse";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, Tabs, fmt, pick } from "./calc-ui";
import { bmi, whoCategory, type WhoCategory } from "../_lib/bmi";
import {
  ACTIVITY_FACTORS,
  cmFromFtIn,
  idealWeightRange,
  kgFromLb,
  bmr,
  calorieGoal,
  navyBodyFat,
  tdee,
  CM_PER_INCH,
  KG_PER_LB,
  type ActivityKey,
  type GoalKey,
  type Sex,
} from "../_lib/health";

/**
 * FitCalc 健康计算器共用引擎:bmi / calorie / bodyfat / idealweight
 * 四个 kind 各渲染一个子表单。全部数学在 tools/_lib/bmi.ts 与
 * tools/_lib/health.ts(均有测试);本文件只做输入、格式化与排版。
 * 引擎内 UI 字符串只写核心 5 语,pick() 对其余语言回退英文。
 */

function num(s: string): number {
  const n = parseLocaleNumber(s);
  return Number.isFinite(n) ? n : NaN;
}

const L = {
  metric: { en: "Metric (cm, kg)", zh: "公制 (cm, kg)", ja: "メートル法 (cm, kg)", es: "Métrico (cm, kg)", pt: "Métrico (cm, kg)" },
  imperial: { en: "Imperial (ft, in, lb)", zh: "英制 (英尺/英寸/磅)", ja: "ヤード・ポンド法 (ft, in, lb)", es: "Imperial (ft, in, lb)", pt: "Imperial (ft, in, lb)" },
  male: { en: "Male", zh: "男", ja: "男性", es: "Hombre", pt: "Homem" },
  female: { en: "Female", zh: "女", ja: "女性", es: "Mujer", pt: "Mulher" },
  sex: { en: "Sex", zh: "性别", ja: "性別", es: "Sexo", pt: "Sexo" },
  heightCm: { en: "Height (cm)", zh: "身高 (cm)", ja: "身長 (cm)", es: "Altura (cm)", pt: "Altura (cm)" },
  weightKg: { en: "Weight (kg)", zh: "体重 (kg)", ja: "体重 (kg)", es: "Peso (kg)", pt: "Peso (kg)" },
  heightFt: { en: "Height (feet)", zh: "身高(英尺)", ja: "身長 (フィート)", es: "Altura (pies)", pt: "Altura (pés)" },
  heightIn: { en: "Height (inches)", zh: "身高(英寸)", ja: "身長 (インチ)", es: "Altura (pulgadas)", pt: "Altura (polegadas)" },
  weightLb: { en: "Weight (lb)", zh: "体重 (lb)", ja: "体重 (lb)", es: "Peso (lb)", pt: "Peso (lb)" },
  age: { en: "Age (years)", zh: "年龄(岁)", ja: "年齢(歳)", es: "Edad (años)", pt: "Idade (anos)" },
  waist: { en: "Waist", zh: "腰围", ja: "腹囲", es: "Cintura", pt: "Cintura" },
  neck: { en: "Neck", zh: "颈围", ja: "首囲", es: "Cuello", pt: "Pescoço" },
  hip: { en: "Hip", zh: "臀围", ja: "臀囲", es: "Cadera", pt: "Quadril" },
};

const WHO_LABELS: Record<WhoCategory, Record<string, string>> = {
  underweight: { en: "Underweight", zh: "偏瘦", ja: "低体重", es: "Bajo peso", pt: "Abaixo do peso" },
  normal: { en: "Normal weight", zh: "正常", ja: "普通体重", es: "Peso normal", pt: "Peso normal" },
  overweight: { en: "Overweight", zh: "超重", ja: "過体重", es: "Sobrepeso", pt: "Sobrepeso" },
  obese: { en: "Obesity", zh: "肥胖", ja: "肥満", es: "Obesidad", pt: "Obesidade" },
};

function UnitTabs({ value, onChange, locale }: { value: string; onChange: (id: string) => void; locale: ReturnType<typeof useI18n>["locale"] }) {
  return (
    <Tabs
      options={[
        { id: "metric", label: pick(locale, L.metric) },
        { id: "imperial", label: pick(locale, L.imperial) },
      ]}
      value={value}
      onChange={onChange}
    />
  );
}

function SexTabs({ value, onChange, locale }: { value: Sex; onChange: (id: Sex) => void; locale: ReturnType<typeof useI18n>["locale"] }) {
  return (
    <div className="mb-4">
      <Tabs
        options={[
          { id: "male", label: pick(locale, L.male) },
          { id: "female", label: pick(locale, L.female) },
        ]}
        value={value}
        onChange={(id) => onChange(id as Sex)}
      />
    </div>
  );
}

/* ---------------- BMI ---------------- */

function Bmi() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("70");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("154");

  const isMetric = units === "metric";
  const h = isMetric ? num(cm) : cmFromFtIn(num(ft), num(inch));
  const w = isMetric ? num(kg) : kgFromLb(num(lb));
  const v = bmi(w, h);
  const cat = whoCategory(v);
  const band = idealWeightRange(h);
  const kgOut = (kgValue: number) => (isMetric ? `${fmt(kgValue, locale, 1)} kg` : `${fmt(kgValue / KG_PER_LB, locale, 1)} lb`);

  const catTone = cat === "normal" ? ("good" as const) : cat === "obese" ? ("bad" as const) : ("accent" as const);

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2">
        {isMetric ? (
          <>
            <Field label={pick(locale, L.heightCm)}>
              <NumIn value={cm} onChange={setCm} aria="height in centimeters" />
            </Field>
            <Field label={pick(locale, L.weightKg)}>
              <NumIn value={kg} onChange={setKg} aria="weight in kilograms" />
            </Field>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label={pick(locale, L.heightFt)}>
                <NumIn value={ft} onChange={setFt} aria="height in feet" />
              </Field>
              <Field label={pick(locale, L.heightIn)}>
                <NumIn value={inch} onChange={setInch} aria="height in inches" />
              </Field>
            </div>
            <Field label={pick(locale, L.weightLb)}>
              <NumIn value={lb} onChange={setLb} aria="weight in pounds" />
            </Field>
          </>
        )}
      </div>

      <div className="mt-5">
        <Stats
          items={[
            { label: "BMI", value: fmt(v, locale, 1), tone: "accent" },
            {
              label: pick(locale, {
                en: "WHO category", zh: "WHO 分级", ja: "WHO 区分", es: "Categoría OMS", pt: "Categoria OMS",
              }),
              value: cat ? pick(locale, WHO_LABELS[cat]) : "—",
              tone: catTone,
            },
            {
              label: pick(locale, {
                en: "Healthy weight for this height (BMI 18.5–24.9)",
                zh: "该身高的健康体重区间(BMI 18.5–24.9)",
                ja: "この身長の健康体重(BMI 18.5〜24.9)",
                es: "Peso saludable para esta altura (IMC 18,5–24,9)",
                pt: "Peso saudável para esta altura (IMC 18,5–24,9)",
              }),
              value: Number.isFinite(band.bmiMin) ? `${kgOut(band.bmiMin)} – ${kgOut(band.bmiMax)}` : "—",
            },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "BMI = weight (kg) ÷ height (m)², graded by the WHO adult cut-offs: below 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30 and above obesity. Imperial input is converted to kilograms and centimeters first, so both unit systems give the same number.",
            zh: "BMI = 体重(kg)÷ 身高(m)²,按 WHO 成人界值分级:低于 18.5 偏瘦,18.5–24.9 正常,25–29.9 超重,30 及以上肥胖。英制输入会先换算成千克和厘米,两种单位结果一致。",
            ja: "BMI = 体重(kg)÷ 身長(m)²。WHO の成人区分(18.5 未満が低体重、18.5〜24.9 が普通、25〜29.9 が過体重、30 以上が肥満)で判定します。ヤード・ポンド法の入力は kg と cm に換算するため、結果は同じになります。",
            es: "IMC = peso (kg) ÷ altura (m)², clasificado con los puntos de corte adultos de la OMS: menos de 18,5 bajo peso, 18,5–24,9 normal, 25–29,9 sobrepeso y 30 o más obesidad. Las unidades imperiales se convierten primero a kilos y centímetros: el número es idéntico.",
            pt: "IMC = peso (kg) ÷ altura (m)², classificado pelos cortes adultos da OMS: abaixo de 18,5 abaixo do peso, 18,5–24,9 normal, 25–29,9 sobrepeso e 30 ou mais obesidade. Unidades imperiais são convertidas para quilos e centímetros antes do cálculo: o número é o mesmo.",
          })}
        </Note>
      </div>
      <div className="mt-2">
        <Note>
          {pick(locale, {
            en: "BMI screens weight status for adults; it cannot tell muscle from fat, so muscular athletes often land in the overweight band despite low body fat. It is a rough estimate, not a medical assessment.",
            zh: "BMI 是成人筛查指标,分不清肌肉与脂肪:肌肉发达的运动员即使体脂不高也可能落在超重档。它只是粗略估算,不构成医学评估。",
            ja: "BMI は成人向けのスクリーニング指標で、筋肉と脂肪は区別できません。筋肉質な人は体脂肪が少なくても過体重に分類されがちです。あくまで概算であり、医学的な評価ではありません。",
            es: "El IMC es un cribado para adultos; no distingue músculo de grasa, así que deportistas musculosos suelen caer en la franja de sobrepeso con poca grasa. Es una estimación orientativa, no una evaluación médica.",
            pt: "O IMC é uma triagem para adultos; ele não distingue músculo de gordura, então atletas musculosos frequentemente caem na faixa de sobrepeso com pouca gordura. É uma estimativa aproximada, não uma avaliação médica.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Calorie (TDEE + goals) ---------------- */

const ACTIVITY_LABELS: Record<ActivityKey, Record<string, string>> = {
  sedentary: {
    en: "Sedentary — desk job, little exercise",
    zh: "久坐 — 办公室工作,几乎不运动",
    ja: "座位中心 — デスクワークで運動ほぼなし",
    es: "Sedentario — trabajo de oficina, poco ejercicio",
    pt: "Sedentário — trabalho de escritório, pouco exercício",
  },
  lightlyActive: {
    en: "Lightly active — 1–3 workouts a week",
    zh: "轻度活动 — 每周 1–3 练",
    ja: "軽い活動 — 週 1〜3 回の運動",
    es: "Ligeramente activo — 1–3 entrenamientos por semana",
    pt: "Levemente ativo — 1–3 treinos por semana",
  },
  moderatelyActive: {
    en: "Moderately active — 3–5 workouts a week",
    zh: "中度活动 — 每周 3–5 练",
    ja: "中程度の活動 — 週 3〜5 回の運動",
    es: "Moderadamente activo — 3–5 entrenamientos por semana",
    pt: "Moderadamente ativo — 3–5 treinos por semana",
  },
  veryActive: {
    en: "Very active — 6–7 workouts a week",
    zh: "高强度活动 — 每周 6–7 练",
    ja: "高強度の活動 — 週 6〜7 回の運動",
    es: "Muy activo — 6–7 entrenamientos por semana",
    pt: "Muito ativo — 6–7 treinos por semana",
  },
  extraActive: {
    en: "Athlete — twice-daily training or physical job",
    zh: "运动员级 — 一天两练或体力劳动",
    ja: "アスリート — 1日2回の練習または肉体労働",
    es: "Atleta — doble sesión diaria o trabajo físico",
    pt: "Atleta — treino duas vezes ao dia ou trabalho físico",
  },
};

const ACTIVITY_ORDER: ActivityKey[] = ["sedentary", "lightlyActive", "moderatelyActive", "veryActive", "extraActive"];

const GOAL_LABELS: Record<GoalKey, Record<string, string>> = {
  lose: {
    en: "Lose fat (−500 kcal)",
    zh: "减脂(−500 千卡)",
    ja: "減量(−500 kcal)",
    es: "Perder grasa (−500 kcal)",
    pt: "Perder gordura (−500 kcal)",
  },
  maintain: {
    en: "Maintain weight",
    zh: "维持体重",
    ja: "体重維持",
    es: "Mantener peso",
    pt: "Manter peso",
  },
  gain: {
    en: "Build muscle (+500 kcal)",
    zh: "增肌(+500 千卡)",
    ja: "筋肥大(+500 kcal)",
    es: "Ganar músculo (+500 kcal)",
    pt: "Ganhar músculo (+500 kcal)",
  },
};

function Calorie() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("75");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("165");
  const [age, setAge] = useState("30");
  const [activity, setActivity] = useState<ActivityKey>("moderatelyActive");
  const [goal, setGoal] = useState<GoalKey>("maintain");

  const isMetric = units === "metric";
  const w = isMetric ? num(kg) : kgFromLb(num(lb));
  const h = isMetric ? num(cm) : cmFromFtIn(num(ft), num(inch));
  const b = bmr(w, h, num(age), sex);
  const t = tdee(b, activity);
  const target = calorieGoal(t, goal);
  const kcal = (n: number) => (Number.isFinite(n) ? `${fmt(n, locale, 0)} kcal` : "—");

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <SexTabs value={sex} onChange={setSex} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-3">
        {isMetric ? (
          <>
            <Field label={pick(locale, L.heightCm)}>
              <NumIn value={cm} onChange={setCm} aria="height in centimeters" />
            </Field>
            <Field label={pick(locale, L.weightKg)}>
              <NumIn value={kg} onChange={setKg} aria="weight in kilograms" />
            </Field>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label={pick(locale, L.heightFt)}>
                <NumIn value={ft} onChange={setFt} aria="height in feet" />
              </Field>
              <Field label={pick(locale, L.heightIn)}>
                <NumIn value={inch} onChange={setInch} aria="height in inches" />
              </Field>
            </div>
            <Field label={pick(locale, L.weightLb)}>
              <NumIn value={lb} onChange={setLb} aria="weight in pounds" />
            </Field>
          </>
        )}
        <Field label={pick(locale, L.age)}>
          <NumIn value={age} onChange={setAge} aria="age in years" />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, { en: "Activity level", zh: "活动水平", ja: "活動レベル", es: "Nivel de actividad", pt: "Nível de atividade" })}>
          <Sel value={activity} onChange={(v) => setActivity(v as ActivityKey)} aria="activity level">
            {ACTIVITY_ORDER.map((key) => (
              <option key={key} value={key}>
                {pick(locale, ACTIVITY_LABELS[key])} (×{ACTIVITY_FACTORS[key]})
              </option>
            ))}
          </Sel>
        </Field>
        <Field label={pick(locale, { en: "Goal", zh: "目标", ja: "目標", es: "Objetivo", pt: "Objetivo" })}>
          <Sel value={goal} onChange={(v) => setGoal(v as GoalKey)} aria="calorie goal">
            {(["lose", "maintain", "gain"] as GoalKey[]).map((key) => (
              <option key={key} value={key}>
                {pick(locale, GOAL_LABELS[key])}
              </option>
            ))}
          </Sel>
        </Field>
      </div>

      <div className="mt-5">
        <Stats
          items={[
            {
              label: pick(locale, { en: "BMR — at rest", zh: "基础代谢 — 静息", ja: "基礎代謝 — 安静時", es: "TMB — en reposo", pt: "TMB — em repouso" }),
              value: kcal(b),
            },
            {
              label: pick(locale, { en: "Maintenance (TDEE)", zh: "维持热量(TDEE)", ja: "維持カロリー(TDEE)", es: "Mantenimiento (TDEE)", pt: "Manutenção (TDEE)" }),
              value: kcal(t),
            },
            {
              label: pick(locale, { en: "Goal calories", zh: "目标热量", ja: "目標カロリー", es: "Calorías objetivo", pt: "Calorias da meta" }),
              value: kcal(target),
              tone: "accent",
            },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "BMR comes from the Mifflin–St Jeor equation (1990): 10 × kg + 6.25 × cm − 5 × age, +5 for men and −161 for women. Maintenance multiplies BMR by an activity factor from 1.2 (sedentary) to 1.9 (athlete). The goal step shifts maintenance by ±500 kcal/day, the usual heuristic for roughly ±0.5 kg per week.",
            zh: "基础代谢用 Mifflin–St Jeor 公式(1990):10 × 体重(kg)+ 6.25 × 身高(cm)− 5 × 年龄,男性 + 5,女性 − 161。维持热量 = 基础代谢 × 活动系数(久坐 1.2 到运动员 1.9)。目标在维持热量上 ±500 千卡/天,对应大约每周 ±0.5 公斤的经验值。",
            ja: "基礎代謝は Mifflin–St Jeor 式(1990):10 × 体重 + 6.25 × 身長 − 5 × 年齢、男性は +5、女性は −161。維持カロリーは基礎代謝に活動係数(座位 1.2 〜アスリート 1.9)を掛けた値です。目標は維持カロリーに ±500 kcal/日 加減したもので、週およそ ±0.5 kg の目安に対応します。",
            es: "La TMB usa la ecuación de Mifflin–St Jeor (1990): 10 × kg + 6,25 × cm − 5 × edad, +5 para hombres y −161 para mujeres. El mantenimiento multiplica la TMB por un factor de actividad de 1,2 (sedentario) a 1,9 (atleta). El objetivo ajusta el mantenimiento ±500 kcal/día, la heurística habitual para unas ±0,5 kg por semana.",
            pt: "A TMB usa a equação de Mifflin–St Jeor (1990): 10 × kg + 6,25 × cm − 5 × idade, +5 para homens e −161 para mulheres. A manutenção multiplica a TMB por um fator de atividade de 1,2 (sedentário) a 1,9 (atleta). A meta ajusta a manutenção em ±500 kcal/dia, a heurística usual para cerca de ±0,5 kg por semana.",
          })}
        </Note>
      </div>
      <div className="mt-2">
        <Note>
          {pick(locale, {
            en: "These are population-average estimates — real needs vary with genetics, training history and health conditions. Use them as a starting point and adjust against how your weight actually responds over 2–3 weeks.",
            zh: "以上均为人群平均估算——真实需求因基因、训练史和健康状况而异。请把它当起点,按 2–3 周内体重的实际变化来微调。",
            ja: "これらは集団平均の推定値です。実際の必要量は遺伝・トレーニング歴・健康状態で変わります。出発点として使い、2〜3 週間の体重変化を見ながら調整してください。",
            es: "Son estimaciones de promedio poblacional: las necesidades reales varían con la genética, el historial de entrenamiento y la salud. Úselas como punto de partida y ajústelas según responda su peso en 2–3 semanas.",
            pt: "São estimativas de média populacional — necessidades reais variam com genética, histórico de treino e saúde. Use como ponto de partida e ajuste conforme seu peso responder ao longo de 2–3 semanas.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Body fat (US Navy) ---------------- */

function BodyFat() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [cm, setCm] = useState("178");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("10");
  const [waistM, setWaistM] = useState("86");
  const [neckM, setNeckM] = useState("38");
  const [hipM, setHipM] = useState("95");
  const [waistI, setWaistI] = useState("34");
  const [neckI, setNeckI] = useState("15");
  const [hipI, setHipI] = useState("37");

  const isMetric = units === "metric";
  const h = isMetric ? num(cm) : cmFromFtIn(num(ft), num(inch));
  const waist = isMetric ? num(waistM) : num(waistI) * CM_PER_INCH;
  const neck = isMetric ? num(neckM) : num(neckI) * CM_PER_INCH;
  const hip = isMetric ? num(hipM) : num(hipI) * CM_PER_INCH;
  const bf = navyBodyFat(sex, h, waist, neck, hip);
  const girthBad =
    Number.isFinite(waist) &&
    Number.isFinite(neck) &&
    (sex === "male" ? waist <= neck : !(waist + hip - neck > 0));
  const cmLabel = (rec: Record<string, string>) => pick(locale, isMetric ? rec : { ...rec, en: `${rec.en} (in)` });

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <SexTabs value={sex} onChange={setSex} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2">
        {isMetric ? (
          <Field label={pick(locale, L.heightCm)}>
            <NumIn value={cm} onChange={setCm} aria="height in centimeters" />
          </Field>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Field label={pick(locale, L.heightFt)}>
              <NumIn value={ft} onChange={setFt} aria="height in feet" />
            </Field>
            <Field label={pick(locale, L.heightIn)}>
              <NumIn value={inch} onChange={setInch} aria="height in inches" />
            </Field>
          </div>
        )}
        <Field label={cmLabel(L.neck)}>
          <NumIn value={isMetric ? neckM : neckI} onChange={isMetric ? setNeckM : setNeckI} aria="neck circumference" />
        </Field>
        <Field label={cmLabel(L.waist)}>
          <NumIn value={isMetric ? waistM : waistI} onChange={isMetric ? setWaistM : setWaistI} aria="waist circumference" />
        </Field>
        {sex === "female" && (
          <Field label={cmLabel(L.hip)}>
            <NumIn value={isMetric ? hipM : hipI} onChange={isMetric ? setHipM : setHipI} aria="hip circumference" />
          </Field>
        )}
      </div>

      <div className="mt-5">
        <Stats
          items={[
            {
              label: pick(locale, { en: "Body fat (estimated)", zh: "体脂率(估算)", ja: "体脂肪率(推定)", es: "Grasa corporal (estimada)", pt: "Gordura corporal (estimada)" }),
              value: Number.isFinite(bf) ? `${fmt(bf, locale, 1)} %` : "—",
              tone: "accent",
            },
          ]}
          cols="sm:grid-cols-1"
        />
      </div>

      {girthBad && (
        <div className="mt-4">
          <Note>
            {pick(locale, {
              en: "For the formula to apply, a man's waist must measure more than his neck, and a woman's waist + hip must exceed her neck. Re-check where you placed the tape.",
              zh: "公式要求男性腰围大于颈围,女性腰围 + 臀围大于颈围——请重新核对软尺位置。",
              ja: "この式では、男性は腹囲が首囲より大きく、女性は腹囲 + 臀囲が首囲より大きくなければなりません。テープの位置を確認してください。",
              es: "Para que la fórmula aplique, la cintura del hombre debe superar su cuello, y en la mujer cintura + cadera deben superar el cuello. Revise la posición de la cinta.",
              pt: "Para a fórmula valer, a cintura do homem deve ser maior que o pescoço, e na mulher cintura + quadril devem superar o pescoço. Confira a posição da fita.",
            })}
          </Note>
        </div>
      )}

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "US Navy circumference method (Hodgdon & Beckett, 1984). Men: 495 ÷ (1.0324 − 0.19077·log10(waist − neck) + 0.15456·log10(height)) − 450. Women add the hip to the girth term and use the female coefficients. Measure the neck below the larynx, the waist at the navel (men) or narrowest point (women), the hip at its fullest. Tape snug, not compressing the skin.",
            zh: "美国海军围度法(Hodgdon & Beckett,1984)。男性:495 ÷ (1.0324 − 0.19077·log10(腰围 − 颈围) + 0.15456·log10(身高)) − 450;女性把臀围计入围度项并使用女性系数。颈围在喉结下方量,腰围男性量肚脐水平、女性量最细处,臀围量最丰满处。软尺贴身但不勒皮肤。",
            ja: "米海軍の囲度法(Hodgdon & Beckett、1984)。男性:495 ÷ (1.0324 − 0.19077·log10(腹囲 − 首囲) + 0.15456·log10(身長)) − 450。女性は囲の項に臀囲を加え、女性用係数を使います。首囲は喉仏の下、腹囲は男性はへそ・女性は最も細い部分、臀囲は最も出た部分を測定。テープは肌を押し込まない程度に。",
            es: "Método de circunferencias de la Marina de EE. UU. (Hodgdon y Beckett, 1984). Hombres: 495 ÷ (1,0324 − 0,19077·log10(cintura − cuello) + 0,15456·log10(altura)) − 450. Las mujeres suman la cadera al término de circunferencias y usan los coeficientes femeninos. Mida el cuello bajo la laringe, la cintura al ombligo (hombres) o en el punto más estrecho (mujeres) y la cadera en su parte más ancha, con la cinta ajustada sin comprimir.",
            pt: "Método de circunferências da Marinha dos EUA (Hodgdon & Beckett, 1984). Homens: 495 ÷ (1,0324 − 0,19077·log10(cintura − pescoço) + 0,15456·log10(altura)) − 450. As mulheres somam o quadril ao termo de circunferências e usam os coeficientes femininos. Meça o pescoço abaixo da laringe, a cintura no umbigo (homens) ou no ponto mais estreito (mulheres) e o quadril no ponto mais largo, com a fita encostada sem comprimir.",
          })}
        </Note>
      </div>
      <div className="mt-2">
        <Note>
          {pick(locale, {
            en: "This is a tape-measure estimate, not a lab measurement — expect a few points of error and treat the trend, not the single reading, as the signal.",
            zh: "这是软尺估算而非实验室测量——误差可能有几个百分点,请关注趋势而不是单次数值。",
            ja: "これはメジャーによる推定であり、実測ではありません。誤差は数ポイントあり得るため、単発の数値より推移を見てください。",
            es: "Es una estimación con cinta métrica, no una medición de laboratorio: espere varios puntos de error y obsérvese la tendencia, no la lectura aislada.",
            pt: "É uma estimativa com fita métrica, não uma medição de laboratório — espere alguns pontos de erro e acompanhe a tendência, não uma leitura isolada.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

/* ---------------- Ideal weight ---------------- */

function IdealWeight() {
  const { locale } = useI18n();
  const [units, setUnits] = useState("metric");
  const [cm, setCm] = useState("170");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("7");

  const isMetric = units === "metric";
  const r = idealWeightRange(isMetric ? num(cm) : cmFromFtIn(num(ft), num(inch)));
  const wOut = (kgValue: number) => (isMetric ? `${fmt(kgValue, locale, 1)} kg` : `${fmt(kgValue / KG_PER_LB, locale, 1)} lb`);

  return (
    <ToolPanel>
      <UnitTabs value={units} onChange={setUnits} locale={locale} />
      <div className="grid gap-4 sm:grid-cols-2">
        {isMetric ? (
          <Field label={pick(locale, L.heightCm)}>
            <NumIn value={cm} onChange={setCm} aria="height in centimeters" />
          </Field>
        ) : (
          <>
            <Field label={pick(locale, L.heightFt)}>
              <NumIn value={ft} onChange={setFt} aria="height in feet" />
            </Field>
            <Field label={pick(locale, L.heightIn)}>
              <NumIn value={inch} onChange={setInch} aria="height in inches" />
            </Field>
          </>
        )}
      </div>

      <div className="mt-5">
        <Stats
          items={[
            {
              label: pick(locale, { en: "Devine formula — men", zh: "Devine 公式 — 男", ja: "Devine 式 — 男性", es: "Fórmula Devine — hombres", pt: "Fórmula de Devine — homens" }),
              value: wOut(r.devineMale),
            },
            {
              label: pick(locale, { en: "Devine formula — women", zh: "Devine 公式 — 女", ja: "Devine 式 — 女性", es: "Fórmula Devine — mujeres", pt: "Fórmula de Devine — mulheres" }),
              value: wOut(r.devineFemale),
            },
            {
              label: pick(locale, { en: "Healthy BMI band (18.5–24.9)", zh: "健康 BMI 区间(18.5–24.9)", ja: "健康 BMI の帯域(18.5〜24.9)", es: "Banda de IMC saludable (18,5–24,9)", pt: "Faixa de IMC saudável (18,5–24,9)" }),
              value: Number.isFinite(r.bmiMin) ? `${wOut(r.bmiMin)} – ${wOut(r.bmiMax)}` : "—",
              tone: "accent",
            },
          ]}
          cols="sm:grid-cols-3"
        />
      </div>

      <div className="mt-4">
        <Note>
          {pick(locale, {
            en: "The Devine formula (1975) gives 50 kg + 2.3 kg per inch over 5 ft for men and 45.5 kg + 2.3 kg per inch for women — originally derived for drug dosing, still the most-cited ideal-weight equation. The band shows the weight range that keeps BMI between the WHO limits 18.5 and 24.9 for this height. There is no single ideal weight: frame size and muscle mass shift what is healthy for you.",
            zh: "Devine 公式(1975):男性 50 公斤 + 5 英尺以上每英寸 2.3 公斤,女性 45.5 公斤起同法计算——最初为药物剂量推导,至今仍是被引用最多的理想体重公式。区间显示让 BMI 保持在 WHO 上下限 18.5–24.9 之间的体重范围。理想体重没有唯一答案:骨架与肌肉量都会改变对你而言的健康值。",
            ja: "Devine 式(1975):男性は 50 kg + 5 フィート超過 1 インチごとに 2.3 kg、女性は 45.5 kg + 2.3 kg — 薬剤投与量のために導かれた式で、今も最も引用される理想体重式です。帯域はこの身長で BMI を WHO の上限・下限(18.5〜24.9)に保てる体重範囲です。理想的な体重は一つではありません。骨格や筋肉量によって健康な値は変わります。",
            es: "La fórmula de Devine (1975) da 50 kg + 2,3 kg por pulgada que exceda 5 pies en hombres y 45,5 kg + 2,3 kg por pulgada en mujeres — se derivó para dosificar fármacos y sigue siendo la ecuación de peso ideal más citada. La banda muestra el rango de peso que mantiene el IMC entre los límites OMS 18,5 y 24,9 para esta altura. No existe un peso ideal único: la complexión y la masa muscular cambian lo que es saludable.",
            pt: "A fórmula de Devine (1975) dá 50 kg + 2,3 kg por polegada acima de 5 pés para homens e 45,5 kg + 2,3 kg por polegada para mulheres — derivada para dosagem de medicamentos e ainda a equação de peso ideal mais citada. A faixa mostra o intervalo de peso que mantém o IMC entre os limites OMS 18,5 e 24,9 nessa altura. Não existe um peso ideal único: estrutura óssea e massa muscular mudam o que é saudável.",
          })}
        </Note>
      </div>
    </ToolPanel>
  );
}

export function CalcEngineHealth({ kind }: { kind: string }) {
  switch (kind) {
    case "bmi":
      return <Bmi />;
    case "calorie":
      return <Calorie />;
    case "bodyfat":
      return <BodyFat />;
    case "idealweight":
      return <IdealWeight />;
    default:
      return null;
  }
}
