import { Moon, Sun } from "lucide-react";

// Language and theme switches, drawn as two small page-coloured tabs.
export default function Controls({ language, setLanguage, theme, setTheme, className = "", compact = false }) {
  const es = language === "es";
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const themeLabel =
    theme === "dark" ? (es ? "Usar tema claro" : "Use light theme") : es ? "Usar tema oscuro" : "Use dark theme";

  const size = compact ? "h-10 w-10" : "min-h-11 min-w-11 flex-1";
  const tab = `flex ${size} items-center justify-center border-2 border-ink bg-page text-ink hover:bg-page-2`;

  return (
    <div className={["flex gap-1.5", className].join(" ")}>
      <button
        type="button"
        onClick={() => setLanguage(es ? "en" : "es")}
        className={`${tab} text-sm font-bold`}
        aria-label={es ? "Switch to English" : "Cambiar a español"}
      >
        {es ? "EN" : "ES"}
      </button>
      <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={tab} aria-label={themeLabel}>
        <ThemeIcon size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
