import { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
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
  const [particlesReady, setParticlesReady] = useState(false);
  const cursorRef = useRef(null);
  const cursorCoreRef = useRef(null);
  const cursorVariantRef = useRef("default");
  const isDark = theme === "dark";

  const particlesOptions = useMemo(() => {
    const isDark = theme === "dark";
    const particleColor = isDark
      ? "rgba(255,255,255,0.3)"
      : "rgba(17,24,39,0.2)";
    const lineColor = isDark
      ? "rgba(255,255,255,0.24)"
      : "rgba(17,24,39,0.18)";

    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      detectRetina: true,
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: lineColor,
          distance: 135,
          enable: true,
          opacity: isDark ? 0.28 : 0.18,
          width: 1,
        },
        move: {
          enable: true,
          direction: "none",
          outModes: {
            default: "out",
          },
          random: false,
          speed: 0.38,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 900,
          },
          value: 40,
        },
        opacity: {
          value: isDark ? 0.3 : 0.2,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1.2, max: 2.4 },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          repulse: {
            distance: 85,
            duration: 0.45,
            factor: 1.2,
            speed: 0.9,
          },
        },
      },
    };
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }),
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealSelector = ".reveal, .reveal-panel";

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.setAttribute("data-revealed", "true");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const observeReveals = (root = document) => {
      root.querySelectorAll(revealSelector).forEach((element) => {
        if (element.getAttribute("data-revealed") !== "true") {
          revealObserver.observe(element);
        }
      });
    };

    observeReveals();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches?.(revealSelector)) {
            revealObserver.observe(node);
          }

          observeReveals(node);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canUseCustomCursor =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseCustomCursor || !cursorRef.current || !cursorCoreRef.current) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorCore = cursorCoreRef.current;

    const setVariant = (variant) => {
      cursorVariantRef.current = variant;
      cursor.dataset.variant = variant;
      cursorCore.dataset.variant = variant;
    };

    const updateVariantFromTarget = (target) => {
      if (!(target instanceof Element)) {
        setVariant("default");
        return;
      }

      const interactiveTarget = target.closest(
        'a, button, [role="button"], input, textarea, select, summary, label'
      );

      setVariant(interactiveTarget ? "interactive" : "default");
    };

    const moveCursor = (event) => {
      const { clientX, clientY } = event;
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      cursorCore.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      cursor.style.opacity = "1";
      cursorCore.style.opacity = "1";
      updateVariantFromTarget(event.target);
    };

    const handleMouseDown = () => setVariant("pressed");
    const handleMouseUp = (event) => updateVariantFromTarget(event.target);

    const showCursor = () => {
      cursor.style.opacity = "1";
      cursorCore.style.opacity = "1";
    };

    const hideCursor = () => {
      cursor.style.opacity = "0";
      cursorCore.style.opacity = "0";
      setVariant("default");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", showCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  useEffect(() => {
    const canUseSpotlight =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

    if (!canUseSpotlight) return;

    const handlePointerMove = (event) => {
      const spotlightCard = event.target.closest("[data-spotlight]");
      if (!(spotlightCard instanceof HTMLElement)) return;

      const bounds = spotlightCard.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      spotlightCard.style.setProperty("--spotlight-x", `${x}px`);
      spotlightCard.style.setProperty("--spotlight-y", `${y}px`);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
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
      <style>{`
        @media (pointer: fine) {
          html, body, a, button, input, textarea, select, summary, label, [role="button"] {
            cursor: none !important;
          }
        }

        .custom-cursor-shell,
        .custom-cursor-core {
          pointer-events: none;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 9999;
          opacity: 0;
          transform: translate3d(-100px, -100px, 0);
          will-change: transform, opacity, width, height, border-radius, background-color, border-color;
        }

        .custom-cursor-shell {
          height: 28px;
          width: 28px;
          margin-left: -14px;
          margin-top: -14px;
          border: 1.5px solid ${isDark ? "rgba(124, 109, 250, 0.9)" : "rgba(91, 79, 216, 0.72)"};
          border-radius: 999px;
          background: ${isDark ? "rgba(124, 109, 250, 0.06)" : "rgba(91, 79, 216, 0.05)"};
          box-shadow: ${isDark
            ? "0 0 0 1px rgba(124, 109, 250, 0.08), 0 0 24px rgba(124, 109, 250, 0.14)"
            : "0 0 0 1px rgba(91, 79, 216, 0.08), 0 0 20px rgba(91, 79, 216, 0.1)"};
          transition:
            opacity 180ms ease,
            width 180ms ease,
            height 180ms ease,
            margin 180ms ease,
            border-radius 180ms ease,
            background-color 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .custom-cursor-core {
          height: 6px;
          width: 6px;
          margin-left: -3px;
          margin-top: -3px;
          border-radius: 999px;
          background: ${isDark ? "#7c6dfa" : "#5b4fd8"};
          box-shadow: ${isDark
            ? "0 0 14px rgba(124, 109, 250, 0.45)"
            : "0 0 12px rgba(91, 79, 216, 0.3)"};
          transition:
            opacity 160ms ease,
            transform 70ms linear,
            width 180ms ease,
            height 180ms ease,
            margin 180ms ease,
            border-radius 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease;
        }

        .custom-cursor-shell[data-variant="interactive"] {
          width: 38px;
          height: 38px;
          margin-left: -19px;
          margin-top: -19px;
          border-color: ${isDark ? "rgba(124, 109, 250, 1)" : "rgba(91, 79, 216, 0.82)"};
          background: ${isDark ? "rgba(124, 109, 250, 0.1)" : "rgba(91, 79, 216, 0.08)"};
          box-shadow: ${isDark
            ? "0 0 0 1px rgba(124, 109, 250, 0.1), 0 0 30px rgba(124, 109, 250, 0.2)"
            : "0 0 0 1px rgba(91, 79, 216, 0.08), 0 0 24px rgba(91, 79, 216, 0.12)"};
        }

        .custom-cursor-core[data-variant="interactive"] {
          width: 14px;
          height: 14px;
          margin-left: -7px;
          margin-top: -7px;
          border-radius: 4px;
          background: ${isDark ? "rgba(124, 109, 250, 0.95)" : "rgba(91, 79, 216, 0.88)"};
          box-shadow: ${isDark
            ? "0 0 18px rgba(124, 109, 250, 0.5)"
            : "0 0 14px rgba(91, 79, 216, 0.3)"};
        }

        .custom-cursor-shell[data-variant="pressed"] {
          width: 24px;
          height: 24px;
          margin-left: -12px;
          margin-top: -12px;
          background: ${isDark ? "rgba(124, 109, 250, 0.14)" : "rgba(91, 79, 216, 0.1)"};
        }

        .custom-cursor-core[data-variant="pressed"] {
          width: 10px;
          height: 10px;
          margin-left: -5px;
          margin-top: -5px;
          border-radius: 999px;
        }

        [data-spotlight] {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        [data-spotlight]::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0;
          background:
            radial-gradient(
              220px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
              ${isDark ? "rgba(124, 109, 250, 0.16)" : "rgba(91, 79, 216, 0.1)"},
              transparent 62%
            );
          transition: opacity 180ms ease;
          pointer-events: none;
        }

        [data-spotlight]:hover::before {
          opacity: 1;
        }

        [data-spotlight] > * {
          position: relative;
          z-index: 1;
        }

        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .custom-cursor-shell,
          .custom-cursor-core {
            display: none;
          }
        }
      `}</style>

      <div ref={cursorRef} className="custom-cursor-shell" data-variant="default" />
      <div ref={cursorCoreRef} className="custom-cursor-core" data-variant="default" />

      <div
        className={[
          "pointer-events-none fixed inset-0 z-0",
          theme === "dark"
            ? "bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(124,109,250,0.12)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(165,153,253,0.08)_0%,transparent_70%)]"
            : "bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(124,109,250,0.10)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(99,102,241,0.07)_0%,transparent_70%)]",
        ].join(" ")}
      />

      {particlesReady && (
        <Particles
          id="landing-particles"
          className="pointer-events-none fixed inset-0 z-[1]"
          options={particlesOptions}
        />
      )}

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
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        ].join(" ")}
      >
        <Hero theme={theme} language={language} />
        <TechSphere theme={theme} language={language} />
        <GithubStats theme={theme} language={language} />
        <Projects theme={theme} language={language} />
        <Contact theme={theme} language={language} />
        <Socials theme={theme} language={language} />

        <footer className={["h-8 border-t", isDark ? "border-white/10" : "border-black/10"].join(" ")} />
      </main>
    </div>
  );
}
