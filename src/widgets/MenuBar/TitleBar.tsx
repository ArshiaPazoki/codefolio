'use client'

import Image from 'next/image'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Minus,
  Square,
  X,
  Search,
  User,
  Columns,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

const menuItems = [
  'File',
  'Edit',
  'Selection',
  'View',
  'Go',
  'Run',
  'Terminal',
  'Help',
]

const handleFullscreen = () => {
  const element = document.documentElement
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const TitleBar: FC = () => {
  const router = useRouter()

  // ⌨️ Keyboard shortcuts (Alt+Left/Right)
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.altKey && e.code === 'ArrowLeft') {
        e.preventDefault()
        router.back()
      }
      if (e.altKey && e.code === 'ArrowRight') {
        e.preventDefault()
        router.forward()
      }
    }
    window.addEventListener('keydown', handleKeys)
    return () => window.removeEventListener('keydown', handleKeys)
  }, [router])

  return (
    <header className="w-full flex items-center justify-between h-8 bg-[#1e1e1e] text-[#cccccc] select-none px-1.5 box-border">
      {/* Left: VSCode icon + menu + nav */}
      <div className="flex items-center gap-2">
        <Image
          src="/logos/vscode_icon.svg"
          alt="VSCode Icon"
          width={16}
          height={16}
          priority
        />

        <nav className="hidden sm:flex gap-3 text-[12px] leading-8 font-sans ml-2">
          {menuItems.map(item => (
            <span key={item} className="hover:text-white cursor-default">
              {item}
            </span>
          ))}
        </nav>

        {/* Back / Forward Navigation */}
        <button
          onClick={() => router.back()}
          title="Back (Alt + ←)"
          className="hover:text-white transition-colors px-1"
        >
          <ArrowLeft size={14} />
        </button>
        <button
          onClick={() => router.forward()}
          title="Forward (Alt + →)"
          className="hover:text-white transition-colors px-1"
        >
          <ArrowRight size={14} />
        </button>
        
      </div>

      {/* Center: Search input */}
      <div className="flex items-center justify-center flex-1 mx-6">
        <div className="relative w-full max-w-2xl rounded border border-transparent hover:border-[#007acc] transition-colors duration-1000">
          <Search
            size={14}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#404040]"
          />
          <input
            type="text"
            placeholder="<Arshia Pazoki/> | CodeFolio"
            className="text-center w-full pl-6 pr-2 py-1 text-[12px] bg-[#252526] text-[#cccccc] rounded outline-none"
          />
        </div>
      </div>

      {/* Right: Profile & window controls */}
      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center justify-center w-8 h-full hover:text-[#404040]">
          <User size={14} />
        </button>
        <button className="hidden sm:flex items-center justify-center w-8 h-full hover:text-[#404040]">
          <Columns size={14} />
        </button>

        <button
          aria-label="Minimize"
          className="flex items-center justify-center w-8 h-full hover:text-[#404040]"
        >
          <Minus size={16} strokeWidth={2} />
        </button>
        <button
          onClick={handleFullscreen}
          aria-label="Maximize"
          className="flex items-center justify-center w-8 h-full hover:text-[#404040]"
        >
          <Square size={16} strokeWidth={2} />
        </button>
        <button
          aria-label="Close"
          className="flex items-center justify-center w-8 h-full hover:text-[#E81123]"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}

export default TitleBar
