import { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Socials from "./components/Socials";
import TechSphere from "./components/TechSphere";
import GithubStats from "./components/GithubStats";
import { gsap, NAV_OFFSET, prefersReducedMotion, ScrollTrigger, useGSAP } from "./lib/gsap";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [particlesReady, setParticlesReady] = useState(false);
  const [effectsLevel, setEffectsLevel] = useState("full");
  const cursorRef = useRef(null);
  const cursorCoreRef = useRef(null);
  const cursorVariantRef = useRef("default");
  const progressRef = useRef(null);
  const isDark = theme === "dark";
  const allowParticles = particlesReady && effectsLevel === "full";
  const allowCustomCursor = true;
  const allowSpotlight = effectsLevel === "full";

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
      fpsLimit: 40,
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      detectRetina: false,
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: lineColor,
          distance: 120,
          enable: false,
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
          speed: 0.22,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1200,
          },
          value: 18,
        },
        opacity: {
          value: isDark ? 0.24 : 0.16,
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
            enable: false,
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
    if (typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const compactViewportQuery = window.matchMedia("(max-width: 1024px)");

    const updateEffectsLevel = () => {
      const prefersReducedMotion = reducedMotionQuery.matches;
      const hasCoarsePointer = coarsePointerQuery.matches;
      const isCompactViewport = compactViewportQuery.matches;
      const lowMemory =
        typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
      const lowCpu =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;

      if (prefersReducedMotion) {
        setEffectsLevel("minimal");
        return;
      }

      if (hasCoarsePointer || isCompactViewport || lowMemory || lowCpu) {
        setEffectsLevel("lite");
        return;
      }

      setEffectsLevel("full");
    };

    const addListener = (query, listener) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", listener);
        return () => query.removeEventListener("change", listener);
      }

      query.addListener(listener);
      return () => query.removeListener(listener);
    };

    updateEffectsLevel();

    const cleanups = [
      addListener(reducedMotionQuery, updateEffectsLevel),
      addListener(coarsePointerQuery, updateEffectsLevel),
      addListener(compactViewportQuery, updateEffectsLevel),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  // Active nav item follows the section in the middle of the viewport.
  useGSAP(() => {
    const triggers = gsap.utils.toArray("section[id]").map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActiveSection(section.id),
      })
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  // Reading progress bar.
  useGSAP(() => {
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      }
    );
  }, []);

  // Scroll reveals for every .reveal / .reveal-panel, including ones rendered later (GitHub data).
  useGSAP(() => {
    const selector = ".reveal, .reveal-panel";
    const reduced = prefersReducedMotion();
    document.documentElement.classList.toggle("gsap-reveal", !reduced);
    if (reduced) return;

    const bind = (elements) => {
      const fresh = elements.filter((el) => !el.dataset.revealBound);
      if (!fresh.length) return false;
      fresh.forEach((el) => (el.dataset.revealBound = "true"));

      ScrollTrigger.batch(fresh, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            {
              autoAlpha: 0,
              y: (i, el) => (el.classList.contains("reveal-panel") ? 48 : 24),
              scale: (i, el) => (el.classList.contains("reveal-panel") ? 0.97 : 1),
              transition: "none",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.09,
              ease: "power3.out",
              clearProps: "transform,transition,opacity,visibility",
              onComplete: () => batch.forEach((el) => el.setAttribute("data-revealed", "true")),
            }
          ),
      });
      return true;
    };

    bind(gsap.utils.toArray(selector));

    let refreshId = 0;
    const observer = new MutationObserver(() => {
      if (!bind(gsap.utils.toArray(selector))) return;
      window.clearTimeout(refreshId);
      refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(refreshId);
      document.documentElement.classList.remove("gsap-reveal");
    };
  }, []);

  useEffect(() => {
    const canUseCustomCursor =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      !allowCustomCursor ||
      !canUseCustomCursor ||
      !cursorRef.current ||
      !cursorCoreRef.current
    ) {
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

    const shellX = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
    const shellY = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });
    const coreX = gsap.quickTo(cursorCore, "x", { duration: 0.08, ease: "power2.out" });
    const coreY = gsap.quickTo(cursorCore, "y", { duration: 0.08, ease: "power2.out" });

    let frameId = 0;
    let nextCursorState = null;

    const flushCursor = () => {
      frameId = 0;

      if (!nextCursorState) return;

      const { clientX, clientY, target } = nextCursorState;
      nextCursorState = null;
      shellX(clientX);
      shellY(clientY);
      coreX(clientX);
      coreY(clientY);
      cursor.style.opacity = "1";
      cursorCore.style.opacity = "1";
      updateVariantFromTarget(target);
    };

    const moveCursor = (event) => {
      nextCursorState = {
        clientX: event.clientX,
        clientY: event.clientY,
        target: event.target,
      };

      if (!frameId) {
        frameId = window.requestAnimationFrame(flushCursor);
      }
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
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [allowCustomCursor]);

  useEffect(() => {
    const canUseSpotlight =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

    if (!allowSpotlight || !canUseSpotlight) return;

    let frameId = 0;
    let nextPointerState = null;

    const flushSpotlight = () => {
      frameId = 0;

      if (!nextPointerState) return;

      const { target, clientX, clientY } = nextPointerState;
      const spotlightCard = target.closest("[data-spotlight]");
      nextPointerState = null;

      if (!(spotlightCard instanceof HTMLElement)) return;

      const bounds = spotlightCard.getBoundingClientRect();
      spotlightCard.style.setProperty("--spotlight-x", `${clientX - bounds.left}px`);
      spotlightCard.style.setProperty("--spotlight-y", `${clientY - bounds.top}px`);
    };

    const handlePointerMove = (event) => {
      if (!(event.target instanceof Element)) return;

      nextPointerState = {
        target: event.target,
        clientX: event.clientX,
        clientY: event.clientY,
      };

      if (!frameId) {
        frameId = window.requestAnimationFrame(flushSpotlight);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [allowSpotlight]);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    gsap.to(window, {
      scrollTo: { y: target, offsetY: id === "about" ? 0 : NAV_OFFSET, autoKill: true },
      duration: prefersReducedMotion() ? 0 : 1.1,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      className={[
        "relative min-h-screen overflow-x-clip transition-colors duration-300",
        effectsLevel === "full" ? "effects-full" : "effects-lite",
        theme === "dark"
          ? "bg-[#07080f] text-[#e8eaf0]"
          : "bg-[#f6f7fb] text-[#111827]",
      ].join(" ")}
    >
      <style>{`
        ${
          allowCustomCursor
            ? `@media (pointer: fine) {
          html, body, a, button, input, textarea, select, summary, label, [role="button"] {
            cursor: none !important;
          }
        }`
            : ""
        }

        .custom-cursor-shell,
        .custom-cursor-core {
          pointer-events: none;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 9999;
          opacity: 0;
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

        .effects-lite .backdrop-blur-sm,
        .effects-lite .backdrop-blur-md,
        .effects-lite .backdrop-blur-xl {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .effects-lite [data-spotlight]::before {
          display: none;
        }

        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .custom-cursor-shell,
          .custom-cursor-core {
            display: none;
          }
        }
      `}</style>

      {allowCustomCursor && (
        <>
          <div ref={cursorRef} className="custom-cursor-shell" data-variant="default" />
          <div ref={cursorCoreRef} className="custom-cursor-core" data-variant="default" />
        </>
      )}

      <div
        className={[
          "pointer-events-none fixed inset-0 z-0",
          theme === "dark"
            ? "bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(124,109,250,0.12)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(165,153,253,0.08)_0%,transparent_70%)]"
            : "bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(124,109,250,0.10)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(99,102,241,0.07)_0%,transparent_70%)]",
        ].join(" ")}
      />

      {allowParticles && (
        <Particles
          id="landing-particles"
          className="pointer-events-none fixed inset-0 z-[1]"
          options={particlesOptions}
        />
      )}

      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-[#a599fd] to-[#7c6dfa]"
      />

      <Navbar
        activeSection={activeSection}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="relative z-10 min-w-0">
        <Hero theme={theme} language={language} scrollTo={scrollTo} />
        <Projects theme={theme} language={language} />
        <TechSphere theme={theme} language={language} performanceMode={effectsLevel} />
        <GithubStats theme={theme} language={language} />
        <Contact theme={theme} language={language} />
        <Socials theme={theme} language={language} />

        <footer className={["h-8 border-t", isDark ? "border-white/10" : "border-black/10"].join(" ")} />
      </main>
    </div>
  );
}
