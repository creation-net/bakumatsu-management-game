import { chapters } from "@/data/chapters";
import type { Chapter, Passage } from "@/types/story";

const TRIAL_TARGET_RATIO = 0.3;

export const trialChapters: Chapter[] = chapters.map((chapter) => {
  const allPassages = [...chapter.passages, ...chapter.endingPassages];
  const totalCharacters = countCharacters(allPassages);
  const targetCharacters = Math.round(totalCharacters * TRIAL_TARGET_RATIO);
  const passageCharacters = countCharacters(chapter.passages);
  const passageTarget = Math.round(targetCharacters * (passageCharacters / totalCharacters));

  return {
    ...chapter,
    passages: selectTrialPassages(chapter.passages, passageTarget, 5),
    endingPassages: selectTrialPassages(
      chapter.endingPassages,
      Math.max(targetCharacters - passageTarget, 0),
      3,
    ),
  };
});

export type TrialEditReport = {
  chapterId: number;
  originalCharacters: number;
  editedCharacters: number;
  reductionRate: number;
  theme: string;
  removedNarrationSummary: string;
  changedDialogueSummary: string;
};

const trialChapterThemes: Record<number, string> = {
  1: "未知の外圧を前に、守るべきものと変えるべきものをどう見極めるか。",
  2: "理想と秩序が衝突したとき、どちらに覚悟を置くか。",
  3: "志を語る場で、信頼と現実感をどう両立させるか。",
  4: "武力衝突の瀬戸際で、情熱と冷静さのどちらを選ぶか。",
  5: "組織の存続のために、屈辱を受け入れるか信念を貫くか。",
  6: "孤立した夜に、退く判断と立つ判断のどちらを選ぶか。",
  7: "敵味方の境界を越え、未来のために手を結べるか。",
  8: "大きな戦の中で、自分が身を置くべき陣営をどう選ぶか。",
  9: "政権の形を決める場で、筋と実利をどう扱うか。",
  10: "時代を閉じる決断に、誇りと被害のどちらを優先するか。",
  11: "戦わずして道を開くために、何を差し出せるか。",
  12: "新しい国家づくりに、技術と人材をどう結びつけるか。",
  13: "旧い仕組みを壊すとき、納得と速度のどちらを重んじるか。",
  14: "国の進路をめぐる対立で、外への拡張と内の整備をどう選ぶか。",
  15: "武士の時代の終わりに、義と未来をどう受け止めるか。",
};

export const trialEditReports: TrialEditReport[] = trialChapters.map((chapter, index) => {
  const original = chapters[index];
  const originalCharacters = countCharacters([...original.passages, ...original.endingPassages]);
  const editedCharacters = countCharacters([...chapter.passages, ...chapter.endingPassages]);

  return {
    chapterId: chapter.id,
    originalCharacters,
    editedCharacters,
    reductionRate: Math.round((1 - editedCharacters / originalCharacters) * 1000) / 10,
    theme: trialChapterThemes[chapter.id] ?? "歴史上の決断を、自分の価値観で選び取ること。",
    removedNarrationSummary:
      "詳細な時代背景、重複する状況説明、場面転換の長い描写を中心に整理しました。",
    changedDialogueSummary:
      "セリフの要約・言い換え・創作は行わず、重複する発言を中心に一部を非表示にしました。",
  };
});

function selectTrialPassages(passages: Passage[], targetCharacters: number, tailCount: number): Passage[] {
  if (passages.length <= 1) return passages;
  const keepIndexes = new Set<number>([0]);
  if (passages.length > 1) keepIndexes.add(1);
  for (let index = Math.max(0, passages.length - tailCount); index < passages.length; index += 1) {
    keepIndexes.add(index);
  }
  const candidates = passages
    .map((passage, index) => ({ index, score: scorePassage(passage, index, passages.length), characters: passage.text.length }))
    .filter(({ index }) => !keepIndexes.has(index))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  let selectedCharacters = Array.from(keepIndexes).reduce((total, index) => total + passages[index].text.length, 0);
  for (const candidate of candidates) {
    if (selectedCharacters >= targetCharacters) break;
    keepIndexes.add(candidate.index);
    selectedCharacters += candidate.characters;
  }
  return Array.from(keepIndexes).sort((a, b) => a - b).map((index) => passages[index]);
}

function scorePassage(passage: Passage, index: number, passageCount: number): number {
  let score = passage.kind === "dialogue" ? 80 : passage.kind === "scene" ? 35 : 22;
  if (index < 8) score += 18;
  if (index > passageCount - 12) score += 28;
  if (/[？?]/u.test(passage.text)) score += 25;
  if (/村瀬|君なら|問/u.test(passage.text)) score += 35;
  return score;
}

function countCharacters(passages: Passage[]): number {
  return passages.reduce((total, passage) => total + passage.text.length, 0);
}
