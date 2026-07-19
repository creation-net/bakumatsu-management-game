export type PassageKind = "dialogue" | "narration" | "scene";

export type Passage = {
  id: string;
  kind: PassageKind;
  speaker?: string;
  text: string;
};

export type Choice = {
  id: string;
  text: string;
  label: string;
  person?: string;
  value?: string;
  reaction?: string;
};

export type Chapter = {
  id: number;
  title: string;
  subtitle?: string;
  sourceFile: string;
  passages: Passage[];
  endingPassages: Passage[];
  choices: Choice[];
  notes?: string[];
};

export type ReadingStep = "reading" | "ending" | "result";

export type ReadingProgress = {
  currentChapterId: number;
  currentStep: ReadingStep;
  completedChapterIds: number[];
  choices: Record<number, string>;
  updatedAt: string;
};
