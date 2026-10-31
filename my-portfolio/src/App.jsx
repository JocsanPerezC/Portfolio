import { useEffect, useRef, useState } from "react";
import IndexTabs from "./components/IndexTabs";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Technologies from "./components/Technologies";
import GithubStats from "./components/GithubStats";
import Contact from "./components/Contact";
import { NAV_LINKS, PROFILE_CONTENT } from "./data/data";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "./lib/gsap";

const readStored = (key, fallback) => {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

const store = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); the preference just won't persist.
  }
};

const initialLanguage = () =>
  readStored("guide-language", navigator.language?.toLowerCase().startsWith("es") ? "es" : "en");

export default function App() {
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState(() => readStored("guide-theme", "light"));
  const [activeSection, setActiveSection] = useState("about");
  const [motion] = useState(() => !prefersReducedMotion());
  const mainRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0c1a12" : "#1e4d36");
    store("guide-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    store("guide-language", language);
  }, [language]);

  // Index tabs follow whichever section crosses the middle of the viewport.
  useGSAP(() => {
    const triggers = NAV_LINKS.map(({ id }) => document.getElementById(id))
      .filter(Boolean)
      .map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActiveSection(section.id),
        })
      );
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  // One motion grammar: the guide opens, then every later spread turns its right page on the spine.
  useGSAP(
    () => {
      if (!motion) return;
      const q = gsap.utils.selector(mainRef);
      const hero = q("#about")[0];

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(hero.querySelectorAll("[data-hero-line]"), { yPercent: 105, duration: 1.1, stagger: 0.08 })
        .from(hero.querySelectorAll("[data-hero-fade]"), { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.07 }, "-=0.8")
        .from(
          hero.querySelectorAll('[data-page="turn"]'),
          { rotateY: -70, autoAlpha: 0, duration: 1.3, clearProps: "transform,opacity,visibility" },
          0.15
        )
        .from(
          hero.querySelectorAll("[data-chip]"),
          { scale: 1.6, autoAlpha: 0, duration: 0.45, stagger: 0.09, ease: "back.out(2)" },
          0.75
        );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        q("[data-spread]")
          .filter((spread) => spread !== hero)
          .forEach((spread) => {
            const turning = spread.querySelector('[data-page="turn"]');
            const shade = turning.querySelector("[data-shade]");
            const scrollTrigger = { trigger: spread, start: "top bottom", end: "top 35%", scrub: 0.6 };
            gsap.fromTo(turning, { rotateY: -80 }, { rotateY: 0, ease: "none", immediateRender: false, scrollTrigger });
            gsap.fromTo(shade, { opacity: 0.6 }, { opacity: 0, ease: "none", immediateRender: false, scrollTrigger: { ...scrollTrigger } });
          });
      });

      q("[data-spread]")
        .filter((spread) => spread !== hero)
        .forEach((spread) => {
          const chips = spread.querySelectorAll("[data-chip]");
          if (!chips.length) return;
          gsap.from(chips, {
            scale: 1.6,
            autoAlpha: 0,
            duration: 0.45,
            ease: "back.out(2)",
            scrollTrigger: { trigger: spread, start: "top 70%", once: true },
          });
        });

      return () => mm.revert();
    },
    { scope: mainRef, dependencies: [motion] }
  );

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    gsap.to(window, {
      scrollTo: { y: target, offsetY: 24, autoKill: true },
      duration: motion ? 1 : 0,
      ease: "power3.inOut",
    });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  const es = language === "es";

  return (
    <>
      <a
        href="#about"
        className="sr-only z-[60] bg-tab px-4 py-3 font-bold text-on-tab focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {es ? "Saltar al contenido" : "Skip to content"}
      </a>

      <IndexTabs
        activeSection={activeSection}
        scrollTo={scrollTo}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <main
        ref={mainRef}
        className="flex flex-col gap-6 px-3 pb-24 pt-3 sm:px-6 sm:pt-6 lg:gap-10 lg:pb-10 lg:px-[120px] lg:pt-6"
      >
        <Hero language={language} scrollTo={scrollTo} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
        <Projects language={language} />
        <Technologies language={language} theme={theme} />
        <GithubStats language={language} />
        <Contact language={language} />

        <footer className="mx-auto flex w-full max-w-[1280px] flex-wrap justify-between gap-2 border-t border-cloth-ink/30 pt-5 text-sm text-cloth-ink">
          <span>
            {PROFILE_CONTENT.firstName} {PROFILE_CONTENT.lastName} · {PROFILE_CONTENT.location}
          </span>
          <span>{es ? "Hecho con React, Tailwind y GSAP" : "Built with React, Tailwind and GSAP"}</span>
        </footer>
      </main>
    </>
  );
}
