import { getRepos } from '@/features/github/api/getRepos'
import { RepoGrid } from '@/features/github/ui/RepoGrid'
// import Image from 'next/image'

export const metadata = {
  title: 'GitHub Repositories – Arshia Pazoki',
  description: 'A showcase of my latest GitHub projects',
}

export default async function GitHubPage() {
  let repos = []
  try {
    repos = await getRepos()
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error fetching repos'
    return (
      <section className="p-8 bg-neutral-900 text-[#d4d4d4]">
        <h1 className="text-2xl font-bold mb-4">My GitHub Repos</h1>
        <p className="text-red-400">Failed to load repositories: {message}</p>
      </section>
    )
  }

  return (
    <section className="p-8 bg-neutral-900 text-[#d4d4d4]">
      <h1 className="text-2xl font-bold mb-8 text-center">My GitHub Repositories</h1>
      {/* TODO */}
      {/* <Image
      src="https://raw.githubusercontent.com/ArshiaPazoki/ArshiaPazoki/2f3c5efe3bb11cb85554b40049eb7878e62fb6da/profile-3d-contrib/profile-night-rainbow.svg"
      width={400}
      height={800}
      alt="Picture of the author"
      className='m-2 w-1/2'
    /> */}
      <RepoGrid repos={repos} />
    </section>
  )
}
