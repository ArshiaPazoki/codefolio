// src/app/api/pages/route.ts
export const runtime = 'nodejs'    // ← add this

import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'

async function findPages(dir: string, prefix = ''): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  let routes: string[] = []

  for (const ent of entries) {
    if (ent.name.startsWith('_') || ent.name.startsWith('.') || ent.name === 'api')
      continue

    const fullPath = join(dir, ent.name)
    if (ent.isDirectory()) {
      const hasPage = await Promise.all([
        'page.tsx','page.ts','page.jsx','page.js'
      ].map(f => fs.access(join(fullPath, f)).then(() => true).catch(() => false)))
       .then(results => results.some(Boolean))

      if (hasPage) {
        const route = prefix + '/' + ent.name
        routes.push(route === '' ? '/' : route)
      }

      routes.push(...await findPages(fullPath, prefix + '/' + ent.name))
    }
  }

  return routes
}

export async function GET() {
  const appDir = join(process.cwd(), 'src', 'app')
  const pages = await findPages(appDir)
  return NextResponse.json(pages.sort())
}
