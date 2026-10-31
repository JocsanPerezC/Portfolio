import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/data";
import { gsap, prefersReducedMotion, useGSAP } from "../lib/gsap";

const STACK_TOP = 104;
const STACK_STEP = 18;

export default function Projects({ theme, language }) {
  const isDark = theme === "dark";
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      // Desktop: cards stick on top of each other; the one underneath shrinks and dims.
      mm.add("(min-width: 1024px)", () => {
        // Sticky cards move while stuck, so triggers use static markers left in the normal flow.
        const cards = gsap.utils.toArray("[data-project-card]", sectionRef.current);
        const markers = gsap.utils.toArray("[data-project-marker]", sectionRef.current);

        cards.forEach((card, index) => {
          const inner = card.querySelector("[data-project-inner]");
          const image = card.querySelector("[data-project-image]");
          const next = markers[index + 1];

          gsap.fromTo(
            image,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: markers[index], start: "top bottom", end: "top top+=120", scrub: true },
            }
          );

          if (!next) return;

          gsap.fromTo(inner, { scale: 1, filter: "brightness(1)" }, {
            scale: 1 - (cards.length - index - 1) * 0.04,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: `top top+=${STACK_TOP + (index + 1) * STACK_STEP}`,
              scrub: true,
            },
          });
        });
      });

      // Everywhere: card contents rise in when they enter.
      gsap.utils.toArray("[data-project-card]", sectionRef.current).forEach((card, index) => {
        const marker = sectionRef.current.querySelectorAll("[data-project-marker]")[index];
        gsap.from(card.querySelectorAll("[data-project-reveal]"), {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: marker, start: "top 75%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 px-6 py-24 sm:px-10 lg:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <p className="reveal mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#7c6dfa]">
            {language === "es" ? "Proyectos" : "Projects"}
          </p>

          <h2
            className={[
              "reveal text-4xl font-bold tracking-tight md:text-6xl",
              isDark ? "text-white" : "text-[#111827]",
            ].join(" ")}
          >
            {language === "es" ? "Proyectos destacados" : "Featured projects"}
          </h2>

          <p
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

        <div className="flex flex-col gap-8 lg:gap-24">
          {PROJECTS.map((project, index) => (
            <div key={project.title} className="contents">
            <div data-project-marker aria-hidden="true" className="-mb-8 h-0 lg:-mb-24" />
            <article
              data-project-card
              className="lg:sticky"
              style={{ top: `${STACK_TOP + index * STACK_STEP}px` }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                data-project-inner
                data-spotlight
                className={[
                  "group grid origin-top overflow-hidden rounded-[32px] border will-change-transform lg:min-h-[560px] lg:grid-cols-[1.25fr_1fr]",
                  isDark
                    ? "border-white/10 bg-[#0d0e1a] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                    : "border-black/10 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)]",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative aspect-[16/10] overflow-hidden lg:aspect-auto",
                    isDark ? "bg-[#0f1120]" : "bg-[#f8fafc]",
                  ].join(" ")}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    data-project-image
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>

                <div className="flex flex-col justify-between gap-10 p-8 lg:p-10">
                  <div>
                    <p data-project-reveal className="font-mono text-sm text-[#7c6dfa]">
                      {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                    </p>

                    <h3
                      data-project-reveal
                      className={[
                        "mt-4 text-3xl font-bold tracking-tight lg:text-4xl",
                        isDark ? "text-white" : "text-[#111827]",
                      ].join(" ")}
                    >
                      {project.title}
                    </h3>

                    <p
                      data-project-reveal
                      className={[
                        "mt-4 text-base leading-7",
                        isDark ? "text-[#a1a7c2]" : "text-[#475569]",
                      ].join(" ")}
                    >
                      {project.desc[language] ?? project.desc.en}
                    </p>

                    <div data-project-reveal className="mt-6 flex flex-wrap gap-2">
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
                  </div>

                  <span
                    data-project-reveal
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#7c6dfa]"
                  >
                    {language === "es" ? "Ver proyecto" : "View project"}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </a>
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
