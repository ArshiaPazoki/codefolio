// defines the shape of a GitHub repo in our domain
export interface Repo {
    name: string
    url: string
    description: string | null
    stargazers: number
    forks: number
    language?: string
  }
  