import { ArrowUpRight } from "lucide-react";
import { PROJECTS, ROMAN } from "../data/data";
import { Classification, Figure, Folio, Page, Spine, Spread } from "./Book";
import { buttonStyles } from "../lib/styles";

const hostOf = (url) => new URL(url).host;

export default function Projects({ language }) {
  const es = language === "es";
  const t = (value) => value[language] ?? value.en;

  return (
    <div id="projects" className="flex flex-col gap-6 lg:gap-10">
      <h2 className="sr-only">{es ? "Proyectos" : "Projects"}</h2>

      {PROJECTS.map((project, index) => {
        const number = index + 1;
        const plate = ROMAN[index + 1];
        const headingId = `project-${number}-title`;

        return (
          <Spread key={project.title} id={`project-${number}`} labelledBy={headingId}>
            <Page>
              <Folio language={language} />
              <Figure
                src={project.image}
                alt={es ? `Captura de ${project.title}` : `Screenshot of ${project.title}`}
                number={number}
                className="flex-1"
                imgClassName="aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0"
                caption={
                  es
                    ? `Fig. ${number}. ${project.title}, capturado del sitio en vivo.`
                    : `Fig. ${number}. ${project.title}, captured from the live site.`
                }
              />
            </Page>

            <Spine />

            <Page turn>
              <Folio language={language} plate={plate} />

              <h3
                id={headingId}
                className="m-0 text-[clamp(2.5rem,4.4vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
              >
                {project.title}
              </h3>

              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink">{t(project.desc)}</p>

              <div className="mt-8">
                <Classification
                  rows={[
                    { term: es ? "Familia" : "Family", value: t(project.family) },
                    { term: "Stack", value: project.tags.join(" · ") },
                    {
                      term: es ? "Hábitat" : "Habitat",
                      value: (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent underline"
                        >
                          {hostOf(project.link)}
                        </a>
                      ),
                    },
                  ]}
                />
              </div>

              <div className="mt-auto pt-10">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonStyles.primary}
                >
                  {es ? "Abrir el proyecto en vivo" : "Open the live project"}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </Page>
          </Spread>
        );
      })}
    </div>
  );
}
