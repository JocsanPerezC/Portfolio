import { CV_PATH } from "../data/data";

export default function Hero({ theme, language }) {
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 sm:px-10 lg:px-14"
    >
      <div
        className={[
          "mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-2",
          isDark
            ? "border-white/10 bg-white/5"
            : "border-black/10 bg-white/70 shadow-sm",
        ].join(" ")}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
        </span>

        <span
          className={[
            "text-xs uppercase tracking-[0.18em]",
            isDark ? "text-[#9aa0b8]" : "text-[#64748b]",
          ].join(" ")}
        >
          {language === "es"
            ? "disponible para oportunidades"
            : "available for opportunities"}
        </span>
      </div>

      <h1 className="max-w-4xl text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
        <span className={isDark ? "text-white" : "text-[#111827]"}>
          Jocsan
        </span>
        <br />
        <span className="bg-gradient-to-r from-[#c8c2ff] via-[#9d8fff] to-[#7c6dfa] bg-clip-text text-transparent">
          Pérez Coto
        </span>
      </h1>

      <div className="mt-6 flex items-center gap-3">
        <span className="h-px w-8 bg-[#7c6dfa]/60" />
        <p
          className={[
            "text-sm uppercase tracking-[0.25em]",
            isDark ? "text-[#9aa0b8]" : "text-[#64748b]",
          ].join(" ")}
        >
          Software Developer
        </p>
      </div>

      <p
        className={[
          "mt-6 max-w-2xl text-lg leading-8",
          isDark ? "text-[#c8c8e0]" : "text-[#475569]",
        ].join(" ")}
      >
        {language === "es"
          ? "Construyo experiencias digitales con foco en "
          : "I build digital experiences focused on "}
        <span
          className={isDark ? "font-medium text-white" : "font-medium text-[#111827]"}
        >
          {language === "es" ? "interfaces limpias" : "clean interfaces"}
        </span>
        ,{" "}
        <span
          className={isDark ? "font-medium text-white" : "font-medium text-[#111827]"}
        >
          {language === "es" ? "código mantenible" : "maintainable code"}
        </span>{" "}
        {language === "es"
          ? "y soluciones que resuelven problemas reales."
          : "and solutions that solve real problems."}
        <span
          className={[
            "mt-2 block text-base",
            isDark ? "text-[#8a90aa]" : "text-[#64748b]",
          ].join(" ")}
        >
          Cartago, Costa Rica
        </span>
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#projects"
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

      <div className="mt-12 flex flex-wrap gap-4">
        {[
          {
            value: "2+",
            label: language === "es" ? "años experiencia" : "years experience",
            color: isDark ? "text-white" : "text-[#111827]",
          },
          {
            value: "19",
            label: language === "es" ? "tecnologías" : "technologies",
            color: "text-[#7c6dfa]",
          },
          {
            value: "3+",
            label: language === "es" ? "proyectos" : "projects",
            color: "text-lime-500",
          },
        ].map(({ value, label, color }) => (
          <div
            key={label}
            className={[
              "min-w-[120px] rounded-3xl border p-5 text-center transition hover:-translate-y-1",
              isDark
                ? "border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(124,109,250,0.08)] hover:border-[#7c6dfa]/30"
                : "border-black/10 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.06)] hover:border-[#7c6dfa]/20",
            ].join(" ")}
          >
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p
              className={[
                "mt-1 text-xs uppercase tracking-[0.15em]",
                isDark ? "text-[#8a90aa]" : "text-[#64748b]",
              ].join(" ")}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}