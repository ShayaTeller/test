import { useState, type FormEvent } from "react";
import "../styles/homepage.css";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      event.preventDefault();
      setSearchError("כתבו מה תרצו לחפש.");
      return;
    }

    setSearchError("");
  };

  return (
    <main className="image-search-page" dir="rtl">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="מצא - חיפוש Google">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>מצא</span>
        </a>
        <span className="powered-by">מופעל באמצעות Google</span>
      </header>

      <section id="top" className="search-hero" aria-labelledby="page-title">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          למצוא. לראות. לשמור.
        </div>
        <h1 id="page-title">
          כל מה שחיפשת,
          <span>במקום אחד.</span>
        </h1>
        <p>
          חיפוש Google מהיר ונקי ברחבי הרשת. הקלידו שאלה, נושא או אתר —
          וקבלו את התוצאות הרלוונטיות.
        </p>

        <div className="search-shell">
          <form
            className="image-search-form"
            action="https://www.google.com/search"
            method="get"
            target="_blank"
            onSubmit={handleSearch}
          >
            <input type="hidden" name="hl" value="he" />
            <label className="sr-only" htmlFor="image-search-query">
              מה תרצו לחפש?
            </label>
            <input
              id="image-search-query"
              className="image-search-input"
              type="search"
              name="q"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (searchError) setSearchError("");
              }}
              placeholder="למשל: שקיעה במדבר"
              autoComplete="off"
              aria-describedby={searchError ? "search-error" : undefined}
              aria-invalid={Boolean(searchError)}
            />
            <button className="image-search-button" type="submit">
              חיפוש ב-Google
            </button>
          </form>
          {searchError && (
            <p id="search-error" className="search-error" role="alert">
              {searchError}
            </p>
          )}
        </div>

        <div className="search-notes" aria-label="מידע על החיפוש">
          <span>תוצאות חיפוש ממנוע Google</span>
          <span>התוצאות נפתחות בכרטיסייה חדשה</span>
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
        <span>חיפוש פשוט, ללא הסחות דעת.</span>
        <span>© {new Date().getFullYear()} מצא</span>
      </footer>
    </main>
  );
}
