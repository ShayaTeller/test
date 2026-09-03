import { services } from "../constats";

export default function ServicesSection() {
  return (
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
  );
}
