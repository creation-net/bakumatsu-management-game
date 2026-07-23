import type { ReadingProgress } from "@/types/story";

export type ProgressMode = "trial" | "full";

const STORAGE_KEYS: Record<ProgressMode, string> = {
  trial: "bakumatsu-meiji-progress-trial",
  full: "bakumatsu-meiji-progress",
};

export const initialProgress: ReadingProgress = {
  currentChapterId: 1,
  currentStep: "reading",
  completedChapterIds: [],
  choices: {},
  updatedAt: "",
};

export function loadProgress(mode: ProgressMode = "full"): ReadingProgress {
  if (typeof window === "undefined") {
    return initialProgress;
  }

  const raw = window.localStorage.getItem(STORAGE_KEYS[mode]);
  if (!raw) {
    return initialProgress;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ReadingProgress>;
    const choices = parsed.choices ?? {};
    const answeredChapterIds = Object.keys(choices)
      .map(Number)
      .filter((chapterId) => Number.isInteger(chapterId));
    const completedChapterIds = new Set(
      Array.isArray(parsed.completedChapterIds)
        ? parsed.completedChapterIds
        : [],
    );
    answeredChapterIds.forEach((chapterId) => completedChapterIds.add(chapterId));

    return {
      currentChapterId: parsed.currentChapterId ?? 1,
      currentStep: parsed.currentStep ?? "reading",
      completedChapterIds: Array.from(completedChapterIds).sort((a, b) => a - b),
      choices,
      updatedAt: parsed.updatedAt ?? "",
    };
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress: ReadingProgress, mode: ProgressMode = "full") {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEYS[mode],
    JSON.stringify({
      ...progress,
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function resetProgress(mode: ProgressMode = "full") {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEYS[mode]);
}
