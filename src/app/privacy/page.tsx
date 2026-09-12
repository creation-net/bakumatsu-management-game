import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 幕末・明治維新 経営資質診断",
};

export default function PrivacyPage() {
  return (
    <main className="policy-shell">
      <article className="policy-panel">
        <p className="eyebrow">個人情報の取り扱い</p>
        <h1>プライバシーポリシー</h1>
        <section>
          <h2>利用目的</h2>
          <p>ご入力いただいた情報は、診断結果の提供および当サービスに関するご案内のために利用します。</p>
        </section>
        <section>
          <h2>現在の試作版について</h2>
          <p>現在の簡易診断では、入力内容を外部サービスへ送信・保存しません。入力内容は、診断結果を表示している間だけブラウザー内で扱われます。</p>
        </section>
        <section>
          <h2>今後の変更</h2>
          <p>送信先や保存機能を追加する場合は、利用目的、保存期間、管理方法などを明示し、このページを更新します。</p>
        </section>
        <a className="secondary-button policy-back" href="/quick">簡易診断へ戻る</a>
      </article>
    </main>
  );
}
