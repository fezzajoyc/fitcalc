"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { Field, Note, NumIn, Sel, Stats, Tabs, TableBox, fmt, pick } from "./calc-ui";
import { KM_PER_MI, RACE_DISTANCES, formatDuration, paceFor, riegelPredict } from "../_lib/pace";

/**
 * 跑步引擎:配速/速度计算 + Riegel(1.06)成绩预测。
 * 数学在 tools/_lib/pace.ts(paceFor / riegelPredict,已测试);这里只做 UI。
 */

const S = {
  pace: { en: "Pace", zh: "配速", ja: "ペース", es: "Ritmo", pt: "Ritmo" },
  predict: { en: "Race predictor", zh: "成绩预测", ja: "レース予測", es: "Predicción de carrera", pt: "Previsão de prova" },
  distance: { en: "Distance", zh: "距离", ja: "距離", es: "Distancia", pt: "Distância" },
  d5k: { en: "5K", zh: "5 公里", ja: "5 km", es: "5K", pt: "5K" },
  d10k: { en: "10K", zh: "10 公里", ja: "10 km", es: "10K", pt: "10K" },
  dhm: { en: "Half marathon", zh: "半程马拉松", ja: "ハーフマラソン", es: "Media maratón", pt: "Meia maratona" },
  dmarathon: { en: "Marathon", zh: "全程马拉松", ja: "フルマラソン", es: "Maratón", pt: "Maratona" },
  dcustom: { en: "Custom", zh: "自定义", ja: "カスタム", es: "Personalizada", pt: "Personalizada" },
  km: { en: "km", zh: "公里", ja: "km", es: "km", pt: "km" },
  mi: { en: "mi", zh: "英里", ja: "マイル", es: "mi", pt: "mi" },
  hours: { en: "Hours", zh: "时", ja: "時", es: "Horas", pt: "Horas" },
  minutes: { en: "Minutes", zh: "分", ja: "分", es: "Minutos", pt: "Minutos" },
  seconds: { en: "Seconds", zh: "秒", ja: "秒", es: "Segundos", pt: "Segundos" },
  perKm: { en: "Pace per km", zh: "每公里配速", ja: "1 km のペース", es: "Ritmo por km", pt: "Ritmo por km" },
  perMi: { en: "Pace per mile", zh: "每英里配速", ja: "1 マイルのペース", es: "Ritmo por milla", pt: "Ritmo por milha" },
  speedKmh: { en: "Speed (km/h)", zh: "速度(公里/时)", ja: "速度(km/時)", es: "Velocidad (km/h)", pt: "Velocidade (km/h)" },
  speedMph: { en: "Speed (mph)", zh: "速度(英里/时)", ja: "速度(マイル/時)", es: "Velocidad (mph)", pt: "Velocidade (mph)" },
  tableDist: { en: "Race", zh: "比赛", ja: "レース", es: "Carrera", pt: "Prova" },
  tableTime: { en: "Predicted time", zh: "预测时间", ja: "予測タイム", es: "Tiempo previsto", pt: "Tempo previsto" },
  tablePace: { en: "Pace /km", zh: "配速/公里", ja: "ペース/km", es: "Ritmo/km", pt: "Ritmo/km" },
  needBoth: {
    en: "Enter a distance above zero and a finish time above 0:00.",
    zh: "请输入大于 0 的距离和大于 0:00 的完赛时间。",
    ja: "0 より大きい距離と 0:00 より長いタイムを入力してください。",
    es: "Introduzca una distancia mayor que cero y un tiempo mayor que 0:00.",
    pt: "Informe uma distância acima de zero e um tempo acima de 0:00.",
  },
  riegelNote: {
    en: "Predictions use Peter Riegel's formula T₂ = T₁ × (D₂/D₁)^1.06 (Runner's World, 1977). The exponent models how pace fades with distance — it assumes you trained for the target distance, so a fast 5K alone will not project an honest marathon.",
    zh: "预测使用 Peter Riegel 公式 T₂ = T₁ × (D₂/D₁)^1.06(1977 年发表于 Runner's World)。指数 1.06 刻画配速随距离的衰减——前提是你为目标距离做过训练,只凭一个快的 5 公里成绩推不出可靠的全马。",
    ja: "予測は Peter Riegel の式 T₂ = T₁ × (D₂/D₁)^1.06(Runner's World、1977)を使用します。指数は距離に伴うペース低下を表し、対象距離の練習を積んでいるのが前提です。速い 5 km だけでは信頼できるフルマラソンは予測できません。",
    es: "La predicción usa la fórmula de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06 (Runner's World, 1977). El exponente modela cómo el ritmo se degrada con la distancia: supone entrenamiento para la distancia objetivo, así que un 5K rápido por sí solo no proyecta un maratón honesto.",
    pt: "A previsão usa a fórmula de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06 (Runner's World, 1977). O expoente modela como o ritmo cai com a distância — pressupõe treino para a distância alvo, então um 5K rápido sozinho não projeta uma maratona realista.",
  },
  copyResult: { en: "Copy result", zh: "复制结果", ja: "結果をコピー", es: "Copiar resultado", pt: "Copiar resultado" },
};

const RACE_OPTIONS = ["5k", "10k", "hm", "marathon"] as const;
type RaceKey = (typeof RACE_OPTIONS)[number] | "custom";

export function CalcEnginePace() {
  const { locale } = useI18n();
  const [mode, setMode] = useState("pace");
  const [preset, setPreset] = useState<RaceKey>("10k");
  const [custom, setCustom] = useState("10");
  const [unit, setUnit] = useState("km");
  const [h, setH] = useState("0");
  const [m, setM] = useState("50");
  const [s, setS] = useState("0");

  const distLabel = (key: RaceKey): string =>
    key === "custom" ? pick(locale, S.dcustom)
      : key === "5k" ? pick(locale, S.d5k)
      : key === "10k" ? pick(locale, S.d10k)
      : key === "hm" ? pick(locale, S.dhm)
      : pick(locale, S.dmarathon);

  const distanceKm = useMemo(() => {
    if (preset !== "custom") return RACE_DISTANCES[preset];
    const raw = Number(custom.replace(",", "."));
    if (!Number.isFinite(raw) || raw <= 0) return NaN;
    return unit === "mi" ? raw * KM_PER_MI : raw;
  }, [preset, custom, unit]);

  const totalSec = useMemo(() => {
    const hh = Number(h), mm = Number(m), ss = Number(s);
    if (![hh, mm, ss].every(Number.isFinite)) return NaN;
    return hh * 3600 + mm * 60 + ss;
  }, [h, m, s]);

  const valid = Number.isFinite(distanceKm) && distanceKm > 0 && Number.isFinite(totalSec) && totalSec > 0;
  const pace = paceFor(distanceKm, totalSec);
  const summary = valid
    ? `${distLabel(preset)} ${formatDuration(totalSec)} — ${formatDuration(pace.secPerKm)}/km · ${formatDuration(pace.secPerMi)}/mi`
    : "";

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "pace", label: pick(locale, S.pace) },
          { id: "predict", label: pick(locale, S.predict) },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.distance)}>
          <Sel value={preset} onChange={(v) => setPreset(v as RaceKey)} aria={pick(locale, S.distance)}>
            {RACE_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {distLabel(k)}
              </option>
            ))}
            <option value="custom">{pick(locale, S.dcustom)}</option>
          </Sel>
        </Field>
        {preset === "custom" && (
          <>
            <Field label={`${pick(locale, S.distance)} (${pick(locale, unit === "mi" ? S.mi : S.km)})`}>
              <NumIn value={custom} onChange={setCustom} aria={pick(locale, S.distance)} placeholder="10" />
            </Field>
            <Field label={pick(locale, { en: "Unit", zh: "单位", ja: "単位", es: "Unidad", pt: "Unidade" })}>
              <Sel value={unit} onChange={setUnit} aria="distance unit">
                <option value="km">{pick(locale, S.km)}</option>
                <option value="mi">{pick(locale, S.mi)}</option>
              </Sel>
            </Field>
          </>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field label={pick(locale, S.hours)}>
          <NumIn value={h} onChange={setH} aria={pick(locale, S.hours)} placeholder="0" />
        </Field>
        <Field label={pick(locale, S.minutes)}>
          <NumIn value={m} onChange={setM} aria={pick(locale, S.minutes)} placeholder="50" />
        </Field>
        <Field label={pick(locale, S.seconds)}>
          <NumIn value={s} onChange={setS} aria={pick(locale, S.seconds)} placeholder="0" />
        </Field>
      </div>

      {!valid ? (
        <div className="mt-5">
          <Note>{pick(locale, S.needBoth)}</Note>
        </div>
      ) : mode === "pace" ? (
        <>
          <div className="mt-5">
            <Stats
              items={[
                { label: pick(locale, S.perKm), value: formatDuration(pace.secPerKm), tone: "accent" },
                { label: pick(locale, S.perMi), value: formatDuration(pace.secPerMi) },
                { label: pick(locale, S.speedKmh), value: fmt(pace.kmh, locale, 2) },
                { label: pick(locale, S.speedMph), value: fmt(pace.mph, locale, 2) },
              ]}
            />
          </div>
          <div className="mt-4">
            <CopyButton value={summary} label={pick(locale, S.copyResult)} />
          </div>
        </>
      ) : (
        <>
          <div className="mt-5">
            <TableBox
              head={[pick(locale, S.tableDist), pick(locale, S.tableTime), pick(locale, S.tablePace)]}
              rows={RACE_OPTIONS.map((k) => {
                const t = riegelPredict(totalSec, distanceKm, RACE_DISTANCES[k]);
                return [distLabel(k), formatDuration(t), formatDuration(t / RACE_DISTANCES[k])];
              })}
            />
          </div>
          <div className="mt-4">
            <Note>{pick(locale, S.riegelNote)}</Note>
          </div>
        </>
      )}
    </ToolPanel>
  );
}
