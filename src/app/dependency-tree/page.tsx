// src/app/dependency-tree/page.tsx
import React from 'react'
import DependencyTree from '@/features/dependency-tree/ui/DependencyTree'

export default function DependencyTreePage() {
  return (
    <main className="p-2 sm:p-4 bg-neutral-900">
      <h1 className="text-xl sm:text-3xl text-center sm:text-left mb-2 sm:mb-4 font-bold text-[#d4d4d4]">
        📦 Dependency Tree of CodeFolio
      </h1>
      <div className="h-[85vh] rounded border border-[#333] overflow-hidden">
        <DependencyTree/>
      </div>
    </main>
  )
}
