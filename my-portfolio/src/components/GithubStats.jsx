import { useEffect, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { getGitHubData } from "../lib/github";
import { Classification, Folio, Page, Spine, Spread } from "./Book";

const PROFILE_URL = "https://github.com/JocsanPerezC";

function LoadingRows({ count }) {
  return Array.from({ length: count }, (_, index) => (
    <li key={index} aria-hidden="true" className="border-b border-ink/20 py-4">
      <span className="block h-4 w-2/3 animate-pulse bg-page-2" />
      <span className="mt-2 block h-3 w-1/3 animate-pulse bg-page-2" />
    </li>
  ));
}

export default function GithubStats({ language }) {
  const es = language === "es";
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let active = true;
    getGitHubData()
      .then((data) => active && setState({ status: "ready", data }))
      .catch(() => active && setState({ status: "error", data: null }));
    return () => {
      active = false;
    };
  }, []);

  const { status, data } = state;
  const dateFormat = new Intl.DateTimeFormat(es ? "es-CR" : "en-US", { month: "short", year: "numeric" });

  const counts = data
    ? [
        { term: es ? "Repositorios públicos" : "Public repositories", value: data.profile.public_repos },
        { term: es ? "Seguidores" : "Followers", value: data.profile.followers },
        { term: es ? "Estrellas recibidas" : "Stars received", value: data.stats.totalStars },
      ].map(({ term, value }) => ({ term, value: <span className="tabular font-display text-2xl font-bold">{value}</span> }))
    : [];

  return (
    <Spread id="github" labelledBy="github-title">
      <Page>
        <Folio language={language} />

        <h2 id="github-title" className="m-0 text-[clamp(2.25rem,3.8vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          {es ? "Actividad en GitHub" : "GitHub activity"}
        </h2>

        {status === "error" && (
          <p role="alert" className="mt-6 max-w-[46ch] border-t-2 border-error pt-4 text-ink">
            {es
              ? "GitHub no respondió en este momento. Puedes ver el perfil directamente."
              : "GitHub did not respond right now. You can open the profile directly."}{" "}
            <a href={PROFILE_URL} target="_blank" rel="noreferrer" className="font-bold text-accent underline">
              github.com/JocsanPerezC
            </a>
          </p>
        )}

        {status === "loading" && (
          <p className="mt-6 text-ink-2" aria-live="polite">
            {es ? "Consultando GitHub…" : "Asking GitHub…"}
          </p>
        )}

        {data && (
          <>
            <div className="mt-8 flex items-start gap-5">
              <div className="relative h-24 w-24 shrink-0 border-2 border-ink bg-page-2">
                <img src={data.profile.avatar_url} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="m-0 font-display text-2xl font-bold leading-tight">{data.profile.name || data.profile.login}</p>
                <a
                  href={data.profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-accent underline"
                >
                  @{data.profile.login}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                {data.profile.bio && <p className="mt-3 max-w-[48ch] text-ink-2">{data.profile.bio}</p>}
              </div>
            </div>

            <div className="mt-8">
              <Classification rows={counts} />
            </div>
          </>
        )}
      </Page>

      <Spine />

      <Page turn>
        <Folio language={language} plate="VI" />

        <h3 className="m-0 text-3xl font-bold tracking-[-0.02em]">
          {es ? "Repositorios destacados" : "Highlighted repositories"}
        </h3>

        <ol className="m-0 mt-6 list-none border-t-2 border-ink p-0">
          {status === "loading" && <LoadingRows count={5} />}
          {data?.topRepos.map((repo, index) => (
            <li key={repo.id} className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 border-b border-ink/20 py-4">
              <span className="tabular font-display font-bold">{index + 1}</span>
              <div className="min-w-0">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold break-words text-ink hover:text-accent hover:underline"
                >
                  {repo.name}
                </a>
                <p className="m-0 mt-1 text-sm text-ink-2">
                  {[repo.language, `${es ? "actualizado" : "updated"} ${dateFormat.format(new Date(repo.updated_at))}`]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <span className="tabular inline-flex items-center gap-1 text-sm text-ink-2">
                <Star size={14} aria-hidden="true" />
                <span className="sr-only">{es ? "Estrellas:" : "Stars:"}</span>
                {repo.stargazers_count}
              </span>
            </li>
          ))}
        </ol>

        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-bold text-accent underline"
        >
          {es ? "Ver todos los repositorios" : "See every repository"}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </Page>
    </Spread>
  );
}
