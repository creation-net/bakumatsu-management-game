"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { chapters } from "@/data/chapters";
import { initialProgress, loadProgress, resetProgress, saveProgress } from "@/lib/progress";
import {
  getChapterImagePath,
  getChapterLabel,
  getChoiceDisplayText,
  getChoiceValue,
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
    updateProgress({
      ...progress,
      currentChapterId: chapterId,
      currentStep: "ending",
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

  function handleReset() {
    resetProgress();
    setProgress(initialProgress);
    setScreen("title");
  }

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
          表紙
        </button>
        <button className="text-button" type="button" onClick={() => setScreen("index")}>
          章の一覧表
        </button>
        <button className="text-button muted" type="button" onClick={handleReset}>
          初期化
        </button>
      </nav>

      {screen === "title" && (
        <TitleScreen
          completedCount={progress.completedChapterIds.length}
          hasChapters={chapters.length > 0}
          onStart={() => startStory("start")}
          onContinue={() => startStory("continue")}
          onIndex={() => setScreen("index")}
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
          onStart={() => startStory("continue")}
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
  onIndex,
}: {
  completedCount: number;
  hasChapters: boolean;
  onStart: () => void;
  onContinue: () => void;
  onIndex: () => void;
}) {
  return (
    <section className="title-screen scene-frame title-art">
      <div className="title-copy">
        <p className="eyebrow">経営者タイプ別診断</p>
        <h1>幕末・明治維新</h1>
        <p className="subtitle">村瀬新之助と歩む十五の決断</p>
        <p className="lead">
          黒船来航から武士の終焉まで。歴史の分岐点に立ち、人物たちの意思決定を通じて
          自分の資質を診断します。
        </p>
      </div>

      <div className="title-actions" aria-label="開始メニュー">
        <button className="primary-button" type="button" onClick={onStart}>
          物語を始める
        </button>
        <button className="secondary-button" type="button" onClick={onContinue}>
          続きから
        </button>
        <button className="secondary-button" type="button" onClick={onIndex}>
          章の一覧表
        </button>
      </div>

      <p className="progress-note">
        読了済み: {completedCount} / 15
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

        <section className="choice-panel" aria-label="選択肢">
          <p className="eyebrow">決断</p>
          <h3>{chapter.id === 10 ? "徳川慶喜は、何を選ぶか" : "村瀬は、何を選ぶか"}</h3>
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
  const nextLabel = isLastChapter ? "タイプ診断へ進む" : `第${chapter.id + 1}章へ進む`;

  return (
    <article className="ending-view scene-frame">
      <div className="reader-column">
        <p className="eyebrow">第{chapter.id}章 選択結果</p>
        <h2>決断の余韻</h2>

        <section className="selected-choice" aria-label="選択した内容">
          <span>{choice.label}</span>
          <div>
            {choice.person && <p className="choice-person">{choice.person}</p>}
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
      <p className="progress-note">読了 {completedCount} / 15</p>
    </header>
  );
}

function PassageList({ passages, compact = false }: { passages: Passage[]; compact?: boolean }) {
  return (
    <div className={compact ? "passage-list compact" : "passage-list"}>
      {passages.map((passage) => {
        const isThought = passage.kind === "scene" && /^（/.test(passage.text);
        return (
          <section
            className={isThought ? `passage ${passage.kind} thought` : `passage ${passage.kind}`}
            key={passage.id}
          >
            {passage.kind === "dialogue" && passage.speaker && (
              <p className="speaker">{passage.speaker}</p>
            )}
            <p className="passage-text">{passage.text}</p>
          </section>
        );
      })}
    </div>
  );
}

function ChoiceButton({ choice, onClick }: { choice: Choice; onClick: () => void }) {
  return (
    <button className="choice" type="button" onClick={onClick}>
      <span className="choice-label">{choice.label}</span>
      <span className="choice-body">
        {choice.person && <strong>{choice.person}</strong>}
        <span>{getChoiceDisplayText(choice.text, choice.person)}</span>
        <em>{getChoiceValue(choice.text, choice.value)}</em>
      </span>
    </button>
  );
}

function ChapterIndex({
  progress,
  onChapterSelect,
  onStart,
}: {
  progress: ReadingProgress;
  onChapterSelect: (chapterId: number) => void;
  onStart: () => void;
}) {
  return (
    <section className="index-view scene-frame">
      <header className="section-header">
        <p className="eyebrow">歴史年表</p>
          <h2>章の一覧表</h2>
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
            const current = progress.currentChapterId === chapter.id && !completed;
            return (
              <button
                className={current ? "chapter-row current" : "chapter-row"}
                key={chapter.id}
                type="button"
                onClick={() => onChapterSelect(chapter.id)}
              >
                <span className="chapter-number">{getChapterLabel(chapter.id)}</span>
                <span className="chapter-row-title">
                  <strong>{chapter.title}</strong>
                  {chapter.subtitle && <small>{chapter.subtitle}</small>}
                </span>
                <em>{completed ? "読了" : current ? "途中" : "未読"}</em>
              </button>
            );
          })}
        </div>
      )}

      <button className="primary-button" type="button" onClick={onStart}>
        読書画面へ
      </button>
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
  const selectedCount = Object.keys(progress.choices).length;

  return (
    <section className="result-view scene-frame">
      <div className="reader-column">
        <p className="eyebrow">仮診断</p>
        <h2>タイプ診断</h2>
        <p className="lead">
          選択内容にもとづく意思決定タイプと学習フィードバックを、今後ここに表示します。
        </p>
        <p className="result-summary">
          保存されている選択数: <strong>{selectedCount}</strong>
        </p>
        <button className="primary-button" type="button" onClick={onIndex}>
          章の一覧表を見る
        </button>
      </div>
    </section>
  );
}
