// src/app/api/commits/route.ts
import { NextResponse } from 'next/server'

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'Missing GITHUB_TOKEN in environment' },
      { status: 500 }
    )
  }

  const query = `
    query LastCommits($owner:String!, $name:String!, $count:Int!) {
      repository(owner: $owner, name: $name) {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: $count) {
                nodes {
                  oid
                  messageHeadline
                  committedDate
                  url
                  author {
                    name
                    email
                    user { login }
                  }
                  parents(first: 2) {
                    nodes { oid }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const variables = {
    owner: 'ArshiaPazoki',
    name: 'codefolio',
    count: 100,
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return NextResponse.json(err, { status: res.status })
  }

  const json = await res.json()
  const commits = json.data.repository.defaultBranchRef.target.history.nodes.map(
    (c: any) => ({
      oid: c.oid.slice(0, 7),
      message: c.messageHeadline,
      date: c.committedDate,
      url: c.url,
      authorName: c.author.name,
      authorEmail: c.author.email,
      authorLogin: c.author.user?.login || null,
      parents: c.parents.nodes.map((p: any) => p.oid.slice(0, 7)),
    })
  )

  return NextResponse.json(commits)
}