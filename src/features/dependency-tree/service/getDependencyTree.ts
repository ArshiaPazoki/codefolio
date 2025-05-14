// src/features/dependency-tree/service/getDependencyTree.ts
import type { TreeNode } from '@/features/dependency-tree/model/DependencyTreeModel'

export async function fetchDependencyTree(): Promise<TreeNode> {
  const res = await fetch('/api/dependency-tree')
  if (!res.ok) throw new Error(`Unable to load dependency tree: ${res.status}`)
  return res.json()
}
