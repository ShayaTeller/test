export default function HeroSection() {
  return (
    <section id="home" className="hero section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            יש לכם רעיון?
          </div>

          <h1>
            אנחנו נהפוך אותו למציאות.
          </h1>

          <p className="lead">
            POSSIBLE מפתחת אתרים, מערכות ומוצרים טכנולוגיים בהתאמה אישית – משלב
            הרעיון ועד למוצר עובד.
          </p>

          <div className="cta-row">
            <a href="#contact" className="primary-button">
              🚀 בואו נהפוך את הרעיון למציאות
            </a>
            <a href="#process" className="secondary-button">
              איך זה עובד?
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="תהליך רעיון למציאות">
          <div className="logo-orbit">
            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <div className="orbit-core">
              <img src="public/myLogo.png" alt="" />
            </div>
            <div className="orbit-node node-one">💡</div>
            <div className="orbit-node node-two">📐</div>
            <div className="orbit-node node-three">💻</div>
            <div className="orbit-node node-four">🚀</div>
          </div>
        </div>
      </div>
    </section>
  );
}
