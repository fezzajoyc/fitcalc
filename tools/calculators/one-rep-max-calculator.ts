import { CalcEngineOrm } from "../_engines/calc-engine-orm";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "one-rep-max-calculator",
  category: "utility",
  icon: "calc",
  featured: true,
  engine: { component: CalcEngineOrm, props: {} },
  related: ["pace-calculator", "bmi-calculator", "body-fat-calculator"],
  copy: {
    en: {
      name: "One-Rep Max Calculator",
      tagline:
        "Estimate your one-rep max from any submaximal set with the Epley and Brzycki formulas, and get the full percentage table for programming working weights rep by rep.",
      intro: [
        "Enter a weight you can lift for a known number of clean reps — say 100 kg for 5 — and the calculator estimates the most you could lift once, using both classic formulas. Epley is the simpler and more common estimate; Brzycki tends to read slightly lower at higher rep counts, and seeing both brackets the honest answer.",
        "Below the result sits the training table: predicted max weights for 1 through 12 reps with the percentage of 1RM each represents. That table is the real point — programs built around percentages (5×5 at 85%, 3×8 at 70%) only work when the percentages come from a realistic max, and this tool produces one without you having to attempt a true single.",
      ],
      steps: [
        "Enter the weight you lifted and how many reps you completed with good form.",
        "Pick kg or lb — results come back in the same unit.",
        "Read both 1RM estimates and use the percentage table to set working weights.",
      ],
      faqs: [
        {
          q: "Which formula does the calculator use?",
          a: "Two. Epley (1985): 1RM = w × (1 + reps/30). Brzycki (1993): 1RM = w × 36/(37 − reps). They agree within a few percent below about 10 reps and diverge beyond it, which is why both are shown. A single rep returns the weight itself for either formula.",
        },
        {
          q: "How many reps should I base the estimate on?",
          a: "Sets of 3–8 reps give the most trustworthy estimates. Above ten reps, local fatigue and pacing dominate the set and every formula drifts upward — a 20-rep set says more about conditioning than about maximal strength.",
        },
        {
          q: "How do I use the percentage table?",
          a: "Strength programs prescribe loads as percentages of 1RM: roughly 90–95% for heavy singles and doubles, 80–85% for 5s, 70–75% for 8–10s. Find your target rep count in the table and use the weight shown — it is by definition the load matching that percentage of your estimated max.",
        },
        {
          q: "Is this estimate safe to train with?",
          a: "It is a planning number, not a challenge. Attempting a true single near your estimate is how injuries happen — if you ever test the lift for real, do it with a spotter, safety pins and a proper warm-up. And it remains an estimate: nothing here is coaching or medical advice.",
        },
      ],
    },
    zh: {
      name: "1RM 计算器",
      tagline:
        "用 Epley 与 Brzycki 两个经典公式,从任何次极限组估算你的单次极限重量,并生成 1–12 次重复的百分比训练表,按次数安排工作重量。",
      intro: [
        "输入你能以标准动作完成已知次数的重量——比如 100 公斤做 5 次——计算器会用两个经典公式估算你极限一次能举起的重量。Epley 更简单也更常用;Brzycki 在次数较高时略保守,两个数一起看才是诚实的答案。",
        "结果下方是训练表:1 到 12 次重复各自对应的预测极限重量及其占 1RM 的百分比。这张表才是重点——基于百分比的计划(85% 做 5×5、70% 做 3×8)只有在百分比来自真实可信的极限时才有效,这个工具让你不必真的去冲一次极限。",
      ],
      steps: [
        "输入你举起的重量和标准动作完成的次数。",
        "选择 kg 或 lb——结果以相同单位返回。",
        "查看两个 1RM 估算,并用百分比表设定训练重量。",
      ],
      faqs: [
        {
          q: "计算器用的是哪个公式?",
          a: "两个。Epley(1985):1RM = w × (1 + 次数/30);Brzycki(1993):1RM = w × 36/(37 − 次数)。约 10 次以内两者相差不到几个百分点,超过则分歧变大——所以两个都展示。次数为 1 时,两式都等于所举重量本身。",
        },
        {
          q: "估算应该基于多少次?",
          a: "3–8 次的组给出的估算最可信。超过 10 次后,局部疲劳和配速主导了整组,所有公式都会向上漂移——20 次一组说明的是耐力,不是最大力量。",
        },
        {
          q: "百分比表怎么用?",
          a: "力量计划通常以 1RM 的百分比开方:约 90–95% 做重的单次和双次,80–85% 做 5 次,70–75% 做 8–10 次。在表中找到目标次数对应的重量直接用——按定义,它就是估算极限乘以该百分比的负荷。",
        },
        {
          q: "用这个估算训练安全吗?",
          a: "它是计划数字,不是挑战书。在估算值附近真的去冲单次极限正是受伤的高发场景——如果确实要实测,请务必有保护者、保护架和充分热身。它终究是估算:本页内容不构成教练指导或医疗建议。",
        },
      ],
    },
    ja: {
      name: "1RM 計算",
      tagline:
        "Epley と Brzycki の 2 式でサブマックスのセットから 1RM を推定し、1〜12 レップの百分比テーブルまで生成。レップ数に応じた作業重量をそのまま組めます。",
      intro: [
        "良好なフォームで決まったレップ挙げられる重量 — 例えば 100 kg × 5 — を入力すると、古典的な 2 つの式で 1 回挙げられる极限の重量を推定します。Epley はより単純で一般的。Brzycki はレップ数が多いほどやや低めに出るので、2 つ並べて見るのが誠実な答えです。",
        "結果の下にあるのがトレーニングテーブル:1〜12 レップそれぞれの推定重量と 1RM に対する百分比です。これが本当の目的 — 百分比ベースのプログラム(85% で 5×5、70% で 3×8)は、その百分比が現実的なマックスから来ているときだけ機能します。本番のシングルを試さずにそれを出せるのがこのツールです。",
      ],
      steps: [
        "挙げた重量と、フォームを崩さずに完了したレップ数を入力します。",
        "kg か lb を選択 — 結果は同じ単位で返ります。",
        "2 つの 1RM 推定を確認し、百分比テーブルで作業重量を設定します。",
      ],
      faqs: [
        {
          q: "どの式を使っていますか?",
          a: "2 つです。Epley(1985):1RM = w × (1 + レップ数/30)。Brzycki(1993):1RM = w × 36/(37 − レップ数)。約 10 レップ以下では数 % 以内で一致し、それ以上で乖離します — だから両方表示します。1 レップならどちらの式も挙げた重量そのものです。",
        },
        {
          q: "何レップを基準にすればいい?",
          a: "3〜8 レップのセットが最も信頼できる推定になります。10 レップを超えると局所疲労とペーシングがセットを支配し、あらゆる式が上方にぶれます — 20 レップのセットは最大筋力より体力の指標です。",
        },
        {
          q: "百分比テーブルの使い方は?",
          a: "筋力プログラムは負荷を 1RM の百分比で指定します:重いシングル・ダブルは約 90〜95%、5 レップは 80〜85%、8〜10 レップは 70〜75%。テーブルで目標レップ数の行を見つけて、その重量を使ってください — 定義上、それが推定マックスのその百分比に当たる負荷です。",
        },
        {
          q: "この推定でトレーニングして安全?",
          a: "計画用の数字であり、挑戦状ではありません。推定値付近で本気のシングルを試すのは怪我の典型パターンです — 実測するならサポーター・セーフティピン・十分なウォームアップを。あくまで推定であり、指導や医療の助言ではありません。",
        },
      ],
    },
    es: {
      name: "Calculadora de 1RM",
      tagline:
        "Estime su máximo de una repetición desde cualquier serie submáxima con las fórmulas de Epley y Brzycki, y obtenga la tabla de porcentajes completa para programar cargas rep a rep.",
      intro: [
        "Introduzca un peso que pueda levantar un número conocido de repeticiones limpias — digamos 100 kg para 5 — y la calculadora estima cuánto podría levantar una vez, con ambas fórmulas clásicas. Epley es la más simple y común; Brzycki suele leer algo más bajo a más repeticiones, y ver ambas acota la respuesta honesta.",
        "Bajo el resultado está la tabla de entrenamiento: máximos previstos de 1 a 12 repeticiones con el porcentaje del 1RM que representa cada una. Esa tabla es el punto: los programas basados en porcentajes (5×5 al 85%, 3×8 al 70%) solo funcionan cuando los porcentajes salen de un máximo realista, y esta herramienta produce uno sin que tenga que intentar un single de verdad.",
      ],
      steps: [
        "Introduzca el peso levantado y las repeticiones completadas con buena técnica.",
        "Elija kg o lb — los resultados vuelven en la misma unidad.",
        "Lea ambas estimaciones de 1RM y use la tabla de porcentajes para fijar las cargas.",
      ],
      faqs: [
        {
          q: "¿Qué fórmula usa la calculadora?",
          a: "Dos. Epley (1985): 1RM = w × (1 + reps/30). Brzycki (1993): 1RM = w × 36/(37 − reps). Coinciden dentro de un pequeño porcentaje por debajo de ~10 reps y divergen a partir de ahí, por eso se muestran ambas. Con una repetición, las dos devuelven el propio peso.",
        },
        {
          q: "¿Sobre cuántas repeticiones debo basar la estimación?",
          a: "Las series de 3–8 reps dan las estimaciones más fiables. Por encima de diez, la fatiga local y el ritmo dominan la serie y toda fórmula se desvía al alza — una serie de 20 dice más de condición que de fuerza máxima.",
        },
        {
          q: "¿Cómo uso la tabla de porcentajes?",
          a: "Los programas de fuerza prescriben cargas como porcentajes del 1RM: 90–95% para singles y dobles pesados, 80–85% para series de 5, 70–75% para 8–10. Busque su repeticiones objetivo en la tabla y use el peso mostrado — por definición, es la carga que corresponde a ese porcentaje de su máximo estimado.",
        },
        {
          q: "¿Es seguro entrenar con esta estimación?",
          a: "Es un número para planificar, no un desafío. Intentar un single real cerca de la estimación es como se producen las lesiones — si alguna vez prueba el levantamiento de verdad, hágalo con seguro, soportes y un calentamiento completo. Sigue siendo una estimación: nada aquí es asesoramiento de entrenador ni médico.",
        },
      ],
    },
    pt: {
      name: "Calculadora de 1RM",
      tagline:
        "Estime sua carga máxima de uma repetição a partir de qualquer série submáxima com as fórmulas de Epley e Brzycki, e receba a tabela de porcentagens completa para programar cargas rep por rep.",
      intro: [
        "Informe um peso que você consiga levantar por um número conhecido de repetições limpas — digamos 100 kg por 5 — e a calculadora estima quanto você levantaria uma vez, usando as duas fórmulas clássicas. Epley é a mais simples e comum; Brzycki tende a ler um pouco mais baixo em reps altas, e ver as duas cercam a resposta honesta.",
        "Abaixo do resultado fica a tabela de treino: cargas máximas previstas de 1 a 12 reps com o percentual do 1RM que cada uma representa. Essa tabela é o ponto central — programas baseados em porcentagem (5×5 a 85%, 3×8 a 70%) só funcionam quando as porcentagens vêm de uma carga máxima realista, e esta ferramenta produz uma sem você precisar tentar um single de verdade.",
      ],
      steps: [
        "Informe o peso levantado e quantas repetições completou com boa técnica.",
        "Escolha kg ou lb — os resultados voltam na mesma unidade.",
        "Leia as duas estimativas de 1RM e use a tabela de porcentagens para definir as cargas.",
      ],
      faqs: [
        {
          q: "Qual fórmula a calculadora usa?",
          a: "Duas. Epley (1985): 1RM = w × (1 + reps/30). Brzycki (1993): 1RM = w × 36/(37 − reps). Elas concordam dentro de poucos pontos abaixo de ~10 reps e divergem depois disso — por isso ambas são mostradas. Com uma repetição, as duas devolvem o próprio peso.",
        },
        {
          q: "Com quantas repetições devo basear a estimativa?",
          a: "Séries de 3–8 reps dão as estimativas mais confiáveis. Acima de dez, a fadiga local e o ritmo dominam a série e toda fórmula desvia para cima — uma série de 20 diz mais sobre condicionamento do que sobre força máxima.",
        },
        {
          q: "Como uso a tabela de porcentagens?",
          a: "Programas de força prescrevem cargas como porcentagens do 1RM: cerca de 90–95% para singles e dupes pesados, 80–85% para séries de 5, 70–75% para 8–10. Encontre seu número alvo de reps na tabela e use o peso indicado — por definição, é a carga que corresponde a esse percentual do seu máximo estimado.",
        },
        {
          q: "É seguro treinar com essa estimativa?",
          a: "É um número de planejamento, não um desafio. Tentar um single real perto da estimativa é assim que lesões acontecem — se for testar de verdade, use apoio, pinos de segurança e um aquecimento completo. Continua sendo uma estimativa: nada aqui é orientação de técnico nem conselho médico.",
        },
      ],
    },
  },
});
