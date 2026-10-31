import { useRef } from "react";
import { Globe, Moon, Sun, X } from "lucide-react";
import { NAV_LINKS, PROFILE_CONTENT } from "../data/data";
import { gsap, useGSAP } from "../lib/gsap";

export default function Navbar({
  activeSection,
  mobileOpen,
  setMobileOpen,
  scrollTo,
  language,
  setLanguage,
  theme,
  setTheme,
}) {
  const isDark = theme === "dark";
  const barRef = useRef(null);
  const linksRef = useRef(null);
  const indicatorRef = useRef(null);
  const panelRef = useRef(null);
  const initials = `${PROFILE_CONTENT.firstName[0]}${PROFILE_CONTENT.lastName[0]}`;

  // Entrance of the floating bar.
  useGSAP(
    () => {
      gsap.from(barRef.current, {
        y: -40,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      });
    },
    { scope: barRef }
  );

  // Slide the active pill under the current section link.
  useGSAP(
    () => {
      const container = linksRef.current;
      const indicator = indicatorRef.current;
      if (!container || !indicator) return;

      const move = (animate) => {
        const target = container.querySelector(`[data-nav="${activeSection}"]`);
        if (!target) return;
        gsap.to(indicator, {
          x: target.offsetLeft,
          width: target.offsetWidth,
          autoAlpha: 1,
          duration: animate ? 0.5 : 0,
          ease: "power3.out",
        });
      };

      move(true);
      const onResize = () => move(false);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { dependencies: [activeSection, language], scope: linksRef }
  );

  // Mobile menu open/close.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const items = panel.querySelectorAll("[data-menu-item]");

      if (mobileOpen) {
        gsap.set(panel, { display: "flex" });
        gsap.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(
          items,
          { y: 32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.05 }
        );
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    },
    { dependencies: [mobileOpen] }
  );

  const label = (item) => item.label[language] ?? item.label.en;

  const iconButton = [
    "flex h-9 w-9 items-center justify-center rounded-full border transition",
    isDark
      ? "border-white/10 bg-white/5 text-[#cbd5e1] hover:border-[#7c6dfa]/40 hover:text-white"
      : "border-black/10 bg-black/[0.03] text-[#374151] hover:border-[#7c6dfa]/40 hover:text-[#111827]",
  ].join(" ");

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4">
        <div
          ref={barRef}
          className={[
            "pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border py-2 pl-2 pr-2 backdrop-blur-xl",
            isDark
              ? "border-white/10 bg-[#0d0e1a]/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
              : "border-black/10 bg-white/80 shadow-[0_10px_40px_rgba(15,23,42,0.08)]",
          ].join(" ")}
        >
          <button
            onClick={() => scrollTo("about")}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3"
            aria-label="Go to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c6dfa] text-sm font-bold text-white">
              {initials}
            </span>
            <span
              className={[
                "hidden text-sm font-bold tracking-tight sm:inline",
                isDark ? "text-white" : "text-[#111827]",
              ].join(" ")}
            >
              {PROFILE_CONTENT.firstName}
              <span className="text-[#7c6dfa]">.</span>
            </span>
          </button>

          <nav ref={linksRef} className="relative hidden items-center lg:flex">
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className={[
                "invisible absolute left-0 top-0 h-full rounded-full opacity-0",
                isDark ? "bg-[#7c6dfa]/20" : "bg-[#7c6dfa]/12",
              ].join(" ")}
            />
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                data-nav={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={[
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? isDark
                      ? "text-white"
                      : "text-[#111827]"
                    : isDark
                      ? "text-[#8888a8] hover:text-white"
                      : "text-[#6b7280] hover:text-[#111827]",
                ].join(" ")}
              >
                {label(item)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className={[iconButton, "w-auto gap-1.5 px-3 text-xs font-semibold"].join(" ")}
              aria-label="Change language"
            >
              <Globe size={14} />
              {language === "es" ? "ES" : "EN"}
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={iconButton}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className={[iconButton, "flex-col gap-1 lg:hidden"].join(" ")}
            >
              <span className={`block h-[1.5px] w-4 rounded ${isDark ? "bg-white" : "bg-[#111827]"}`} />
              <span className={`block h-[1.5px] w-4 rounded ${isDark ? "bg-white" : "bg-[#111827]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={panelRef}
        style={{ display: "none" }}
        className={[
          "invisible fixed inset-0 z-[150] flex-col px-6 pb-10 pt-6 opacity-0 backdrop-blur-xl lg:hidden",
          isDark ? "bg-[#07080f]" : "bg-[#f6f7fb]",
        ].join(" ")}
      >
        <div className="flex justify-end">
          <button onClick={() => setMobileOpen(false)} className={iconButton} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-2">
          {NAV_LINKS.map((item, index) => (
            <button
              key={item.id}
              data-menu-item
              onClick={() => {
                setMobileOpen(false);
                scrollTo(item.id);
              }}
              className={[
                "flex items-baseline gap-4 py-2 text-left text-4xl font-bold tracking-tight",
                activeSection === item.id
                  ? "text-[#7c6dfa]"
                  : isDark
                    ? "text-white"
                    : "text-[#111827]",
              ].join(" ")}
            >
              <span className="font-mono text-xs font-medium text-[#7c6dfa]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {label(item)}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
