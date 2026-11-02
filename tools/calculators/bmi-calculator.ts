import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "bmi-calculator",
  category: "utility",
  icon: "ruler",
  featured: true,
  engine: { component: CalcEngineHealth, props: { kind: "bmi" } },
  related: ["calorie-calculator", "body-fat-calculator", "ideal-weight-calculator"],
  copy: {
    en: {
      name: "BMI Calculator",
      tagline:
        "Calculate your Body Mass Index from kg/cm or lb/ft-in and see instantly which WHO adult category the result lands in — underweight, normal, overweight or obesity.",
      intro: [
        "Enter height and weight in either unit system and the calculator returns your BMI to one decimal, the WHO category it falls into, and the healthy weight band for your height — the range that keeps BMI between 18.5 and 24.9. Everything updates as you type, so you can see exactly how a few kilograms move you between categories.",
        "BMI is the most widely used first-pass screen for weight status, but it measures mass, not composition: it cannot tell muscle from fat. Very muscular people often read as overweight while carrying little excess fat, and older adults can read as normal while losing muscle. Treat it as a starting point alongside a waist measurement or a body-fat estimate.",
      ],
      steps: [
        "Pick metric (kg + cm) or imperial (lb + ft/in) units.",
        "Enter your height and weight.",
        "Read your BMI, its WHO category and the healthy weight range for your height.",
      ],
      faqs: [
        {
          q: "How is BMI calculated?",
          a: "BMI is weight in kilograms divided by the square of height in meters (kg/m²). Imperial inputs are converted internally with exact factors, so 154 lb at 5 ft 9 in produces the same number as 69.85 kg at 175.26 cm.",
        },
        {
          q: "What are the WHO categories?",
          a: "The World Health Organization's adult cut-offs: below 18.5 is underweight, 18.5–24.9 is normal weight, 25.0–29.9 is overweight, and 30.0 or above is obesity. The same boundaries apply to adult men and women.",
        },
        {
          q: "Why does my BMI say overweight when I train hard?",
          a: "Muscle is denser than fat, so BMI over-reports fatness in muscular people — the scale's best-known limitation. Pair it with the US Navy body-fat method on this site, or a waist measurement, for a fuller picture.",
        },
        {
          q: "Is this medical advice?",
          a: "No. FitCalc computes a screening estimate in your browser; it is not a diagnosis or a treatment plan. For decisions about your health, talk to a qualified professional who can see the whole picture.",
        },
      ],
    },
    zh: {
      name: "BMI 计算器",
      tagline:
        "用公制或英制输入算出体重指数(BMI),立即看到结果落在 WHO 成人分级的哪一档——偏瘦、正常、超重还是肥胖,并给出该身高对应的健康体重区间。",
      intro: [
        "选择任意一种单位输入身高体重,计算器给出保留一位小数的 BMI、对应的 WHO 分级,以及该身高的健康体重带(即 BMI 保持在 18.5–24.9 之间的体重范围)。结果随输入实时更新,增减几公斤会跨入哪一档一目了然。",
        "BMI 是使用最广的体重状态初筛指标,但它量的是质量而不是成分:分不清肌肉和脂肪。肌肉发达的人常被误判为超重,而肌肉流失的老年人也可能显示正常。请把它当起点,再配合腰围或体脂估算一起看。",
      ],
      steps: [
        "选择公制(kg + cm)或英制(磅 + 英尺/英寸)。",
        "输入身高和体重。",
        "查看 BMI、对应 WHO 分级,以及该身高的健康体重区间。",
      ],
      faqs: [
        {
          q: "BMI 是怎么算的?",
          a: "BMI = 体重(千克)÷ 身高(米)的平方(kg/m²)。英制输入会在内部按精确换算系数转换,所以 154 磅、5 英尺 9 英寸与 69.85 公斤、175.26 厘米算出的数值完全相同。",
        },
        {
          q: "WHO 的分级标准是什么?",
          a: "世界卫生组织的成人界值:低于 18.5 为偏瘦,18.5–24.9 为正常,25.0–29.9 为超重,30.0 及以上为肥胖。成年男女使用同一套界值。",
        },
        {
          q: "我练得很勤,为什么 BMI 显示超重?",
          a: "肌肉密度高于脂肪,BMI 会高估肌肉发达者的体脂——这是该指标最著名的局限。建议配合本站的美国海军体脂法或腰围测量一起判断。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是。FitCalc 只是在你的浏览器里算一个筛查估算值,不构成诊断或治疗方案。涉及健康的决策,请咨询能了解你完整情况的合格专业人士。",
        },
      ],
    },
    ja: {
      name: "BMI 計算",
      tagline:
        "メートル法・ヤード・ポンド法のどちらでも BMI を計算し、WHO の成人区分(低体重・普通・過体重・肥満)のどこに当てはまるかを即判定。身長に応じた健康体重の帯域も表示します。",
      intro: [
        "どちらの単位系でも身長と体重を入力すると、小数 1 桁の BMI、対応する WHO 区分、そして BMI を 18.5〜24.9 に保てる健康体重の範囲を表示します。入力に合わせてリアルタイム更新されるので、体重が数キロ動くと区分がどう変わるかすぐわかります。",
        "BMI は体重状態の一次スクリーニングとして最も広く使われていますが、測るのは質量であって体組成ではありません。筋肉と脂肪を区別できず、筋肉質な人は体脂肪が少なくても過体重と判定されがちで、筋肉が減った高齢者は普通と出ることもあります。あくまで出発点として、腹囲や体脂肪率の推定と合わせて使いましょう。",
      ],
      steps: [
        "メートル法(kg + cm)かヤード・ポンド法(lb + ft/in)を選びます。",
        "身長と体重を入力します。",
        "BMI・WHO 区分・この身長の健康体重範囲を確認します。",
      ],
      faqs: [
        {
          q: "BMI の計算式は?",
          a: "BMI = 体重(kg)÷ 身長(m)の 2 乗(kg/m²)です。ヤード・ポンド法の入力は内部で正確な係数で換算するため、154 lb・5 フィート 9 インチは 69.85 kg・175.26 cm と同じ数値になります。",
        },
        {
          q: "WHO の区分は?",
          a: "世界保健機関の成人区分は、18.5 未満が低体重、18.5〜24.9 が普通体重、25.0〜29.9 が過体重、30.0 以上が肥満です。成人の男女で同じ基準を使います。",
        },
        {
          q: "しっかりトレーニングしているのに過体重と出るのは?",
          a: "筋肉は脂肪より密度が高いため、BMI は筋肉質な人の体脂肪を過大に判定します。これはこの指標で最も知られた限界です。本サイトの米海軍式体脂肪率計算や腹囲の測定と組み合わせて判断してください。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ。FitCalc はブラウザ内で算出するスクリーニング推定値であり、診断や治療計画ではありません。健康に関する判断は、全体を把握できる資格を持つ専門家に相談してください。",
        },
      ],
    },
    es: {
      name: "Calculadora de IMC",
      tagline:
        "Calcule su índice de masa corporal en kg/cm o lb/pies-pulgadas y vea al instante en qué categoría adulta de la OMS cae el resultado — bajo peso, normal, sobrepeso u obesidad.",
      intro: [
        "Introduzca altura y peso en cualquiera de los dos sistemas y la calculadora devuelve su IMC con un decimal, la categoría de la OMS en la que cae y la banda de peso saludable para su altura — el rango que mantiene el IMC entre 18,5 y 24,9. Todo se actualiza al escribir, así que verá cómo unos pocos kilos cambian de categoría.",
        "El IMC es el cribado de primera línea más usado para el estado de peso, pero mide masa, no composición: no distingue músculo de grasa. Las personas muy musculosas salen como sobrepeso con poca grasa extra, y los adultos mayores pueden salir normales perdiendo músculo. Úselo como punto de partida junto con el perímetro de cintura o una estimación de grasa corporal.",
      ],
      steps: [
        "Elija unidades métricas (kg + cm) o imperiales (lb + pies/pulgadas).",
        "Escriba su altura y su peso.",
        "Lea su IMC, su categoría OMS y el rango de peso saludable para su altura.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula el IMC?",
          a: "El IMC es el peso en kilos dividido por la altura en metros al cuadrado (kg/m²). Las unidades imperiales se convierten internamente con factores exactos: 154 lb a 5 pies 9 pulgadas da el mismo número que 69,85 kg a 175,26 cm.",
        },
        {
          q: "¿Cuáles son las categorías de la OMS?",
          a: "Los puntos de corte adultos de la Organización Mundial de la Salud: menos de 18,5 bajo peso; 18,5–24,9 peso normal; 25,0–29,9 sobrepeso; 30,0 o más obesidad. Los mismos límites valen para hombres y mujeres adultas.",
        },
        {
          q: "Entreno duro, ¿por qué el IMC me da sobrepeso?",
          a: "El músculo es más denso que la grasa, así que el IMC sobreestima la grasa en personas musculosas: es su limitación más conocida. Compárelo con el método de la Marina estadounidense de este sitio o con su perímetro de cintura.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No. FitCalc calcula una estimación de cribado en su navegador; no es un diagnóstico ni un plan de tratamiento. Para decisiones sobre su salud, consulte a un profesional cualificado que vea el conjunto.",
        },
      ],
    },
    pt: {
      name: "Calculadora de IMC",
      tagline:
        "Calcule o índice de massa corporal em kg/cm ou lb/pés-polegadas e veja na hora em qual categoria adulta da OMS o resultado se encaixa — abaixo do peso, normal, sobrepeso ou obesidade.",
      intro: [
        "Informe altura e peso em qualquer um dos sistemas e a calculadora devolve seu IMC com uma casa decimal, a categoria da OMS correspondente e a faixa de peso saudável para sua altura — o intervalo que mantém o IMC entre 18,5 e 24,9. Tudo atualiza enquanto você digita, então dá para ver como poucos quilos mudam a categoria.",
        "O IMC é a triagem de peso mais usada que existe, mas mede massa, não composição: ele não distingue músculo de gordura. Pessoas muito musculosas aparecem como sobrepeso com pouca gordura extra, e adultos mais velhos podem aparecer normais enquanto perdem músculo. Trate-o como ponto de partida, junto com a medida da cintura ou uma estimativa de gordura corporal.",
      ],
      steps: [
        "Escolha unidades métricas (kg + cm) ou imperiais (lb + pés/polegadas).",
        "Digite sua altura e seu peso.",
        "Veja o IMC, a categoria da OMS e a faixa de peso saudável para sua altura.",
      ],
      faqs: [
        {
          q: "Como o IMC é calculado?",
          a: "O IMC é o peso em quilos dividido pela altura em metros ao quadrado (kg/m²). Unidades imperiais são convertidas internamente com fatores exatos: 154 lb a 5 pés 9 polegadas dá o mesmo número que 69,85 kg a 175,26 cm.",
        },
        {
          q: "Quais são as categorias da OMS?",
          a: "Os cortes adultos da Organização Mundial da Saúde: abaixo de 18,5 é abaixo do peso; 18,5–24,9 é peso normal; 25,0–29,9 é sobrepeso; 30,0 ou mais é obesidade. Os mesmos limites valem para homens e mulheres adultas.",
        },
        {
          q: "Treino pesado, por que o IMC dá sobrepeso?",
          a: "Músculo é mais denso que gordura, então o IMC superestima a gordura em pessoas musculosas — é a limitação mais conhecida da escala. Combine com o método da Marinha dos EUA deste site ou com a medida da cintura.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não. O FitCalc calcula uma estimativa de triagem no seu navegador; não é diagnóstico nem plano de tratamento. Para decisões sobre sua saúde, converse com um profissional qualificado que veja o quadro completo.",
        },
      ],
    },
  },
});
