import type { Metadata } from "next";
import { QuickDiagnosis } from "@/components/QuickDiagnosis";

export const metadata: Metadata = {
  title: "幕末の15の決断 | クイック診断",
  description: "幕末から明治へ。15の場面を約5分でたどり、あなたの意思決定の特徴を診断します。",
};

export default function QuickDiagnosisPage() {
  return <QuickDiagnosis />;
}
