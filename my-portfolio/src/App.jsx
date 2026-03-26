import { useState, useEffect } from "react";
import "./App.css";

// ── Your photo ───────────────────────────────────────
// import myPhoto from "./assets/photo.jpg";
const myPhoto = null;

const CV_PATH = "/cv.pdf";

const NAV_LINKS = [
  { label: "About",    id: "about"    },
  { label: "Skills",   id: "skills"   },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact"  },
  { label: "Socials",  id: "socials"  },
];

const SKILLS = [
  { name: "React",      icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Node.js",    icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Python",     icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "HTML5",      icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS3",       icon: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "Tailwind",   icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Express",    icon: "https://cdn.simpleicons.org/express/FFFFFF" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB",    icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Git",        icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "GitHub",     icon: "https://cdn.simpleicons.org/github/FFFFFF" },
  { name: "Figma",      icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "MySQL",      icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "Redis",      icon: "https://cdn.simpleicons.org/redis/DC382D" },
  { name: "AWS",        icon: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "Docker",     icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Linux",      icon: "https://cdn.simpleicons.org/linux/FFFFFF" },
];

const PROJECTS = [
  {
    title: "Project One",
    desc: "Brief project description. What problem it solves and which technologies were used.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    title: "Project Two",
    desc: "Brief project description. What problem it solves and which technologies were used.",
    tags: ["Python", "REST API", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Three",
    desc: "Brief project description. What problem it solves and which technologies were used.",
    tags: ["JavaScript", "Express", "Docker"],
    link: "#",
  },
];

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/JocsanPerezC/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/jocsan-pérez-coto-647771273/" },
  { label: "Twitter",   href: "https://twitter.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [visible, setVisible]             = useState(false);
  const [formData, setFormData]           = useState({ name: "", email: "", message: "" });

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:tuemail@ejemplo.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className={`layout ${visible ? "layout--visible" : ""}`}>
      <div className="bg-grid" />
      <div className="bg-glow" />

      {/* ── Sidebar: always visible on desktop, drawer on mobile ── */}
      <aside className={`sidebar ${mobileOpen ? "sidebar--mobile-open" : ""}`}>
        <div className="sidebar__header">
          <span className="sidebar__logo">Jocsan<span>.</span></span>
        </div>

        <nav className="sidebar__nav">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              className={`sidebar__link ${activeSection === id ? "sidebar__link--active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              <span className="sidebar__dot" />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <p className="sidebar__footer-text">Full Stack Developer</p>
        </div>
      </aside>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Hamburger: only visible on mobile ── */}
      <button
        className={`hamburger ${mobileOpen ? "hamburger--open" : ""}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* ── Main scrollable content ── */}
      <main className="main">

        <section className="hero" id="about">
          <div className="hero__content">
            <p className="hero__eyebrow">Hello, I'm</p>
            <h1 className="hero__name">
              Jocsan<br />Pérez Coto
            </h1>
            <h2 className="hero__title">Full Stack Developer</h2>
            <p className="hero__bio">
              I build digital products end to end — from clean, intuitive interfaces
              to robust server-side architectures. Passionate about writing code
              that matters and crafting solutions that scale.
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
                <p>Import your image in App.jsx</p>
              </div>
            )}
            <div className="hero__photo-ring" />
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section__inner">
            <h2 className="section__title">Skills</h2>
            <p className="section__sub">Technologies I work with.</p>
            <div className="skills__icons">
              {SKILLS.map((s) => (
                <div className="skill-icon" key={s.name}>
                  <div className="skill-icon__box">
                    <img src={s.icon} alt={s.name} className="skill-icon__img" />
                  </div>
                  <span className="skill-icon__name">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="projects">
          <div className="section__inner">
            <h2 className="section__title">Projects</h2>
            <p className="section__sub">Things I've built.</p>
            <div className="projects__grid">
              {PROJECTS.map((p, i) => (
                <div className="project-card" key={i}>
                  <div className="project-card__num">0{i + 1}</div>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__desc">{p.desc}</p>
                  <div className="project-card__tags">
                    {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <a href={p.link} className="project-card__link">View project →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="section__inner contact__inner">
            <div className="contact__header">
              <h2 className="section__title">Contact</h2>
              <p className="contact__heading">
                Get in touch before I write another line of code!
              </p>
            </div>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__row">
                <div className="contact__field">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your Name"
                    value={formData.name} onChange={handleChange} required />
                </div>
                <div className="contact__field">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="your@email.com"
                    value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="contact__field">
                <label>Message</label>
                <textarea name="message" placeholder="Message" rows={5}
                  value={formData.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="contact__submit">Submit</button>
            </form>
          </div>
        </section>

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

        <footer className="footer" />
      </main>
    </div>
  );
}