import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "calorie-calculator",
  category: "utility",
  icon: "calc",
  featured: true,
  engine: { component: CalcEngineHealth, props: { kind: "calorie" } },
  related: ["bmi-calculator", "body-fat-calculator", "ideal-weight-calculator", "pace-calculator"],
  copy: {
    en: {
      name: "Calorie Calculator",
      tagline:
        "Find your BMR with the Mifflin–St Jeor equation, multiply by your activity level for maintenance calories (TDEE), and set a cut or bulk target in kcal per day.",
      intro: [
        "Enter your stats, pick how active your week actually is, and the calculator shows three numbers: your BMR (what your body burns at complete rest), your TDEE (maintenance, once daily life and training are counted) and a goal target adjusted by ±500 kcal for losing fat or building muscle — roughly half a kilo a week.",
        "Everything runs on the Mifflin–St Jeor equation, the metabolic formula most validated against measured energy expenditure in adults, with the standard five activity multipliers from 1.2 (desk job, little exercise) to 1.9 (physical job or twice-daily training). The honest way to use the target: eat there for two or three weeks and adjust against what your weight actually does.",
      ],
      steps: [
        "Choose your sex, units, and enter height, weight and age.",
        "Pick the activity level that matches a normal week, not your best week.",
        "Choose a goal — lose, maintain or gain — and read your daily calorie target.",
      ],
      faqs: [
        {
          q: "What is the difference between BMR and TDEE?",
          a: "BMR (basal metabolic rate) is the energy your body needs just to stay alive at rest — breathing, circulation, cell repair. TDEE (total daily energy expenditure) is BMR multiplied by an activity factor, so it includes walking, work and training. Eat near TDEE to maintain weight.",
        },
        {
          q: "Which formula does the calculator use?",
          a: "The Mifflin–St Jeor equation, published in the American Journal of Clinical Nutrition in 1990: 10 × weight(kg) + 6.25 × height(cm) − 5 × age, plus 5 for men and minus 161 for women. It is the equation most dietary guidelines recommend for healthy adults.",
        },
        {
          q: "Why ±500 kcal for the goal?",
          a: "A kilo of body fat stores about 7,700 kcal, so a daily deficit or surplus of 500 kcal moves roughly 0.5 kg per week — the rate most evidence-based plans use because it is sustainable and preserves muscle. Faster cuts mostly lose water and lean mass.",
        },
        {
          q: "Is this medical advice?",
          a: "No. This is a population-average estimate computed in your browser — real needs vary with genetics, health conditions and medication. If you are under 18, pregnant, managing a medical condition or a history of disordered eating, plan intake with a qualified professional.",
        },
      ],
    },
    zh: {
      name: "卡路里计算器",
      tagline:
        "用 Mifflin–St Jeor 公式算出基础代谢,按活动水平得出维持热量(TDEE),再按目标一键设定减脂或增肌的每日千卡摄入。",
      intro: [
        "输入身体数据,如实选择一周的真实活动量,计算器给出三个数:基础代谢(完全静息下的消耗)、维持热量(计入日常与训练后的 TDEE),以及按目标调整 ±500 千卡后的每日摄入——大约对应每周半公斤的减脂或增重速度。",
        "全部计算基于 Mifflin–St Jeor 公式(1990 年发表于《美国临床营养学杂志》),这是对成人实测能耗验证最充分的代谢公式,配合 1.2(久坐)到 1.9(体力职业或一天两练)五档标准活动系数。正确的用法是:按目标吃两三周,再对照体重的真实变化来调整。",
      ],
      steps: [
        "选择性别与单位,输入身高、体重和年龄。",
        "按普通一周(而不是状态最好的一周)选择活动水平。",
        "选择目标——减脂、维持或增肌——读出每日热量目标。",
      ],
      faqs: [
        {
          q: "基础代谢和 TDEE 有什么区别?",
          a: "基础代谢(BMR)是身体只是活着就需要的能量——呼吸、循环、细胞修复。TDEE(每日总消耗)等于基础代谢乘以活动系数,包含步行、工作和训练。想吃维持体重,就按 TDEE 吃。",
        },
        {
          q: "计算器用的是哪个公式?",
          a: "Mifflin–St Jeor 公式(1990 年发表于 American Journal of Clinical Nutrition):10 × 体重(kg)+ 6.25 × 身高(cm)− 5 × 年龄,男性 + 5,女性 − 161。这是大多数膳食指南推荐给健康成年人的公式。",
        },
        {
          q: "为什么目标是 ±500 千卡?",
          a: "一公斤脂肪约储存 7,700 千卡,每天 500 千卡的缺口或盈余大约对应每周 0.5 公斤——这是循证方案最常用的速度,因为可坚持且保肌肉。更快的节食掉的多是水和瘦体重。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是。这是浏览器里算出的人群平均估算——真实需求因基因、健康状况和用药而异。未满 18 岁、孕期、有慢性病或进食障碍史的人群,请与合格专业人士一起制定摄入计划。",
        },
      ],
    },
    ja: {
      name: "カロリー計算",
      tagline:
        "Mifflin–St Jeor 式で基礎代謝を算出し、活動レベルを掛けて維持カロリー(TDEE)を求め、減量・バルクの目標摂取カロリーまで一度に設定できます。",
      intro: [
        "体のデータを入力し、普段の 1 週間の活動量を選ぶと、3 つの数値が表示されます。基礎代謝(完全に安静な状態での消費)、維持カロリー(日常とトレーニングを含む TDEE)、そして目標に応じて ±500 kcal 調整した 1 日の摂取カロリー — 週およそ 0.5 kg のペースに対応します。",
        "計算は Mifflin–St Jeor 式(1990 年、American Journal of Clinical Nutrition)に基づきます。成人の実測エネルギー消費に対して最も検証された代謝式で、1.2(デスクワーク)から 1.9(肉体労働や 1 日 2 練)までの標準的な 5 段階の活動係数を使います。使い方は誠実に:目標カロリーで 2〜3 週間食べ、実際の体重変化と照らして調整してください。",
      ],
      steps: [
        "性別と単位を選び、身長・体重・年齢を入力します。",
        "最高の週ではなく、普通の 1 週間に合う活動レベルを選びます。",
        "目標(減量・維持・増量)を選び、1 日のカロリー目標を確認します。",
      ],
      faqs: [
        {
          q: "基礎代謝と TDEE の違いは?",
          a: "基礎代謝(BMR)は呼吸・循環・細胞の修復など、生きているだけで必要なエネルギーです。TDEE(総消費エネルギー)は BMR に活動係数を掛けた値で、歩行・仕事・トレーニングを含みます。体重維持なら TDEE 近くを摂ります。",
        },
        {
          q: "どの式を使っていますか?",
          a: "Mifflin–St Jeor 式(1990 年):10 × 体重 + 6.25 × 身長 − 5 × 年齢、男性は +5、女性は −161。多くの食事指針が健康な成人に推奨する式です。",
        },
        {
          q: "目標が ±500 kcal なのはなぜ?",
          a: "体脂肪 1 kg には約 7,700 kcal が貯蔵されるため、1 日 500 kcal の赤字・黒字は週約 0.5 kg に相当します。続けやすく筋肉を守れることから、エビデンスに基づく計画で最も使われるペースです。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ。ブラウザ内で計算される集団平均の推定値であり、実際の必要量は遺伝・健康状態・服薬で変わります。18 歳未満、妊娠中、持病や摂食障害の既往がある方は、資格を持つ専門家と一緒に計画してください。",
        },
      ],
    },
    es: {
      name: "Calculadora de calorías",
      tagline:
        "Obtenga su TMB con la ecuación de Mifflin–St Jeor, multiplique por su nivel de actividad para el mantenimiento (TDEE) y fije un objetivo de déficit o volumen en kcal al día.",
      intro: [
        "Introduzca sus datos, indique cuán activa es de verdad su semana y la calculadora muestra tres números: su TMB (lo que quema en reposo absoluto), su TDEE (mantenimiento, contando vida diaria y entrenamiento) y un objetivo ajustado ±500 kcal para perder grasa o ganar músculo — medio kilo por semana, más o menos.",
        "Todo se apoya en la ecuación de Mifflin–St Jeor, la fórmula metabólica mejor validada frente al gasto medido en adultos, con los cinco multiplicadores estándar de 1,2 (trabajo de oficina, poco ejercicio) a 1,9 (trabajo físico o doble sesión diaria). La forma honesta de usar el objetivo: cómalo dos o tres semanas y ajústelo según lo que haga su peso.",
      ],
      steps: [
        "Elija sexo y unidades, e introduzca altura, peso y edad.",
        "Seleccione el nivel de actividad de una semana normal, no de su mejor semana.",
        "Elija objetivo — perder, mantener o ganar — y lea sus calorías diarias.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre TMB y TDEE?",
          a: "La TMB (tasa metabólica basal) es la energía que su cuerpo necesita solo por estar vivo: respiración, circulación, reparación celular. El TDEE (gasto energético total diario) es la TMB multiplicada por un factor de actividad, e incluye caminar, trabajar y entrenar. Para mantener el peso, coma cerca del TDEE.",
        },
        {
          q: "¿Qué fórmula usa la calculadora?",
          a: "La ecuación de Mifflin–St Jeor, publicada en 1990 en American Journal of Clinical Nutrition: 10 × peso(kg) + 6,25 × altura(cm) − 5 × edad, +5 para hombres y −161 para mujeres. Es la que la mayoría de guías dietéticas recomiendan para adultos sanos.",
        },
        {
          q: "¿Por qué ±500 kcal para el objetivo?",
          a: "Un kilo de grasa almacena unas 7.700 kcal, así que un déficit o superávit diario de 500 kcal mueve unos 0,5 kg por semana — el ritmo de la mayoría de planes basados en evidencia, porque es sostenible y preserva músculo. Cortes más rápidos pierden sobre todo agua y masa magra.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No. Es una estimación de promedio poblacional calculada en su navegador; las necesidades reales varían con genética, condiciones de salud y medicación. Si es menor de 18, está embarazada, padece una condición médica o tiene historial de trastorno alimentario, planifique la ingesta con un profesional cualificado.",
        },
      ],
    },
    pt: {
      name: "Calculadora de calorias",
      tagline:
        "Descubra sua TMB pela equação de Mifflin–St Jeor, multiplique pelo seu nível de atividade para a manutenção (TDEE) e defina uma meta de corte ou bulking em kcal por dia.",
      intro: [
        "Informe seus dados, escolha o quanto sua semana é ativa de verdade e a calculadora mostra três números: sua TMB (o que o corpo queima em repouso total), seu TDEE (manutenção, contando vida diária e treino) e uma meta ajustada em ±500 kcal para perder gordura ou ganhar músculo — cerca de meio quilo por semana.",
        "Tudo roda na equação de Mifflin–St Jeor, a fórmula metabólica mais validada contra gasto energético medido em adultos, com os cinco multiplicadores padrão de 1,2 (trabalho de escritório, pouco exercício) a 1,9 (trabalho físico ou treino duas vezes ao dia). O jeito honesto de usar a meta: coma nela por duas ou três semanas e ajuste conforme o que o seu peso realmente faz.",
      ],
      steps: [
        "Escolha sexo e unidades, e informe altura, peso e idade.",
        "Escolha o nível de atividade de uma semana normal, não da sua melhor semana.",
        "Escolha a meta — perder, manter ou ganhar — e leia sua meta diária de calorias.",
      ],
      faqs: [
        {
          q: "Qual a diferença entre TMB e TDEE?",
          a: "A TMB (taxa metabólica basal) é a energia que o corpo precisa só para ficar vivo: respiração, circulação, reparo celular. O TDEE (gasto energético total diário) é a TMB multiplicada por um fator de atividade, incluindo caminhada, trabalho e treino. Para manter o peso, coma perto do TDEE.",
        },
        {
          q: "Qual fórmula a calculadora usa?",
          a: "A equação de Mifflin–St Jeor, publicada em 1990 no American Journal of Clinical Nutrition: 10 × peso(kg) + 6,25 × altura(cm) − 5 × idade, +5 para homens e −161 para mulheres. É a que a maioria das diretrizes dietéticas recomenda para adultos saudáveis.",
        },
        {
          q: "Por que ±500 kcal na meta?",
          a: "Um quilo de gordura guarda cerca de 7.700 kcal, então um déficit ou superávit diário de 500 kcal move uns 0,5 kg por semana — o ritmo da maioria dos planos baseados em evidência, porque é sustentável e preserva músculo. Cortes mais rápidos perdem sobretudo água e massa magra.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não. É uma estimativa de média populacional calculada no seu navegador; necessidades reais variam com genética, condições de saúde e medicação. Se você tem menos de 18, está grávida, gerencia uma condição médica ou tem histórico de transtorno alimentar, planeje a ingestão com um profissional qualificado.",
        },
      ],
    },
  },
});
