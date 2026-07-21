import { diagnosisCharacters } from "@/data/diagnosisCharacters";
import { diagnosisChoiceScores } from "@/data/diagnosisChoiceScores";
import { diagnosisChoiceReflections } from "@/data/diagnosisChoiceReflections";
import { chapters } from "@/data/chapters";
import type { DiagnosisCharacter, DiagnosisCharacterId } from "@/data/diagnosisCharacters";
import type { ReadingProgress } from "@/types/story";

const characterAliases: Record<string, DiagnosisCharacterId> = {
  吉田松陰: "yoshida",
  久坂玄瑞: "kusaka",
  高杉晋作: "takasugi",
  木戸孝允: "kido",
  桂小五郎: "kido",
  坂本龍馬: "sakamoto",
  大村益次郎: "omura",
  村田蔵六: "omura",
  西郷隆盛: "saigo",
  西郷吉之助: "saigo",
  大久保利通: "okubo",
  勝海舟: "katsu",
  山縣有朋: "yamagata",
  山縣狂介: "yamagata",
  山県有朋: "yamagata",
  山県狂介: "yamagata",
};

export type DiagnosisRank = {
  character: DiagnosisCharacter;
  score: number;
  percentage: number;
};

export type DiagnosisResult = {
  primary: DiagnosisCharacter;
  secondary: DiagnosisCharacter;
  ranks: DiagnosisRank[];
  selectedCount: number;
  influentialChoices: string[];
};

export function calculateDiagnosis(progress: ReadingProgress): DiagnosisResult {
  const scores = new Map<DiagnosisCharacterId, number>();
  const lastSelectedOrder = new Map<DiagnosisCharacterId, number>();

  diagnosisCharacters.forEach((character) => {
    scores.set(character.id, 0);
    lastSelectedOrder.set(character.id, -1);
  });

  chapters.forEach((chapter, index) => {
    const choiceId = progress.choices[chapter.id];
    const choice = chapter.choices.find((item) => item.id === choiceId);
    const scoreSet = diagnosisChoiceScores[chapter.id]?.[choiceId];

    if (scoreSet) {
      scoreSet.forEach(({ characterId, points }) => {
        scores.set(characterId, (scores.get(characterId) ?? 0) + points);
        lastSelectedOrder.set(characterId, index);
      });
      return;
    }

    const characterId = choice ? findDiagnosisCharacterId(choice.person, choice.value, choice.text) : undefined;
    if (!characterId) {
      return;
    }

    scores.set(characterId, (scores.get(characterId) ?? 0) + 1);
    lastSelectedOrder.set(characterId, index);
  });

  const rankedScores = diagnosisCharacters
    .map((character, index) => ({
      character,
      score: scores.get(character.id) ?? 0,
      lastSelected: lastSelectedOrder.get(character.id) ?? -1,
      index,
    }))
    .sort((a, b) => b.score - a.score || b.lastSelected - a.lastSelected || a.index - b.index);

  const totalScore = rankedScores.reduce((total, rank) => total + rank.score, 0);
  const ranks = rankedScores.map(({ character, score }) => ({
    character,
    score,
    percentage: totalScore > 0 ? Math.round((score / totalScore) * 100) : 0,
  }));

  const primary = ranks[0]?.character ?? diagnosisCharacters[0];
  const secondary = ranks.find((rank) => rank.character.id !== primary.id)?.character ?? diagnosisCharacters[1];
  const influentialChoices = getInfluentialChoices(progress, primary.id, secondary.id);

  return {
    primary,
    secondary,
    ranks,
    selectedCount: Object.keys(progress.choices).length,
    influentialChoices,
  };
}

function getInfluentialChoices(
  progress: ReadingProgress,
  primaryId: DiagnosisCharacterId,
  secondaryId: DiagnosisCharacterId,
): string[] {
  const candidates = chapters.flatMap((chapter, index) => {
    const choiceId = progress.choices[chapter.id];
    if (!choiceId) {
      return [];
    }

    const choice = chapter.choices.find((item) => item.id === choiceId);
    const scoreSet = diagnosisChoiceScores[chapter.id]?.[choiceId] ?? [];
    const primaryPoints = scoreSet.find((score) => score.characterId === primaryId)?.points ?? 0;
    const secondaryPoints = scoreSet.find((score) => score.characterId === secondaryId)?.points ?? 0;
    const strongestPositive = Math.max(0, ...scoreSet.map((score) => score.points));
    const reflection = diagnosisChoiceReflections[chapter.id]?.[choiceId]
      ?? sanitizeChoiceText(choice?.text ?? "");

    return [{ reflection, primaryPoints, secondaryPoints, strongestPositive, index }];
  });

  return candidates
    .filter((candidate) => candidate.reflection)
    .sort((a, b) => (
      b.primaryPoints - a.primaryPoints
      || b.secondaryPoints - a.secondaryPoints
      || b.strongestPositive - a.strongestPositive
      || b.index - a.index
    ))
    .filter((candidate, index, items) => (
      items.findIndex((item) => item.reflection === candidate.reflection) === index
    ))
    .slice(0, 5)
    .map((candidate) => candidate.reflection);
}

function sanitizeChoiceText(text: string): string {
  return text
    .replace(/^[①②③]\s*/, "")
    .replace(/[「」]/g, "")
    .replace(/\\n/g, " ")
    .trim();
}

function findDiagnosisCharacterId(...values: Array<string | undefined>): DiagnosisCharacterId | undefined {
  for (const value of values) {
    if (!value) {
      continue;
    }

    const normalizedValue = value.replace(/\s/g, "");
    const direct = characterAliases[normalizedValue];
    if (direct) {
      return direct;
    }

    const matchedAlias = Object.entries(characterAliases).find(([name]) => normalizedValue.includes(name));
    if (matchedAlias) {
      return matchedAlias[1];
    }
  }

  return undefined;
}
