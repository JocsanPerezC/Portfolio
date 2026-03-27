import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Socials from "./components/Socials";
import TechSphere from "./components/TechSphere";
import GithubStats from "./components/GithubStats";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
        className={[
          "relative min-h-screen overflow-x-hidden transition-colors duration-300",
          theme === "dark"
            ? "bg-[#07080f] text-[#e8eaf0]"
            : "bg-[#f6f7fb] text-[#111827]",
        ].join(" ")}
      >      

      {/* Fondo grid */}
      <div
        className={[
          "pointer-events-none fixed inset-0 z-0",
          theme === "dark"
            ? "bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(124,109,250,0.12)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(165,153,253,0.08)_0%,transparent_70%)]"
            : "bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(124,109,250,0.10)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(99,102,241,0.07)_0%,transparent_70%)]",
        ].join(" ")}
      />
      
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(124,109,250,0.12)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(165,153,253,0.08)_0%,transparent_70%)]" />

      <Sidebar
        activeSection={activeSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <main
        className={[
          "relative z-10 min-w-0 flex-1 transition-all duration-300 ease-out",
          "md:ml-[220px]",
          sidebarOpen ? "lg:ml-[220px]" : "lg:ml-[72px]",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        ].join(" ")}
      >
        <Hero         theme={theme} language={language} />
        <TechSphere   theme={theme} language={language} />
        <GithubStats  theme={theme} language={language} />
        <Skills       theme={theme} language={language} />
        <Projects     theme={theme} language={language} />
        <Contact      theme={theme} language={language} />
        <Socials      theme={theme} language={language} />

        <footer className="h-8 border-t border-white/10" />
      </main>
    </div>
  );
}