"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { chapters } from "@/data/chapters";
import { calculateDiagnosis } from "@/lib/diagnosis";
import { initialProgress, loadProgress, resetProgress, saveProgress } from "@/lib/progress";
import {
  getChapterImagePath,
  getChapterLabel,
  getChoiceDisplayText,
  getChoiceValue,
  getJapaneseChapterNumber,
  titleImagePath,
} from "@/lib/storyPresentation";
import type { Chapter, Choice, Passage, ReadingProgress, ReadingStep } from "@/types/story";

type Screen = "title" | "chapter" | "ending" | "index" | "result";

function getChapterById(id: number): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

function getScreenFromStep(step: ReadingStep): Screen {
  if (step === "ending") {
    return "ending";
  }
  if (step === "result") {
    return "result";
  }
  return "chapter";
}

export function NovelApp() {
  const [mounted, setMounted] = useState(false);
  const [screen, setScreen] = useState<Screen>("title");
  const [progress, setProgress] = useState<ReadingProgress>(initialProgress);
  const [choiceTargetChapterId, setChoiceTargetChapterId] = useState<number | null>(null);

  useEffect(() => {
    const stored = loadProgress();
    setProgress(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [mounted, screen, progress.currentChapterId]);

  useEffect(() => {
    if (!mounted || screen !== "chapter" || choiceTargetChapterId !== progress.currentChapterId) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      document
        .getElementById(`chapter-${choiceTargetChapterId}-choices`)
        ?.scrollIntoView({ behavior: "auto", block: "start" });
      setChoiceTargetChapterId(null);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [choiceTargetChapterId, mounted, progress.currentChapterId, screen]);

  const currentChapter = useMemo(
    () => getChapterById(progress.currentChapterId) ?? chapters[0],
    [progress.currentChapterId],
  );

  const selectedChoice = currentChapter
    ? currentChapter.choices.find((choice) => choice.id === progress.choices[currentChapter.id])
    : undefined;

  function updateProgress(nextProgress: ReadingProgress) {
    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  function showTitle() {
    setScreen("title");
  }

  function startStory(mode: "start" | "continue") {
    if (chapters.length === 0) {
      setScreen("index");
      return;
    }

    if (mode === "start") {
      const hasSavedProgress =
        Object.keys(progress.choices).length > 0 || progress.completedChapterIds.length > 0;
      if (hasSavedProgress && !window.confirm("これまでの回答をリセットしますがよいですか？")) {
        return;
      }

      updateProgress({
        ...initialProgress,
        currentChapterId: 1,
        currentStep: "reading",
      });
      setScreen("chapter");
      return;
    }

    setScreen(getScreenFromStep(progress.currentStep));
  }

  function selectChoice(chapterId: number, choiceId: string) {
    const completed = new Set(progress.completedChapterIds);
    completed.add(chapterId);

    updateProgress({
      ...progress,
      currentChapterId: chapterId,
      currentStep: "ending",
      completedChapterIds: Array.from(completed).sort((a, b) => a - b),
      choices: {
        ...progress.choices,
        [chapterId]: choiceId,
      },
    });
    setScreen("ending");
  }

  function goNext() {
    if (!currentChapter || !selectedChoice) {
      return;
    }

    const completed = new Set(progress.completedChapterIds);
    completed.add(currentChapter.id);
    const nextChapterId = currentChapter.id + 1;
    const hasNextChapter = chapters.some((chapter) => chapter.id === nextChapterId);

    updateProgress({
      ...progress,
      currentChapterId: hasNextChapter ? nextChapterId : currentChapter.id,
      currentStep: hasNextChapter ? "reading" : "result",
      completedChapterIds: Array.from(completed).sort((a, b) => a - b),
    });

    setScreen(hasNextChapter ? "chapter" : "result");
  }

  function jumpToChapter(chapterId: number) {
    const completed = progress.completedChapterIds.includes(chapterId);
    const hasSelected = Boolean(progress.choices[chapterId]);
    const nextStep: ReadingStep = completed ? "reading" : hasSelected ? "ending" : "reading";
    updateProgress({
      ...progress,
      currentChapterId: chapterId,
      currentStep: nextStep,
    });
    setScreen(getScreenFromStep(nextStep));
  }

  function changeChapterChoice(chapterId: number) {
    setChoiceTargetChapterId(chapterId);
    updateProgress({
      ...progress,
      currentChapterId: chapterId,
      currentStep: "reading",
    });
    setScreen("chapter");
  }

  function handleReset() {
    const confirmed = window.confirm("進行状況と選択した回答をリセットしてよろしいですか？");
    if (!confirmed) {
      return;
    }

    resetProgress();
    setProgress(initialProgress);
    setScreen("title");
  }

  const answeredCount = Object.keys(progress.choices).length;
  const canViewResult = answeredCount >= chapters.length && chapters.length > 0;

  if (!mounted) {
    return <main className="app-shell" />;
  }

  return (
    <main
      className="app-shell"
      style={
        {
          "--chapter-image": currentChapter
            ? `url("${getChapterImagePath(currentChapter.id)}")`
            : `url("${titleImagePath}")`,
          "--title-image": `url("${titleImagePath}")`,
        } as CSSProperties
      }
    >
      <nav className="top-bar" aria-label="主要メニュー">
        <button className="text-button" type="button" onClick={showTitle}>
          タイトルに戻る
        </button>
        <button className="text-button" type="button" onClick={() => setScreen("index")}>
          一覧表を見る
        </button>
        <button
          className={canViewResult ? "text-button result-ready" : "text-button muted"}
          type="button"
          onClick={() => setScreen("result")}
          disabled={!canViewResult}
        >
          診断結果を確認する
        </button>
        <button className="text-button muted" type="button" onClick={handleReset}>
          回答をリセットする
        </button>
      </nav>

      {screen === "title" && (
        <TitleScreen
          completedCount={progress.completedChapterIds.length}
          hasChapters={chapters.length > 0}
          onStart={() => startStory("start")}
          onContinue={() => startStory("continue")}
        />
      )}

      {screen === "chapter" && currentChapter && (
        <ChapterScreen
          chapter={currentChapter}
          progress={progress}
          onSelectChoice={selectChoice}
        />
      )}

      {screen === "ending" && currentChapter && selectedChoice && (
        <EndingScreen
          chapter={currentChapter}
          choice={selectedChoice}
          onNext={goNext}
          onIndex={() => setScreen("index")}
        />
      )}

      {screen === "index" && (
        <ChapterIndex
          progress={progress}
          onChapterSelect={jumpToChapter}
          onChangeChoice={changeChapterChoice}
          onStart={() => startStory("continue")}
          onResult={() => setScreen("result")}
          canViewResult={canViewResult}
        />
      )}

      {screen === "result" && <ResultScreen progress={progress} onIndex={() => setScreen("index")} />}
    </main>
  );
}

function TitleScreen({
  completedCount,
  hasChapters,
  onStart,
  onContinue,
}: {
  completedCount: number;
  hasChapters: boolean;
  onStart: () => void;
  onContinue: () => void;
}) {
  return (
    <section className="title-screen scene-frame title-art">
      <div className="title-copy">
        <p className="eyebrow title-kicker">15の決断で読み解く</p>
        <h1>
          <span>あなたの</span>
          <span>経営資質診断</span>
        </h1>
        <p className="title-theme">幕末・明治維新編</p>
        <p className="subtitle">一人の長州藩士・村瀬 新之助とたどる十五の決断</p>
        <p className="lead">
          幕末から明治維新へ。
          <br />
          架空の長州藩士・村瀬 新之助（むらせ しんのすけ）の視点から、
          <br />
          歴史の分岐点に立つ人物たちの決断をたどり、
          <br />
          あなたの価値観に近い幕末の偉人タイプを診断します。
        </p>
        <p className="fiction-note">
          本作は史実を尊重して制作しておりますが、物語として描くため、一部に創作を加えております。
          <br />
          史実と創作が織りなす幕末の世界を、どうぞお楽しみください。
        </p>
      </div>

      <div className="title-actions" aria-label="開始メニュー">
        <button className="primary-button" type="button" onClick={onStart}>
          物語を始める
        </button>
        <button className="secondary-button" type="button" onClick={onContinue}>
          続きから
        </button>
      </div>

      <p className="progress-note">
        回答済み: {completedCount} / 15
      </p>

      {!hasChapters && (
        <p className="notice">
          `story` フォルダーが未検出のため、本文データはまだ取り込まれていません。
        </p>
      )}
    </section>
  );
}

function ChapterScreen({
  chapter,
  progress,
  onSelectChoice,
}: {
  chapter: Chapter;
  progress: ReadingProgress;
  onSelectChoice: (chapterId: number, choiceId: string) => void;
}) {
  return (
    <article className="chapter-view scene-frame">
      <ChapterHeader chapter={chapter} completedCount={progress.completedChapterIds.length} />

      <div className="reader-column">
        <PassageList passages={chapter.passages} />

        <section id={`chapter-${chapter.id}-choices`} className="choice-panel" aria-label="選択肢">
          <p className="eyebrow">決断</p>
          <h3>{getChoiceQuestion(chapter.id)}</h3>
          <div className="choice-grid">
            {chapter.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                onClick={() => onSelectChoice(chapter.id, choice.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function EndingScreen({
  chapter,
  choice,
  onNext,
  onIndex,
}: {
  chapter: Chapter;
  choice: Choice;
  onNext: () => void;
  onIndex: () => void;
}) {
  const isLastChapter = chapter.id === chapters[chapters.length - 1]?.id;
  const nextLabel = isLastChapter
    ? "タイプ診断へ進む"
    : `第${getJapaneseChapterNumber(chapter.id + 1)}章へ進む`;

  return (
    <article className="ending-view scene-frame">
      <div className="reader-column">
        <p className="eyebrow">第{chapter.id}章 選択結果</p>
        <h2>決断の余韻</h2>

        <section className="selected-choice" aria-label="選択した内容">
          <span>{choice.label}</span>
          <div>
            <p>{getChoiceDisplayText(choice.text, choice.person)}</p>
            <small>{getChoiceValue(choice.text, choice.value)}</small>
          </div>
        </section>

        <section className="ending-copy" aria-label="共通エンディング">
          <PassageList passages={chapter.endingPassages} compact />
        </section>

        <div className="ending-actions">
          <button className="primary-button" type="button" onClick={onNext}>
            {nextLabel}
          </button>
          <button className="secondary-button" type="button" onClick={onIndex}>
            章の一覧表へ戻る
          </button>
        </div>
      </div>
    </article>
  );
}

function ChapterHeader({
  chapter,
  completedCount,
}: {
  chapter: Chapter;
  completedCount: number;
}) {
  return (
    <header className="chapter-header">
      <p className="eyebrow">{getChapterLabel(chapter.id)} / 全十五章</p>
      <h2>{chapter.title}</h2>
      {chapter.subtitle && <p className="chapter-subtitle">{chapter.subtitle}</p>}
      <p className="progress-note">済 {completedCount} / 15</p>
    </header>
  );
}

function PassageList({ passages, compact = false }: { passages: Passage[]; compact?: boolean }) {
  return (
    <div className={compact ? "passage-list compact" : "passage-list"}>
      {passages.map((passage, index) => {
        const isThought = passage.kind === "scene" && /^（/.test(passage.text);
        const previous = passages[index - 1];
        const showSpeaker =
          passage.kind === "dialogue" &&
          passage.speaker &&
          !(previous?.kind === "dialogue" && previous.speaker === passage.speaker);
        return (
          <section
            className={isThought ? `passage ${passage.kind} thought` : `passage ${passage.kind}`}
            key={passage.id}
          >
            {showSpeaker && <p className="speaker">【{passage.speaker}】</p>}
            <p className="passage-text">{passage.text}</p>
          </section>
        );
      })}
    </div>
  );
}

function getChoiceQuestion(chapterId: number) {
  if (chapterId === 8) {
    return "村瀬は、誰の軍に入るか";
  }

  if (chapterId === 10) {
    return "徳川 慶喜は、何を選ぶか";
  }

  return "村瀬は、何を選ぶか";
}

function ChoiceButton({ choice, onClick }: { choice: Choice; onClick: () => void }) {
  return (
    <button className="choice" type="button" onClick={onClick}>
      <span className="choice-label">{choice.label}</span>
      <span className="choice-body">
        <span>{getChoiceDisplayText(choice.text, choice.person)}</span>
        <em>{getChoiceValue(choice.text, choice.value)}</em>
      </span>
    </button>
  );
}

function ChapterIndex({
  progress,
  onChapterSelect,
  onChangeChoice,
  onStart,
  onResult,
  canViewResult,
}: {
  progress: ReadingProgress;
  onChapterSelect: (chapterId: number) => void;
  onChangeChoice: (chapterId: number) => void;
  onStart: () => void;
  onResult: () => void;
  canViewResult: boolean;
}) {
  const answeredCount = Object.keys(progress.choices).length;
  const completedCount = progress.completedChapterIds.length;

  return (
    <section className="index-view scene-frame">
      <header className="section-header">
        <p className="eyebrow">進行と回答</p>
        <h2>進行確認</h2>
        <p className="index-summary">
          済 {completedCount} / {chapters.length}　回答 {answeredCount} / {chapters.length}
        </p>
      </header>

      {chapters.length === 0 ? (
        <div className="empty-state">
          <p>まだ章データがありません。</p>
          <p>
            `story` フォルダーに Word ファイルを配置し、`npm run extract:story` を実行してください。
          </p>
        </div>
      ) : (
        <div className="chapter-list">
          {chapters.map((chapter) => {
            const completed = progress.completedChapterIds.includes(chapter.id);
            const selectedChoice = chapter.choices.find((choice) => choice.id === progress.choices[chapter.id]);
            const answered = Boolean(selectedChoice);
            const current = progress.currentChapterId === chapter.id && !completed;
            const status = completed ? "completed" : answered ? "answered" : current ? "current" : "unread";
            const statusLabel = completed ? "済" : answered ? "回答済み" : current ? "途中" : "未読";
            return (
              <article
                className={`chapter-row ${status}`}
                key={chapter.id}
              >
                <div className="chapter-row-title">
                  <strong>{chapter.title}</strong>
                  {chapter.subtitle && <small>{chapter.subtitle}</small>}
                  {selectedChoice && (
                    <p className="chapter-choice-summary">
                      選択: {getChoiceValue(selectedChoice.text, selectedChoice.value)}
                    </p>
                  )}
                </div>
                <div className="chapter-row-status">
                  <em>{statusLabel}</em>
                  <div className="chapter-row-actions">
                    <button className="small-button" type="button" onClick={() => onChapterSelect(chapter.id)}>
                      {answered || completed ? "読み直す" : "読む"}
                    </button>
                    {answered && (
                      <button className="small-button ghost" type="button" onClick={() => onChangeChoice(chapter.id)}>
                        選択を変更
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="index-actions">
        <button className="primary-button" type="button" onClick={onStart}>
          続きから読む
        </button>
        <button
          className={canViewResult ? "primary-button" : "secondary-button"}
          type="button"
          onClick={onResult}
          disabled={!canViewResult}
        >
          診断結果を見る
        </button>
      </div>
    </section>
  );
}

function ResultScreen({
  progress,
  onIndex,
}: {
  progress: ReadingProgress;
  onIndex: () => void;
}) {
  const diagnosis = calculateDiagnosis(progress);
  const { primary, secondary } = diagnosis;
  const primaryRank = diagnosis.ranks[0];
  const secondaryRank = diagnosis.ranks[1];

  return (
    <section className="result-view scene-frame">
      <div className="reader-column">
        <p className="eyebrow">診断結果</p>
        <h2 className="diagnosis-heading">
          <span>あなたの経営における</span>
          <span>最も大事にしている信念</span>
        </h2>

        <section className="diagnosis-hero" aria-label="最も大事にしている信念">
          <p className="diagnosis-type-title">{primary.type}</p>
          <p>{primary.summary}。</p>
          <p className="diagnosis-person">
            この型に近い人物 <strong>{primary.name}</strong>
            {primaryRank ? <span>{primaryRank.percentage}%</span> : null}
          </p>
        </section>

        <section className="diagnosis-section" aria-label="もう一つの強み">
          <h3>あなたに備わるもう一つの強み</h3>
          <p className="diagnosis-type-title secondary">{secondary.type}</p>
          <p>{secondary.secondaryDescription}も、あなたの判断に表れやすい強みです。</p>
          <p className="diagnosis-person">
            この型に近い人物 <strong>{secondary.name}</strong>
            {secondaryRank ? <span>{secondaryRank.percentage}%</span> : null}
          </p>
        </section>

        <section className="diagnosis-section" aria-label="得意な経営スタイル">
          <h3>あなたの得意な経営スタイル</h3>
          <p className="diagnosis-combination">
            {primary.type} × {secondary.type}
          </p>
          <p className="diagnosis-combination-people">
            {primary.name} × {secondary.name}
          </p>
          <div className="diagnosis-advice">
            <p>
              あなたの経営スタイルは、{primary.type}を軸に、{secondary.type}の良さを取り入れる形です。
            </p>
            <p>
              「{primary.strengths[0]}」という強みを、判断の中心に置くとよいでしょう。
              そこに{secondary.secondaryDescription}を生かすことで、考えを周囲へ伝え、行動へつなげやすくなります。
            </p>
            <p>
              向いているのは、{primary.recommendedPath}です。
              まず目的と進め方を周囲と共有し、小さな行動から確かめていくと、二つの強みを着実な成果へつなげられるでしょう。
            </p>
          </div>
        </section>

        <section className="diagnosis-section">
          <h3>あなたが経営するうえで、気を付けたいこと</h3>
          <p>{primary.cautionAdvice}</p>
        </section>

        <section className="diagnosis-section">
          <h3>強み</h3>
          <ul className="diagnosis-list">
            {[...primary.strengths, secondary.secondaryDescription].slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="diagnosis-section">
          <h3>課題点</h3>
          <ul className="diagnosis-list">
            {primary.challenges.slice(0, 2).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="diagnosis-section compact">
          <h3>得点順</h3>
          <ol className="diagnosis-ranking">
            {diagnosis.ranks.map((rank) => (
              <li key={rank.character.id}>
                <span>{rank.character.type}</span>
                <strong>{rank.percentage}%</strong>
                <small>{rank.character.name}</small>
              </li>
            ))}
          </ol>
          <p className="result-summary">
            保存されている回答数: <strong>{diagnosis.selectedCount}</strong> / {chapters.length}
          </p>
        </section>

        <button className="primary-button" type="button" onClick={onIndex}>
          進行確認を見る
        </button>
      </div>
    </section>
  );
}
