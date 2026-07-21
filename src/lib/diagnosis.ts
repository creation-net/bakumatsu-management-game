import { diagnosisCharacters } from "@/data/diagnosisCharacters";
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
};

export type DiagnosisResult = {
  primary: DiagnosisCharacter;
  secondary: DiagnosisCharacter;
  ranks: DiagnosisRank[];
  selectedCount: number;
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
    const characterId = choice ? findDiagnosisCharacterId(choice.person, choice.value, choice.text) : undefined;

    if (!characterId) {
      return;
    }

    scores.set(characterId, (scores.get(characterId) ?? 0) + 1);
    lastSelectedOrder.set(characterId, index);
  });

  const ranks = diagnosisCharacters
    .map((character, index) => ({
      character,
      score: scores.get(character.id) ?? 0,
      lastSelected: lastSelectedOrder.get(character.id) ?? -1,
      index,
    }))
    .sort((a, b) => b.score - a.score || b.lastSelected - a.lastSelected || a.index - b.index)
    .map(({ character, score }) => ({ character, score }));

  const primary = ranks[0]?.character ?? diagnosisCharacters[0];
  const secondary = ranks.find((rank) => rank.character.id !== primary.id)?.character ?? diagnosisCharacters[1];

  return {
    primary,
    secondary,
    ranks,
    selectedCount: Object.keys(progress.choices).length,
  };
}

function findDiagnosisCharacterId(...values: Array<string | undefined>): DiagnosisCharacterId | undefined {
  for (const value of values) {
    if (!value) {
      continue;
    }

    const direct = characterAliases[value];
    if (direct) {
      return direct;
    }

    const matchedAlias = Object.entries(characterAliases).find(([name]) => value.includes(name));
    if (matchedAlias) {
      return matchedAlias[1];
    }
  }

  return undefined;
}
