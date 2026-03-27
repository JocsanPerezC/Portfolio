const GITHUB_USERNAME = "JocsanPerezC";

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (import.meta.env.VITE_GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
}

async function fetchGitHub(endpoint) {
  const res = await fetch(`https://api.github.com${endpoint}`, { headers });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}

export async function getGitHubProfile() {
  return fetchGitHub(`/users/${GITHUB_USERNAME}`);
}

export async function getGitHubRepos() {
  const repos = await fetchGitHub(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
  );

  return repos.filter((repo) => !repo.fork);
}

function groupLanguages(repos) {
  const map = new Map();

  repos.forEach((repo) => {
    const lang = repo.language || "Other";
    map.set(lang, (map.get(lang) || 0) + 1);
  });

  const total = repos.length || 1;

  return [...map.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export function getFilteredRepos(repos, activeLanguage = "All") {
  const filtered =
    activeLanguage === "All"
      ? repos
      : repos.filter((repo) => (repo.language || "Other") === activeLanguage);

  return [...filtered]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }

      if (b.forks_count !== a.forks_count) {
        return b.forks_count - a.forks_count;
      }

      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 6);
}

export async function getGitHubData() {
  const [profile, repos] = await Promise.all([
    getGitHubProfile(),
    getGitHubRepos(),
  ]);

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const totalWatchers = repos.reduce(
    (sum, repo) => sum + repo.watchers_count,
    0
  );

  const languages = groupLanguages(repos);

  const topRepos = [...repos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }

      if (b.forks_count !== a.forks_count) {
        return b.forks_count - a.forks_count;
      }

      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 6);

  return {
    profile,
    repos,
    languages,
    stats: {
      totalStars,
      totalForks,
      totalWatchers,
      totalRepos: repos.length,
    },
    topRepos,
  };
}