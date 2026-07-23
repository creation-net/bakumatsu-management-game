"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { chapters as fullChapters } from "@/data/chapters";
import { trialChapters } from "@/data/trialChapters";
import { getDiagnosisCombinationComments } from "@/data/diagnosisCombinationComments";
import { getDiagnosisJourneyLetter } from "@/data/diagnosisJourneyLetters";
import { calculateDiagnosis } from "@/lib/diagnosis";
import { downloadDiagnosisReportPdf } from "@/lib/pdfExport";
import { initialProgress, loadProgress, resetProgress, saveProgress } from "@/lib/progress";
import type { ProgressMode } from "@/lib/progress";
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
type AppMode = ProgressMode;

function getDiagnosisImagePath(characterId: string): string {
  return `/images/diagnosis/types/${characterId}.webp`;
}

function getChaptersForMode(mode: AppMode): Chapter[] {
  return mode === "trial" ? trialChapters : fullChapters;
}

function getChapterById(id: number, chapterList: Chapter[]): Chapter | undefined {
  return chapterList.find((chapter) => chapter.id === id);
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
  const [appMode, setAppMode] = useState<AppMode>("trial");
  const [progress, setProgress] = useState<ReadingProgress>(initialProgress);
  const [choiceTargetChapterId, setChoiceTargetChapterId] = useState<number | null>(null);

  useEffect(() => {
    const stored = loadProgress(appMode);
    setProgress(stored);
    setMounted(true);
  }, [appMode]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setProgress(loadProgress(appMode));
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [appMode]);

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

  const activeChapters = getChaptersForMode(appMode);
  const chapterCount = activeChapters.length;

  const currentChapter = useMemo(
    () => getChapterById(progress.currentChapterId, activeChapters) ?? activeChapters[0],
    [activeChapters, progress.currentChapterId],
  );

  const selectedChoice = currentChapter
    ? currentChapter.choices.find((choice) => choice.id === progress.choices[currentChapter.id])
    : undefined;

  function updateProgress(nextProgress: ReadingProgress, mode: AppMode = appMode) {
    setProgress(nextProgress);
    saveProgress(nextProgress, mode);
  }

  function showTitle() {
    setScreen("title");
  }

  function startStory(mode: "start" | "continue", nextAppMode: AppMode = appMode) {
    const nextChapters = getChaptersForMode(nextAppMode);
    const nextProgress = nextAppMode === appMode ? progress : loadProgress(nextAppMode);

    if (nextChapters.length === 0) {
      setAppMode(nextAppMode);
      setProgress(nextProgress);
      setScreen("index");
      return;
    }

    if (mode === "start") {
      const hasSavedProgress =
        Object.keys(nextProgress.choices).length > 0 || nextProgress.completedChapterIds.length > 0;
      if (hasSavedProgress && !window.confirm("これまでの回答をリセットしますがよいですか？")) {
        return;
      }

      setAppMode(nextAppMode);
      updateProgress(
        {
          ...initialProgress,
          currentChapterId: 1,
          currentStep: "reading",
        },
        nextAppMode,
      );
      setScreen("chapter");
      return;
    }

    setAppMode(nextAppMode);
    setProgress(nextProgress);
    setScreen(getScreenFromStep(nextProgress.currentStep));
  }

  function switchMode(nextAppMode: AppMode) {
    setAppMode(nextAppMode);
    setProgress(loadProgress(nextAppMode));
    setScreen("title");
  }

  function getProgressForMode(nextAppMode: AppMode) {
    return nextAppMode === appMode ? progress : loadProgress(nextAppMode);
  }

  function canViewResultForMode(nextAppMode: AppMode) {
    const modeProgress = getProgressForMode(nextAppMode);
    const modeChapterCount = getChaptersForMode(nextAppMode).length;
    return Object.keys(modeProgress.choices).length >= modeChapterCount && modeChapterCount > 0;
  }

  function openIndex(nextAppMode: AppMode) {
    setAppMode(nextAppMode);
    setProgress(getProgressForMode(nextAppMode));
    setScreen("index");
  }

  function openResult(nextAppMode: AppMode) {
    if (!canViewResultForMode(nextAppMode)) {
      return;
    }

    setAppMode(nextAppMode);
    setProgress(getProgressForMode(nextAppMode));
    setScreen("result");
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
    const hasNextChapter = activeChapters.some((chapter) => chapter.id === nextChapterId);

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

    resetProgress(appMode);
    setProgress(initialProgress);
    setScreen("title");
  }

  const answeredCount = Object.keys(progress.choices).length;
  const canViewResult = answeredCount >= chapterCount && chapterCount > 0;

  if (!mounted) {
    return <main className="app-shell" />;
  }

  return (
    <main
      className={`app-shell chapter-theme-${currentChapter?.id ?? "none"}`}
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
        <button className="text-button" type="button" onClick={() => openIndex("trial")}>
          体験版の物語一覧
        </button>
        <button
          className={canViewResultForMode("trial") ? "text-button result-ready" : "text-button muted"}
          type="button"
          onClick={() => openResult("trial")}
          disabled={!canViewResultForMode("trial")}
        >
          体験版の診断結果
        </button>
        <button className="text-button" type="button" onClick={() => openIndex("full")}>
          完全版の物語一覧
        </button>
        <button
          className={canViewResultForMode("full") ? "text-button result-ready" : "text-button muted"}
          type="button"
          onClick={() => openResult("full")}
          disabled={!canViewResultForMode("full")}
        >
          完全版の診断結果
        </button>
        <button className="text-button muted" type="button" onClick={handleReset}>
          回答をリセットする
        </button>
      </nav>

      {screen === "title" && (
        <TitleScreen
          hasChapters={chapterCount > 0}
          onStartTrial={() => startStory("start", "trial")}
          onContinueTrial={() => startStory("continue", "trial")}
          onStartFull={() => startStory("start", "full")}
          onContinueFull={() => startStory("continue", "full")}
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
          chapters={activeChapters}
          onNext={goNext}
          onIndex={() => setScreen("index")}
        />
      )}

      {screen === "index" && (
        <ChapterIndex
          progress={progress}
          chapters={activeChapters}
          onChapterSelect={jumpToChapter}
          onChangeChoice={changeChapterChoice}
          onStart={() => startStory("continue")}
          onResult={() => setScreen("result")}
          canViewResult={canViewResult}
        />
      )}

      {screen === "result" && <ResultScreen progress={progress} />}
    </main>
  );
}

function TitleScreen({
  hasChapters,
  onStartTrial,
  onContinueTrial,
  onStartFull,
  onContinueFull,
}: {
  hasChapters: boolean;
  onStartTrial: () => void;
  onContinueTrial: () => void;
  onStartFull: () => void;
  onContinueFull: () => void;
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
        <p className="subtitle">一人の長州藩士・村瀬 新之助とたどる、歴史上の決断</p>
        <p className="lead">
          幕末から明治維新へ。
          <br />
          架空の長州藩士・村瀬 新之助の視点から、歴史の分岐点に立つ人物たちの決断をたどります。
          <br />
          あなたの選択から、経営における価値観と強みを診断します。
        </p>

        <div className="experience-grid" aria-label="遊び方を選ぶ">
          <article className="experience-card selected">
            <p className="experience-label">体験版</p>
            <h2>経営ケーススタディとして短く読む</h2>
            <p>
              各章の重要な場面をケーススタディとして整理し、歴史人物たちの価値観に触れながら、自分ならどう決断するかを短時間で考えます。
            </p>
            <p>歴史に詳しくない方や、まず雰囲気を体験したい方におすすめです。</p>
            <div className="experience-actions">
              <button className="primary-button" type="button" disabled={!hasChapters} onClick={onStartTrial}>
                体験版を始める
              </button>
              <button className="secondary-button" type="button" disabled={!hasChapters} onClick={onContinueTrial}>
                続きから始める
              </button>
            </div>
          </article>

          <article className="experience-card">
            <p className="experience-label">完全版</p>
            <h2>すべての物語をじっくり体験できます。</h2>
            <p>歴史上の人物たちの葛藤や対話、時代背景まで丁寧に描いた本編です。</p>
            <p>
              一つひとつの決断に至る過程を追体験しながら、より深く歴史と経営資質を学ぶことができます。
            </p>
            <div className="experience-actions">
              <button className="primary-button" type="button" disabled={!hasChapters} onClick={onStartFull}>
                完全版を始める
              </button>
              <button className="secondary-button" type="button" disabled={!hasChapters} onClick={onContinueFull}>
                続きから始める
              </button>
            </div>
          </article>
        </div>

        <p className="fiction-note">
          本作は史実を尊重して制作していますが、物語として描くため、一部に創作を加えています。
        </p>
      </div>
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
          <div className="choice-heading">
            <div>
              <p className="eyebrow">決断</p>
              <h3>{getChoiceQuestion(chapter.id)}</h3>
            </div>
            <img
              className="choice-heading-image"
              src="/images/decision/heavy-choice.webp"
              alt=""
              aria-hidden="true"
            />
          </div>
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
  chapters,
  onNext,
  onIndex,
}: {
  chapter: Chapter;
  choice: Choice;
  chapters: Chapter[];
  onNext: () => void;
  onIndex: () => void;
}) {
  const isLastChapter = chapter.id === chapters[chapters.length - 1]?.id;
  const nextLabel = isLastChapter
    ? "診断結果を確認する"
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
            物語の一覧を見る
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
      <p className="progress-note">回答済 {completedCount} / 15</p>
    </header>
  );
}

function PassageList({ passages, compact = false }: { passages: Passage[]; compact?: boolean }) {
  return (
    <div className={compact ? "passage-list compact" : "passage-list"}>
      {passages.map((passage, index) => {
        const isThought = passage.kind === "scene" && /^（/.test(passage.text);
        const previous = passages[index - 1];
        const continuesSameSpeaker =
          passage.kind === "dialogue" &&
          previous?.kind === "dialogue" &&
          Boolean(passage.speaker) &&
          previous.speaker === passage.speaker;
        const showSpeaker =
          passage.kind === "dialogue" &&
          passage.speaker &&
          !continuesSameSpeaker;
        const passageClassName = [
          "passage",
          passage.kind,
          isThought ? "thought" : "",
          continuesSameSpeaker ? "same-speaker" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <section className={passageClassName} key={passage.id}>
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
  chapters,
  onChapterSelect,
  onChangeChoice,
  onStart,
  onResult,
  canViewResult,
}: {
  progress: ReadingProgress;
  chapters: Chapter[];
  onChapterSelect: (chapterId: number) => void;
  onChangeChoice: (chapterId: number) => void;
  onStart: () => void;
  onResult: () => void;
  canViewResult: boolean;
}) {
  const answeredCount = Object.keys(progress.choices).length;

  return (
    <section className="index-view scene-frame">
      <header className="section-header">
        <p className="eyebrow">進行と回答</p>
        <h2>進行確認</h2>
        <p className="index-summary">
          回答済 {answeredCount} / {chapters.length}
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
            const statusLabel = completed ? "回答済" : answered ? "回答済" : current ? "途中" : "未読";
            return (
              <article
                className={`chapter-row chapter-row-${chapter.id} ${status}`}
                key={chapter.id}
                style={
                  {
                    "--row-image": `url("${getChapterImagePath(chapter.id)}")`,
                  } as CSSProperties
                }
              >
                <div className="chapter-row-title">
                  <strong>{chapter.title}</strong>
                  {chapter.subtitle && <small>{chapter.subtitle}</small>}
                  {selectedChoice && (
                    <p className="chapter-choice-summary">
                      選択: {selectedChoice.person ?? getChoiceValue(selectedChoice.text, selectedChoice.value)}
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
          診断結果を確認する
        </button>
      </div>
    </section>
  );
}

function ResultScreen({
  progress,
}: {
  progress: ReadingProgress;
}) {
  const diagnosis = calculateDiagnosis(progress);
  const { primary, secondary } = diagnosis;
  const diagnosisDate = formatDiagnosisDate(progress.updatedAt);
  const combinationComments = getDiagnosisCombinationComments(primary.id, secondary.id);
  const journeyLetter = getDiagnosisJourneyLetter(primary.id, secondary.id);
  const reportRef = useRef<HTMLElement>(null);
  const [pdfStatus, setPdfStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handlePdfDownload = async () => {
    if (!reportRef.current || pdfStatus === "saving") {
      return;
    }

    setPdfStatus("saving");

    try {
      await downloadDiagnosisReportPdf(reportRef.current, diagnosisDate);
      setPdfStatus("saved");
      window.setTimeout(() => setPdfStatus("idle"), 2500);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setPdfStatus("idle");
        return;
      }

      console.error(error);
      window.alert(error instanceof Error ? error.message : "PDFを作成できませんでした。もう一度お試しください。");
      setPdfStatus("idle");
    }
  };

  return (
    <section className="result-view scene-frame">
      <div className="report-shell">
        <div className="report-actions no-print">
          <button
            className="primary-button"
            type="button"
            disabled={pdfStatus === "saving"}
            onClick={() => void handlePdfDownload()}
          >
            {pdfStatus === "saving" ? "PDFを出力中" : pdfStatus === "saved" ? "PDFを出力しました" : "PDFで出力する"}
          </button>
        </div>

        <article ref={reportRef} className="diagnosis-report">
          <header className="report-cover">
            <img
              className="report-cover-image"
              src={titleImagePath}
              alt=""
              aria-hidden="true"
            />
            <h2>
              <span>幕末・明治維新</span>
              <span className="report-title-diagnosis">経営資質診断</span>
              <span className="report-title-report">結果</span>
            </h2>
            <dl className="report-meta">
              <div>
                <dt>診断日</dt>
                <dd>{diagnosisDate}</dd>
              </div>
            </dl>
          </header>

          <div className="report-body">
            <section
              className="diagnosis-hero report-section diagnosis-visual-section"
              aria-label="最も大事にしている信念"
              style={{ "--diagnosis-image": `url("${getDiagnosisImagePath(primary.id)}")` } as CSSProperties}
            >
              <h2 className="diagnosis-heading">
                <span>あなたの経営における</span>
                <span>
                  最も大事にしている
                  <br className="mobile-heading-break" />
                  信念
                </span>
              </h2>
              <p className="diagnosis-type-title">{primary.type}</p>
              <p>{primary.summary}。</p>
              <div className="diagnosis-person">
                <span>この型に近い人物</span>
                <strong>{primary.name}</strong>
                <span className="diagnosis-stars" aria-label="五つ星">★★★★★</span>
              </div>
            </section>

            <section
              className="diagnosis-section report-section diagnosis-visual-section secondary-visual"
              aria-label="もう一つの強み"
              style={{ "--diagnosis-image": `url("${getDiagnosisImagePath(secondary.id)}")` } as CSSProperties}
            >
              <h2>
                あなたに備わるもう一つの
                <br className="mobile-heading-break" />
                強み
              </h2>
              <p className="diagnosis-type-title secondary">{secondary.type}</p>
              <p>{secondary.secondaryDescription}も、あなたの判断に表れやすい強みです。</p>
              <div className="diagnosis-person">
                <span>この型に近い人物</span>
                <strong>{secondary.name}</strong>
                <span className="diagnosis-stars" aria-label="四つ星">★★★★☆</span>
              </div>
            </section>

            <section className="diagnosis-section report-section" aria-label="得意な経営の型">
              <h2>あなたの得意な経営の型</h2>
              <p className="diagnosis-combination">{primary.type} × {secondary.type}</p>
              <p className="diagnosis-combination-people">{primary.name} × {secondary.name}</p>
              <div className="diagnosis-advice">
                {combinationComments.map((comment) => <p key={comment}>{comment}</p>)}
              </div>
            </section>

            <section className="diagnosis-section report-section report-page-two-start">
              <h2>あなたが経営するうえで気を付けたいこと</h2>
              <p>{primary.cautionAdvice}</p>
            </section>

            <section className="diagnosis-section report-section">
              <h2>強み・課題点</h2>
              <div className="diagnosis-points">
                <div>
                  <h3>強み</h3>
                  <ul className="diagnosis-list">
                    {[...primary.strengths, secondary.secondaryDescription].slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>課題点</h3>
                  <ul className="diagnosis-list">
                    {primary.challenges.slice(0, 2).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="diagnosis-section report-section">
              <h2>あなたの意思決定の傾向</h2>
              <ul className="diagnosis-list diagnosis-tendencies">
                {primary.decisionTendencies.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>

            <section className="diagnosis-section report-section journey-letter" aria-label="旅を終えたあなたへ">
              <h2>旅を終えたあなたへ</h2>
              {journeyLetter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="journey-letter-signature">―― 村瀬 新之助</p>
            </section>

          </div>

          <footer className="report-footer">
            この診断は15の歴史的意思決定をもとに、あなたの経営資質を分析しています。
          </footer>
        </article>
      </div>
    </section>
  );
}

function formatDiagnosisDate(updatedAt: string): string {
  const parsedDate = updatedAt ? new Date(updatedAt) : new Date();
  const date = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
