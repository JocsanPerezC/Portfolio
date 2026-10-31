import { FolderOpen, Github, Home, Layers, Mail } from "lucide-react";
import { NAV_LINKS } from "../data/data";
import Controls from "./Controls";

const ICONS = { about: Home, projects: FolderOpen, "tech-sphere": Layers, github: Github, contact: Mail };

// Thumb-index tabs cut into the guide's fore-edge. The active tab is marked, not recoloured:
// it stands further out and carries an ink notch.
export default function IndexTabs({ activeSection, scrollTo, language, setLanguage, theme, setTheme }) {
  const es = language === "es";
  const label = (item) => item.label[language] ?? item.label.en;

  return (
    <>
      <nav
        aria-label={es ? "Índice" : "Index"}
        style={{ left: "calc(50% + min(640px, 50vw - 120px))" }}
        className="fixed top-1/2 z-50 hidden -translate-y-1/2 flex-col items-start gap-1.5 lg:flex"
      >
        {NAV_LINKS.map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              aria-current={active ? "location" : undefined}
              className={[
                "flex min-h-11 items-center gap-2 bg-tab pl-2.5 text-left text-[13px] font-bold text-on-tab transition-[width] duration-300 ease-out",
                active ? "w-[118px]" : "w-[106px] hover:w-[112px]",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className={["h-2.5 w-2.5 shrink-0 transition-colors", active ? "bg-on-tab" : "bg-transparent"].join(" ")}
              />
              {label(item)}
            </button>
          );
        })}
        <Controls
          className="mt-3 w-[106px]"
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />
      </nav>

      <nav
        aria-label={es ? "Índice" : "Index"}
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 gap-1 bg-spine p-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:hidden"
      >
        {NAV_LINKS.map((item) => {
          const active = activeSection === item.id;
          const Icon = ICONS[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              aria-current={active ? "location" : undefined}
              className="relative flex min-h-13 flex-col items-center justify-center gap-1 bg-tab px-0.5 text-xs font-bold leading-none text-on-tab"
            >
              {active && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-on-tab" />}
              <Icon size={18} aria-hidden="true" />
              <span className="max-w-full truncate">{label(item)}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
