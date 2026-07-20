import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "経営者の資質診断 幕末・明治維新編",
  description: "幕末・明治維新の物語を通じて、あなたの意思決定に近い幕末の偉人タイプを診断します。",
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
