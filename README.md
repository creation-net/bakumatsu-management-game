# 幕末・明治維新 歴史ノベル

Next.js、TypeScript、App Router で作成した選択式歴史ノベル Web アプリです。

## 使い方

1. `story` フォルダーに第1章から第15章までの `.docx` ファイルを配置します。
2. 依存関係をインストールします。
   ```bash
   npm install
   ```
3. Word ファイルをアプリ用データへ変換します。
   ```bash
   npm run extract:story
   ```
4. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```

変換時の注意点や未判定の形式は `outputs/story-import-report.md` に出力されます。
