import { SOCIALS } from "../data/data";
import "../styles/socials.css";

export default function Socials() {
  return (
    <section className="section socials-section" id="socials">
      <div className="section__inner socials__inner">
        <p className="socials__label">Social</p>
        <ul className="socials__list">
          {SOCIALS.map(({ label, href }) => (
            <li key={label} className="socials__item">
              <a href={href} target="_blank" rel="noreferrer" className="socials__link">
                {label}
                <svg className="socials__arrow" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}