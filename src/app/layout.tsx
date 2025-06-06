'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import Titlebar from '@/widgets/MenuBar/TitleBar'
import ActivityBar from '@/widgets/ActivityBar/ActivityBar'
import Explorer from '@/widgets/Explorer/Explorer'
import Terminal from '@/widgets/Terminal/Terminal'
import Statusbar from '@/widgets/Statusbar/Statusbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [explorerOpen, setExplorerOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      // Ctrl + `
      if ((e.ctrlKey || e.metaKey) && e.code === 'Backquote') {
        e.preventDefault()
        setTerminalOpen(prev => !prev)
      }
      // Ctrl + Shift + E
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyE') {
        e.preventDefault()
        setExplorerOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeys)
    return () => window.removeEventListener('keydown', handleKeys)
  }, [])

  return (
    <html lang="en">
      <body className="relative flex flex-col h-screen w-screen antialiased bg-[#1e1e1e] text-[#cccccc] overflow-hidden">
        {/* --- Top Bar --- */}
        <Titlebar />

        {/* --- Main Editor Layout --- */}
        <div className="flex flex-1 overflow-hidden">
          {/* Activity Bar */}
          <ActivityBar
            onToggleExplorer={() => setExplorerOpen(o => !o)}
            onToggleTerminal={() => setTerminalOpen(o => !o)}
          />

          {/* Side Explorer */}
          {explorerOpen && <Explorer isOpen={explorerOpen} />}

          {/* Main Area: Editor + Terminal */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Editor Area */}
            <main className={`flex-1 overflow-auto no-scrollbar ${terminalOpen ? 'border-b border-[#333]' : ''}`}>
              {children}
            </main>

            {/* Terminal Panel */}
            {terminalOpen && (
              <div className="h-4/10 bg-[#1e1e1e] border-t border-[#333] overflow-hidden">
                <Terminal isOpen={true} />
              </div>
            )}
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <Statusbar />
      </body>
    </html>
  )
}
