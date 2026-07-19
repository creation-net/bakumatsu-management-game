import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const storyDir = path.join(rootDir, "story");
const dataFile = path.join(rootDir, "src", "data", "chapters.ts");
const reportFile = path.join(rootDir, "outputs", "story-import-report.md");
const narrationDialectReportFile = path.join(rootDir, "outputs", "narration-dialect-report.md");

const choicePatterns = [
  /^選択肢\s*[:：]?\s*(.+)$/u,
  /^[ABCＡＢＣ]\s*[.．、:：]\s*(.+)$/u,
  /^[123１２３]\s*[.．、:：]\s*(.+)$/u,
  /^・\s*(.+)$/u,
];

async function main() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.mkdir(path.dirname(reportFile), { recursive: true });

  const report = [];
  report.push("# Story Import Report");
  report.push("");
  report.push(`Generated at: ${new Date().toISOString()}`);
  report.push("");

  let files = [];
  try {
    files = await fs.readdir(storyDir);
  } catch {
    await writeEmptyData();
    report.push("## Blockers");
    report.push("");
    report.push("- `story` フォルダーが見つかりませんでした。本文は取り込まれていません。");
    await fs.writeFile(reportFile, `${report.join("\n")}\n`, "utf8");
    return;
  }

  const docxFiles = files
    .filter((file) => file.toLowerCase().endsWith(".docx") && !file.startsWith("~$"))
    .sort((a, b) => chapterNumberFromName(a) - chapterNumberFromName(b));

  const chapters = [];
  const dialectFindings = [];
  const { default: mammoth } = await import("mammoth");

  for (const file of docxFiles) {
    const chapterNumber = chapterNumberFromName(file);
    const sourcePath = path.join(storyDir, file);
    const result = await mammoth.convertToHtml({ path: sourcePath });
    const { title, lines } = extractDocumentLines(result.value, chapterNumber);

    const imported = importChapter(chapterNumber, file, title, lines);
    chapters.push(imported.chapter);
    dialectFindings.push(...imported.dialectFindings);

    report.push(`## ${file}`);
    report.push("");
    report.push(`- 推定章番号: ${chapterNumber || "不明"}`);
    report.push(`- 段落数: ${imported.chapter.passages.length}`);
    report.push(`- 共通エンディング段落数: ${imported.chapter.endingPassages.length}`);
    report.push(`- 選択肢数: ${imported.chapter.choices.length}`);

    for (const message of result.messages) {
      report.push(`- Mammoth warning: ${message.message}`);
    }

    for (const note of imported.notes) {
      report.push(`- ${note}`);
    }

    report.push("");
  }

  const missingChapters = [];
  for (let chapterId = 1; chapterId <= 15; chapterId += 1) {
    if (!chapters.some((chapter) => chapter.id === chapterId)) {
      missingChapters.push(chapterId);
    }
  }

  if (missingChapters.length > 0) {
    report.push("## Missing Chapters");
    report.push("");
    report.push(`- 未検出の章: ${missingChapters.map((id) => `第${id}章`).join("、")}`);
    report.push("");
  }

  const duplicateIds = findDuplicates(chapters.map((chapter) => chapter.id));
  if (duplicateIds.length > 0) {
    report.push("## Duplicate Chapter Numbers");
    report.push("");
    report.push(`- 重複した章番号: ${duplicateIds.join(", ")}`);
    report.push("");
  }

  chapters.sort((a, b) => a.id - b.id);
  await writeData(chapters);
  await fs.writeFile(reportFile, `${report.join("\n")}\n`, "utf8");
  await writeNarrationDialectReport(dialectFindings);
}

function importChapter(chapterNumber, sourceFile, title, lines) {
  const notes = [];
  const choices = [];
  const passageLines = [];
  const endingLines = [];
  let mode = "body";
  let activeChoice = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (isChoiceHeading(line)) {
      mode = "choices";
      continue;
    }

    if (line === "【エンディング】") {
      if (activeChoice) {
        choices.push(activeChoice);
        activeChoice = null;
      }
      mode = "ending";
      continue;
    }

    if (mode === "ending") {
      endingLines.push(line);
      continue;
    }

    if (mode === "postChoiceBody") {
      endingLines.push(line);
      continue;
    }

    if (mode === "body" && isChoiceStart(line)) {
      mode = "choices";
      activeChoice = {
        id: "choice-1",
        ...parseChoice(line),
      };
      continue;
    }

    if (mode === "choices") {
      if (isChoiceStart(line)) {
        if (activeChoice) {
          choices.push(activeChoice);
        }
        activeChoice = {
          id: `choice-${choices.length + 1}`,
          ...parseChoice(line),
        };
        continue;
      }

      if (activeChoice) {
        activeChoice.text = `${activeChoice.text}\n${line}`;
        applyChoiceDetails(activeChoice, line);
        if (activeChoice.id === "choice-3" && !hasMoreChoiceStarts(lines, index + 1)) {
          choices.push(activeChoice);
          activeChoice = null;
          mode = "postChoiceBody";
        }
        continue;
      }

      passageLines.push(line);
      continue;
    }

    const inlineChoiceText = getChoiceText(line);
    if (inlineChoiceText && choices.length < 3) {
      choices.push({
        id: `choice-${choices.length + 1}`,
        ...parseChoice(line),
      });
      continue;
    }

    passageLines.push(line);
  }

  if (activeChoice) {
    choices.push(activeChoice);
  }

  if (choices.length !== 3) {
    notes.push(`選択肢が3件ではありません。検出数: ${choices.length}`);
  }

  const passages = classifyPassages(passageLines);
  const endingPassages = classifyPassages(endingLines, "e");
  for (const passage of [...passages, ...endingPassages]) {
    if (passage.kind === "narration" && looksLikeDialogueButUnparsed(passage.text)) {
      notes.push(`セリフ形式の可能性がありますが話者を判定できません: ${passage.text}`);
    }
  }

  const chapter = applyEditorialAdjustments({
    id: chapterNumber || 0,
    ...splitTitle(title),
    sourceFile,
    passages,
    endingPassages,
    choices,
    notes,
  });
  const dialectFindings = findNarrationDialectCandidates(chapterNumber, [
    ...chapter.passages,
    ...chapter.endingPassages,
  ]);

  return {
    chapter,
    notes,
    dialectFindings,
  };
}

function classifyPassages(lines, prefix = "p") {
  const passages = [];
  let pendingSpeaker = "";

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const nextLine = lines[index + 1] ?? "";

    if (looksLikeSpeakerLine(line) && startsWithQuote(nextLine)) {
      pendingSpeaker = line;
      continue;
    }

    const passage = classifyPassage(line, `${prefix}-${passages.length + 1}`);
    if (passage.kind === "dialogue" && pendingSpeaker && !passage.speaker) {
      passage.speaker = pendingSpeaker;
    }
    if (passage.kind !== "dialogue") {
      pendingSpeaker = "";
    }
    passages.push(passage);
  }

  return passages;
}

function classifyPassage(line, id) {
  const speakerMatch = line.match(/^([^「」『』:：]{1,24})[:：]\s*(.+)$/u);
  if (speakerMatch) {
    return {
      id,
      kind: "dialogue",
      speaker: speakerMatch[1],
      text: speakerMatch[2],
    };
  }

  if (/^(\[.+\]|【.+】|（.+）|\(.+\))$/u.test(line)) {
    return {
      id,
      kind: "scene",
      text: line,
    };
  }

  if (/^[「『]/u.test(line)) {
    return {
      id,
      kind: "dialogue",
      text: line,
    };
  }

  return {
    id,
    kind: "narration",
    text: line,
  };
}

function looksLikeSpeakerLine(line) {
  return (
    line.length <= 18 &&
    !/[。、「」『』（）()【】\[\]！？!?]/u.test(line) &&
    /[一-龠々ぁ-んァ-ヶ]/u.test(line)
  );
}

function startsWithQuote(line) {
  return /^[「『]/u.test(line);
}

function extractDocumentLines(html, chapterNumber) {
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/iu);
  const title = titleMatch
    ? normalizeInlineHtml(titleMatch[1], " ")
    : `第${chapterNumber || "?"}章`;
  const bodyHtml = titleMatch ? html.slice(titleMatch.index + titleMatch[0].length) : html;
  const lines = htmlToLines(bodyHtml);
  return { title, lines };
}

function htmlToLines(html) {
  const withBreaks = html
    .replace(/<br\s*\/?>/giu, "\n")
    .replace(/<\/(p|h[1-6]|li|div|table|tr)>/giu, "\n")
    .replace(/<[^>]+>/gu, "");

  return decodeHtml(withBreaks)
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeInlineHtml(html, separator) {
  return decodeHtml(
    html
      .replace(/<br\s*\/?>/giu, separator)
      .replace(/<[^>]+>/gu, "")
      .replace(/\s+/gu, " ")
      .trim(),
  );
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/gu, " ")
    .replace(/&amp;/gu, "&")
    .replace(/&lt;/gu, "<")
    .replace(/&gt;/gu, ">")
    .replace(/&quot;/gu, "\"")
    .replace(/&#39;/gu, "'");
}

function looksLikeDialogueButUnparsed(line) {
  return /[:：][「『]/u.test(line);
}

function getChoiceText(line) {
  for (const pattern of choicePatterns) {
    const match = line.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  return "";
}

function parseChoice(line) {
  const labelMatch = line.match(/^([①②③❶❷❸]|[123１２３]\s*[.．、:：])\s*(.*)$/u);
  const label = labelMatch ? labelMatch[1].trim() : "";
  const body = labelMatch ? labelMatch[2].trim() : line;
  const choice = {
    label,
    text: line,
  };
  applyChoiceDetails(choice, body);
  return choice;
}

function applyChoiceDetails(choice, line) {
  const valueMatch = line.match(/[（(]([^（）()]+)[）)]\s*$/u);
  if (valueMatch) {
    choice.value = valueMatch[1].trim();
  }
  const cleanLine = line.replace(/[（(]([^（）()]+)[）)]\s*$/u, "").trim();
  if (!choice.person && cleanLine && cleanLine.length <= 18 && !/[「」。]/u.test(cleanLine)) {
    choice.person = cleanLine.replace(/^[①②③❶❷❸]\s*/u, "").trim();
  }
}

function isChoiceStart(line) {
  return /^[①②③❶❷❸]|^[123１２３]\s*[.．、:：]/u.test(line);
}

function isChoiceHeading(line) {
  return /^【?選択肢?】?$/u.test(line);
}

function hasMoreChoiceStarts(lines, startIndex) {
  return lines.slice(startIndex).some((line) => isChoiceStart(line) || line === "【エンディング】");
}

function splitTitle(rawTitle) {
  const normalized = rawTitle.replace(/\s+/gu, " ").trim();
  const quoted = normalized.match(/^(.+?)\s*[『「](.+)[』」](.*)$/u);
  if (quoted) {
    return {
      title: quoted[1].trim(),
      subtitle: `${quoted[2]}${quoted[3] ?? ""}`.trim(),
    };
  }
  const wave = normalized.match(/^(.+?)\s*[～〜]\s*(.+?)\s*[～〜]?$/u);
  if (wave) {
    return {
      title: wave[1].trim(),
      subtitle: wave[2].trim(),
    };
  }
  const dash = normalized.match(/^(.+?)\s*[―－-]\s*(.+)$/u);
  if (dash) {
    return {
      title: dash[1].trim(),
      subtitle: dash[2].trim(),
    };
  }
  return { title: normalized };
}

function findNarrationDialectCandidates(chapterNumber, passages) {
  const pattern =
    /ちょった|ちょる|ちょらん|しちょ|じゃった|じゃ[。、」）)]?|おらん|聞けん|口を開かん|なったんが|俺なんかが|否定せん|ごわす|おはん|せにゃ|ならん|できん/u;
  return passages
    .filter((passage) => passage.kind !== "dialogue" && pattern.test(passage.text))
    .map((passage) => ({
      chapter: chapterNumber,
      passageId: passage.id,
      kind: passage.kind,
      text: passage.text,
    }));
}

async function writeNarrationDialectReport(findings) {
  const report = [];
  report.push("# Narration Dialect Candidate Report");
  report.push("");
  report.push("ナレーションまたは場面説明に方言が含まれている可能性がある箇所です。本文は自動修正していません。");
  report.push("");
  if (findings.length === 0) {
    report.push("- 検出なし");
  } else {
    for (const finding of findings) {
      report.push(
        `- 第${finding.chapter}章 / ${finding.kind} / ${finding.passageId}: ${finding.text}`,
      );
    }
  }
  await fs.writeFile(narrationDialectReportFile, `${report.join("\n")}\n`, "utf8");
}

function applyEditorialAdjustments(chapter) {
  chapter.title = normalizeChapterTitle(chapter.id, chapter.title);
  chapter.subtitle = normalizeChapterSubtitle(chapter.id, chapter.subtitle);
  chapter.passages = chapter.passages.filter((passage) => !isRemovedSceneMarker(passage.text));
  chapter.endingPassages = chapter.endingPassages.filter((passage) => !isRemovedSceneMarker(passage.text));

  normalizeSpeakers(chapter.passages);
  normalizeSpeakers(chapter.endingPassages);
  applyTextCorrections(chapter);
  applyFuriganaAndIntroductions(chapter);
  cleanupDuplicateReadings([...chapter.passages, ...chapter.endingPassages]);
  normalizeChoices(chapter);
  return chapter;
}

function normalizeChapterTitle(chapterId, title) {
  const normalized = title
    .replace(/^第(\d+)話/u, (_match, value) => `第${value}章`)
    .replace(/^第(\d+)章/u, (_match, value) => `第${value}章`)
    .replace(/^第一話/u, "第一章")
    .replace(/（おおさかほうへいこうしょう）/u, "")
    .replace(/（はいはんちけん）/u, "")
    .replace(/\s+/gu, " ")
    .trim();
  return normalized.replace(/^第(\d+)章/u, (_match, value) => `第${toJapaneseNumeral(Number(value))}章`);
}

function normalizeChapterSubtitle(chapterId, subtitle = "") {
  const replacements = {
    2: "志は誰が継ぐ",
    7: "政敵と手を取り合う",
    11: "勝つことと、終わらせること",
    12: "国家を守る備え",
  };
  return (replacements[chapterId] ?? subtitle)
    .replace(/【長州弁改訂版】/u, "")
    .replace(/[―－-]\s*$/u, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function toJapaneseNumeral(value) {
  const numerals = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
    11: "十一",
    12: "十二",
    13: "十三",
    14: "十四",
    15: "十五",
  };
  return numerals[value] ?? String(value);
}

function isRemovedSceneMarker(text) {
  return /^【(?:ナレーション|問い)】$/u.test(text);
}

function normalizeSpeakers(passages) {
  const speakerNames = {
    高杉: "高杉晋作",
    久坂: "久坂玄瑞",
    桂: "桂小五郎",
    龍馬: "坂本龍馬",
    西郷: "西郷吉之助",
    大久保: "大久保利通",
    木戸: "木戸孝允",
    岩倉: "岩倉具視",
    三条: "三条実美",
    勝: "勝海舟",
    大村: "大村益次郎",
    村田: "村田蔵六",
    山縣: "山縣有朋",
    桐野: "桐野利秋",
    大山: "大山綱良",
  };
  for (const passage of passages) {
    if (passage.speaker && speakerNames[passage.speaker]) {
      passage.speaker = speakerNames[passage.speaker];
    }
  }
}

function applyTextCorrections(chapter) {
  const all = [...chapter.passages, ...chapter.endingPassages];
  replaceTexts(all, [
    ["阿片戦争", "阿片戦争（あへんせんそう）"],
    ["先生は、最後まで日本の未来を信じちょった。", "先生は、最後まで日本の未来を信じていた。"],
    ["松下村塾には、静かな時間だけが流れちょった。", "松下村塾には、静かな時間だけが流れていた。"],
    ["誰も口を開かん。", "誰も口を開かない。"],
    ["机の上には先生が読まれちょった本。", "机の上には先生が読まれていた本。"],
    ["先生だけがおらん。", "先生だけがいない。"],
    ["村瀬は静かに座っちょった。", "村瀬は静かに座っていた。"],
    ["（先生は、本当におらんなった。）", "（先生は、本当にいなくなった。）"],
    ["（もう二度と教えは聞けん。）", "（もう二度と教えは聞けない。）"],
    ["（じゃが。）", "（しかし。）"],
    ["（誰一人、先生を裏切っちょらん。）", "（誰一人、先生を裏切っていない。）"],
    ["誰一人、相手を否定せん。", "誰一人、相手を否定しない。"],
    ["誰も相手を否定せん。", "誰も相手を否定しない。"],
    ["松陰が遺したんは、一つの答えではなかった。", "松陰が遺したものは、一つの答えではなかった。"],
    ["長州藩は大きく変わり始めちょった。", "長州藩は大きく変わり始めていた。"],
    ["その舞台となったんが――京都。", "その舞台となったのが――京都。"],
    ["全国の志士、公家、幕臣が集まり、日本の未来を語る場所じゃった。", "全国の志士、公家、幕臣が集まり、日本の未来を語る場所だった。"],
    ["三人が向かい合って座っちょる。", "三人が向かい合って座っている。"],
    ["（積み上げてきた仕組みを活かそうとしちょる。）", "（積み上げてきた仕組みを活かそうとしている。）"],
    ["（争いを終わらせる新しい国を見ちょる。）", "（争いを終わらせる新しい国を見ている。）"],
    ["（日本を思う気持ちは同じじゃ。）", "（日本を思う気持ちは同じだ。）"],
    ["（俺なんかが……。）", "（私などが……。）"],
    ["やがて江戸城は無血開城され、", ""],
    ["二百六十年以上続いた徳川幕府は、", ""],
    ["静かにその幕を閉じた。", ""],
    ["薩摩藩士・西郷隆盛", "薩摩藩士・西郷吉之助"],
    ["【西郷隆盛】", "【西郷吉之助】"],
    ["西郷隆盛は城山で倒れ、", "西郷隆盛は城山で倒れ、"],
    ["新之助が部屋へ入ると", "村瀬新之助が部屋へ入ると"],
    ["岩倉はを見る。", "岩倉は村瀬を見る。"],
    ["は静かに近づいた。", "村瀬は静かに近づいた。"],
    ["西郷はゆっくりとを見つめる。", "西郷はゆっくりと村瀬を見つめる。"],
    ["「どん。」", "「村瀬どん。」"],
    [
      "「銃を持ち出しております。」",
      "「政府の倉庫から、武器や弾薬を持ち出しております。」",
    ],
  ]);
  cleanupDuplicateReadings(all);

  if (chapter.id === 3) {
    replaceTexts(chapter.passages, [["【京都・料亭】", "【京都・料亭・近江屋】"]]);
  }

  if (chapter.id === 5) {
    replaceTexts(chapter.endingPassages, [
      ["誰も笑わない。", "誰も声を上げない。"],
      ["誰も勝ったとは思わない。", "誰もが悔しさを胸に押し込めていた。"],
    ]);
  }

  if (chapter.id === 10) {
    replaceTexts(chapter.passages, [
      ["「なるほど。」", "「なるほどな。」"],
      ["「勝機はある。」", "「勝機はあるってわけだ。」"],
      ["「ですが容保公。」", "「だが容保公。」"],
      [
        "「勝ったあとに残る日本まで考えなくちゃいけません。」",
        "「勝ったあとに残る日本まで考えなきゃいけねえ。」",
      ],
    ]);
  }

  if (chapter.id === 11) {
    replaceTexts(chapter.passages, [
      ["「思ったより若いな。」", "「あの京都の料亭にいた若い侍か。思ったより胆が据わっていたな。」"],
      ["「座んな。」", "「まあ固くなるな。座んな。」"],
      [
        "「禍根だけは残したくなか。」",
        "「禍根だけは残したくなか。じゃっどん、火種を断つために徹底せねばならん時もありもす。」",
      ],
    ]);
  }

  if (chapter.id === 13) {
    replaceTexts(chapter.passages, [
      ["「藩の集まりですね。」", "「藩の集まりじゃないですか。結局、何も変わっていないように見えます。」"],
      ["「何に困っちょるか。」", "「何に困っちょるか、分かりもすか。」"],
    ]);
  }

  if (chapter.id === 15) {
    replaceTexts(chapter.passages, [
      ["は三人の議論を静かに聞いていた。", "村瀬は三人の議論を静かに聞いていた。"],
      ["は、薩摩の行く末を思い、胸が締めつけられる思いだった。", "村瀬は、薩摩の行く末を思い、胸が締めつけられる思いだった。"],
      ["「今は何もせん。」", "「今は何もせんでよか。」"],
      ["「薩摩がじっとしちょれば。」", "「薩摩がじっとしちょればよか。」"],
    ]);
    chapter.endingPassages = mergeRukonrokuPassage(chapter.endingPassages);
  }

  removeEmptyPassages(chapter.passages);
  removeEmptyPassages(chapter.endingPassages);
}

function replaceTexts(passages, pairs) {
  for (const passage of passages) {
    for (const [from, to] of pairs) {
      if (passage.text === from) {
        passage.text = to;
      } else if (from && passage.text.includes(from)) {
        passage.text = passage.text.replace(from, to);
      }
    }
  }
}

function removeEmptyPassages(passages) {
  for (let index = passages.length - 1; index >= 0; index -= 1) {
    if (!passages[index].text.trim()) {
      passages.splice(index, 1);
    }
  }
}

function cleanupDuplicateReadings(passages) {
  for (const passage of passages) {
    passage.text = passage.text
      .replace(/（([^）]+／[^）]+)）（[^）]+）/gu, "（$1）")
      .replace(
        "村瀬 新之助（むらせ しんのすけ／長州藩の下級武士）は、長州藩の下級武士",
        "村瀬 新之助（むらせ しんのすけ）は、長州藩の下級武士",
      );
  }
}

function mergeRukonrokuPassage(passages) {
  const merged = [];
  for (let index = 0; index < passages.length; index += 1) {
    const current = passages[index];
    if (current.text === "墓の横には、" && passages[index + 1]?.text === "『留魂録（りゅうこんろく）』") {
      merged.push({
        ...current,
        text: "墓の横には、松陰が遺した『留魂録（りゅうこんろく）』の一節が刻まれていた。",
      });
      index += 2;
      continue;
    }
    if (
      current.text === "「身はたとひ武蔵の野辺に朽ちぬとも" &&
      passages[index + 1]?.text === "留め置かまし大和魂」"
    ) {
      merged.push({
        ...current,
        kind: "narration",
        text: "「身はたとひ武蔵の野辺に朽ちぬとも\n留め置かまし大和魂」",
      });
      index += 1;
      continue;
    }
    merged.push(current);
  }
  return merged.map((passage, index) => ({ ...passage, id: `e-${index + 1}` }));
}

function applyFuriganaAndIntroductions(chapter) {
  const entries = [
    ["村瀬新之助", "村瀬 新之助（むらせ しんのすけ／長州藩の下級武士）"],
    ["久坂玄瑞", "久坂 玄瑞（くさか げんずい／松下村塾門下の志士）"],
    ["来島又兵衛", "来島 又兵衛（きじま またべえ／長州藩の強硬派の武士）"],
    ["周布政之助", "周布 政之助（すふ まさのすけ／長州藩の家老）"],
    ["高杉晋作", "高杉 晋作（たかすぎ しんさく／奇兵隊を率いる長州藩士）"],
    ["桂小五郎", "桂 小五郎（かつら こごろう／長州藩の重臣）"],
    ["村田蔵六", "村田 蔵六（むらた ぞうろく／兵学者）"],
    ["勝海舟", "勝 海舟（かつ かいしゅう／幕臣）"],
    ["坂本龍馬", "坂本 龍馬（さかもと りょうま／土佐藩出身の志士）"],
    ["西郷吉之助", "西郷 吉之助（さいごう きちのすけ／薩摩藩士）"],
    ["大久保利通", "大久保 利通（おおくぼ としみち／薩摩藩士）"],
    ["木戸孝允", "木戸 孝允（きど たかよし／長州藩出身の新政府要人）"],
    ["山縣有朋", "山縣 有朋（やまがた ありとも／長州藩出身の軍政家）"],
    ["大村益次郎", "大村 益次郎（おおむら ますじろう／兵制改革を進めた兵学者）"],
    ["山内容堂", "山内 容堂（やまうち ようどう／土佐藩主）"],
    ["松平春嶽", "松平 春嶽（まつだいら しゅんがく／越前藩主）"],
    ["板倉勝静", "板倉 勝静（いたくら かつきよ／幕府老中）"],
    ["松平容保", "松平 容保（まつだいら かたもり／会津藩主）"],
    ["大山綱良", "大山 綱良（おおやま つなよし／鹿児島県令）"],
  ];
  const seen = new Set();
  for (const passage of [...chapter.passages, ...chapter.endingPassages]) {
    for (const [plain, replacement] of entries) {
      if (!seen.has(plain) && passage.text.includes(plain) && !passage.text.includes(replacement)) {
        passage.text = passage.text.replace(plain, replacement);
        seen.add(plain);
      }
    }
  }
}

function normalizeChoices(chapter) {
  const choicePeople = {
    1: ["久坂玄瑞", "吉田松陰", "高杉晋作"],
    2: ["高杉晋作", "久坂玄瑞", "桂小五郎"],
    3: ["勝海舟", "西郷吉之助", "坂本龍馬"],
    4: ["来島又兵衛", "久坂玄瑞", "桂小五郎"],
    5: ["椋梨藤太", "周布政之助", "山縣有朋"],
    7: ["桂小五郎", "坂本龍馬", "村田蔵六"],
    8: ["桂小五郎", "高杉晋作", "村田蔵六"],
    9: ["山内容堂", "松平春嶽", "西郷吉之助"],
    10: ["勝海舟", "板倉勝静", "松平容保"],
    11: ["西郷吉之助", "勝海舟", "大村益次郎"],
    12: ["大村益次郎", "木戸孝允", "山縣有朋"],
    13: ["大久保利通", "木戸孝允", "江藤新平"],
    14: ["西郷隆盛", "大久保利通", "木戸孝允"],
    15: ["桐野利秋", "村田新八", "大山綱良"],
  };
  const customTexts = {
    5: [
      "① 藩を守るため、幕府の要求を受け入れるべきです。",
      "② 交渉し、少しでも長州に有利な条件を引き出すべきです。",
      "③ まだ決断する時ではない。情勢を見極めるべきだ。",
    ],
    10: [
      "① 日本全体を守ることを優先する",
      "② 徳川家と人々の生活を守ることを優先する",
      "③ 勝機を生かし、組織の統制を守ることを優先する",
    ],
    11: [
      "① 禍根を残さない。未来の日本のため、争いの芽を断つ。",
      "② 国を疲弊させない。人を信じ、できる限り戦わずに収める。",
      "③ 秩序を守る。戦は避ける。しかし、人々の安心を守るため、必要な秩序は維持する。",
    ],
    13: [
      "① 改革は、一気に進める。",
      "② 改革は、人の理解を得ながら進める。",
      "③ 改革は、制度を整えてこそ成功する。",
    ],
    14: [
      "① 国の信義を守り、自ら責任を引き受ける。",
      "② 状況に応じて決定を見直し、国内改革を優先する。",
      "③ 決定を変えるなら、その根拠と手続を明確にする。",
    ],
  };

  const people = choicePeople[chapter.id] ?? [];
  chapter.choices = chapter.choices.map((choice, index) => {
    const person = people[index] ?? choice.person;
    const text = customTexts[chapter.id]?.[index] ?? choice.text;
    return {
      ...choice,
      person,
      value: person ? `${person}の考え` : choice.value,
      text: text.replace(/[（(][^（）()]+[）)]\s*$/u, "").trim(),
    };
  });
}

function chapterNumberFromName(fileName) {
  const normalized = fileName.replace(/[０-９]/gu, (value) =>
    String.fromCharCode(value.charCodeAt(0) - 0xfee0),
  );
  const match = normalized.match(/(?:第)?\s*(\d{1,2})\s*(?:章)?/u);
  return match ? Number(match[1]) : 0;
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }
  return Array.from(duplicates);
}

async function writeEmptyData() {
  await writeData([]);
}

async function writeData(chapters) {
  const content = `import type { Chapter } from "@/types/story";

export const chapters: Chapter[] = ${JSON.stringify(chapters, null, 2)};
`;
  await fs.writeFile(dataFile, content, "utf8");
}

main().catch(async (error) => {
  await fs.mkdir(path.dirname(reportFile), { recursive: true });
  await fs.writeFile(
    reportFile,
    `# Story Import Report\n\nFatal error: ${error instanceof Error ? error.message : String(error)}\n`,
    "utf8",
  );
  process.exitCode = 1;
});
