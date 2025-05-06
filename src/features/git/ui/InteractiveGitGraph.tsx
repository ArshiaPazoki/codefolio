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
    // Create an AbortController so we can cancel the fetch if the component unmounts
    const controller = new AbortController()
    const signal = controller.signal

    // Define the async load function
    async function loadCommits() {
      try {
        const res = await fetch('/api/commits', { signal })
        if (!res.ok) {
          throw new Error(`Unexpected status ${res.status}`)
        }
        // we know our API returns Commit[], so cast here
        const data = (await res.json()) as Commit[]
        setCommits(data)
      } catch (maybeError: unknown) {
        // Ignore cancellation errors
        if (maybeError instanceof DOMException && maybeError.name === 'AbortError') {
          return
        }
        // Normalize any other thrown value to a string
        const message =
          maybeError instanceof Error
            ? maybeError.message
            : String(maybeError)
        console.error('Failed to load commits:', message)
        setError(message)
        setCommits([]) // show “no commits” rather than stuck in loading
      }
    }

    loadCommits()

    // cleanup: abort in-flight request on unmount
    return () => {
      controller.abort()
    }
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
        <Gitgraph options={{ template: metroTemplate}}>
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
