import { CalcEngineHealth } from "../_engines/calc-engine-health";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "ideal-weight-calculator",
  category: "utility",
  icon: "swap",
  engine: { component: CalcEngineHealth, props: { kind: "idealweight" } },
  related: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"],
  copy: {
    en: {
      name: "Ideal Weight Calculator",
      tagline:
        "Enter your height and get the classic Devine ideal-weight formula for men and women, plus the healthy weight band that keeps BMI between the WHO limits of 18.5 and 24.9.",
      intro: [
        "Type your height and the calculator returns three numbers: the Devine-formula ideal weight for a man of your height, the same for a woman, and the weight band your height supports at a healthy BMI — everything in kilograms or pounds, converted instantly when you switch units.",
        "There is no single ideal weight hidden in a formula, and this page does not pretend otherwise. The Devine equation (1975) was derived to dose medication, not to set goals; the BMI band comes from the WHO's 18.5–24.9 range. Together they bracket a realistic zone — where you land inside it depends on frame size, muscle mass and training history.",
      ],
      steps: [
        "Choose metric (cm) or imperial (ft + in) and enter your height.",
        "Read the Devine estimates for men and women at your height.",
        "Compare with the healthy BMI band — the widest range most evidence treats as healthy.",
      ],
      faqs: [
        {
          q: "What is the Devine formula?",
          a: "An equation published by B. J. Devine in 1975: 50 kg for the first 5 feet of height plus 2.3 kg per additional inch for men, 45.5 kg plus 2.3 kg per inch for women. It was created for calculating drug dosages and remains the most-cited ideal-weight formula in medicine.",
        },
        {
          q: "Why a range instead of one number?",
          a: "Because one number cannot represent a population of different frames and builds. The healthy BMI band — the weight that keeps BMI between 18.5 and 24.9 at your height — is deliberately wide, often spanning 10–15 kg. Any weight inside it is consistent with good health for most people.",
        },
        {
          q: "The Devine number and my BMI band disagree — which one wins?",
          a: "Neither is a target. Devine assumes a mid-century average build and sits near the middle of the BMI band for most heights; muscular people can be perfectly healthy above it, and small-framed people slightly below. Use the band as the boundary and how you feel and perform as the guide.",
        },
        {
          q: "Is this medical advice?",
          a: "No. These are textbook estimates computed in your browser — not a prescription for what you should weigh. Weight decisions, especially planned loss or gain, are best made with a qualified professional who knows your history.",
        },
      ],
    },
    zh: {
      name: "理想体重计算器",
      tagline:
        "输入身高,同时得到男性和女性的经典 Devine 理想体重公式结果,以及让 BMI 保持在 WHO 界值 18.5–24.9 之间的健康体重带。",
      intro: [
        "输入身高,计算器给出三个数:该身高男性的 Devine 公式理想体重、该身高女性的对应值,以及健康 BMI 下该身高可承载的体重带——单位在公斤与磅之间随时切换。",
        "公式里并不藏着唯一的理想体重,本页也不假装如此。Devine 公式(1975)当初为药物剂量推导,不是为了定目标;BMI 带来自 WHO 的 18.5–24.9 区间。两者共同圈出一个现实区间——你落在其中哪里,取决于骨架、肌肉量和训练史。",
      ],
      steps: [
        "选择公制(cm)或英制(英尺 + 英寸),输入身高。",
        "查看该身高下男性和女性的 Devine 估算。",
        "与健康 BMI 带对照——这是多数证据认可的、最宽的健康范围。",
      ],
      faqs: [
        {
          q: "Devine 公式是什么?",
          a: "B. J. Devine 于 1975 年发表的公式:男性前 5 英尺 50 公斤,此后每英寸加 2.3 公斤;女性 45.5 公斤起,每英寸同样加 2.3 公斤。它最初用于计算药物剂量,至今仍是医学文献中被引用最多的理想体重公式。",
        },
        {
          q: "为什么给区间而不是一个数?",
          a: "因为一个数代表不了骨架和体型各异的众多人群。健康 BMI 带——即该身高下 BMI 保持在 18.5–24.9 的体重——刻意做得很宽,常常跨 10–15 公斤。区间内的任何体重,对多数人都与良好健康相容。",
        },
        {
          q: "Devine 数值和我的 BMI 带对不上,听谁的?",
          a: "都不是目标。Devine 假设的是上世纪中叶的平均体型,对多数身高落在 BMI 带中部附近;肌肉发达者高于它也完全健康,小骨架者略低也正常。把带当边界,把状态和运动表现当指南。",
        },
        {
          q: "这是医疗建议吗?",
          a: "不是。这些只是浏览器里算出的教科书估算——不是你该重多少的处方。体重决策(尤其是计划中的减重或增重)最好与了解你病史的合格专业人士一起做。",
        },
      ],
    },
    ja: {
      name: "理想体重計算",
      tagline:
        "身長を入力すると、男性・女性それぞれの古典的な Devine 理想体重式の結果と、BMI を WHO の上限・下限(18.5〜24.9)に保つ健康体重の帯域が一度に得られます。",
      intro: [
        "身長を入力すると 3 つの数値が返ります。その身長の男性に対する Devine 式の理想体重、女性の同値、そして健康な BMI でその身長が支えられる体重の帯域 — kg と lb は切り替えると即座に変換されます。",
        "公式の中に唯一の理想体重が隠れているわけではなく、このページもそう主張しません。Devine 式(1975)は投薬量のために導かれたもので、目標設定用ではありません。BMI の帯域は WHO の 18.5〜24.9 から来ています。両者は現実的なゾーンを挟み込みます — その中のどこに収まるかは、骨格・筋肉量・トレーニング歴次第です。",
      ],
      steps: [
        "メートル法(cm)かヤード・ポンド法(ft + in)を選び、身長を入力します。",
        "その身長における男性・女性の Devine 推定値を確認します。",
        "健康 BMI の帯域と比べます — ほとんどのエビデンスが健康とみなす最も広い範囲です。",
      ],
      faqs: [
        {
          q: "Devine 式とは?",
          a: "B. J. Devine が 1975 年に発表した式です。男性は最初の 5 フィートで 50 kg、以降 1 インチごとに 2.3 kg 加算、女性は 45.5 kg + 1 インチごとに 2.3 kg。薬剤投与量の計算用に作られ、今も医学文献で最も引用される理想体重式です。",
        },
        {
          q: "なぜ 1 つの数値ではなく範囲なの?",
          a: "1 つの数値では骨格も体型も異なる集団を表せないからです。健康 BMI の帯域 — その身長で BMI を 18.5〜24.9 に保つ体重 — は意図的に広く、しばしば 10〜15 kg に及びます。その中のどの体重も、多くの人にとって良い健康と両立します。",
        },
        {
          q: "Devine の数値と BMI 帯が一致しません。どちらを信じる?",
          a: "どちらも目標ではありません。Devine は 20 世紀半ばの平均的体型を仮定しており、多くの身長で BMI 帯の中部付近にあります。筋肉質な人がそれより上でも完全に健康だったり、小骨格の人が少し下でも正常だったりします。帯を境界として、自分の調子とパフォーマンスをガイドにしてください。",
        },
        {
          q: "これは医療アドバイスですか?",
          a: "いいえ。ブラウザ内で計算される教科書的な推定値であり、あなたが何キロであるべきかの処方箋ではありません。体重に関する決断 — 特に計画的な減量・増量 — は、既往歴を知る資格ある専門家と一緒に。",
        },
      ],
    },
    es: {
      name: "Calculadora de peso ideal",
      tagline:
        "Introduzca su altura y obtenga la fórmula clásica de Devine para hombres y mujeres, además de la banda de peso saludable que mantiene el IMC entre los límites OMS de 18,5 y 24,9.",
      intro: [
        "Escriba su altura y la calculadora devuelve tres números: el peso ideal por la fórmula de Devine para un hombre de su estatura, el mismo para una mujer, y la banda de peso que su altura soporta con un IMC saludable — todo en kilos o libras, convertido al instante al cambiar de unidades.",
        "Ninguna fórmula esconde un único peso ideal, y esta página no finge lo contrario. La ecuación de Devine (1975) se derivó para dosificar fármacos, no para marcar objetivos; la banda de IMC viene del rango 18,5–24,9 de la OMS. Juntas delimitan una zona realista — dónde caiga usted dentro depende de complexión, masa muscular e historial de entrenamiento.",
      ],
      steps: [
        "Elija métrico (cm) o imperial (pies + pulgadas) e introduzca su altura.",
        "Lea las estimaciones de Devine para hombres y mujeres de su estatura.",
        "Compárela con la banda de IMC saludable — el rango más amplio que la evidencia considera sano.",
      ],
      faqs: [
        {
          q: "¿Qué es la fórmula de Devine?",
          a: "Una ecuación publicada por B. J. Devine en 1975: 50 kg para los primeros 5 pies de altura más 2,3 kg por pulgada adicional en hombres, y 45,5 kg más 2,3 kg por pulgada en mujeres. Se creó para calcular dosis de fármacos y sigue siendo la fórmula de peso ideal más citada en medicina.",
        },
        {
          q: "¿Por qué un rango y no un número?",
          a: "Porque un número no puede representar una población de complexiones y constituciones distintas. La banda de IMC saludable — el peso que mantiene el IMC entre 18,5 y 24,9 a su altura — es deliberadamente amplia, a menudo 10–15 kg. Cualquier peso dentro es compatible con buena salud para la mayoría.",
        },
        {
          q: "El número de Devine y mi banda de IMC no coinciden, ¿cuál gana?",
          a: "Ninguno es una meta. Devine asume una complexión media de mediados del siglo XX y queda cerca del centro de la banda para la mayoría de alturas; las personas musculosas pueden estar perfectamente sanas por encima, y las de complexión pequeña algo por debajo. Use la banda como frontera y cómo se siente y rinde como guía.",
        },
        {
          q: "¿Esto es consejo médico?",
          a: "No. Son estimaciones de manual calculadas en su navegador — no una receta de cuánto debería pesar. Las decisiones sobre el peso, sobre todo pérdida o ganancia planificada, se toman mejor con un profesional cualificado que conozca su historial.",
        },
      ],
    },
    pt: {
      name: "Calculadora de peso ideal",
      tagline:
        "Informe sua altura e receba a fórmula clássica de Devine para homens e mulheres, mais a faixa de peso saudável que mantém o IMC entre os limites da OMS de 18,5 e 24,9.",
      intro: [
        "Digite sua altura e a calculadora devolve três números: o peso ideal pela fórmula de Devine para um homem da sua altura, o mesmo para uma mulher, e a faixa de peso que sua altura sustenta com um IMC saudável — tudo em quilos ou libras, convertido na hora quando você troca de unidade.",
        "Não existe um único peso ideal escondido numa fórmula, e esta página não finge o contrário. A equação de Devine (1975) foi derivada para dosar medicamentos, não para definir metas; a faixa de IMC vem do intervalo 18,5–24,9 da OMS. Juntas elas cercam uma zona realista — onde você cai dentro dela depende de estrutura, massa muscular e histórico de treino.",
      ],
      steps: [
        "Escolha métrico (cm) ou imperial (pés + polegadas) e informe sua altura.",
        "Leia as estimativas de Devine para homens e mulheres na sua altura.",
        "Compare com a faixa de IMC saudável — o intervalo mais amplo que a evidência trata como saudável.",
      ],
      faqs: [
        {
          q: "O que é a fórmula de Devine?",
          a: "Uma equação publicada por B. J. Devine em 1975: 50 kg para os primeiros 5 pés de altura mais 2,3 kg por polegada adicional para homens, e 45,5 kg mais 2,3 kg por polegada para mulheres. Foi criada para calcular doses de medicamentos e segue sendo a fórmula de peso ideal mais citada na medicina.",
        },
        {
          q: "Por que uma faixa em vez de um número?",
          a: "Porque um número não representa uma população de estruturas e biotipos diferentes. A faixa de IMC saudável — o peso que mantém o IMC entre 18,5 e 24,9 na sua altura — é deliberadamente larga, muitas vezes 10–15 kg. Qualquer peso dentro dela é compatível com boa saúde para a maioria.",
        },
        {
          q: "O número de Devine e minha faixa de IMC divergem — quem vence?",
          a: "Nenhum dos dois é uma meta. Devine assume um biotipo médio de meados do século XX e fica perto do centro da faixa para a maioria das alturas; pessoas musculosas podem estar perfeitamente saudáveis acima dela, e pessoas de estrutura pequena um pouco abaixo. Use a faixa como fronteira e como você se sente e performa como guia.",
        },
        {
          q: "Isso é aconselhamento médico?",
          a: "Não. São estimativas de manual calculadas no seu navegador — não uma receita de quanto você deveria pesar. Decisões de peso, sobretudo perda ou ganho planejado, são melhores tomadas com um profissional qualificado que conheça seu histórico.",
        },
      ],
    },
  },
});
