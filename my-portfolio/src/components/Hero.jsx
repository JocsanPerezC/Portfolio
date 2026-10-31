import { useEffect, useMemo, useRef, useState } from "react";
import { CV_PATH, PROFILE_CONTENT, PROJECTS, SKILLS } from "../data/data";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/gsap";

export default function Hero({ theme, language, scrollTo }) {
  const isDark = theme === "dark";
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const typewriterPhrases = useMemo(
    () => PROFILE_CONTENT.typewriterPhrases[language] ?? PROFILE_CONTENT.typewriterPhrases.en,
    [language]
  );
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setActivePhraseIndex(0);
    setTypedText("");
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const currentPhrase = typewriterPhrases[activePhraseIndex] ?? "";
    const isPhraseComplete = typedText === currentPhrase;
    const isPhraseEmpty = typedText.length === 0;

    let timeoutMs = isDeleting ? 28 : 52;

    if (!isDeleting && isPhraseComplete) {
      timeoutMs = 1350;
    } else if (isDeleting && isPhraseEmpty) {
      timeoutMs = 220;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && isPhraseComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isPhraseEmpty) {
        setIsDeleting(false);
        setActivePhraseIndex((currentIndex) => (currentIndex + 1) % typewriterPhrases.length);
        return;
      }

      const nextLength = isDeleting ? typedText.length - 1 : typedText.length + 1;
      setTypedText(currentPhrase.slice(0, nextLength));
    }, timeoutMs);

    return () => window.clearTimeout(timeoutId);
  }, [activePhraseIndex, isDeleting, typedText, typewriterPhrases]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const counters = q("[data-count]");

      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.25 });

      tl.from(q("[data-hero-badge]"), { y: 20, autoAlpha: 0, duration: 0.7 })
        .from(q("[data-hero-char]"), { yPercent: 110, duration: 1, stagger: 0.045 }, "-=0.4")
        .from(q("[data-hero-last]"), { yPercent: 110, duration: 1 }, "-=0.75")
        .from(q("[data-hero-rule]"), { scaleX: 0, transformOrigin: "left center", duration: 0.8 }, "-=0.6")
        .from(q("[data-hero-fade]"), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from(
          q("[data-hero-stat]"),
          { y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.1, clearProps: "transform" },
          "-=0.5"
        );

      counters.forEach((el) => {
        const counter = { value: 0 };
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";

        tl.fromTo(
          counter,
          { value: 0 },
          {
            value: target,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(counter.value)}${suffix}`;
            },
          },
          "<"
        );
      });

      const scrub = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      // Parallax: the content drifts up and fades while the orb sinks as you scroll past.
      gsap.to(contentRef.current, { yPercent: -18, autoAlpha: 0.15, ease: "none", scrollTrigger: scrub });
      gsap.to(q("[data-hero-orb]"), { yPercent: 35, scale: 1.2, ease: "none", scrollTrigger: { ...scrub } });
      gsap.to(q("[data-hero-scroll]"), { autoAlpha: 0, ease: "none", scrollTrigger: { ...scrub, end: "20% top" } });
    },
    { scope: sectionRef }
  );

  const stats = [
    {
      value: 2,
      suffix: "+",
      label: language === "es" ? "años de experiencia" : "years experience",
      color: isDark ? "text-white" : "text-[#111827]",
    },
    {
      value: SKILLS.length,
      suffix: "",
      label: language === "es" ? "tecnologías" : "technologies",
      color: "text-[#7c6dfa]",
    },
    {
      value: PROJECTS.length,
      suffix: "",
      label: language === "es" ? "proyectos destacados" : "featured projects",
      color: "text-lime-500",
    },
  ];

  const muted = isDark ? "text-[#9aa0b8]" : "text-[#64748b]";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-24 pt-32 sm:px-10 lg:px-14"
    >
      <div
        data-hero-orb
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,109,250,0.28)_0%,transparent_65%)] blur-2xl"
      />

      <div ref={contentRef} className="relative mx-auto w-full max-w-6xl">
        <div
          data-hero-badge
          className={[
            "mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-2",
            isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white/70 shadow-sm",
          ].join(" ")}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
          </span>

          <span className={["text-xs uppercase tracking-[0.18em]", muted].join(" ")}>
            {PROFILE_CONTENT.availability[language] ?? PROFILE_CONTENT.availability.en}
          </span>
        </div>

        <h1 className="max-w-5xl text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl xl:text-9xl">
          <span className="sr-only">
            {PROFILE_CONTENT.firstName} {PROFILE_CONTENT.lastName}
          </span>
          <span aria-hidden="true" className="block overflow-hidden pb-2">
            <span className={["inline-block", isDark ? "text-white" : "text-[#111827]"].join(" ")}>
              {PROFILE_CONTENT.firstName.split("").map((char, index) => (
                <span key={`${char}-${index}`} data-hero-char className="inline-block">
                  {char}
                </span>
              ))}
            </span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden pb-3">
            <span
              data-hero-last
              className="inline-block bg-gradient-to-r from-[#c8c2ff] via-[#9d8fff] to-[#7c6dfa] bg-clip-text text-transparent"
            >
              {PROFILE_CONTENT.lastName}
            </span>
          </span>
        </h1>

        <div className="mt-6 flex items-center gap-3">
          <span data-hero-rule className="h-px w-12 bg-[#7c6dfa]/70" />
          <p data-hero-fade className={["text-sm uppercase tracking-[0.25em]", muted].join(" ")}>
            {PROFILE_CONTENT.title[language] ?? PROFILE_CONTENT.title.en}
          </p>
        </div>

        <div
          data-hero-fade
          className={[
            "mt-6 max-w-2xl min-h-[136px] text-lg leading-8 sm:min-h-[104px]",
            isDark ? "text-[#c8c8e0]" : "text-[#475569]",
          ].join(" ")}
        >
          <p className="typewriter-text">
            {typedText}
            <span
              className={[
                "typewriter-cursor ml-1 inline-block align-[-0.08em]",
                isDark ? "text-white" : "text-[#111827]",
              ].join(" ")}
              aria-hidden="true"
            >
              |
            </span>
          </p>
          <p className={["mt-2 text-base", isDark ? "text-[#8a90aa]" : "text-[#64748b]"].join(" ")}>
            {PROFILE_CONTENT.location[language] ?? PROFILE_CONTENT.location.en}
          </p>
        </div>

        <div data-hero-fade className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            onClick={(event) => {
              event.preventDefault();
              scrollTo?.("projects");
            }}
            className={[
              "rounded-2xl px-6 py-3 font-semibold transition hover:-translate-y-0.5",
              isDark
                ? "bg-white text-[#0a0a0f] hover:bg-[#dcd8ff]"
                : "bg-[#111827] text-white hover:bg-[#1f2937]",
            ].join(" ")}
          >
            {language === "es" ? "Ver proyectos" : "View projects"}
          </a>

          <a
            href={CV_PATH}
            download
            className={[
              "rounded-2xl border px-6 py-3 font-semibold transition",
              isDark
                ? "border-white/10 bg-white/5 text-white hover:border-[#7c6dfa]/40 hover:bg-[#7c6dfa]/10"
                : "border-black/10 bg-white/70 text-[#111827] hover:border-[#7c6dfa]/40 hover:bg-[#7c6dfa]/10",
            ].join(" ")}
          >
            {language === "es" ? "Descargar CV" : "Download CV"}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4">
          {stats.map(({ value, suffix, label, color }) => (
            <div
              key={label}
              data-hero-stat
              className={[
                "rounded-3xl border p-4 text-center sm:min-w-[140px] sm:p-5 transition-[border-color,translate] duration-300 hover:-translate-y-1",
                isDark
                  ? "border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(124,109,250,0.08)] hover:border-[#7c6dfa]/30"
                  : "border-black/10 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.06)] hover:border-[#7c6dfa]/20",
              ].join(" ")}
            >
              <p className={`text-2xl font-bold tabular-nums sm:text-3xl ${color}`}>
                <span data-count={value} data-suffix={suffix}>
                  {value}
                  {suffix}
                </span>
              </p>
              <p className={["mt-1 text-[0.6rem] uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]", isDark ? "text-[#8a90aa]" : "text-[#64748b]"].join(" ")}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        data-hero-scroll
        aria-hidden="true"
        className={["absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex", muted].join(" ")}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-current/20">
          <span className="scroll-hint absolute inset-x-0 top-0 h-1/2 bg-[#7c6dfa]" />
        </span>
      </div>
    </section>
  );
}
