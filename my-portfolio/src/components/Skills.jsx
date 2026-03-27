import { SKILLS } from "../data/data";

export default function Skills({ theme, language }) {
  const isDark = theme === "dark";

  return (
    <section
      id="skills"
      className="relative z-10 px-6 py-24 sm:px-10 lg:px-14"
    >
      <div className="mb-14">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#7c6dfa]">
          Skills
        </p>

        <h2
          className={[
            "text-4xl font-bold tracking-tight md:text-5xl",
            isDark ? "text-white" : "text-[#111827]",
          ].join(" ")}
        >
          {language === "es" ? "Stack tecnológico" : "Tech stack"}
        </h2>

        <p
          className={[
            "mt-4 max-w-2xl text-base leading-7",
            isDark ? "text-[#9aa0b8]" : "text-[#475569]",
          ].join(" ")}
        >
          {language === "es"
            ? "Tecnologías y herramientas con las que construyo interfaces, backends y productos digitales funcionales."
            : "Technologies and tools I use to build interfaces, backends, and functional digital products."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {SKILLS.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.name}
              className={[
                "group rounded-3xl border p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#7c6dfa]/30 hover:bg-[#7c6dfa]/10 hover:shadow-[0_20px_60px_rgba(124,109,250,0.10)]",
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]",
              ].join(" ")}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={[
                    "mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border transition group-hover:text-[#7c6dfa]",
                    isDark
                      ? "border-white/10 bg-[#111320] text-[#8f95b2]"
                      : "border-black/10 bg-[#f8fafc] text-[#475569]",
                  ].join(" ")}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <p
                  className={[
                    "text-sm font-medium",
                    isDark ? "text-[#d9dcef]" : "text-[#111827]",
                  ].join(" ")}
                >
                  {skill.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}