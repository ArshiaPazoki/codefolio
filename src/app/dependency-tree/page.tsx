// src/app/dependency-tree/page.tsx
import React from 'react'
import DependencyTree from '@/features/dependency-tree/ui/DependencyTree'

export default function DependencyTreePage() {
  return (
    <main className="p-8 bg-[#1e1e1e] min-h-screen">
      <h1 className="text-3xl font-bold text-[#d4d4d4] mb-6">
        📦 Dependency Tree
      </h1>
      <div className="h-[600px] rounded border border-[#333] overflow-hidden">
        <DependencyTree/>
      </div>
    </main>
  )
}
