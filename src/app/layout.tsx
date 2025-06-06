// src/app/layout.tsx
'use client'

import './globals.css'
import { useState } from 'react'
import Titlebar from '@/widgets/MenuBar/TitleBar'
import ActivityBar from '@/widgets/ActivityBar/ActivityBar'
import Explorer from '@/widgets/Explorer/Explorer'
import Terminal from '@/widgets/Terminal/Terminal'
import Statusbar from '@/widgets/Statusbar/Statusbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [explorerOpen, setExplorerOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <html lang="en">
      <body className="relative flex flex-col h-screen antialiased bg-[#1e1e1e]">
        <Titlebar />

        <div className="flex flex-1 overflow-hidden">
          <ActivityBar
            onToggleExplorer={() => setExplorerOpen(o => !o)}
            onToggleTerminal={() => setTerminalOpen(o => !o)}
          />

          <Explorer isOpen={explorerOpen} />

          <main className="flex-1 overflow-auto no-scrollbar">
            {children}
          </main>
        </div>

        <Statusbar />

        {/*
          This terminal sits on top of everything else, without
          pushing any of it around.
        */}
        {terminalOpen && (
          <div className="absolute h-1/3 bottom-7 left-0 right-0 pointer-events-none flex justify-center z-50">
            <div className="pointer-events-auto ml-12 w-full sm:w-3/4 lg:w-full h-full mx-auto border-1 border-b-0 border-zinc-500">
              <Terminal isOpen={true} prompt=">" />
            </div>
          </div>
        )}
      </body>
    </html>
  )
}
