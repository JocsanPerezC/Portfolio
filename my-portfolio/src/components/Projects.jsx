import { PROJECTS } from "../data/data";
import "../styles/projects.css";

export default function Projects() {
  return (
    <section className="section section--alt" id="projects">
      <div className="section__inner">
        <h2 className="section__title">Projects</h2>
        <p className="section__sub">Explore my journey through projects.</p>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <div className="project-card" key={i}>
              
              <div className="project-card__image">
                <img src={p.image} alt={p.title} />
              </div>

              <div className="project-card__num">0{i + 1}</div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>

              <div className="project-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <a 
                href={p.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-card__link"
              > View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}