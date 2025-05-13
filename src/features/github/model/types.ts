// mirror exactly the bits we need from GitHub’s API
export interface GitHubRepo {
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
}

// defines the shape of a GitHub repo in our domain
export interface Repo {
    name: string
    url: string
    description: string | null
    stargazers: number
    forks: number
    language?: string
  }
  