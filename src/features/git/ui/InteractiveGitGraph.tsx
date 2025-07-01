// src/features/git/ui/InteractiveGitGraph.tsx
'use client'

import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Gitgraph, Orientation, templateExtend, TemplateName } from '@gitgraph/react'

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
  const vsCodeTemplate = templateExtend(TemplateName.Metro, {
    // a palette pulled from VS Code Dark+ syntax theme
    colors: [
      '#193cb8', // keywords / branch lines
      '#DCDCAA', // strings / commit dots
      '#4EC9B0', // types / tags
      '#C586C0', // functions
      '#CE9178', // numbers / metadata
    ],
  
    branch: {
      color: '#193CB8',
      spacing: 40,        // more room between parallel branches
      lineWidth: 4,       // a bit thicker than default
      label: {
        font: '18px "Segoe UI", sans-serif',
        color: '#9CDCFE',              // light blue text
        bgColor: 'transparent',
        strokeColor: '#193CB8',
        borderRadius: 3,
        // pointerWidth: 6,               // nice pointer
      },
    },
  
    commit: {
      spacing: 60,        // more vertical padding
      dot: {
        size: 8,
        color: '#1E1E1E',
        strokeColor: '#193CB8', // dark bg stroke
        strokeWidth: 2,
      },
      message: {
        font: '18px "Courier New", monospace',
        displayAuthor: true,    // show e.g. “Alice”
        // displayBranch: false,   // hide branch name here
        displayHash: true,      // show short SHA
        color: '#CCCCCC',       // light gray text
        // hashColor: '#6A9955',   // green like comments
        // authorColor: '#CE9178', // orange for emphasis
      },
    },
  
    tag: {
      font: 'italic 12px "Segoe UI", sans-serif',
      color: '#007ACC',       // dark text
      bgColor: 'transparent',     // turquoise badge
      strokeColor: '#007ACC', // VS Code blue border
      borderRadius: 2,
      pointerWidth: 12,
    },
  
    // arrow: {
    //   color: '#007ACC',
    //   offset: 2,
    //   size: 10,
    // },
  })

  
  // 5) Now you can safely guard with early returns:
  if (error)                return <div className="p-4 text-red-400">Error: {error}</div>
  if (commits === null)     return <div className="p-4">Loading commits…</div>
  if (commits.length === 0) return <div className="p-4">No commits found.</div>

  // 6) Finally, render your graph exactly once:
  return (
    <div className="p-4 bg-neutral-900 rounded-lg shadow-lg">
      <div className=" border-[#333] rounded">
        <Gitgraph options={{
          template: vsCodeTemplate,
          branchLabelOnEveryCommit: true,
          orientation: Orientation.VerticalReverse
          }}>
          {(gitgraph) => {
            if (didRender.current) return
            didRender.current = true

            const main = gitgraph.branch({ name: 'main' })
            commitsWithHashes.forEach((c) => {
              main.commit({
                hash:    `#${c.graphHash}`,
                subject: c.message?.length > 100 ? `${c.message.substring(0, 90)}...` : c.message,
                author: `by : ${c.authorName} < ${c.authorEmail} >`,
                onClick: () => window.open(c.url, '_blank'),
                tag: 'v0.1.0',
              })
            })
          }}
        </Gitgraph>
      </div>
    </div>
  )
}
