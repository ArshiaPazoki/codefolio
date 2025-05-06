// src/features/git/ui/InteractiveGitGraph.tsx
'use client'

import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react'
// import { Gitgraph, Orientation, templateExtend, TemplateName } from '@gitgraph/react'

interface Commit {
  oid: string
  message: string
  url: string
  authorName: string
  authorEmail: string
  authorLogin: string | null
}

export default function InteractiveGitGraph() {
  // 1) Hooks up front, always in the same order:
  const [commits, setCommits] = useState<Commit[] | null>(null)
  const [error,   setError  ] = useState<string | null>(null)
  const didRender = useRef(false)

  // 2) Fetch on mount
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/commits')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Commit[] = await res.json()
        setCommits(data)
      } catch (e: any) {
        console.error(e)
        setError(e.message || 'Unknown error')
        setCommits([])
      }
    })()
  }, [])

  // 3) Build unique hashes (always runs, even if commits is null)
  const commitsWithHashes = useMemo(() => {
    if (!commits) return []
    return commits.map((c, i) => ({
      ...c,
      graphHash: `${c.oid}-${i}`,
    }))
  }, [commits])

  // 4) Prepare your Gitgraph template
  const metroTemplate = templateExtend(TemplateName.Metro, {
    commit: { dot: { size: 6 } },
    branch: { label: { font: '10px monospace', color: '#888' } },
  })

  // 5) Now you can safely guard with early returns:
  if (error)                return <div className="p-4 text-red-400">Error: {error}</div>
  if (commits === null)     return <div className="p-4">Loading commits…</div>
  if (commits.length === 0) return <div className="p-4">No commits found.</div>

  // 6) Finally, render your graph exactly once:
  return (
    <div className="p-4 bg-[#1e1e1e] rounded-lg shadow-lg">
      <div className=" border-[#333] rounded">
        {/* <Gitgraph options={{ template: metroTemplate, orientation:Orientation.Horizontal }}> */}
        <Gitgraph>
          {(gitgraph) => {
            if (didRender.current) return
            didRender.current = true

            const main = gitgraph.branch({ name: 'main' })
            commitsWithHashes.forEach((c) => {
              main.commit({
                hash:    c.graphHash,
                subject: c.message,
                author: `${c.authorName} <${c.authorEmail}>`,
                onClick: () => window.open(c.url, '_blank'),
              })
            })
          }}
        </Gitgraph>
      </div>
    </div>
  )
}
