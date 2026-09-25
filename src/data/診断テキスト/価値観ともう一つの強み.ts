import type { DiagnosisCharacterId } from "@/data/diagnosisCharacters";

export type ValueAndStrengthText = {
  valueDescription: string;
  secondaryStrengthDescription: string;
};

export const valueAndStrengthTexts: Record<DiagnosisCharacterId, ValueAndStrengthText> = {
  "yoshida": {
    "valueDescription": "あなたは大切にすべき理念を掲げ、人の心に火をつけながら未来への道を示すことができます",
    "secondaryStrengthDescription": "人の可能性を信じ、理念によって周囲を奮い立たせる力"
  },
  "kusaka": {
    "valueDescription": "あなたは強い信念を軸に、迷いの多い局面でも覚悟をもって前に進むことができます",
    "secondaryStrengthDescription": "信念を貫き、困難な場面でも覚悟を示す力"
  },
  "takasugi": {
    "valueDescription": "あなたは古い前提にとらわれず、状況を打開する新しい一手を選ぶことができます",
    "secondaryStrengthDescription": "前例にとらわれず、停滞した状況を動かす突破力"
  },
  "kido": {
    "valueDescription": "あなたは先を見通し、組織全体の進む方向を考えながら改革を進めることができます",
    "secondaryStrengthDescription": "状況を広く捉え、将来を見据えて物事の順序を組み立てる力"
  },
  "sakamoto": {
    "valueDescription": "あなたは立場の異なる人をつなぎ、協力者を増やしながら構想を形にすることができます",
    "secondaryStrengthDescription": "立場の異なる人をつなぎ、協力関係を広げる力"
  },
  "omura": {
    "valueDescription": "あなたは感情に流されず、事実と仕組みから最も合理的な道を選ぶことができます",
    "secondaryStrengthDescription": "感情に流されず、事実と仕組みから判断する力"
  },
  "saigo": {
    "valueDescription": "あなたは人の思いを受け止め、信頼と覚悟によって周囲をまとめることができます",
    "secondaryStrengthDescription": "人の思いを受け止め、信頼によって周囲を動かす力"
  },
  "okubo": {
    "valueDescription": "あなたは必要な改革を現実に進めるため、決断と実務を積み重ねることができます",
    "secondaryStrengthDescription": "構想を現実に落とし込み、粘り強く実行する力"
  },
  "katsu": {
    "valueDescription": "あなたは対立する相手とも向き合い、全体を守る落としどころを探ることができます",
    "secondaryStrengthDescription": "対立の中でも全体を見て、現実的な落としどころを探る力"
  },
  "yamagata": {
    "valueDescription": "あなたは個人の力に頼りすぎず、継続して動く組織や仕組みを整えることができます",
    "secondaryStrengthDescription": "継続して動く組織や体制を整える力"
  }
};
