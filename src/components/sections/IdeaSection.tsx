export default function IdeaSection() {
  return (
    <section className="section idea-section">
      <div className="container idea-layout">
        <div className="idea-copy">
          <h2>כל רעיון מתחיל במחשבה אחת.</h2>
          <p>השאלה היא מה עושים איתה.</p>
        </div>

        <div className="idea-flow-steps" aria-label="תהליך רעיון למציאות">
          <div className="step-pill">רעיון</div>
          <div className="step-pill">תכנון</div>
          <div className="step-pill">פיתוח</div>
          <div className="step-pill">מוצר</div>
        </div>
      </div>
    </section>
  );
}
