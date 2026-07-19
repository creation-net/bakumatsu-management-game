import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "経営者タイプ別診断 幕末・明治維新",
  description: "幕末・明治維新の物語を通じて、自分の意思決定の資質を診断します。",
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
