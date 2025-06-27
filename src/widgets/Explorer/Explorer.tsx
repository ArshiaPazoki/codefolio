// src/widgets/Explorer/Explorer.tsx
'use client'

import { FC, useState, useMemo, KeyboardEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { VscChevronDown, VscChevronRight, VscSearch } from 'react-icons/vsc'
import { usePathname } from 'next/navigation'
import TechIcon from '@/shared/ui/TechIcon'

interface ExplorerItem {
  name: string
  path: string
  icon?: string
}

const explorerItems: ExplorerItem[] = [
  { name: 'home.tsx',      path: '/home',      icon: 'react'    },
  { name: 'github.md',     path: '/github',    icon: 'markdown' },
  { name: 'projects.js',   path: '/projects',  icon: 'javascript' },
  { name: 'articles.json', path: '/articles',  icon: 'json'     },
  { name: 'contact.css',   path: '/contact',   icon: 'css'      },
  { name: 'about.html',    path: '/about',     icon: 'html'     },
]

interface ExplorerProps {
  /** Toggle visibility of Explorer panel */
  isOpen: boolean
}

const Explorer: FC<ExplorerProps> = ({ isOpen }) => {
  const [open, setOpen] = useState(true)
  const [filter, setFilter] = useState('')
  const pathname = usePathname()

  const filtered = useMemo(
    () => explorerItems.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    ),
    [filter]
  )

  const handleKey = (e: KeyboardEvent<HTMLAnchorElement>, path: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      window.location.href = path
    }
  }

  if (!isOpen) return null

  return (
    <aside className="hidden sm:flex flex flex-col w-1/8 min-w-[200px] bg-neutral-900 text-fg-main border-r border-[#333] overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-[#333]">
        <h2 className="flex-1 text-xs font-semibold uppercase text-gray-200">
          Explorer
        </h2>
        <button
          aria-label="Toggle Explorer"
          className="p-1 hover:bg-[#2a2d2e] rounded focus:outline-none"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center px-3 py-2 border-b border-[#333]">
        <VscSearch className="text-[#858585]" />
        <input
          type="text"
          placeholder="Filter files..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="ml-2 flex-1 bg-transparent text-sm placeholder:text-[#858585] focus:outline-none"
        />
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-2">
        {open && (
          filtered.length > 0 ? (
            filtered.map(item => {
              const active = pathname === item.path
              const baseClasses = active
                ? 'bg-[#094771] text-white'
                : 'hover:bg-[#37373d] text-[#cccccc]'

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  prefetch={false}
                  className={`flex items-center gap-2 px-3 py-1 my-0.5 rounded text-sm truncate focus:outline-none focus:ring-2 focus:ring-blue-500 ${baseClasses}`}
                  onKeyDown={e => handleKey(e, item.path)}
                >
                  {item.icon ? (
                    <TechIcon name={item.icon} size={16} />
                  ) : (
                    <Image src="/icons/file_icon.svg" alt="file" width={16} height={16} />
                  )}
                  <span>{item.name}</span>
                </Link>
              )
            })
          ) : (
            <div className="text-[#858585] text-sm px-2">No matches</div>
          )
        )}
      </div>
    </aside>
  )
}

export default Explorer
