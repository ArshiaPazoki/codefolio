import { getRepos } from '@/features/github/api/getRepos'
import { RepoGrid } from '@/features/github/ui/RepoGrid'

export const metadata = {
  title: 'GitHub Repositories – Arshia Pazoki',
  description: 'A showcase of my latest GitHub projects',
}

export default async function GitHubPage() {
  let repos = []
  try {
    repos = await getRepos()
  } catch (e: any) {
    return (
      <section className="p-8 bg-[#1e1e1e] text-[#d4d4d4]">
        <h1 className="text-2xl font-bold mb-4">My GitHub Repos</h1>
        <p className="text-red-400">Failed to load repositories: {e.message}</p>
      </section>
    )
  }

  return (
    <section className="p-8 bg-[#1e1e1e] text-[#d4d4d4]">
      <h1 className="text-2xl font-bold mb-8 text-center">My GitHub Repositories</h1>
      <RepoGrid repos={repos} />
    </section>
  )
}
