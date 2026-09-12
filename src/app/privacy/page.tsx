import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 幕末・明治維新 経営資質診断",
};

export default function PrivacyPage() {
  return (
    <main className="policy-shell">
      <article className="policy-panel">
        <p className="eyebrow">簡易診断のデータについて</p>
        <h1>プライバシーポリシー</h1>
        <section>
          <h2>個人情報について</h2>
          <p>現在の簡易診断では、メールアドレス、氏名、会社・組織名、役職などの個人情報を入力・取得する機能は設けていません。</p>
        </section>
        <section>
          <h2>回答データについて</h2>
          <p>15問の回答内容は、途中からの再開と診断結果の表示に使用するため、ご利用のブラウザー内に保存されます。回答データを外部サーバーへ送信する機能はありません。</p>
        </section>
        <section>
          <h2>回答データの削除</h2>
          <p>簡易診断の「最初からやり直す」を選ぶと、確認後にブラウザー内の回答データが削除されます。</p>
        </section>
        <section>
          <h2>今後の変更</h2>
          <p>今後、個人情報の入力や外部への保存機能を追加する場合は、利用目的、保存期間、管理方法などを明示し、このページを更新します。</p>
        </section>
        <a className="secondary-button policy-back" href="/quick">簡易診断へ戻る</a>
      </article>
    </main>
  );
}
