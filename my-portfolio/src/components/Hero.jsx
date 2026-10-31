import { ArrowDownRight, Download } from "lucide-react";
import { CV_PATH, PROFILE_CONTENT, PROJECTS } from "../data/data";
import { Chip, Classification, Folio, Page, Spine, Spread } from "./Book";
import Controls from "./Controls";
import { buttonStyles } from "../lib/styles";

function Specimen({ project, index, onOpen, label, className = "" }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={[
        "group relative block overflow-hidden border-2 border-ink bg-page-2 text-left",
        className,
      ].join(" ")}
      aria-label={`${project.title}: ${label}`}
    >
      <img
        src={project.thumb ?? project.image}
        alt=""
        data-specimen-image
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <Chip className="absolute left-0 top-0">{index + 1}</Chip>
    </button>
  );
}

export default function Hero({ language, scrollTo, setLanguage, theme, setTheme }) {
  const es = language === "es";
  const t = (value) => (typeof value === "string" ? value : value[language] ?? value.en);

  const rows = [
    { term: es ? "Hábitat" : "Habitat", value: PROFILE_CONTENT.location },
    { term: es ? "Oficio" : "Trade", value: t(PROFILE_CONTENT.title) },
    { term: es ? "Formación" : "Studies", value: t(PROFILE_CONTENT.education) },
    {
      term: es ? "Estado" : "Status",
      value: (
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-ok" />
          {t(PROFILE_CONTENT.availability)}
        </span>
      ),
    },
  ];

  const plateLabel = es ? "ver su lámina" : "see its plate";

  return (
    <Spread id="about" labelledBy="hero-name" className="lg:min-h-[calc(100svh-3rem)]">
      <Page>
        <Folio
          language={language}
          aside={
            <Controls
              compact
              className="shrink-0 lg:hidden"
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />

        <h1
          id="hero-name"
          className="m-0 text-[clamp(3.25rem,6.6vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink"
        >
          <span className="block overflow-hidden pb-1">
            <span data-hero-line className="block">
              {PROFILE_CONTENT.firstName}
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span data-hero-line className="block">
              {PROFILE_CONTENT.lastName}
            </span>
          </span>
        </h1>

        <p data-hero-fade className="mt-6 max-w-[34ch] text-xl leading-snug text-ink">
          {t(PROFILE_CONTENT.summary)}
        </p>

        <div data-hero-fade className="mt-8">
          <Classification rows={rows} />
        </div>

        <div data-hero-fade className="mt-auto flex flex-wrap gap-3 pt-10">
          <a
            href="#projects"
            onClick={(event) => {
              event.preventDefault();
              scrollTo("projects");
            }}
            className={buttonStyles.primary}
          >
            {es ? "Ver proyectos" : "See projects"}
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>
          <a href={CV_PATH} download className={buttonStyles.secondary}>
            <Download size={18} aria-hidden="true" />
            {es ? "Descargar CV" : "Download CV"}
          </a>
        </div>
      </Page>

      <Spine />

      <Page turn>
        <Folio language={language} plate="I" />

        <h2 className="m-0 text-3xl font-bold tracking-[-0.02em] text-ink">
          {es ? "Especímenes observados" : "Observed specimens"}
        </h2>

        <div className="mt-6 grid min-h-[340px] flex-1 grid-cols-[1.35fr_1fr] grid-rows-2 gap-4">
          {PROJECTS.map((project, index) => (
            <Specimen
              key={project.title}
              project={project}
              index={index}
              label={plateLabel}
              onOpen={() => scrollTo(`project-${index + 1}`)}
              className={index === 0 ? "row-span-2" : ""}
            />
          ))}
        </div>

        <ol className="m-0 mt-6 grid list-none gap-2 p-0">
          {PROJECTS.map((project, index) => (
            <li key={project.title} className="grid grid-cols-[2rem_1fr] items-baseline gap-2">
              <span className="tabular font-display font-bold">{index + 1}</span>
              <button
                type="button"
                onClick={() => scrollTo(`project-${index + 1}`)}
                className="text-left text-ink decoration-ink/40 hover:text-accent hover:underline"
              >
                <strong className="font-bold">{project.title}</strong>
                <span className="text-ink-2"> · {t(project.short)}</span>
              </button>
            </li>
          ))}
        </ol>
      </Page>
    </Spread>
  );
}
