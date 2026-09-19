import type { DiagnosisCharacterId } from "@/data/diagnosisCharacters";

export const decisionTendencyTexts: Record<DiagnosisCharacterId, string[]> = {
  "yoshida": [
    "目先の損得より、理念や目的を重視する",
    "人の可能性と成長を信じて判断する",
    "未来の姿を言葉にして、周囲へ示そうとする"
  ],
  "kusaka": [
    "自分が正しいと信じる軸を大切にする",
    "難しい局面ほど、覚悟のある選択をする",
    "迷いがあっても、進む方向を明確にしようとする"
  ],
  "takasugi": [
    "前例よりも、状況を変える新しい一手を選ぶ",
    "好機を見つけると、素早く行動へ移す",
    "不利な状況でも、突破口を探して判断する"
  ],
  "kido": [
    "長期的な視点から、進む方向を考える",
    "組織全体への影響を整理して判断する",
    "実行する順序と時機を慎重に見極める"
  ],
  "sakamoto": [
    "対立よりも、協力できる可能性を探す",
    "異なる立場の意見を結びつけて判断する",
    "一人で進めず、仲間を増やしながら形にする"
  ],
  "omura": [
    "感情よりも、事実と根拠を重視する",
    "個人の力量より、再現できる仕組みを選ぶ",
    "無駄を減らし、確実に成果へ近づく道を考える"
  ],
  "saigo": [
    "人との信頼関係を大切にして判断する",
    "相手の思いや誇りを受け止めようとする",
    "重要な局面では、人を信じて力を託し、共に責任を担おうとする"
  ],
  "okubo": [
    "議論だけで終わらせず、実行へ移すことを重視する",
    "必要な改革は、速度を持って進めようとする",
    "厳しい状況でも、現実的な成果を優先する"
  ],
  "katsu": [
    "対立を深めず、現実的な着地点を探す",
    "一部の勝敗より、全体の損失を抑えることを考える",
    "相手の立場も踏まえ、交渉による解決を選ぶ"
  ],
  "yamagata": [
    "個人の力より、継続して動く組織を重視する",
    "リスクを予測し、事前に備える道を選ぶ",
    "規律と役割を明確にして、安定した判断を目指す"
  ]
};

const secondaryDecisionTendencyTexts: Record<DiagnosisCharacterId, string> = {
  "yoshida": "迷ったときは、判断の目的に立ち返る",
  "kusaka": "守るべきものを明確にし、必要な場面では覚悟を持って決める",
  "takasugi": "行き詰まったときは、前例のない方法も選択肢に入れる",
  "kido": "その場の結果だけでなく、将来への影響も考える",
  "sakamoto": "関係する人の意見をつなぎ、協力できる道を探す",
  "omura": "事実や根拠を確かめ、実現できる方法を選ぶ",
  "saigo": "相手の思いや納得も考え、信頼を保てる道を選ぶ",
  "okubo": "決めたことを担当・期限・行動へ落とし込む",
  "katsu": "意見が対立したときも、双方が進める着地点を探す",
  "yamagata": "役割と責任を整理し、組織全体が動ける形を考える"
};

export function getDiagnosisDecisionTendencies(
  primaryId: DiagnosisCharacterId,
  secondaryId: DiagnosisCharacterId,
): string[] {
  return [
    ...decisionTendencyTexts[primaryId].slice(0, 2),
    secondaryDecisionTendencyTexts[secondaryId],
  ];
}
