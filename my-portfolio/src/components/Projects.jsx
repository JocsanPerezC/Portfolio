import { PROJECTS } from "../data/data";

export default function Projects({ theme, language }) {
  const isDark = theme === "dark";

  return (
    <section
      id="projects"
      className="relative z-10 px-6 py-24 sm:px-10 lg:px-14"
    >
      <div className="mb-14">
        <p style={{ "--delay": "60ms" }} className="reveal mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#7c6dfa]">
          {language === "es" ? "Proyectos" : "Projects"}
        </p>

        <h2
          style={{ "--delay": "150ms" }}
          className={[
            "reveal text-4xl font-bold tracking-tight md:text-5xl",
            isDark ? "text-white" : "text-[#111827]",
          ].join(" ")}
        >
          {language === "es" ? "Proyectos destacados" : "Featured projects"}
        </h2>

        <p
          style={{ "--delay": "240ms" }}
          className={[
            "reveal mt-4 max-w-2xl text-base leading-7",
            isDark ? "text-[#9aa0b8]" : "text-[#475569]",
          ].join(" ")}
        >
          {language === "es"
            ? "Algunos proyectos en los que he trabajado, enfocados en producto, desarrollo full-stack y experiencia de usuario."
            : "A selection of projects I have worked on, focused on product, full-stack development, and user experience."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <a
            key={project.title}
            style={{ "--delay": `${340 + PROJECTS.findIndex((item) => item.title === project.title) * 110}ms` }}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            data-spotlight
            className={[
              "reveal-panel group overflow-hidden rounded-[28px] border backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#7c6dfa]/30 hover:shadow-[0_25px_80px_rgba(124,109,250,0.10)]",
              isDark
                ? "border-white/10 bg-white/5"
                : "border-black/10 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
            ].join(" ")}
          >
            <div
              className={[
                "aspect-[16/10] overflow-hidden border-b",
                isDark
                  ? "border-white/10 bg-[#0f1120]"
                  : "border-black/10 bg-[#f8fafc]",
              ].join(" ")}
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-6">
              <h3
                className={[
                  "text-2xl font-bold",
                  isDark ? "text-white" : "text-[#111827]",
                ].join(" ")}
              >
                {project.title}
              </h3>

              <p
                className={[
                  "mt-3 text-sm leading-7",
                  isDark ? "text-[#a1a7c2]" : "text-[#475569]",
                ].join(" ")}
              >
                {project.desc}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      isDark
                        ? "border-white/10 bg-[#111320] text-[#cfd3e6]"
                        : "border-black/10 bg-[#f8fafc] text-[#111827]",
                    ].join(" ")}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 text-sm font-semibold text-[#7c6dfa]">
                {language === "es" ? "Ver proyecto ->" : "View project ->"}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
