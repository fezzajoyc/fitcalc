"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";

/**
 * 计算器引擎共用的 UI 小件:字段、数字输入、下拉、分段页签、
 * 结果格、备注和表格。引擎只做 UI 编排,数学一律在 tools/_lib/*.ts。
 */

/** 站点 locale → Intl locale,引擎内所有数字格式化走这里 */
export const INTL_LOCALES: Record<string, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  es: "es-ES",
  pt: "pt-BR",
  fr: "fr-FR",
  de: "de-DE",
  ru: "ru-RU",
  it: "it-IT",
  tr: "tr-TR",
  ko: "ko-KR",
  ar: "ar-SA",
  hi: "hi-IN",
  id: "id-ID",
  vi: "vi-VN",
};

/** 从引擎内联的每语字符串记录里取当前语言,缺语言回退英文 */
export function pick(locale: Locale, rec: Record<string, string>): string {
  return rec[locale] ?? rec.en;
}

/** 本地化数字格式;非有限值(输入没填好)渲染成破折号 */
export function fmt(n: number, locale: Locale, maxFrac = 2): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(INTL_LOCALES[locale] ?? INTL_LOCALES.en, {
    maximumFractionDigits: maxFrac,
  }).format(n);
}

/** 带标签的字段容器:标签 + 输入控件 */
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[13px] font-medium text-[var(--color-sub)]">{label}</span>
      {children}
    </div>
  );
}

export function NumIn({
  value,
  onChange,
  aria,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  aria: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={`field bare mono ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={aria}
    />
  );
}

export function Sel({
  value,
  onChange,
  aria,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  aria: string;
  children: ReactNode;
}) {
  return (
    <select className="field" value={value} onChange={(e) => onChange(e.target.value)} aria-label={aria}>
      {children}
    </select>
  );
}

/** 分段圆角页签:单位切换 / 计算模式切换 */
export function Tabs({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2" role="tablist">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          aria-selected={value === o.id}
          onClick={() => onChange(o.id)}
          className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            value === o.id
              ? "border-transparent bg-[var(--color-ink)] text-white"
              : "hairline hover:bg-[var(--color-surface)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** 结果摘要格:label + 大数字,支持语义色调 */
export function Stats({
  items,
  cols = "sm:grid-cols-2",
}: {
  items: { label: string; value: string; tone?: "good" | "bad" | "accent" }[];
  cols?: string;
}) {
  const tone = (t?: string) =>
    t === "good"
      ? "text-[var(--color-good)]"
      : t === "bad"
        ? "text-[var(--color-bad)]"
        : t === "accent"
          ? "text-[var(--color-accent-strong)]"
          : "text-[var(--color-ink)]";
  return (
    <div className={`grid grid-cols-2 gap-3 ${cols}`}>
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border hairline px-3.5 py-3">
          <div className="text-[12.5px] font-medium text-[var(--color-sub)]">{it.label}</div>
          <div className={`mono mt-1 text-[17px] font-semibold leading-6 ${tone(it.tone)}`} aria-live="polite">
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-[13px] leading-5 text-[var(--color-sub)]">{children}</p>;
}

/** 带边框的只读表格(训练百分比表、预测表等) */
export function TableBox({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border hairline">
      <div className="max-h-[26rem] overflow-y-auto">
        <table className="w-full text-[14px]">
          <thead className="sticky top-0 bg-[var(--color-card)]">
            <tr className="border-b hairline text-[12.5px] uppercase tracking-wide text-[var(--color-sub)]">
              {head.map((h, i) => (
                <th key={h} scope="col" className={`px-3.5 py-2 font-semibold ${i > 0 ? "text-right" : "text-left"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 ? "bg-[var(--color-surface)]" : ""}>
                {r.map((c, j) => (
                  <td key={j} className={`mono px-3.5 py-2 ${j > 0 ? "text-right text-[var(--color-sub)]" : "font-medium"}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
