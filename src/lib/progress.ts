import type { ReadingProgress } from "@/types/story";

const STORAGE_KEY = "bakumatsu-meiji-progress";

export const initialProgress: ReadingProgress = {
  currentChapterId: 1,
  currentStep: "reading",
  completedChapterIds: [],
  choices: {},
  updatedAt: "",
};

export function loadProgress(): ReadingProgress {
  if (typeof window === "undefined") {
    return initialProgress;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return initialProgress;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ReadingProgress>;
    return {
      currentChapterId: parsed.currentChapterId ?? 1,
      currentStep: parsed.currentStep ?? "reading",
      completedChapterIds: Array.isArray(parsed.completedChapterIds)
        ? parsed.completedChapterIds
        : [],
      choices: parsed.choices ?? {},
      updatedAt: parsed.updatedAt ?? "",
    };
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress: ReadingProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...progress,
      updatedAt: new Date().toISOString(),
    }),
  );
}

export function resetProgress() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
