import { CV_PATH } from "../data/data";
import "../styles/hero.css";

const myPhoto = "/images/PerezCotoJocsan.png";

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero__content">
        <p className="hero__eyebrow">Hello, I'm</p>
        <h1 className="hero__name">Jocsan<br />Pérez Coto</h1>
        <h2 className="hero__title">Full Stack Developer</h2>
        <p className="hero__bio">
          I build scalable web applications and intuitive user experiences, combining strong backend logic with clean frontend design.
        </p>
        <a href={CV_PATH} download className="btn-cv">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download CV
        </a>
      </div>

      <div className="hero__photo-wrap">
        {myPhoto ? (
          <img src={myPhoto} alt="Jocsan Pérez Coto" className="hero__photo" />
        ) : (
          <div className="hero__photo-placeholder">
            <span>Your Photo</span>
            <p>Import your image in Hero.jsx</p>
          </div>
        )}
        <div className="hero__photo-ring" />
      </div>
    </section>
  );
}