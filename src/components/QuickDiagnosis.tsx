"use client";

import { useEffect, useMemo, useState } from "react";
import { getDiagnosisCombinationCautionAdvice } from "@/data/診断テキスト/経営で気を付けたいこと";
import { getDiagnosisCombinationComments } from "@/data/診断テキスト/得意な経営の型";
import { getDiagnosisManagementThemes } from "@/data/診断テキスト/力を発揮しやすい経営テーマ";
import { quickJourneyLetter } from "@/data/診断テキスト/旅を終えたあなたへ";
import { quickDiagnosisQuestions } from "@/data/quickDiagnosisQuestions";
import { calculateDiagnosis } from "@/lib/diagnosis";
import type { ReadingProgress } from "@/types/story";

type QuickScreen = "intro" | "question" | "detail";
type QuickAnswers = Record<number, string>;

const STORAGE_KEY = "bakumatsu-meiji-quick-diagnosis-v1";
function loadAnswers(): QuickAnswers {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as QuickAnswers;
    return Object.fromEntries(
      Object.entries(parsed).filter(([questionId, choiceId]) => {
        const id = Number(questionId);
        return Number.isInteger(id) && id >= 1 && id <= 15 && /^choice-[123]$/.test(choiceId);
      }),
    );
  } catch {
    return {};
  }
}

function toProgress(answers: QuickAnswers): ReadingProgress {
  const answeredIds = Object.keys(answers).map(Number).sort((a, b) => a - b);
  return {
    currentChapterId: Math.min(answeredIds.length + 1, quickDiagnosisQuestions.length),
    currentStep: answeredIds.length === quickDiagnosisQuestions.length ? "result" : "reading",
    completedChapterIds: answeredIds,
    choices: answers,
    updatedAt: new Date().toISOString(),
  };
}

export function QuickDiagnosis() {
  const [mounted, setMounted] = useState(false);
  const [screen, setScreen] = useState<QuickScreen>("intro");
  const [answers, setAnswers] = useState<QuickAnswers>({});
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const savedAnswers = loadAnswers();
    setAnswers(savedAnswers);

    if (window.location.hash === "#continue") {
      const savedCount = Object.keys(savedAnswers).length;
      if (savedCount === quickDiagnosisQuestions.length) {
        setScreen("detail");
      } else {
        const firstUnanswered = quickDiagnosisQuestions.findIndex((question) => !savedAnswers[question.id]);
        setQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
        setScreen("question");
      }
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [mounted, questionIndex, screen]);

  const answeredCount = Object.keys(answers).length;
  const progress = useMemo(() => toProgress(answers), [answers]);
  const diagnosis = useMemo(() => calculateDiagnosis(progress), [progress]);
  const currentQuestion = quickDiagnosisQuestions[questionIndex];

  function saveAnswers(nextAnswers: QuickAnswers) {
    setAnswers(nextAnswers);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAnswers));
  }

  function startNewDiagnosis() {
    if (
      answeredCount > 0
      && !window.confirm("これまでの簡易診断の回答をリセットして、最初から始めますか？")
    ) return;

    window.localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setQuestionIndex(0);
    setScreen("question");
  }

  function continueDiagnosis() {
    const firstUnanswered = quickDiagnosisQuestions.findIndex((question) => !answers[question.id]);
    setQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
    setScreen("question");
  }

  function selectAnswer(choiceId: string) {
    const nextAnswers = { ...answers, [currentQuestion.id]: choiceId };
    saveAnswers(nextAnswers);
    if (questionIndex === quickDiagnosisQuestions.length - 1) {
      setScreen("detail");
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function restart() {
    if (!window.confirm("これまでの簡易診断の回答をリセットして、最初からやり直しますか？")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setQuestionIndex(0);
    setScreen("intro");
  }

  if (!mounted) return <main className="quick-shell" />;

  if (screen === "intro") {
    return (
      <main className="quick-shell">
        <nav className="quick-topbar"><a href="/">タイトルへ戻る</a></nav>
        <section className="quick-intro quick-panel">
          <p className="eyebrow">約5分でわかる意思決定の特徴</p>
          <h1>幕末の15の決断</h1>
          <p className="quick-subtitle">あなたなら、どうする？</p>
          <div className="quick-intro-copy">
            <p>幕末から明治へ。<br />日本が大きく変わった時代には、正解のない決断が数多くありました。</p>
            <p>15の場面で「自分ならどうするか」を選んでください。</p>
            <p>約5分で、あなたの意思決定の特徴を診断します。</p>
          </div>
          <p className="diagnosis-scope-note">
            本診断では、あなたの性格ではなく、意思決定に表れる経営資質を読み解きます。
          </p>
          <div className={answeredCount === 0 ? "quick-intro-actions single" : "quick-intro-actions"}>
            <button className="primary-button quick-main-button" type="button" onClick={startNewDiagnosis}>
              診断を始める
            </button>
            {answeredCount > 0 && answeredCount < quickDiagnosisQuestions.length && (
              <button className="secondary-button quick-main-button" type="button" onClick={continueDiagnosis}>
                続きから
              </button>
            )}
            {answeredCount === quickDiagnosisQuestions.length && (
              <button className="secondary-button quick-main-button" type="button" onClick={() => setScreen("detail")}>
                結果を見る
              </button>
            )}
          </div>
          {answeredCount > 0 && (
            <p className="quick-resume-note">
              {answeredCount === quickDiagnosisQuestions.length ? "回答済み" : "回答途中"}のデータがあります（{answeredCount} / 15）
            </p>
          )}
        </section>
      </main>
    );
  }

  if (screen === "question") {
    const selectedId = answers[currentQuestion.id];
    return (
      <main className="quick-shell">
        <nav className="quick-topbar">
          <button type="button" onClick={() => setScreen("intro")}>最初の画面へ</button>
          <button className="muted" type="button" onClick={restart}>最初からやり直す</button>
        </nav>
        <section className="quick-question quick-panel">
          <div className="quick-progress-row">
            <span>第{currentQuestion.id}問</span>
            <strong>{currentQuestion.id} / {quickDiagnosisQuestions.length}</strong>
          </div>
          <div className="quick-progress-track" aria-hidden="true"><span style={{ width: `${(currentQuestion.id / 15) * 100}%` }} /></div>
          <h1>{currentQuestion.heading}</h1>
          <p className="quick-situation">{currentQuestion.description}</p>
          <h2>{currentQuestion.question}</h2>
          <div className="quick-options">
            {currentQuestion.options.map((option, index) => (
              <button
                className={selectedId === option.id ? "quick-option selected" : "quick-option"}
                key={`${currentQuestion.id}-${option.id}`}
                type="button"
                aria-pressed={selectedId === option.id}
                onClick={(event) => {
                  event.currentTarget.blur();
                  selectAnswer(option.id);
                }}
              >
                <span className="quick-option-number">{index + 1}</span>
                <span><strong>{option.text}</strong>{option.note && <small>{option.note}</small>}</span>
              </button>
            ))}
          </div>
          <div className="quick-question-actions">
            <button className="secondary-button" type="button" disabled={questionIndex === 0} onClick={() => setQuestionIndex(questionIndex - 1)}>前の質問へ</button>
          </div>
        </section>
      </main>
    );
  }

  const { primary, secondary } = diagnosis;
  const comments = getDiagnosisCombinationComments(primary.id, secondary.id);
  const caution = getDiagnosisCombinationCautionAdvice(primary.id, secondary.id) ?? primary.cautionAdvice;
  const cautionParagraphs = caution.split("\n\n");
  const themes = getDiagnosisManagementThemes(primary.id, secondary.id);

  return (
    <main className="quick-shell">
      <nav className="quick-topbar"><a href="/">タイトルへ戻る</a><button className="muted" type="button" onClick={restart}>最初からやり直す</button></nav>
      <article className="quick-detail quick-panel">
        <header className="quick-detail-header">
          <p className="eyebrow">幕末の15の決断</p>
          <h1>あなたの経営資質診断</h1>
        </header>
        <section><h2>あなたが大切にしている価値観</h2><p className="quick-type">{primary.type}</p><p>{primary.summary}</p><p className="quick-person">この型に近い人物 <strong>{primary.name}</strong></p></section>
        <section><h2>あなたの判断を支えるもう一つの強み</h2><p className="quick-type secondary">{secondary.type}</p><p>{secondary.secondaryDescription}も、あなたの判断に表れやすい強みです。</p><p className="quick-person">この型に近い人物 <strong>{secondary.name}</strong></p></section>
        <section><h2>あなたの得意な経営の型</h2><p className="quick-combination">{primary.type} × {secondary.type}</p>{comments.map((comment) => <p key={comment}>{comment}</p>)}</section>
        <section><h2>あなたが経営するうえで気を付けたいこと</h2>{cautionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        <section><h2>意思決定の特徴</h2><ul>{primary.decisionTendencies.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>力を発揮しやすい経営テーマ</h2><ul>{themes.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="quick-letter"><h2>旅を終えたあなたへ</h2>{quickJourneyLetter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className="quick-signature">――村瀬</p></section>
      </article>
    </main>
  );
}
