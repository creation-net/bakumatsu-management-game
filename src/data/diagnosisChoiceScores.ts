import type { DiagnosisCharacterId } from "@/data/diagnosisCharacters";

export type DiagnosisChoiceScore = {
  characterId: DiagnosisCharacterId;
  points: 100 | 10 | 5 | 3 | 1 | -10;
};

const pointValues = [100, 10, 5, 3, 1] as const;

function scores(
  characterIds: DiagnosisCharacterId[],
  oppositeCharacterId: DiagnosisCharacterId,
): DiagnosisChoiceScore[] {
  return [
    ...characterIds.map((characterId, index) => ({
      characterId,
      points: pointValues[index],
    })),
    { characterId: oppositeCharacterId, points: -10 },
  ];
}

export const diagnosisChoiceScores: Record<number, Record<string, DiagnosisChoiceScore[]>> = {
  1: {
    "choice-1": scores(["kusaka", "takasugi", "yoshida", "saigo", "okubo"], "katsu"),
    "choice-2": scores(["yoshida", "kido", "omura", "sakamoto", "katsu"], "kusaka"),
    "choice-3": scores(["takasugi", "yamagata", "kido", "katsu", "omura"], "yoshida"),
  },
  2: {
    "choice-1": scores(["takasugi", "kusaka", "okubo", "yoshida", "saigo"], "kido"),
    "choice-2": scores(["kusaka", "saigo", "takasugi", "okubo", "yoshida"], "katsu"),
    "choice-3": scores(["yoshida", "sakamoto", "katsu", "kido", "kusaka"], "saigo"),
  },
  3: {
    "choice-1": scores(["katsu", "okubo", "sakamoto", "yamagata", "kido"], "yoshida"),
    "choice-2": scores(["saigo", "yoshida", "kusaka", "takasugi", "sakamoto"], "katsu"),
    "choice-3": scores(["sakamoto", "katsu", "saigo", "omura", "takasugi"], "yamagata"),
  },
  4: {
    "choice-1": scores(["kusaka", "omura", "yamagata", "takasugi", "saigo"], "kido"),
    "choice-2": scores(["yoshida", "kido", "katsu", "kusaka", "yamagata"], "saigo"),
    "choice-3": scores(["kido", "katsu", "omura", "yamagata", "sakamoto"], "yoshida"),
  },
  5: {
    "choice-1": scores(["okubo", "yamagata", "kido", "katsu", "omura"], "takasugi"),
    "choice-2": scores(["okubo", "sakamoto", "yoshida", "kido", "katsu"], "kusaka"),
    "choice-3": scores(["takasugi", "kusaka", "saigo", "omura", "yamagata"], "kido"),
  },
  6: {
    "choice-1": scores(["takasugi", "saigo", "kusaka", "okubo", "yoshida"], "yamagata"),
    "choice-2": scores(["katsu", "yoshida", "sakamoto", "saigo", "kido"], "takasugi"),
    "choice-3": scores(["yamagata", "omura", "okubo", "yoshida", "kusaka"], "takasugi"),
  },
  7: {
    "choice-1": scores(["sakamoto", "takasugi", "yamagata", "kusaka", "okubo"], "yoshida"),
    "choice-2": scores(["sakamoto", "okubo", "takasugi", "katsu", "kido"], "omura"),
    "choice-3": scores(["kido", "yamagata", "omura", "sakamoto", "takasugi"], "katsu"),
  },
  8: {
    "choice-1": scores(["kido", "katsu", "yamagata", "omura", "sakamoto"], "takasugi"),
    "choice-2": scores(["takasugi", "kusaka", "saigo", "sakamoto", "okubo"], "yamagata"),
    "choice-3": scores(["omura", "kido", "okubo", "yamagata", "katsu"], "yoshida"),
  },
  9: {
    "choice-1": scores(["katsu", "saigo", "yoshida", "kido", "kusaka"], "omura"),
    "choice-2": scores(["kido", "omura", "katsu", "okubo", "yamagata"], "kusaka"),
    "choice-3": scores(["saigo", "okubo", "kusaka", "takasugi", "yoshida"], "katsu"),
  },
  10: {
    "choice-1": scores(["sakamoto", "yoshida", "kido", "saigo", "takasugi"], "yamagata"),
    "choice-2": scores(["saigo", "sakamoto", "takasugi", "yoshida", "omura"], "okubo"),
    "choice-3": scores(["yamagata", "takasugi", "sakamoto", "kusaka", "saigo"], "kido"),
  },
  11: {
    "choice-1": scores(["saigo", "okubo", "yamagata", "kusaka", "takasugi"], "omura"),
    "choice-2": scores(["katsu", "sakamoto", "kido", "saigo", "yoshida"], "kusaka"),
    "choice-3": scores(["omura", "yamagata", "katsu", "okubo", "kido"], "sakamoto"),
  },
  12: {
    "choice-1": scores(["omura", "katsu", "okubo", "yamagata", "kusaka"], "sakamoto"),
    "choice-2": scores(["yoshida", "kido", "sakamoto", "katsu", "saigo"], "omura"),
    "choice-3": scores(["yamagata", "omura", "takasugi", "kido", "okubo"], "sakamoto"),
  },
  13: {
    "choice-1": scores(["okubo", "takasugi", "omura", "yoshida", "yamagata"], "saigo"),
    "choice-2": scores(["yoshida", "saigo", "kusaka", "sakamoto", "katsu"], "okubo"),
    "choice-3": scores(["omura", "yoshida", "saigo", "takasugi", "sakamoto"], "kusaka"),
  },
  14: {
    "choice-1": scores(["saigo", "kusaka", "yoshida", "omura", "takasugi"], "okubo"),
    "choice-2": scores(["okubo", "kido", "omura", "yamagata", "katsu"], "saigo"),
    "choice-3": scores(["kido", "katsu", "yoshida", "omura", "sakamoto"], "okubo"),
  },
  15: {
    "choice-1": scores(["kusaka", "saigo", "takasugi", "yoshida", "omura"], "yamagata"),
    "choice-2": scores(["omura", "yamagata", "okubo", "kido", "yoshida"], "takasugi"),
    "choice-3": scores(["yamagata", "okubo", "katsu", "saigo", "kido"], "sakamoto"),
  },
};
