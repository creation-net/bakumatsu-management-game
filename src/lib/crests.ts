export type CrestId = "mori" | "shimazu" | "yamauchi" | "tokugawa" | "government";

const MEIJI_GOVERNMENT_SPEAKERS = [
  "木戸孝允",
  "大久保利通",
  "山縣有朋",
  "山県有朋",
  "大村益次郎",
];

const CHOSHU_SPEAKERS = [
  "村瀬",
  "吉田松陰",
  "久坂玄瑞",
  "高杉晋作",
  "桂小五郎",
  "木戸孝允",
  "村田蔵六",
  "大村益次郎",
  "山縣狂介",
  "山県狂介",
  "山縣有朋",
  "山県有朋",
  "赤根武人",
  "周布政之助",
  "毛利敬親",
  "来島又兵衛",
];

const SATSUMA_SPEAKERS = [
  "西郷吉之助",
  "西郷隆盛",
  "大久保利通",
  "島津久光",
  "桐野利秋",
  "村田新八",
  "大山綱良",
];

const TOSA_SPEAKERS = ["坂本龍馬", "山内容堂", "後藤象二郎"];

const TOKUGAWA_SPEAKERS = [
  "勝海舟",
  "徳川慶喜",
  "板倉勝静",
  "松平容保",
];

function normalizeSpeaker(speaker: string): string {
  return speaker.replace(/[\s　]/g, "");
}

export function getSpeakerCrest(speaker: string | undefined, chapterId: number): CrestId | undefined {
  if (!speaker) {
    return undefined;
  }

  const normalized = normalizeSpeaker(speaker);

  if (chapterId >= 12 && MEIJI_GOVERNMENT_SPEAKERS.includes(normalized)) {
    return "government";
  }

  if (SATSUMA_SPEAKERS.includes(normalized)) {
    return "shimazu";
  }

  if (TOSA_SPEAKERS.includes(normalized)) {
    return "yamauchi";
  }

  if (TOKUGAWA_SPEAKERS.includes(normalized)) {
    return "tokugawa";
  }

  if (CHOSHU_SPEAKERS.includes(normalized)) {
    return "mori";
  }

  return undefined;
}

export const reportCrests: CrestId[] = [
  "mori",
  "shimazu",
  "yamauchi",
  "tokugawa",
  "government",
];
