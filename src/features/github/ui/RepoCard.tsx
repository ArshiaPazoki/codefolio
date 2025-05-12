'use client'

import { Star, GitBranch } from 'lucide-react'
import { Repo } from '../model/types'

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="block p-4 bg-[#252526] rounded hover:bg-[#2a2d2e] transition"
    >
      <h3 className="text-lg font-semibold text-[#dcdcdc] mb-1 truncate">
        {repo.name}
      </h3>
      {repo.description && (
        <p className="text-sm text-[#a6a6a6] mb-3 line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="flex items-center text-xs text-[#858585] space-x-4">
        <span className="flex items-center space-x-1">
          <Star size={12} /> <span>{repo.stargazers}</span>
        </span>
        <span className="flex items-center space-x-1">
          <GitBranch size={12} /> <span>{repo.forks}</span>
        </span>
        {repo.language && <span>{repo.language}</span>}
      </div>
    </a>
  )
}
