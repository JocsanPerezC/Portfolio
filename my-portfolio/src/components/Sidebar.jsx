import { ChevronLeft, ChevronRight, Globe, Moon, Sun } from "lucide-react";
import { NAV_LINKS } from "../data/data";

export default function Sidebar({
  activeSection,
  sidebarOpen,
  setSidebarOpen,
  mobileOpen,
  setMobileOpen,
  scrollTo,
  language,
  setLanguage,
  theme,
  setTheme,
}) {
  const isDark = theme === "dark";

  return (
    <>
      <aside
        className={[
          "fixed top-0 left-0 z-[100] flex h-screen flex-col border-r border-white/10 backdrop-blur-xl transition-all duration-300",
          "hidden md:flex",
          isDark ? "bg-[#0d0e1a]/95" : "bg-white/95 border-black/10",
          sidebarOpen ? "w-[220px]" : "w-[72px]",
        ].join(" ")}
      >
        <div
          className={[
            "flex min-h-[72px] items-center justify-between border-b px-4",
            isDark ? "border-white/10" : "border-black/10",
          ].join(" ")}
        >
          {sidebarOpen && (
            <span
              className={[
                "text-xl font-bold tracking-tight",
                isDark ? "text-white" : "text-[#111827]",
              ].join(" ")}
            >
              Portfolio<span className="text-[#7c6dfa]">.</span>
            </span>
          )}

          <button
            className={[
              "ml-auto flex h-8 w-8 items-center justify-center rounded-lg border transition",
              isDark
                ? "border-white/10 bg-white/5 text-[#8888a8] hover:border-[#7c6dfa]/40 hover:text-[#a599fd]"
                : "border-black/10 bg-black/[0.03] text-[#4b5563] hover:border-[#7c6dfa]/40 hover:text-[#7c6dfa]",
            ].join(" ")}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {NAV_LINKS.map(({ label, id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              title={!sidebarOpen ? label : undefined}
              className={[
                "flex items-center rounded-xl text-sm font-medium transition",
                sidebarOpen ? "justify-start gap-3 px-4 py-3" : "justify-center px-2 py-3",
                activeSection === id
                  ? isDark
                    ? "bg-[#7c6dfa]/15 text-white"
                    : "bg-[#7c6dfa]/12 text-[#111827]"
                  : isDark
                  ? "text-[#8888a8] hover:bg-[#7c6dfa]/10 hover:text-white"
                  : "text-[#6b7280] hover:bg-[#7c6dfa]/10 hover:text-[#111827]",
              ].join(" ")}
            >
              <Icon size={16} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom controls */}
        <div
          className={[
            "border-t p-3",
            isDark ? "border-white/10" : "border-black/10",
          ].join(" ")}
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className={[
                "flex items-center rounded-xl transition",
                sidebarOpen ? "justify-between px-3 py-3" : "justify-center px-2 py-3",
                isDark
                  ? "border border-white/10 bg-white/5 text-[#cbd5e1] hover:border-[#7c6dfa]/30 hover:bg-[#7c6dfa]/10"
                  : "border border-black/10 bg-black/[0.03] text-[#374151] hover:border-[#7c6dfa]/30 hover:bg-[#7c6dfa]/10",
              ].join(" ")}
              aria-label="Change language"
              title={!sidebarOpen ? "Language" : undefined}
            >
              <div className="flex items-center gap-3">
                <Globe size={16} />
                {sidebarOpen && (
                  <span className="text-sm font-medium">
                    {language === "es" ? "Español" : "English"}
                  </span>
                )}
              </div>
              {sidebarOpen && (
                <span className="text-xs text-[#7c6dfa]">
                  {language === "es" ? "ES" : "EN"}
                </span>
              )}
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={[
                "flex items-center rounded-xl transition",
                sidebarOpen ? "justify-between px-3 py-3" : "justify-center px-2 py-3",
                isDark
                  ? "border border-white/10 bg-white/5 text-[#cbd5e1] hover:border-[#7c6dfa]/30 hover:bg-[#7c6dfa]/10"
                  : "border border-black/10 bg-black/[0.03] text-[#374151] hover:border-[#7c6dfa]/30 hover:bg-[#7c6dfa]/10",
              ].join(" ")}
              aria-label="Toggle theme"
              title={!sidebarOpen ? "Theme" : undefined}
            >
              <div className="flex items-center gap-3">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {sidebarOpen && (
                  <span className="text-sm font-medium">
                    {isDark ? "Light mode" : "Dark mode"}
                  </span>
                )}
              </div>
              {sidebarOpen && (
                <span className="text-xs text-[#7c6dfa]">
                  {isDark ? "Light" : "Dark"}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={[
          "fixed top-0 left-0 z-[150] flex h-screen w-[260px] flex-col border-r backdrop-blur-xl transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          isDark ? "border-white/10 bg-[#0d0e1a]/95" : "border-black/10 bg-white/95",
        ].join(" ")}
      >
        <div
          className={[
            "flex min-h-[72px] items-center justify-between border-b px-4",
            isDark ? "border-white/10" : "border-black/10",
          ].join(" ")}
        >
          <span
            className={[
              "text-xl font-bold tracking-tight",
              isDark ? "text-white" : "text-[#111827]",
            ].join(" ")}
          >
            Portfolio<span className="text-[#7c6dfa]">.</span>
          </span>

          <button
            className={[
              "flex h-8 w-8 items-center justify-center rounded-lg border",
              isDark
                ? "border-white/10 bg-white/5 text-[#8888a8]"
                : "border-black/10 bg-black/[0.03] text-[#4b5563]",
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_LINKS.map(({ label, id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setMobileOpen(false);
              }}
              className={[
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                activeSection === id
                  ? isDark
                    ? "bg-[#7c6dfa]/15 text-white"
                    : "bg-[#7c6dfa]/12 text-[#111827]"
                  : isDark
                  ? "text-[#8888a8] hover:bg-[#7c6dfa]/10 hover:text-white"
                  : "text-[#6b7280] hover:bg-[#7c6dfa]/10 hover:text-[#111827]",
              ].join(" ")}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div
          className={[
            "border-t p-3",
            isDark ? "border-white/10" : "border-black/10",
          ].join(" ")}
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className={[
                "flex items-center justify-between rounded-xl px-3 py-3 transition",
                isDark
                  ? "border border-white/10 bg-white/5 text-[#cbd5e1]"
                  : "border border-black/10 bg-black/[0.03] text-[#374151]",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <Globe size={16} />
                <span className="text-sm font-medium">
                  {language === "es" ? "Español" : "English"}
                </span>
              </div>
              <span className="text-xs text-[#7c6dfa]">
                {language === "es" ? "ES" : "EN"}
              </span>
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={[
                "flex items-center justify-between rounded-xl px-3 py-3 transition",
                isDark
                  ? "border border-white/10 bg-white/5 text-[#cbd5e1]"
                  : "border border-black/10 bg-black/[0.03] text-[#374151]",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-sm font-medium">
                  {isDark ? "Light mode" : "Dark mode"}
                </span>
              </div>
              <span className="text-xs text-[#7c6dfa]">
                {isDark ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        className={[
          "fixed left-4 top-4 z-[200] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border backdrop-blur md:hidden",
          isDark
            ? "border-white/10 bg-[#111320]/90 text-white"
            : "border-black/10 bg-white/90 text-[#111827]",
        ].join(" ")}
      >
        <span
          className={`block h-[1.5px] w-[18px] rounded transition ${
            mobileOpen ? "translate-y-[7px] rotate-45" : ""
          } ${isDark ? "bg-white" : "bg-[#111827]"}`}
        />
        <span
          className={`block h-[1.5px] w-[13px] rounded transition ${
            mobileOpen ? "opacity-0" : ""
          } ${isDark ? "bg-white" : "bg-[#111827]"}`}
        />
        <span
          className={`block h-[1.5px] w-[18px] rounded transition ${
            mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
          } ${isDark ? "bg-white" : "bg-[#111827]"}`}
        />
      </button>
    </>
  );
}