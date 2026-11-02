import { CalcEnginePace } from "../_engines/calc-engine-pace";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "pace-calculator",
  category: "utility",
  icon: "clock",
  featured: true,
  engine: { component: CalcEnginePace, props: {} },
  related: ["one-rep-max-calculator", "calorie-calculator", "bmi-calculator"],
  copy: {
    en: {
      name: "Pace Calculator",
      tagline:
        "Turn any distance and finish time into pace per km and per mile plus your speed, then project race times at every classic distance with Peter Riegel's 1.06 formula.",
      intro: [
        "Pick a preset — 5K, 10K, half marathon or marathon — or enter a custom distance in kilometers or miles, add your finish time, and read pace per kilometer, pace per mile and speed in km/h and mph in one pass. A half marathon in 2:00:00 comes out as 5:41/km, 9:10/mile and 10.55 km/h without any mental arithmetic.",
        "The predictor tab applies Peter Riegel's endurance formula T₂ = T₁ × (D₂/D₁)^1.06, published in Runner's World in 1977. Give it one honest recent result and it projects expected finish times — and equivalent paces — at every standard distance, so you can pace a first marathon off a half-marathon result instead of guessing.",
      ],
      steps: [
        "Choose a race distance preset, or Custom with a distance in km or miles.",
        "Enter your finish time in hours, minutes and seconds.",
        "Read pace and speed — or open Race predictor to see projected times for every distance.",
      ],
      faqs: [
        {
          q: "What exactly is running pace?",
          a: "Pace is the time it takes you to cover a set distance, almost always quoted per kilometer or per mile — a 50:00 10K is 5:00/km. Speed is the inverse relationship (12 km/h here). Runners train and race by pace because it is what a watch shows while running.",
        },
        {
          q: "Where does the race prediction formula come from?",
          a: "From Peter Riegel, a research engineer who published T₂ = T₁ × (D₂/D₁)^1.06 in Runner's World in 1977. The 1.06 exponent captures how pace fades with distance: doubling the distance costs about 9% more time than doubling the pace linearly would suggest.",
        },
        {
          q: "How reliable are the predicted times?",
          a: "They are statistical estimates, not promises. The formula assumes you trained for the target distance — a half-marathon result projects a marathon only if long runs are actually in your plan. Weather, course profile and fueling all move real outcomes by minutes.",
        },
        {
          q: "Is this coaching or medical advice?",
          a: "No. The calculator does arithmetic on numbers you enter; it does not know your training history or health. Treat the outputs as planning aids, and get individual guidance from a coach or qualified professional before making big training or health decisions.",
        },
      ],
    },
    zh: {
      name: "配速计算器",
      tagline:
        "把任意距离和完赛时间换算成每公里/每英里配速与速度,再用 Peter Riegel 1.06 公式预测各经典距离的比赛成绩。",
      intro: [
        "选择预设——5 公里、10 公里、半马或全马——或以公里/英里输入自定义距离,填上完赛时间,一次读出每公里配速、每英里配速,以及公里/小时和英里/小时两种速度。半马跑进 2:00:00 会直接给出 5:41/km、9:10/mile 和 10.55 km/h,不用心算。",
        "预测页签应用 Peter Riegel 的耐力公式 T₂ = T₁ × (D₂/D₁)^1.06(1977 年发表于《Runner's World》)。只要输入一个真实的近期成绩,就能推算每个标准距离的预期完赛时间与对应配速——用半马成绩为第一个全马定配速,而不是靠猜。",
      ],
      steps: [
        "选择比赛距离预设,或选自定义并输入公里/英里距离。",
        "按时、分、秒输入完赛时间。",
        "读出配速与速度——或打开成绩预测,看各距离的推算时间。",
      ],
      faqs: [
        {
          q: "配速到底是什么?",
          a: "配速是跑完固定距离所用的时间,几乎总以每公里或每英里计——50 分钟跑完 10 公里就是 5:00/km。速度是它的倒数关系(此处为 12 km/h)。跑者按配速训练和比赛,因为手表上跑动中看到的就是它。",
        },
        {
          q: "成绩预测公式来自哪里?",
          a: "来自研究工程师 Peter Riegel,他于 1977 年在《Runner's World》发表了 T₂ = T₁ × (D₂/D₁)^1.06。指数 1.06 刻画配速随距离的衰减:距离翻倍所需的时间,比按线性翻倍多出约 9%。",
        },
        {
          q: "预测时间有多可靠?",
          a: "它们是统计估算,不是承诺。公式假设你为目标距离做过训练——半马成绩能推全马,前提是长距离课真的在你的计划里。天气、赛道起伏和补给都会让真实结果差出几分钟。",
        },
        {
          q: "这是教练指导或医疗建议吗?",
          a: "不是。计算器只对你输入的数字做算术,不了解你的训练史和健康状况。请把输出当规划参考;在做出重大训练或健康决策前,向教练或合格专业人士寻求个性化指导。",
        },
      ],
    },
    ja: {
      name: "ペース計算",
      tagline:
        "距離とタイムから 1 km・1 マイルのペースと速度を算出し、Peter Riegel の指数 1.06 の式で主要レース距離のタイムを予測します。",
      intro: [
        "プリセット(5 km・10 km・ハーフ・フル)を選ぶか、km/マイルでカスタム距離を入力し、フィニッシュタイムを加えると、1 km のペース、1 マイルのペース、km/時とマイル/時の速度が一度にわかります。ハーフ 2:00:00 なら 5:41/km、9:10/マイル、10.55 km/h と、暗算なしで表示されます。",
        "予測タブは Peter Riegel の持久力公式 T₂ = T₁ × (D₂/D₁)^1.06(1977 年、Runner's World)を使用します。直近の実績を 1 つ入れると、各標準距離の予測タイムと対応ペースが出ます — フルデビューのペース配分を、勘ではなくハーフの実績から立てられます。",
      ],
      steps: [
        "レース距離のプリセットを選ぶか、カスタムで km/マイルの距離を入力します。",
        "タイムを時・分・秒で入力します。",
        "ペースと速度を確認 — またはレース予測を開いて各距離の予測タイムを見ます。",
      ],
      faqs: [
        {
          q: "ランニングのペースとは?",
          a: "ペースは一定距離を走るのにかかる時間で、ほぼ常に 1 km か 1 マイルあたりで表します — 10 km を 50 分なら 5:00/km です。速度はその逆の関係(この場合は 12 km/h)。走っている最中に時計に映るのがペースなので、ランナーはペース基準で練習・レースします。",
        },
        {
          q: "レース予測の式はどこから?",
          a: "研究エンジニア Peter Riegel が 1977 年に Runner's World 誌で発表した T₂ = T₁ × (D₂/D₁)^1.06 です。指数 1.06 は距離に伴うペース低下を表し、距離を倍にすると線形換算より約 9% 余分に時間がかかります。",
        },
        {
          q: "予測タイムはどのくらい当てになる?",
          a: "統計的な推定であり、保証ではありません。式は対象距離の練習を積んでいることを仮定します — ハーフの実績からのフル予測は、ロングランが実際に計画にある場合に限り信頼できます。天候・起伏・補給も結果を数分単位で動かします。",
        },
        {
          q: "これはコーチングや医療アドバイスですか?",
          a: "いいえ。計算機は入力された数値に算術を行うだけで、あなたの練習歴や健康状態は知りません。出力は計画の補助として扱い、大きな練習や健康の決断の前にはコーチや資格を持つ専門家の個別指導を受けてください。",
        },
      ],
    },
    es: {
      name: "Calculadora de ritmo",
      tagline:
        "Convierta cualquier distancia y tiempo en ritmo por km y por milla más su velocidad, y proyecte marcas en cada distancia clásica con la fórmula 1.06 de Peter Riegel.",
      intro: [
        "Elija un preset — 5K, 10K, media maratón o maratón — o introduzca una distancia personalizada en kilómetros o millas, añada su tiempo y lea de una pasada el ritmo por kilómetro, por milla y la velocidad en km/h y mph. Una media en 2:00:00 sale como 5:41/km, 9:10/milla y 10,55 km/h sin ningún cálculo mental.",
        "La pestaña de predicción aplica la fórmula de resistencia de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06, publicada en Runner's World en 1977. Con un único resultado reciente honesto proyecta tiempos esperados — y ritmos equivalentes — en cada distancia estándar, para pautar un primer maratón desde una media en lugar de adivinar.",
      ],
      steps: [
        "Elija una distancia predefinida, o Personalizada con una distancia en km o millas.",
        "Introduzca su tiempo en horas, minutos y segundos.",
        "Lea ritmo y velocidad — o abra Predicción de carrera para ver tiempos proyectados en cada distancia.",
      ],
      faqs: [
        {
          q: "¿Qué es exactamente el ritmo de carrera?",
          a: "El ritmo es el tiempo que tarda en cubrir una distancia fija, casi siempre por kilómetro o por milla — un 10K en 50:00 es 5:00/km. La velocidad es la relación inversa (12 km/h aquí). Los corredores entrenan y compiten por ritmo porque es lo que muestra el reloj mientras corren.",
        },
        {
          q: "¿De dónde viene la fórmula de predicción?",
          a: "De Peter Riegel, ingeniero de investigación que publicó T₂ = T₁ × (D₂/D₁)^1.06 en Runner's World en 1977. El exponente 1.06 recoge cómo se degrada el ritmo con la distancia: duplicar la distancia cuesta un 9 % más de tiempo que el duplicado lineal.",
        },
        {
          q: "¿Cómo de fiables son los tiempos previstos?",
          a: "Son estimaciones estadísticas, no promesas. La fórmula supone entrenamiento específico para la distancia objetivo — un resultado de media proyecta un maratón solo si los rodajes largos están de verdad en su plan. El clima, el perfil del recorrido y la nutrición mueven el resultado real minutos enteros.",
        },
        {
          q: "¿Esto es entrenamiento personal o consejo médico?",
          a: "No. La calculadora hace aritmética con los números que usted introduce; no conoce su historial ni su salud. Trate las salidas como ayudas de planificación y busque orientación individual de un entrenador o profesional cualificado antes de tomar decisiones grandes de entrenamiento o salud.",
        },
      ],
    },
    pt: {
      name: "Calculadora de ritmo",
      tagline:
        "Transforme qualquer distância e tempo de prova em ritmo por km e por milha mais sua velocidade, e projete marcas em cada distância clássica com a fórmula 1.06 de Peter Riegel.",
      intro: [
        "Escolha um preset — 5K, 10K, meia maratona ou maratona — ou informe uma distância personalizada em quilômetros ou milhas, adicione seu tempo e leia de uma vez o ritmo por quilômetro, por milha e a velocidade em km/h e mph. Uma meia em 2:00:00 sai como 5:41/km, 9:10/milha e 10,55 km/h sem nenhuma conta de cabeça.",
        "A aba de previsão aplica a fórmula de resistência de Peter Riegel T₂ = T₁ × (D₂/D₁)^1.06, publicada na Runner's World em 1977. Com um único resultado recente e honesto, ela projeta tempos esperados — e ritmos equivalentes — em cada distância padrão, para pautar uma primeira maratona a partir de uma meia em vez de no chute.",
      ],
      steps: [
        "Escolha uma distância predefinida, ou Personalizada com uma distância em km ou milhas.",
        "Digite seu tempo em horas, minutos e segundos.",
        "Leia ritmo e velocidade — ou abra Previsão de prova para ver tempos projetados em cada distância.",
      ],
      faqs: [
        {
          q: "O que exatamente é ritmo de corrida?",
          a: "Ritmo é o tempo que você leva para cobrir uma distância fixa, quase sempre citado por quilômetro ou por milha — um 10K em 50:00 é 5:00/km. Velocidade é a relação inversa (12 km/h aqui). Corredores treinam e competem por ritmo porque é o que o relógio mostra durante a corrida.",
        },
        {
          q: "De onde vem a fórmula de previsão?",
          a: "De Peter Riegel, engenheiro de pesquisa que publicou T₂ = T₁ × (D₂/D₁)^1.06 na Runner's World em 1977. O expoente 1.06 captura como o ritmo cai com a distância: dobrar a distância custa cerca de 9% mais tempo do que a dobra linear sugeria.",
        },
        {
          q: "Quão confiáveis são os tempos previstos?",
          a: "São estimativas estatísticas, não promessas. A fórmula pressupõe treino específico para a distância alvo — um resultado de meia projeta uma maratona só se os treinos longos estiverem de fato no plano. Clima, relevo do percurso e alimentação movem o resultado real por minutos.",
        },
        {
          q: "Isso é orientação de treinador ou conselho médico?",
          a: "Não. A calculadora faz aritmética com os números que você informa; ela não conhece seu histórico nem sua saúde. Trate as saídas como auxílios de planejamento e busque orientação individual de um técnico ou profissional qualificado antes de grandes decisões de treino ou saúde.",
        },
      ],
    },
  },
});
