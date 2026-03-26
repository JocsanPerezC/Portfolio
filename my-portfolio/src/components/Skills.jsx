import { SKILLS } from "../data/data";
import "../styles/skills.css";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section__inner">
        <h2 className="section__title">Skills</h2>
        <p className="section__sub">Technologies I work with.</p>

        <div className="skills__icons">
          {SKILLS.map((s) => (
            <div className="skill-icon" key={s.name}>
              <div className="skill-icon__box">
                <s.icon className="skill-icon__svg" />
              </div>
              <span className="skill-icon__name">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}