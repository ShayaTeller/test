import { processSteps } from "../constats";

export default function ProcessSection() {
  return (
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
  );
}
