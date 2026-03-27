import { useEffect, useMemo, useState } from "react";
import {
  Star,
  Users,
  BookOpen,
  ExternalLink,
  Eye,
  ChevronDown,
} from "lucide-react";
import { getFilteredRepos, getGitHubData } from "../lib/github";

function StatCard({ icon: Icon, label, value, isDark }) {
  return (
    <div
      className={[
        "rounded-3xl border p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#7c6dfa]/30 hover:shadow-[0_20px_80px_rgba(124,109,250,0.12)]",
        isDark
          ? "border-white/10 bg-white/5"
          : "border-black/10 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
      ].join(" ")}
    >
      <div
        className={[
          "mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border",
          isDark
            ? "border-white/10 bg-[#111320] text-[#c4bcff]"
            : "border-black/10 bg-[#f8fafc] text-[#475569]",
        ].join(" ")}
      >
        <Icon size={18} />
      </div>

      <p
        className={[
          "text-2xl font-bold",
          isDark ? "text-white" : "text-[#111827]",
        ].join(" ")}
      >
        {value}
      </p>

      <p
        className={[
          "mt-1 text-sm",
          isDark ? "text-[#9aa0b8]" : "text-[#475569]",
        ].join(" ")}
      >
        {label}
      </p>
    </div>
  );
}

function RepoCard({ repo, isDark, language }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className={[
        "group rounded-3xl border p-5 transition duration-300 hover:-translate-y-1 hover:border-[#7c6dfa]/30",
        isDark
          ? "border-white/10 bg-[#111320]/80 hover:bg-[#14182b]"
          : "border-black/10 bg-white hover:bg-[#fcfcff] shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <h4
          className={[
            "text-lg font-semibold",
            isDark ? "text-white" : "text-[#111827]",
          ].join(" ")}
        >
          {repo.name}
        </h4>

        <ExternalLink
          size={16}
          className={
            isDark
              ? "text-[#7f859f] transition group-hover:text-[#c4bcff]"
              : "text-[#64748b] transition group-hover:text-[#7c6dfa]"
          }
        />
      </div>

      <p
        className={[
          "mt-3 min-h-[72px] text-sm leading-6",
          isDark ? "text-[#9aa0b8]" : "text-[#475569]",
        ].join(" ")}
      >
        {repo.description ||
          (language === "es" ? "Sin descripción." : "No description.")}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {repo.language && (
          <span
            className={[
              "rounded-full border px-3 py-1 text-xs",
              isDark
                ? "border-white/10 bg-white/5 text-[#d7dbef]"
                : "border-black/10 bg-[#f8fafc] text-[#111827]",
            ].join(" ")}
          >
            {repo.language}
          </span>
        )}

        <span
          className={[
            "rounded-full border px-3 py-1 text-xs",
            isDark
              ? "border-white/10 bg-white/5 text-[#d7dbef]"
              : "border-black/10 bg-[#f8fafc] text-[#111827]",
          ].join(" ")}
        >
          ★ {repo.stargazers_count}
        </span>

        <span
          className={[
            "rounded-full border px-3 py-1 text-xs",
            isDark
              ? "border-white/10 bg-white/5 text-[#d7dbef]"
              : "border-black/10 bg-[#f8fafc] text-[#111827]",
          ].join(" ")}
        >
          Forks {repo.forks_count}
        </span>
      </div>

      <p
        className={[
          "mt-4 text-xs",
          isDark ? "text-[#7f859f]" : "text-[#64748b]",
        ].join(" ")}
      >
        {language === "es" ? "Actualizado" : "Updated"}{" "}
        {new Date(repo.updated_at).toLocaleDateString()}
      </p>
    </a>
  );
}

export default function GithubStats({ theme, language }) {
  const isDark = theme === "dark";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeLanguage] = useState("All");
  const [isReposOpen, setIsReposOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const result = await getGitHubData();

        if (mounted) {
          setData(result);
          setError("");
        }
      } catch {
        if (mounted) {
          setError(
            language === "es"
              ? "No se pudieron cargar los datos de GitHub."
              : "GitHub data could not be loaded."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [language]);

  const filteredRepos = useMemo(() => {
    if (!data?.repos) return [];
    return getFilteredRepos(data.repos, activeLanguage);
  }, [data, activeLanguage]);

  return (
    <section
      id="github"
      className="relative z-10 px-6 py-24 sm:px-10 lg:px-14"
    >
      <div className="mb-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#7c6dfa]">
          GitHub
        </p>

        <h2
          className={[
            "text-4xl font-bold tracking-tight md:text-5xl",
            isDark ? "text-white" : "text-[#111827]",
          ].join(" ")}
        >
          {language === "es" ? "Actividad y estadísticas" : "Activity and stats"}
        </h2>

        <p
          className={[
            "mt-4 max-w-2xl text-base leading-7",
            isDark ? "text-[#9aa0b8]" : "text-[#475569]",
          ].join(" ")}
        >
          {language === "es"
            ? "Datos cargados dinámicamente desde mi perfil de GitHub."
            : "Data loaded dynamically from my GitHub profile."}
        </p>
      </div>

      {loading && (
        <div
          className={[
            "rounded-[32px] border p-8",
            isDark
              ? "border-white/10 bg-white/5 text-[#9aa0b8]"
              : "border-black/10 bg-white text-[#475569] shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
          ].join(" ")}
        >
          {language === "es"
            ? "Cargando datos de GitHub..."
            : "Loading GitHub data..."}
        </div>
      )}

      {error && (
        <div className="rounded-[32px] border border-red-400/20 bg-red-400/10 p-8 text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div
              className={[
                "rounded-[32px] border p-6 backdrop-blur-xl",
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-black/10 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
              ].join(" ")}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img
                  src={data.profile.avatar_url}
                  alt={data.profile.login}
                  className="h-24 w-24 rounded-3xl border border-black/10 object-cover"
                />

                <div>
                  <h3
                    className={[
                      "text-2xl font-bold",
                      isDark ? "text-white" : "text-[#111827]",
                    ].join(" ")}
                  >
                    {data.profile.name || data.profile.login}
                  </h3>

                  <p className="mt-1 text-[#7c6dfa]">@{data.profile.login}</p>

                  <p
                    className={[
                      "mt-3 max-w-2xl text-sm leading-7",
                      isDark ? "text-[#9aa0b8]" : "text-[#475569]",
                    ].join(" ")}
                  >
                    {data.profile.bio ||
                      (language === "es"
                        ? "Sin bio pública en GitHub."
                        : "No public GitHub bio.")}
                  </p>

                  <a
                    href={data.profile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "mt-4 inline-flex items-center gap-2 text-sm font-semibold transition",
                      isDark
                        ? "text-white hover:text-[#c4bcff]"
                        : "text-[#111827] hover:text-[#7c6dfa]",
                    ].join(" ")}
                  >
                    {language === "es" ? "Ver perfil" : "View profile"}{" "}
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard
                icon={BookOpen}
                label={language === "es" ? "Repos públicos" : "Public repos"}
                value={data.profile.public_repos}
                isDark={isDark}
              />
              <StatCard
                icon={Users}
                label={language === "es" ? "Seguidores" : "Followers"}
                value={data.profile.followers}
                isDark={isDark}
              />
              <StatCard
                icon={Star}
                label={language === "es" ? "Estrellas totales" : "Total stars"}
                value={data.stats.totalStars}
                isDark={isDark}
              />
              <StatCard
                icon={Eye}
                label={language === "es" ? "Watchers totales" : "Total watchers"}
                value={data.stats.totalWatchers}
                isDark={isDark}
              />
            </div>
          </div>

          <div
            className={[
              "rounded-[32px] border p-6 backdrop-blur-xl",
              isDark
                ? "border-white/10 bg-white/5"
                : "border-black/10 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
            ].join(" ")}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3
                  className={[
                    "text-2xl font-bold",
                    isDark ? "text-white" : "text-[#111827]",
                  ].join(" ")}
                >
                  {language === "es"
                    ? "Repositorios destacados"
                    : "Highlighted repositories"}
                </h3>

                <p
                  className={[
                    "mt-2 text-sm",
                    isDark ? "text-[#9aa0b8]" : "text-[#475569]",
                  ].join(" ")}
                >
                  {language === "es"
                    ? "Ordenados dinámicamente por impacto y actividad reciente."
                    : "Dynamically ordered by impact and recent activity."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsReposOpen((prev) => !prev)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                  isDark
                    ? "border-white/10 bg-white/5 text-white hover:border-[#7c6dfa]/30 hover:bg-[#7c6dfa]/10"
                    : "border-black/10 bg-white text-[#111827] hover:border-[#7c6dfa]/30 hover:bg-[#f8f7ff]",
                ].join(" ")}
              >
                <span>
                  {isReposOpen
                    ? language === "es"
                      ? "Contraer"
                      : "Collapse"
                    : language === "es"
                    ? "Expandir"
                    : "Expand"}
                </span>

                <ChevronDown
                  size={16}
                  className={[
                    "transition-transform duration-300",
                    isReposOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                />
              </button>
            </div>

            {isReposOpen && (
              <div className="mt-6">
                {filteredRepos.length === 0 ? (
                  <div
                    className={[
                      "rounded-2xl border p-6",
                      isDark
                        ? "border-white/10 bg-[#111320]/70 text-[#9aa0b8]"
                        : "border-black/10 bg-[#f8fafc] text-[#475569]",
                    ].join(" ")}
                  >
                    {language === "es"
                      ? "No hay repositorios para ese lenguaje."
                      : "There are no repositories for that language."}
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredRepos.map((repo) => (
                      <RepoCard
                        key={repo.id}
                        repo={repo}
                        isDark={isDark}
                        language={language}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}