import { valueAndStrengthTexts } from "@/data/診断テキスト/価値観ともう一つの強み";
import { decisionTendencyTexts } from "@/data/診断テキスト/意思決定の特徴";
import { defaultCautionTexts } from "@/data/診断テキスト/経営で気を付けたいこと";

export type DiagnosisCharacterId =
  | "yoshida"
  | "kusaka"
  | "takasugi"
  | "kido"
  | "sakamoto"
  | "omura"
  | "saigo"
  | "okubo"
  | "katsu"
  | "yamagata";

export type DiagnosisCharacter = {
  id: DiagnosisCharacterId;
  name: string;
  type: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  secondaryDescription: string;
  cautionAdvice: string;
  decisionTendencies: string[];
};

export const diagnosisCharacters: DiagnosisCharacter[] = [
  {
    id: "yoshida",
    name: "吉田 松陰",
    type: "理念型",
    summary: valueAndStrengthTexts.yoshida.valueDescription,
    strengths: ["理念や目的を言葉にできる","人の可能性を信じて育てられる","困難な状況でも志を失いにくい"],
    challenges: ["理想が先に立ち、現実の制約を見落とすことがある","周囲に高い覚悟を求めすぎることがある"],
    secondaryDescription: valueAndStrengthTexts.yoshida.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.yoshida,
    decisionTendencies: decisionTendencyTexts.yoshida,
  },
  {
    id: "kusaka",
    name: "久坂 玄瑞",
    type: "信念型",
    summary: valueAndStrengthTexts.kusaka.valueDescription,
    strengths: ["ぶれない判断軸を持てる","困難な局面で覚悟を示せる","周囲に本気度を伝えられる"],
    challenges: ["信念が強いほど選択肢を狭めることがある","状況の変化に合わせた軌道修正が遅れることがある"],
    secondaryDescription: valueAndStrengthTexts.kusaka.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.kusaka,
    decisionTendencies: decisionTendencyTexts.kusaka,
  },
  {
    id: "takasugi",
    name: "高杉 晋作",
    type: "革新型",
    summary: valueAndStrengthTexts.takasugi.valueDescription,
    strengths: ["停滞した状況を動かせる","前例に縛られず発想できる","勝負所で大胆に踏み出せる"],
    challenges: ["周囲がついてくる前に動きすぎることがある","勢いが強いほど反発を招くことがある"],
    secondaryDescription: valueAndStrengthTexts.takasugi.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.takasugi,
    decisionTendencies: decisionTendencyTexts.takasugi,
  },
  {
    id: "kido",
    name: "木戸 孝允",
    type: "戦略型",
    summary: valueAndStrengthTexts.kido.valueDescription,
    strengths: ["長期的な視点から方針を考えられる","複雑な状況を整理できる","周囲と調整しながら改革を進められる"],
    challenges: ["慎重になりすぎて決断が遅れることがある","周囲への配慮から自分の考えを抑えることがある"],
    secondaryDescription: valueAndStrengthTexts.kido.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.kido,
    decisionTendencies: decisionTendencyTexts.kido,
  },
  {
    id: "sakamoto",
    name: "坂本 龍馬",
    type: "共創型",
    summary: valueAndStrengthTexts.sakamoto.valueDescription,
    strengths: ["人と人をつなげられる","異なる意見から新しい可能性を見つけられる","開かれた関係性をつくれる"],
    challenges: ["構想が広がりすぎて焦点がぼやけることがある","調整相手が増えるほど実行が遅れることがある"],
    secondaryDescription: valueAndStrengthTexts.sakamoto.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.sakamoto,
    decisionTendencies: decisionTendencyTexts.sakamoto,
  },
  {
    id: "omura",
    name: "大村 益次郎",
    type: "合理型",
    summary: valueAndStrengthTexts.omura.valueDescription,
    strengths: ["状況を冷静に分析できる","仕組みや制度で問題を解決できる","無駄を減らして成果に近づける"],
    challenges: ["正しさを重視するあまり感情面への配慮が薄くなることがある","周囲に冷たく見られることがある"],
    secondaryDescription: valueAndStrengthTexts.omura.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.omura,
    decisionTendencies: decisionTendencyTexts.omura,
  },
  {
    id: "saigo",
    name: "西郷 隆盛",
    type: "人望型",
    summary: valueAndStrengthTexts.saigo.valueDescription,
    strengths: ["人から信頼されやすい","相手の感情や誇りを受け止められる","大きな局面で腹をくくれる"],
    challenges: ["人情を重んじるほど判断が重くなることがある","期待を背負い込みすぎることがある"],
    secondaryDescription: valueAndStrengthTexts.saigo.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.saigo,
    decisionTendencies: decisionTendencyTexts.saigo,
  },
  {
    id: "okubo",
    name: "大久保 利通",
    type: "実行型",
    summary: valueAndStrengthTexts.okubo.valueDescription,
    strengths: ["決めたことを実行に移せる","制度や組織を現実的に作り替えられる","厳しい判断から逃げにくい"],
    challenges: ["実行を優先するほど周囲に厳しく映ることがある","反発や孤立を招くことがある"],
    secondaryDescription: valueAndStrengthTexts.okubo.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.okubo,
    decisionTendencies: decisionTendencyTexts.okubo,
  },
  {
    id: "katsu",
    name: "勝 海舟",
    type: "調整型",
    summary: valueAndStrengthTexts.katsu.valueDescription,
    strengths: ["対立を収める道を探せる","広い視野で損失を抑えられる","現実的な交渉ができる"],
    challenges: ["強い主張をする人から弱腰に見られることがある","妥協点を探すほど本音が伝わりにくいことがある"],
    secondaryDescription: valueAndStrengthTexts.katsu.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.katsu,
    decisionTendencies: decisionTendencyTexts.katsu,
  },
  {
    id: "yamagata",
    name: "山縣 有朋",
    type: "組織型",
    summary: valueAndStrengthTexts.yamagata.valueDescription,
    strengths: ["組織の規律を整えられる","継続的に動く仕組みを考えられる","リスクに備えた体制を作れる"],
    challenges: ["統制を重んじるほど柔軟さを欠くことがある","現場の自由度を狭めることがある"],
    secondaryDescription: valueAndStrengthTexts.yamagata.secondaryStrengthDescription,
    cautionAdvice: defaultCautionTexts.yamagata,
    decisionTendencies: decisionTendencyTexts.yamagata,
  },
];
