import { useState, useEffect } from "react";
import "./App.css";

import Sidebar  from "./components/Sidebar";
import Hero     from "./components/Hero";
import Skills   from "./components/Skills";
import Projects from "./components/Projects";
import Contact  from "./components/Contact";
import Socials  from "./components/Socials";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const [visible, setVisible]             = useState(false);

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
  };

  const layoutClass = [
    "layout",
    visible      ? "layout--visible"           : "",
    !sidebarOpen ? "layout--sidebar-collapsed" : "",
  ].join(" ");

  return (
    <div className={layoutClass}>
      <div className="bg-grid" />
      <div className="bg-glow" />

      <Sidebar
        activeSection={activeSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
      />

      <main className="main">
        <div className="container">
          <Hero />
          <Skills />
          <Projects />
          <Contact />
          <Socials />
          <footer className="footer" />
        </div>
      </main>
    </div>
  );
}