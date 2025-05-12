'use client'

import { RepoCard } from './RepoCard'
import { Repo } from '../model/types'

export function RepoGrid({ repos }: { repos: Repo[] }) {
  if (repos.length === 0) {
    return <p className="text-center text-[#808080]">No repos to show.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => (
        <RepoCard key={r.url} repo={r} />
      ))}
    </div>
  )
}
