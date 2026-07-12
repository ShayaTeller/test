import { useEffect, useState } from "react";
import "../styles/homepage.css";

const SEARCH_ENGINE_ID = "d0235fadd8a3c4fc6";

export default function Homepage() {
  const [isSearchLoading, setIsSearchLoading] = useState(true);
  const [hasSearchError, setHasSearchError] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-google-cse="${SEARCH_ENGINE_ID}"]`,
    );

    if (existingScript) {
      queueMicrotask(() => setIsSearchLoading(false));
      return;
    }

    const script = document.createElement("script");
    const handleLoad = () => setIsSearchLoading(false);
    const handleError = () => {
      setIsSearchLoading(false);
      setHasSearchError(true);
    };

    script.src = `https://cse.google.com/cse.js?cx=${SEARCH_ENGINE_ID}`;
    script.async = true;
    script.dataset.googleCse = SEARCH_ENGINE_ID;
    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <main className="image-search-page" dir="rtl">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="תמונע - חיפוש תמונות">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>תמונע</span>
        </a>
        <span className="powered-by">מופעל באמצעות Google</span>
      </header>

      <section id="top" className="search-hero" aria-labelledby="page-title">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          למצוא. לראות. לשמור.
        </div>
        <h1 id="page-title">
          העולם כולו,
          <span>בתמונה אחת.</span>
        </h1>
        <p>
          חיפוש תמונות מהיר ונקי ברחבי הרשת. הקלידו רעיון, מקום או רגע —
          ותנו לתמונות לדבר.
        </p>

        <div className="search-shell">
          {isSearchLoading && (
            <div className="search-skeleton" aria-live="polite">
              <span className="skeleton-input" />
              <span className="skeleton-button" />
              <span className="sr-only">טוען את מנוע החיפוש</span>
            </div>
          )}

          {hasSearchError ? (
            <div className="search-error" role="alert">
              מנוע החיפוש לא נטען. בדקו את החיבור ורעננו את העמוד.
            </div>
          ) : (
            <div className="gcse-search" />
          )}
        </div>

        <div className="search-notes" aria-label="מידע על החיפוש">
          <span>תוצאות תמונה ממנוע Google</span>
          <span>החיפוש נפתח כאן בעמוד</span>
        </div>
      </section>

      <section className="visual-strip" aria-label="השראה לחיפוש">
        <article className="visual-card card-landscape">
          <div className="card-copy">
            <span>טבע</span>
            <strong>מקומות שעוצרים בהם</strong>
          </div>
        </article>
        <article className="visual-card card-architecture">
          <div className="card-copy">
            <span>אדריכלות</span>
            <strong>קווים, אור וחומר</strong>
          </div>
        </article>
        <article className="visual-card card-texture">
          <div className="card-copy">
            <span>מרקמים</span>
            <strong>פרטים קטנים מקרוב</strong>
          </div>
        </article>
      </section>

      <footer className="site-footer">
        <span>חיפוש תמונות פשוט, ללא הסחות דעת.</span>
        <span>© {new Date().getFullYear()} תמונע</span>
      </footer>
    </main>
  );
}
