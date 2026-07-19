import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "幕末・明治維新 歴史ノベル",
  description: "物語を楽しみながら意思決定と経営的な考え方を学ぶ歴史ノベル",
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
