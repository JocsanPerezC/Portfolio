import { TECH_GROUPS, SKILLS } from "../data/data";
import { Folio, Page, Spine, Spread } from "./Book";
import TechSphere from "./TechSphere";
import { PALETTES } from "../lib/styles";

export default function Technologies({ language, theme, motion }) {
  const es = language === "es";

  return (
    <Spread id="tech-sphere" labelledBy="tech-title">
      <Page>
        <Folio language={language} />

        <h2 id="tech-title" className="m-0 text-[clamp(2.25rem,3.8vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          {es ? "Índice de tecnologías" : "Index of technologies"}
        </h2>
        <p className="mt-5 max-w-[46ch] text-lg text-ink">
          {es
            ? `Las ${SKILLS.length} herramientas con las que construyo, ordenadas por la capa del producto donde viven.`
            : `The ${SKILLS.length} tools I build with, sorted by the layer of the product where they live.`}
        </p>

        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {TECH_GROUPS.map((group) => (
            <div key={group.name.en}>
              <h3 className="m-0 border-b-2 border-ink pb-2 font-sans text-sm font-bold uppercase tracking-[0.1em] text-ink-2">
                {group.name[language] ?? group.name.en}
              </h3>
              <ul className="m-0 list-none p-0">
                {group.items.map(({ name, icon: Icon }) => (
                  <li key={name} className="flex items-center gap-3 border-b border-ink/20 py-2">
                    <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-ink" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Page>

      <Spine />

      <Page turn>
        <Folio language={language} plate="V" />
        <div className="relative min-h-[420px] flex-1 border-2 border-ink bg-page-2 lg:min-h-[520px]">
          <div className="absolute inset-0">
            <TechSphere language={language} palette={PALETTES[theme] ?? PALETTES.light} motion={motion} />
          </div>
        </div>
        <p className="mt-3 text-sm text-ink-2">
          {es
            ? "Fig. 4. Las tecnologías que más uso. Arrastra el modelo para girarlo."
            : "Fig. 4. The technologies I use most. Drag the model to turn it."}
        </p>
      </Page>
    </Spread>
  );
}
