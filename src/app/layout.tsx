// src/app/layout.tsx
'use client'

import './globals.css'
import { useState } from 'react'
// import { Geist, Geist_Mono } from 'next/font/google'
import Titlebar from '../widgets/MenuBar/MenuBar'
import Statusbar from '../widgets/Statusbar/Statusbar'
import ActivityBar from '../widgets/ActivityBar/ActivityBar'
import Explorer from '../widgets/Explorer/Explorer'
import Terminal from '../widgets/Terminal/Terminal'
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
  const [explorerOpen, setExplorerOpen] = useState(false)
  const [termianlOpen, setTerminalOpen] = useState(true)
  return (
    <html lang="en">
      <body className="flex flex-col h-full antialiased">
        <Titlebar />
        <div className="flex flex-1 h-full overflow-hidden">
          <ActivityBar onToggleExplorer={() => setExplorerOpen(o => !o)}/>
          <Explorer isOpen={explorerOpen} />
          {/* Updated: make this flex-col & h-full */}
          <main className="flex flex-col flex-1 h-full overflow-auto no-scrollbar">
            {children}
          </main>
        </div>
        <Statusbar/>
      <div className="absolute h-1/3 bottom-7 left-0 right-0 pointer-events-none flex justify-center z-50">
            <div className="pointer-events-auto ml-12 w-full sm:w-3/4 lg:w-full h-full mx-auto">
              <Terminal isOpen={termianlOpen} prompt=">" />
            </div>
          </div>
      </body>
    </html>
  )
}
