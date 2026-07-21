import type { DiagnosisCharacterId } from "@/data/diagnosisCharacters";

export type DiagnosisChoiceScore = {
  characterId: DiagnosisCharacterId;
  points: 50 | 10 | 5 | 3 | 1;
};

const pointValues = [50, 10, 5, 3, 1] as const;

function scores(characterIds: DiagnosisCharacterId[]): DiagnosisChoiceScore[] {
  return characterIds.map((characterId, index) => ({
    characterId,
    points: pointValues[index],
  }));
}

export const diagnosisChoiceScores: Record<number, Record<string, DiagnosisChoiceScore[]>> = {
  1: {
    "choice-1": scores(["kusaka", "takasugi", "yoshida", "saigo", "okubo"]),
    "choice-2": scores(["yoshida", "kido", "omura", "sakamoto", "katsu"]),
    "choice-3": scores(["takasugi", "yamagata", "kido", "katsu", "omura"]),
  },
  2: {
    "choice-1": scores(["takasugi", "kusaka", "okubo", "yoshida", "saigo"]),
    "choice-2": scores(["kusaka", "saigo", "takasugi", "okubo", "yoshida"]),
    "choice-3": scores(["yoshida", "sakamoto", "katsu", "kido", "kusaka"]),
  },
  3: {
    "choice-1": scores(["katsu", "okubo", "sakamoto", "yamagata", "kido"]),
    "choice-2": scores(["saigo", "yoshida", "kusaka", "takasugi", "sakamoto"]),
    "choice-3": scores(["sakamoto", "katsu", "saigo", "omura", "takasugi"]),
  },
  4: {
    "choice-1": scores(["kusaka", "omura", "yamagata", "takasugi", "saigo"]),
    "choice-2": scores(["yoshida", "kido", "katsu", "kusaka", "yamagata"]),
    "choice-3": scores(["kido", "katsu", "omura", "yamagata", "sakamoto"]),
  },
  5: {
    "choice-1": scores(["okubo", "yamagata", "kido", "katsu", "omura"]),
    "choice-2": scores(["okubo", "sakamoto", "yoshida", "kido", "katsu"]),
    "choice-3": scores(["takasugi", "kusaka", "saigo", "omura", "yamagata"]),
  },
  6: {
    "choice-1": scores(["takasugi", "saigo", "kusaka", "okubo", "yoshida"]),
    "choice-2": scores(["katsu", "yoshida", "sakamoto", "saigo", "kido"]),
    "choice-3": scores(["yamagata", "omura", "okubo", "yoshida", "kusaka"]),
  },
  7: {
    "choice-1": scores(["sakamoto", "takasugi", "yamagata", "kusaka", "okubo"]),
    "choice-2": scores(["sakamoto", "okubo", "takasugi", "katsu", "kido"]),
    "choice-3": scores(["kido", "yamagata", "omura", "sakamoto", "takasugi"]),
  },
  8: {
    "choice-1": scores(["kido", "katsu", "yamagata", "omura", "sakamoto"]),
    "choice-2": scores(["takasugi", "kusaka", "saigo", "sakamoto", "okubo"]),
    "choice-3": scores(["omura", "kido", "okubo", "yamagata", "katsu"]),
  },
  9: {
    "choice-1": scores(["katsu", "saigo", "yoshida", "kido", "kusaka"]),
    "choice-2": scores(["kido", "omura", "katsu", "okubo", "yamagata"]),
    "choice-3": scores(["saigo", "okubo", "kusaka", "takasugi", "yoshida"]),
  },
  10: {
    "choice-1": scores(["sakamoto", "yoshida", "kido", "saigo", "takasugi"]),
    "choice-2": scores(["saigo", "sakamoto", "takasugi", "yoshida", "omura"]),
    "choice-3": scores(["yamagata", "takasugi", "sakamoto", "kusaka", "saigo"]),
  },
  11: {
    "choice-1": scores(["saigo", "okubo", "yamagata", "kusaka", "takasugi"]),
    "choice-2": scores(["katsu", "sakamoto", "kido", "saigo", "yoshida"]),
    "choice-3": scores(["omura", "yamagata", "katsu", "okubo", "kido"]),
  },
  12: {
    "choice-1": scores(["omura", "katsu", "okubo", "yamagata", "kusaka"]),
    "choice-2": scores(["yoshida", "kido", "sakamoto", "katsu", "saigo"]),
    "choice-3": scores(["yamagata", "omura", "takasugi", "kido", "okubo"]),
  },
  13: {
    "choice-1": scores(["okubo", "takasugi", "omura", "yoshida", "yamagata"]),
    "choice-2": scores(["yoshida", "saigo", "kusaka", "sakamoto", "katsu"]),
    "choice-3": scores(["omura", "yoshida", "saigo", "takasugi", "sakamoto"]),
  },
  14: {
    "choice-1": scores(["saigo", "kusaka", "yoshida", "omura", "takasugi"]),
    "choice-2": scores(["okubo", "kido", "omura", "yamagata", "katsu"]),
    "choice-3": scores(["kido", "katsu", "yoshida", "omura", "sakamoto"]),
  },
  15: {
    "choice-1": scores(["kusaka", "saigo", "takasugi", "yoshida", "omura"]),
    "choice-2": scores(["omura", "yamagata", "okubo", "kido", "yoshida"]),
    "choice-3": scores(["yamagata", "okubo", "katsu", "saigo", "kido"]),
  },
};
