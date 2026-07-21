import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "あなたの経営資質診断 幕末・明治維新編",
  description: "幕末から明治維新へ。架空の長州藩士・村瀬新之助の視点から、歴史の分岐点に立つ人物たちの決断をたどり、あなたの価値観に近い幕末の偉人タイプを診断します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
