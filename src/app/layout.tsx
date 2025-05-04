// src/app/layout.tsx
'use client'

import './globals.css'
import { useState } from 'react'
// import { Geist, Geist_Mono } from 'next/font/google'
import Titlebar from '../widgets/MenuBar/MenuBar'
import Statusbar from '../widgets/Statusbar/Statusbar'
import ActivityBar from '../widgets/ActivityBar/ActivityBar'
import Explorer from '../widgets/Explorer/Explorer'
// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [explorerOpen, setExplorerOpen] = useState(true)
  return (
    <html lang="en">
      <body className="flex flex-col h-full antialiased">
        <Titlebar />
        <div className="flex flex-1 h-full overflow-hidden">
          <ActivityBar onToggleExplorer={() => setExplorerOpen(o => !o)}/>
          <Explorer isOpen={explorerOpen} />
          {/* Updated: make this flex-col & h-full */}
          <main className="flex flex-col flex-1 h-full overflow-auto">
            {children}
          </main>
        </div>
        <Statusbar />
      </body>
    </html>
  )
}
