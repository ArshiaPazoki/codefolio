// src/widgets/Statusbar/Statusbar.tsx
'use client'

import { FC } from 'react'
import { Code, GitBranch, RefreshCw, MoreHorizontal,  } from 'lucide-react'
import { version as nextVersion } from 'next/package.json'
import { useCurrentTime } from '@/shared/lib/useCurrentTime'

const Statusbar: FC = () => {
    const currentTime = useCurrentTime()
    return (
  <footer className="flex items-center justify-between h-6 bg-[#007acc] text-white text-[11px] font-sans select-none">
    {/* Left side: branch, sync, more */}
    <div className="flex items-center space-x-2 px-2">
      <Code size={12} />
      <span className="truncate">main*</span>
      <GitBranch size={12} />
      <RefreshCw size={12} className="hover:text-gray-200 cursor-pointer" />
      <MoreHorizontal size={12} className="hover:text-gray-200 cursor-pointer" />
    </div>

    {/* Center: filler to allow right alignment */}
    <div className="flex-1">{currentTime}</div>
    {/* Right side: cursor position, spaces, encoding, eol, language */}
    <div className="flex items-center space-x-4 px-2">
      <span>Powered by Next.js v{nextVersion}</span>
      <span>Ln 69, Col 1</span>
      <span>Spaces: 2</span>
      <span>UTF-8</span>
      <span>LF</span>
      <span>TypeScript</span>
    </div>
  </footer>
)
}
export default Statusbar
