import { Repo } from '../model/types'

const USERNAME = 'ArshiaPazoki'
const GITHUB_API = `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=20`

/**
 * Fetches your latest repos from GitHub.
 * Requires that process.env.GITHUB_TOKEN is set to a valid PAT.
 */
export async function getRepos(): Promise<Repo[]> {
  const res = await fetch(GITHUB_API, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    // in Next.js App Router, this runs server‐side by default
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`GitHub API responded ${res.status}: ${res.statusText}`)
  }

  const data = (await res.json()) as any[]

  return data.map((r) => ({
    name: r.name,
    url: r.html_url,
    description: r.description,
    stargazers: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
  }))
}
