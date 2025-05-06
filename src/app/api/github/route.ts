// src/app/api/github/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'Missing GITHUB_TOKEN' }, { status: 500 })
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        viewer {
          login
        }
      }`,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('GitHub API error', res.status, text)
    return NextResponse.json({ error: text }, { status: res.status })
  }

  const json = await res.json()
  return NextResponse.json(json)
}
