import { developmentPageLinks, developmentSections } from "@/data/developmentPage";
import type { DevelopmentPageSection } from "@/data/developmentPage";

function DevelopmentSection({ section }: { section: DevelopmentPageSection }) {
  return (
    <section className="development-section">
      <p className="eyebrow">{section.id}</p>
      <h2>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.quote && (
        <blockquote className="development-quote">
          {section.quote.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </blockquote>
      )}
      {section.link && (
        <p className="development-inline-link">
          <a href={developmentPageLinks[section.link.hrefKey]} target="_blank" rel="noopener noreferrer">
            {section.link.label}
          </a>
        </p>
      )}
    </section>
  );
}

export default function DevelopmentPage() {
  return (
    <main className="app-shell">
      <section className="development-view" id="development-story">
        <nav className="top-nav development-top-nav" aria-label="開発への思い">
          <a className="ghost-button" href="/">
            アプリに戻る
          </a>
        </nav>

        <header className="development-hero">
          <img src="/images/development/thumbnail.jpg" alt="" aria-hidden="true" />
          <div className="development-hero-shade" />
          <div className="development-hero-copy">
            <p className="eyebrow">開発に込めた思い</p>
            <h1>歴史上の決断から、自分の経営資質を振り返る</h1>
            <p>『幕末・明治維新 経営資質診断』開発に込めた思い</p>
          </div>
        </header>

        <article className="development-body">
          <section className="development-intro">
            <p>
              こんにちは。
              <a href={developmentPageLinks.youth} target="_blank" rel="noopener noreferrer">
                兵庫県中小企業診断士協会 青年部会
              </a>
              で副会長を務めている、中小企業診断士の岡本一幸です。
            </p>
          </section>

          {developmentSections.slice(0, 7).map((section) => (
            <DevelopmentSection key={section.id} section={section} />
          ))}

          <section className="development-section development-section-editions">
            <p className="eyebrow">体験版と完全版</p>
            <h2>体験版と完全版</h2>
            <p>
              本アプリには、短時間で雰囲気を体験できる体験版と、物語をじっくり追体験できる完全版があります。
            </p>

            <div className="development-edition-grid">
              <div className="development-edition-card">
                <p className="edition-label">体験版</p>
                <h3>物語を約10分で体験できます。</h3>
                <p>
                  各章の重要な場面をケーススタディとして体験し、歴史人物の価値観に触れながら、自分ならどう決断するかを考えます。
                </p>
                <p>選んだ回答をもとに、自分の経営資質を振り返ることができます。</p>
                <p>歴史に詳しくない方や、まず雰囲気を体験したい方におすすめです。</p>
                <div className="development-actions">
                  <a className="primary-button" href="/">
                    体験版を始める
                  </a>
                  <a className="ghost-button" href="/">
                    続きから始める
                  </a>
                </div>
              </div>

              <div className="development-edition-card">
                <p className="edition-label">完全版</p>
                <h3>物語をじっくり体験できます。</h3>
                <p>歴史人物たちの葛藤や対話、時代背景まで丁寧に描いた本編です。</p>
                <p>
                  一つひとつの決断に至る過程を追体験しながら、歴史への理解を深めるとともに、自分自身の経営資質を振り返ることができます。
                </p>
                <p>
                  所要時間は約60分です。回答内容は自動で保存されるため、途中で中断しても、続きからご自身のペースで進められます。
                </p>
                <div className="development-actions">
                  <a className="primary-button" href="/">
                    完全版を始める
                  </a>
                  <a className="ghost-button" href="/">
                    完全版の続きから始める
                  </a>
                </div>
              </div>
            </div>
          </section>

          {developmentSections.slice(7).map((section) => (
            <DevelopmentSection key={section.id} section={section} />
          ))}

          <section className="development-related">
            <h2>関連ページ</h2>
            <p>アプリの活用、研修や企業支援での利用などについては、お問い合わせページからご連絡ください。</p>
            <ul>
              <li>
                <a href={developmentPageLinks.youth} target="_blank" rel="noopener noreferrer">
                  兵庫県中小企業診断士協会 青年部会 ホームページ
                </a>
              </li>
              <li>
                <a href={developmentPageLinks.profile} target="_blank" rel="noopener noreferrer">
                  開発者・岡本一幸の紹介ページ
                </a>
              </li>
              <li>
                <a href={developmentPageLinks.contact} target="_blank" rel="noopener noreferrer">
                  お問い合わせページ
                </a>
              </li>
            </ul>
          </section>
        </article>
      </section>
    </main>
  );
}
