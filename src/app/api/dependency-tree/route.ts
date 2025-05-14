// src/app/api/dependency-tree/route.ts

// force this API to run in Node.js, not the Edge runtime
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { getDependencyTree } from '../../../features/dependency-tree/model/DependencyTreeModel'

export async function GET() {
  try {
    const tree = getDependencyTree()
    return NextResponse.json(tree)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
