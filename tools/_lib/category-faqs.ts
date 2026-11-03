import type { CategoryId, Locale } from "@/lib/site";
import type { ToolCopy } from "./types";

/**
 * 类目 FAQ 池:工具页 FAQ 不足 6 条时按类目补齐(JSON-LD 同源走 toolCopy)。
 * 内容写"这个类目共同的真问题"(隐私/收费/格式/精度/浏览器支持),不是凑数占位。
 * 只写核心 5 语(en/zh/ja/es/pt);其他 locale toolCopy 本来就走 overlay 或回退 en。
 */
type Faq = { q: string; a: string };

const GLOBAL: Partial<Record<Locale, Faq[]>> = {
  en: [
    { q: "Is FitCalc a medical service?", a: "No. FitCalc provides fitness and body metrics calculators for general information — they use standard published formulas, but they are not a diagnosis and do not replace professional advice." },
    { q: "Do I need to sign up?", a: "Never. FitCalc has no accounts: enter your numbers, read the result, and nothing is stored or transmitted anywhere." },
    { q: "Can I use FitCalc on my phone?", a: "Yes — the calculators are touch-friendly and run entirely on your device, so fitness and body metrics results appear instantly even on a slow connection." },
  ],
  zh: [
    { q: "FitCalc是医疗服务吗?", a: "不是。FitCalc提供的是健身与身体指标计算器,用于一般参考 — 采用公开的标准公式,不构成诊断,也不能替代专业建议。" },
    { q: "需要注册吗?", a: "从不需要。FitCalc没有账号体系:输入数字、看结果,任何信息都不存储不上传。" },
    { q: "手机上能用吗?", a: "可以 — 计算器对触屏友好,完全在你的设备上运行,健身与身体指标结果即时显示,弱网也能用。" },
  ],
  ja: [
    { q: "FitCalcは医療サービスですか?", a: "違います。FitCalcのfitness and body metrics計算機は一般的な参考のためのもので、公開された標準式を使用しますが、診断ではなく専門的な助言の代わりにもなりません。" },
    { q: "登録は必要ですか?", a: "一切不要です。FitCalcにアカウント体系はありません。数値を入れて結果を見るだけで、保存も送信もされません。" },
    { q: "スマホで使えますか?", a: "使えます。計算機はタッチ操作に対応し、端末内で完結するため、fitness and body metricsの結果は回線が遅くても即座に出ます。" },
  ],
  es: [
    { q: "¿FitCalc es un servicio médico?", a: "No. FitCalc ofrece calculadoras de fitness and body metrics como referencia general — usan fórmulas estándar publicadas, pero no son un diagnóstico ni sustituyen el consejo profesional." },
    { q: "¿Necesito registrarme?", a: "Nunca. FitCalc no tiene cuentas: introduces tus números, lees el resultado y nada se guarda ni se transmite." },
    { q: "¿Funciona en el móvil?", a: "Sí — las calculadoras están pensadas para táctil y se ejecutan por completo en tu dispositivo, así que los resultados de fitness and body metrics aparecen al instante." },
  ],
  pt: [
    { q: "O FitCalc é um serviço médico?", a: "Não. O FitCalc oferece calculadoras de fitness and body metrics como referência geral — usam fórmulas padrão publicadas, mas não são diagnóstico nem substituem orientação profissional." },
    { q: "Preciso me cadastrar?", a: "Nunca. O FitCalc não tem contas: você digita seus números, lê o resultado e nada é armazenado ou transmitido." },
    { q: "Funciona no celular?", a: "Sim — as calculadoras são otimizadas para toque e rodam inteiramente no seu dispositivo, então os resultados de fitness and body metrics aparecem na hora." },
  ],
};

const BY_CATEGORY: Partial<Record<CategoryId, Partial<Record<Locale, Faq[]>>>> = {

};

/** 取某类目的补充 FAQ 池(global 池 + 类目池,en 缺省回退) */
export function categoryFaqPool(category: CategoryId, locale: Locale): Faq[] {
  const extra = BY_CATEGORY[category]?.[locale] ?? BY_CATEGORY[category]?.en ?? [];
  const global = GLOBAL[locale] ?? GLOBAL.en ?? [];
  return [...extra, ...global];
}
