// src/widgets/Titlebar/Titlebar.tsx
'use client'

import Image from 'next/image'
import { FC } from 'react'
import { Minus, Square, X, Search, User, Columns } from 'lucide-react'

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
  const element = document.documentElement;
  if (!document.fullscreenElement){

    if (element.requestFullscreen){
      element.requestFullscreen();
    }
  }else{
    if (document.exitFullscreen){
      document.exitFullscreen();
    }
  }
  // TODO Also for other browsers like safari
}

const MenuBar: FC = () => (
  <header className="w-full flex items-center justify-between h-8 bg-[#1e1e1e] text-[#cccccc] select-none px-1.5 box-border ">
    {/* Left: VSCode icon + menu */}
    <div className="flex items-center gap-2">
      <Image
        src="/logos/vscode_icon.svg"
        alt="VSCode Icon"
        width={16}
        height={16}
        priority
      />
      <nav className="hidden sm:flex gap-3 text-[12px] leading-8 font-sans">
        {menuItems.map(item => (
          <span key={item} className="hover:text-white cursor-default">
            {item}
          </span>
        ))}
      </nav>
    </div>

    {/* Center: Search input */}
    <div className="flex items-center justify-center flex-1 mx-6">
      <div className="relative w-full max-w-2xl rounded border border-transparent hover:border-[#007acc] transition-colors duration-1000">
        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#404040]" />
        <input
          type="text"
          placeholder="<Arshia Pazoki/> | CodeFolio"
          className="text-center w-full pl-6 pr-2 py-1 text-[12px] bg-[#252526] text-[#cccccc] rounded outline-none"
        />
      </div>
    </div>

    {/* Right: Profile & view controls + window buttons */}
    <div className="flex items-center gap-2">
      {/* Profile */}
      <button className="hidden sm:flex items-center justify-center w-8 h-full hover:text-[#404040]">
        <User size={14} />
      </button>
      {/* Layout toggles */}
      <button className="hidden sm:flex items-center justify-center w-8 h-full hover:text-[#404040]">
        <Columns size={14} />
      </button>

      {/* Window controls (Minimize, Maximize, Close) */}
      <button aria-label="Minimize" className="flex items-center justify-center w-8 h-full hover:text-[#404040]">
        <Minus size={16} strokeWidth={2} />
      </button>
      <button onClick={handleFullscreen} aria-label="Maximize" className="flex items-center justify-center w-8 h-full hover:text-[#404040]">
        <Square size={16} strokeWidth={2} />
      </button>
      <button aria-label="Close" className="flex items-center justify-center w-8 h-full hover:text-[#E81123]">
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  </header>
)

export default MenuBar
