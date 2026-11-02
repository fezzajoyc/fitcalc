"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, TableBox, fmt, pick } from "./calc-ui";
import { oneRepMax, ormTable } from "../_lib/pace";

/**
 * 1RM 引擎:Epley 主估 + Brzycki 对照,附 1–12 次重复的训练百分比表。
 * 数学在 tools/_lib/pace.ts(oneRepMax / ormTable,已测试);这里只做 UI。
 */

const S = {
  weight: { en: "Weight lifted", zh: "负重", ja: "持ち上げた重量", es: "Peso levantado", pt: "Peso levantado" },
  reps: { en: "Reps completed", zh: "完成次数", ja: "完了レップ数", es: "Repeticiones hechas", pt: "Repetições feitas" },
  epley: { en: "Estimated 1RM — Epley", zh: "1RM 估算 — Epley", ja: "推定 1RM — Epley", es: "1RM estimado — Epley", pt: "1RM estimado — Epley" },
  brzycki: { en: "Estimated 1RM — Brzycki", zh: "1RM 估算 — Brzycki", ja: "推定 1RM — Brzycki", es: "1RM estimado — Brzycki", pt: "1RM estimado — Brzycki" },
  tableReps: { en: "Reps", zh: "次数", ja: "レップ", es: "Reps", pt: "Reps" },
  tableWeight: { en: "Working max", zh: "对应最大重量", ja: "対応重量", es: "Peso máx.", pt: "Carga máx." },
  tablePct: { en: "% of 1RM", zh: "占 1RM", ja: "1RM 比率", es: "% del 1RM", pt: "% do 1RM" },
  invalid: {
    en: "Enter a weight above zero and a whole number of reps from 1 to 20.",
    zh: "请输入大于 0 的重量,以及 1–20 的整数次数。",
    ja: "0 より大きい重量と 1〜20 の整数レップを入力してください。",
    es: "Introduzca un peso mayor que cero y repeticiones enteras entre 1 y 20.",
    pt: "Informe um peso acima de zero e repetições inteiras de 1 a 20.",
  },
  formulaNote: {
    en: "Epley: 1RM = w × (1 + reps/30). Brzycki: 1RM = w × 36/(37 − reps). One rep returns the weight itself. Both are estimates from submaximal sets — they agree best at 4–10 reps, and above ~10 reps fatigue makes every formula drift.",
    zh: "Epley:1RM = w × (1 + 次数/30);Brzycki:1RM = w × 36/(37 − 次数)。次数为 1 时两者都等于所举重量。两式都由次极限组推算,4–10 次区间最一致;超过约 10 次后疲劳会让所有公式失真。",
    ja: "Epley:1RM = w × (1 + レップ数/30)。Brzycki:1RM = w × 36/(37 − レップ数)。1 レップなら持ち上げた重量そのものです。どちらもサブマックスからの推定で、4〜10 レップで最も一致し、10 レップを超えると疲労によりずれます。",
    es: "Epley: 1RM = w × (1 + reps/30). Brzycki: 1RM = w × 36/(37 − reps). Con una repetición el resultado es el propio peso. Ambas estiman desde series submáximas: coinciden mejor entre 4 y 10 reps, y por encima de ~10 la fatiga las desvía.",
    pt: "Epley: 1RM = w × (1 + reps/30). Brzycki: 1RM = w × 36/(37 − reps). Com uma repetição o resultado é o próprio peso. Ambas estimam a partir de séries submáximas — concordam melhor entre 4 e 10 reps, e acima de ~10 a fadiga as desvia.",
  },
  ymylNote: {
    en: "An estimated max is for planning training loads, not for showing off: attempting a true single near your estimate without a spotter and proper setup is how injuries happen.",
    zh: "估算极限用于安排训练重量,不是用来逞强的:在无保护、无准备的情况下冲极限是受伤的最常见原因。",
    ja: "推定マックスはトレーニング負荷の計画用です。見せびらかし用ではありません。保護者なし・準備なしでの高重量挑戦は怪我の元です。",
    es: "El máximo estimado sirve para planificar cargas, no para presumir: intentar un single real cerca de la estimación sin seguro ni preparación es la vía rápida a la lesión.",
    pt: "A carga máxima estimada serve para planejar o treino, não para exibição: tentar uma repetição real perto da estimativa sem apoio nem preparo é receita para lesão.",
  },
};

export function CalcEngineOrm() {
  const { locale } = useI18n();
  const [weight, setWeight] = useState("100");
  const [unit, setUnit] = useState("kg");
  const [reps, setReps] = useState("5");

  const w = Number(weight.replace(",", "."));
  const r = Number(reps);
  const orm = useMemo(() => oneRepMax(w, r), [w, r]);
  const valid = Number.isFinite(orm.epley);
  const rows = useMemo(() => (valid ? ormTable(orm.epley) : []), [valid, orm.epley]);

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.weight)}>
          <NumIn value={weight} onChange={setWeight} aria={pick(locale, S.weight)} placeholder="100" />
        </Field>
        <Field label={pick(locale, { en: "Unit", zh: "单位", ja: "単位", es: "Unidad", pt: "Unidade" })}>
          <Sel value={unit} onChange={setUnit} aria="weight unit">
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </Sel>
        </Field>
        <Field label={pick(locale, S.reps)}>
          <NumIn value={reps} onChange={setReps} aria={pick(locale, S.reps)} placeholder="5" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.epley), value: `${fmt(orm.epley, locale, 1)} ${unit}`, tone: "accent" },
                { label: pick(locale, S.brzycki), value: `${fmt(orm.brzycki, locale, 1)} ${unit}` },
              ]}
            />
          </div>
          <div className="mt-5">
            <TableBox
              head={[pick(locale, S.tableReps), pick(locale, S.tableWeight), pick(locale, S.tablePct)]}
              rows={rows.map((row) => [row.reps, `${fmt(row.weight, locale, 1)} ${unit}`, `${fmt(row.pct, locale, 1)}%`])}
            />
          </div>
        </>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.formulaNote)}</Note>
      </div>
      <div className="mt-2">
        <Note>{pick(locale, S.ymylNote)}</Note>
      </div>
    </ToolPanel>
  );
}
