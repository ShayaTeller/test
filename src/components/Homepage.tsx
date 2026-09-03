import { useState, type FormEvent } from "react";
import "../styles/homepage.css";
import { initialForm, audienceList, processSteps, reasons, services } from "./constats";
export default function Homepage() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <main className="possible-page" dir="rtl">
      {/* <header className="topbar"> */}
      <div className="container topbar-inner">
        <a href="#home" className="brand" aria-label="POSSIBLE home page">
          <div className="brand-lockup">
            <img src="/myLogo.png" alt="" className="logo" />
          </div>
        </a>
      </div>
      {/* </header> */}

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
                <img src="public\myLogo.png" alt="" />
              </div>
              <div className="orbit-node node-one">💡</div>
              <div className="orbit-node node-two">📐</div>
              <div className="orbit-node node-three">💻</div>
              <div className="orbit-node node-four">🚀</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-heading">
            <h2>מה אפשר לבנות ביחד?</h2>
            <p>
              כמעט כל רעיון טכנולוגי יכול להפוך למוצר. אנחנו כאן כדי להבין את הצורך
              שלכם ולבנות את הפתרון הנכון.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <div className="service-icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section id="process" className="section">
        <div className="container">
          <div className="section-heading">
            <h2>איך הופכים רעיון למציאות?</h2>
          </div>

          <div className="timeline">
            {processSteps.map((item) => (
              <article key={item.step} className="timeline-item">
                <div className="timeline-marker">{item.step}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="section">
        <div className="container">
          <div className="section-heading">
            <h2>למה לעבוד איתנו?</h2>
          </div>

          <div className="benefits-grid">
            {reasons.map((reason) => (
              <article key={reason.title} className="benefit-card">
                <div className="benefit-icon" aria-hidden="true">
                  {reason.icon}
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section banner-section">
        <div className="container banner-box">
          <div className="banner-content">
            <h2>הכול אפשרי.</h2>
            <p>
              לפעמים כל מה שחסר בין רעיון למציאות הוא הצוות הנכון שיבנה אותו.
            </p>
            <div className="banner-cta">
              <span>יש לכם רעיון?</span>
              <h3>בואו נדבר עליו.</h3>
              <a href="#contact" className="primary-button">
                🚀 מתחילים עכשיו
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="container">
          <div className="section-heading">
            <h2>יש לכם אחד מהדברים הבאים?</h2>
          </div>

          <div className="audience-list">
            {audienceList.map((item) => (
              <div key={item} className="audience-item">
                <span aria-hidden="true">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="audience-footer">
            <h3>אם אמרתם "כן" לאחד מהם – כנראה שאנחנו צריכים לדבר.</h3>
            <a href="#contact" className="secondary-button">
              ספרו לנו על הרעיון שלכם
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container about-grid">
          <div className="about-copy">
            <h2>מי אנחנו?</h2>
            <p>
              POSSIBLE נפתחה מתוך מטרה לתת מענה טכנולוגי לאנשים, עסקים וחברות
              שרוצים להפוך רעיון למציאות.
            </p>
            <p>
              אנחנו מאמינים שטכנולוגיה צריכה לשרת את האדם ואת העסק – ולא להפך.
            </p>
            <p>לכן אנחנו מלווים את התהליך מהשלב הראשון:</p>
            <div className="flow-tag">רעיון → אפיון → תכנון → פיתוח → מוצר → צמיחה</div>
            <p>
              המטרה שלנו היא לא רק לכתוב קוד. המטרה היא לבנות מוצר שעובד, נותן ערך
              ומקדם אתכם קדימה.
            </p>
          </div>

          <div className="about-panel">
            <div className="mini-stat">
              <strong>תהליך ברור</strong>
              <span>מהרעיון ועד ההשקה</span>
            </div>
            <div className="mini-stat">
              <strong>עבודה מקצועית</strong>
              <span>מענה לצרכים אמיתיים</span>
            </div>
            <div className="mini-stat">
              <strong>צמיחה מתמדת</strong>
              <span>תמיכה גם אחרי ההשקה</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section pre-form-section">
        <div className="container pre-form-box">
          <h2>הרעיון שלכם יכול להתחיל היום.</h2>
          <p>לא חייבים להגיע עם אפיון, מסמך או ידע טכנולוגי.</p>
          <p>מספיק שיש לכם רעיון.</p>
          <p>אנחנו נעזור להבין איך להפוך אותו למציאות.</p>
          <a href="#contact" className="primary-button">
            🚀 בואו נדבר
          </a>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-box">
          <div className="section-heading left-align">
            <h2>ספרו לנו מה אתם רוצים לבנות</h2>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>שם מלא</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>טלפון</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>אימייל</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>סוג הפרויקט</span>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option>אתר תדמית</option>
                  <option>אתר מכירות</option>
                  <option>מערכת CRM</option>
                  <option>מערכת מותאמת אישית</option>
                  <option>אפליקציה</option>
                  <option>רעיון למוצר</option>
                  <option>אחר</option>
                </select>
              </label>
            </div>

            <label>
              <span>ספרו לנו קצת על הרעיון שלכם...</span>
              <textarea
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="ספרו לנו קצת על הרעיון שלכם..."
                required
              />
            </label>

            <button type="submit" className="primary-button submit-button">
              שלחו את הרעיון 🚀
            </button>

            {isSubmitted && (
              <div className="success-message" role="status" aria-live="polite">
                <p>קיבלנו את הפרטים שלכם!</p>
                <p>נחזור אליכם בהקדם ונבדוק איך אפשר להפוך את הרעיון שלכם למציאות.</p>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/myLogo.png" alt="POSSIBLE" className="footer-logo" />
          </div>

          <div className="footer-links">
            <a href="#home">בית</a>
            <a href="#services">שירותים</a>
            <a href="#process">תהליך העבודה</a>
            <a href="#about">אודות</a>
            <a href="#contact">צור קשר</a>
          </div>

          <div className="social-links" aria-label="רשתות חברתיות">
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© POSSIBLE – כל הזכויות שמורות.</span>
        </div>
      </footer>
    </main>
  );
}
