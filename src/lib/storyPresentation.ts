export const chapterImagePaths = Array.from({ length: 15 }, (_, index) => {
  const chapterNumber = String(index + 1).padStart(2, "0");
  return `/images/chapters/chapter-${chapterNumber}.webp`;
});

export const titleImagePath = "/images/title/main.webp";

const japaneseChapterNumerals = [
  "",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
];

export function getChapterImagePath(chapterId: number) {
  return chapterImagePaths[chapterId - 1] ?? "";
}

export function getChoiceValue(text: string, fallback?: string) {
  if (fallback) {
    return fallback;
  }

  const valueMatch = text.match(/[（(]([^（）()]+)[）)]\s*$/u);
  return valueMatch ? valueMatch[1] : "選択した考え方";
}

export function getChoiceDisplayText(text: string, person?: string) {
  const cleaned = text
    .replace(/^[①②③❶❷❸]\s*/u, "")
    .replace(/[（(][^（）()]+の考え[）)]\s*$/u, "")
    .replace(/[（(][^（）()]+[）)]\s*$/u, "")
    .trim();
  if (!person) {
    return cleaned;
  }
  return cleaned
    .split("\n")
    .filter((line, index) => !(index === 0 && line.trim() === person))
    .join("\n")
    .trim();
}

export function getChapterLabel(chapterId: number) {
  return `第${japaneseChapterNumerals[chapterId] ?? String(chapterId)}章`;
}
