import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "body-fat-calculator",
  category: "utility",
  icon: "layers",
  engine: { component: CalcEngineHealth, props: { kind: "bodyfat" } },
  related: ["bmi-calculator", "ideal-weight-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Body Fat Calculator",
      tagline:
        "Estimate your body fat percentage with the US Navy circumference method — just height plus waist, neck and (for women) hip measurements, no calipers or scan needed.",
      intro: [
        "Measure three or four circumferences with a tape and the calculator estimates your body fat percentage using the method the US Navy developed to assess recruits without lab equipment. Men need height, waist and neck; women add the hip. The result updates as you type, and the note below the result reminds you exactly where to place the tape.",
        "The method — published by Hodgdon and Beckett in 1984 — turns the ratio of girth measurements to height into a fat estimate, and it correlates reasonably with underwater weighing for most people. It rewards careful measuring: keep the tape level and snug without compressing the skin, and track how the number trends over weeks rather than trusting any single reading.",
      ],
      steps: [
        "Choose male or female, and metric or imperial units.",
        "Measure and enter your circumferences: neck and waist (plus hip for women).",
        "Read your estimated body fat percentage and re-measure every few weeks to track the trend.",
      ],
      faqs: [
        {
          q: "How does the US Navy method work?",
          a: "It applies a logarithmic equation to circumference measurements: for men 495 ÷ (1.0324 − 0.19077·log10(waist − neck) + 0.15456·log10(height)) − 450, with women using the hip in the girth term and a different set of coefficients. The formula comes from Hodgdon & Beckett's 1984 study for the Naval Health Research Center.",
        },
        {
          q: "Where exactly do I measure?",
          a: "Neck: below the larynx, with the tape sloping slightly down to the front. Waist: at the navel for men, at the narrowest point for women. Hip: at the widest part of the glutes. Keep the tape parallel to the floor and snug against the skin without pinching it.",
        },
        {
          q: "How accurate is it?",
          a: "Expect a few percentage points of error against a lab method like DEXA — mostly from measurement technique and where your body stores fat. Used consistently, with the same tape positions every time, it is a reliable trend tracker even where the absolute number is off.",
        },
        {
          q: "Is this medical advice?",
          a: "No. This is a tape-measure estimate computed in your browser, not a body-composition scan or a health assessment. Very low or unusually high readings — or any concerns about weight and health — belong with a qualified professional.",
        },
      ],
    },
    zh: {
      name: "体脂率计算器",
      tagline:
        "用美国海军围度法估算体脂率——只需身高加腰围、颈围(女性加臀围),不需要卡钳或扫描,软尺在家就能测。",
      intro: [
        "用软尺量三到四个围度,计算器会用美国海军为无设备筛查新兵而开发的方法估算体脂率。男性需要身高、腰围和颈围;女性再加臀围。结果随输入实时更新,结果下方的说明会提醒你软尺应该卡在哪里。",
        "该方法由 Hodgdon 和 Beckett 于 1984 年发表,把围度与身高的比例换算成体脂估计,对大多数人来说与水下称重法有不错的相关性。它奖励仔细的测量:软尺保持水平、贴身但不勒皮肤,并按周追踪数值趋势,而不是迷信任何一次读数。",
      ],
      steps: [
        "选择性别,以及公制或英制单位。",
        "测量并输入围度:颈围和腰围(女性加臀围)。",
        "读出估算的体脂率,每几周复测一次追踪趋势。",
      ],
      faqs: [
        {
          q: "美国海军法的原理是什么?",
          a: "它对围度测量套用对数公式:男性为 495 ÷ (1.0324 − 0.19077·log10(腰围 − 颈围) + 0.15456·log10(身高)) − 450,女性在围度项中加入臀围并使用另一组系数。公式来自 Hodgdon 与 Beckett 1984 年为海军健康研究中心做的研究。",
        },
        {
          q: "具体量哪里?",
          a: "颈围:喉结下方,软尺前侧略向下倾斜。腰围:男性量肚脐水平,女性量最细处。臀围:臀部最宽处。软尺与地面平行、贴身但不勒紧皮肤。",
        },
        {
          q: "误差有多大?",
          a: "对比 DEXA 等实验室方法,误差可能有几个百分点——主要来自测量手法和个体脂肪分布。只要每次用同样的位置、同样的松紧,即使绝对值有偏差,趋势追踪依然可靠。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是。这是浏览器里算出的软尺估算,不是体成分扫描或健康评估。读数过低或异常偏高,或任何关于体重与健康的担忧,请交给合格专业人士。",
        },
      ],
    },
    ja: {
      name: "体脂肪率計算",
      tagline:
        "米海軍の囲度法で体脂肪率を推定 — 必要なのは身長と腹囲・首囲(女性は臀囲も)だけ。キャリパーもスキャンも不要で、メジャーだけで測れます。",
      intro: [
        "メジャーで 3〜4 か所の囲を測ると、米海軍が設備なしで志願兵を評価するために開発した方法で体脂肪率を推定します。男性は身長・腹囲・首囲、女性は臀囲を追加。結果は入力に合わせてリアルタイム更新され、結果の下の注記でテープを当てる位置を確認できます。",
        "この方法は Hodgdon と Beckett が 1984 年に発表したもので、囲と身長の比率を体脂肪の推定値に変換します。多くの人で水中体重測定法と妥当な相関があります。丁寧な測定がものを言います:テープを水平に、肌を押し込まずに当て、1 回の数値ではなく週単位の推移を見てください。",
      ],
      steps: [
        "男性・女性と単位(メートル法/ヤード・ポンド法)を選びます。",
        "囲を測って入力します:首囲と腹囲(女性は臀囲も)。",
        "推定体脂肪率を確認し、数週間ごとに再測定して推移を追います。",
      ],
      faqs: [
        {
          q: "米海軍法の仕組みは?",
          a: "囲の測定値に対数式を適用します。男性は 495 ÷ (1.0324 − 0.19077·log10(腹囲 − 首囲) + 0.15456·log10(身長)) − 450、女性は囲の項に臀囲を加え別の係数を使います。式は Hodgdon & Beckett が 1984 年に海軍健康研究センターのために発表したものです。",
        },
        {
          q: "どこを測ればいいですか?",
          a: "首囲:喉仏の下で、テープが前側でやや下向きになるように。腹囲:男性はへその高さ、女性は最も細い部分。臀囲:お尻の最も出た部分。テープは床と平行に、肌を締め付けない程度に当てます。",
        },
        {
          q: "精度はどのくらい?",
          a: "DEXA などの実測法と比べると誤差は数ポイントあり得ます。主に測定手法と脂肪のつき方によるものです。毎回同じ位置・同じテンションで測れば、絶対値がずれていても推移の追跡としては信頼できます。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ。ブラウザ内で計算されるメジャーによる推定値であり、体組成スキャンや健康評価ではありません。極端に低い・高い数値や、体重と健康に関する不安は資格を持つ専門家に相談してください。",
        },
      ],
    },
    es: {
      name: "Calculadora de grasa corporal",
      tagline:
        "Estime su porcentaje de grasa corporal con el método de circunferencias de la Marina de EE. UU. — solo altura más cintura, cuello y (para mujeres) cadera, sin calibrador ni escáner.",
      intro: [
        "Mida tres o cuatro perímetros con una cinta y la calculadora estima su porcentaje de grasa corporal con el método que la Marina estadounidense desarrolló para evaluar reclutas sin equipo de laboratorio. Los hombres necesitan altura, cintura y cuello; las mujeres añaden la cadera. El resultado se actualiza al escribir, y la nota bajo el resultado le recuerda dónde colocar la cinta.",
        "El método — publicado por Hodgdon y Beckett en 1984 — convierte la relación entre perímetros y altura en una estimación de grasa, y correlaciona razonablemente con la pesaje submarino para la mayoría de la gente. Premia medir con cuidado: cinta nivelada y ajustada sin comprimir la piel, y siga la tendencia durante semanas en lugar de fiarse de una sola lectura.",
      ],
      steps: [
        "Elija hombre o mujer, y unidades métricas o imperiales.",
        "Mida e introduzca sus perímetros: cuello y cintura (más cadera en mujeres).",
        "Lea su grasa corporal estimada y vuelva a medir cada pocas semanas para seguir la tendencia.",
      ],
      faqs: [
        {
          q: "¿Cómo funciona el método de la Marina?",
          a: "Aplica una ecuación logarítmica a las circunferencias: en hombres 495 ÷ (1,0324 − 0,19077·log10(cintura − cuello) + 0,15456·log10(altura)) − 450, y las mujeres usan la cadera en el término de perímetros con otros coeficientes. La fórmula viene del estudio de Hodgdon y Beckett de 1984 para el Naval Health Research Center.",
        },
        {
          q: "¿Dónde mido exactamente?",
          a: "Cuello: bajo la laringe, con la cinta ligeramente inclinada hacia abajo al frente. Cintura: al nivel del ombligo en hombres, en el punto más estrecho en mujeres. Cadera: en la parte más ancha de los glúteos. Cinta paralela al suelo y ajustada sin pellizcar la piel.",
        },
        {
          q: "¿Cuán preciso es?",
          a: "Espere unos puntos de error frente a un método de laboratorio como DEXA, sobre todo por la técnica de medición y dónde guarda grasa su cuerpo. Usado siempre con las mismas posiciones, es un buen seguidor de tendencias aunque el valor absoluto falle.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No. Es una estimación con cinta calculada en su navegador, no un escáner de composición corporal ni una evaluación de salud. Lecturas muy bajas o anormalmente altas — o cualquier preocupación sobre peso y salud — corresponde a un profesional cualificado.",
        },
      ],
    },
    pt: {
      name: "Calculadora de gordura corporal",
      tagline:
        "Estime seu percentual de gordura corporal pelo método de circunferências da Marinha dos EUA — só altura mais cintura, pescoço e (para mulheres) quadril, sem adipômetro nem exame.",
      intro: [
        "Meça três ou quatro circunferências com uma fita e a calculadora estima seu percentual de gordura usando o método que a Marinha americana criou para avaliar recrutas sem equipamento de laboratório. Homens informam altura, cintura e pescoço; mulheres acrescentam o quadril. O resultado atualiza enquanto você digita, e a nota abaixo lembra exatamente onde posicionar a fita.",
        "O método — publicado por Hodgdon e Beckett em 1984 — transforma a razão entre circunferências e altura em uma estimativa de gordura, e correlaciona razoavelmente com a pesagem hidrostática para a maioria das pessoas. Ele premia medições cuidadosas: fita nivelada e encostada sem comprimir a pele, e acompanhe a tendência ao longo de semanas em vez de confiar numa leitura isolada.",
      ],
      steps: [
        "Escolha homem ou mulher, e unidades métricas ou imperiais.",
        "Meça e informe as circunferências: pescoço e cintura (mais quadril para mulheres).",
        "Leia seu percentual de gordura estimado e meça de novo a cada poucas semanas para acompanhar a tendência.",
      ],
      faqs: [
        {
          q: "Como funciona o método da Marinha?",
          a: "Aplica uma equação logarítmica às circunferências: para homens 495 ÷ (1,0324 − 0,19077·log10(cintura − pescoço) + 0,15456·log10(altura)) − 450, e as mulheres usam o quadril no termo de circunferências com outros coeficientes. A fórmula vem do estudo de Hodgdon & Beckett de 1984 para o Naval Health Research Center.",
        },
        {
          q: "Onde exatamente eu meço?",
          a: "Pescoço: abaixo da laringe, com a fita levemente inclinada para baixo na frente. Cintura: na altura do umbigo para homens, no ponto mais estreito para mulheres. Quadril: na parte mais larga dos glúteos. Fita paralela ao chão e encostada na pele sem apertar.",
        },
        {
          q: "Qual a precisão?",
          a: "Espere alguns pontos de erro contra um método de laboratório como DEXA — sobretudo pela técnica de medição e por onde seu corpo guarda gordura. Usado sempre nas mesmas posições, é um bom rastreador de tendência mesmo quando o número absoluto erra.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não. É uma estimativa com fita calculada no seu navegador, não um exame de composição corporal nem uma avaliação de saúde. Leituras muito baixas ou anormalmente altas — ou qualquer preocupação sobre peso e saúde — pertencem a um profissional qualificado.",
        },
      ],
    },
  },
});
