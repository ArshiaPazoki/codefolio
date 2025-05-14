// src/app/api/dependency-tree/_impl.ts

import fs from 'fs'
import path from 'path'

export interface TreeNode {
  name: string
  version: string
  children: TreeNode[]
}

function buildTree(
  pkgPath: string,
  maxDepth = 5,
  seen = new Set<string>()
): TreeNode {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  const node: TreeNode = {
    name: pkg.name,
    version: pkg.version,
    children: [],
  }
  if (maxDepth <= 0 || !pkg.dependencies) return node

  for (const [dep, ver] of Object.entries<string>(pkg.dependencies)) {
    if (seen.has(dep)) continue
    seen.add(dep)
    const modulePkg = path.join(
      path.dirname(pkgPath),
      'node_modules',
      dep,
      'package.json'
    )
    if (fs.existsSync(modulePkg)) {
      node.children.push(buildTree(modulePkg, maxDepth - 1, new Set(seen)))
    } else {
      node.children.push({ name: dep, version: ver, children: [] })
    }
  }
  return node
}

export function getDependencyTree(): TreeNode {
  const rootPkg = path.resolve(process.cwd(), 'package.json')
  return buildTree(rootPkg, 5)
}
