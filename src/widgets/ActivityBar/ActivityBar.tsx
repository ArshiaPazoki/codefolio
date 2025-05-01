// src/widgets/ActivityBar/ActivityBar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import {
  VscFiles,
  VscGithubAlt,
  VscCode,
  VscEdit,
  VscMail,
  VscAccount,
  VscSettings,
} from 'react-icons/vsc'

export interface ActivityBarProps {
  /** Toggle the Explorer pane on/off */
  onToggleExplorer: () => void
}

const topItems = [
  { Icon: VscFiles,       path: '/' },
  { Icon: VscGithubAlt,   path: '/github' },
  { Icon: VscCode,        path: '/projects' },
  { Icon: VscEdit,        path: '/articles' },
  { Icon: VscMail,        path: '/contact' },
]

const bottomItems = [
  { Icon: VscAccount,     path: '/about' },
  { Icon: VscSettings,    path: '/settings' },
]

const ActivityBar: FC<ActivityBarProps> = ({ onToggleExplorer }) => {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col justify-between w-12 bg-[#1e1e1e] select-none h-full">
      {/* Top section */}
      <div className="flex flex-col items-center space-y-2">
        {topItems.map(({ Icon, path }) => {
          const active = pathname === path
          const baseClasses = active
            ? 'bg-[#3f3f46] text-white'
            : 'text-[#858585] hover:bg-[#37373d]'
          const common = `flex items-center justify-center w-10 h-10 rounded ${baseClasses}`

          // The VSCode Files icon toggles the Explorer pane
          if (path === '/') {
            return (
              <button
                key={path}
                onClick={onToggleExplorer}
                className={common}
              >
                <Icon size={24} />
              </button>
            )
          }

          return (
            <Link href={path} key={path}>
              <div className={common}>
                <Icon size={24} />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center space-y-2">
        {bottomItems.map(({ Icon, path }) => {
          const active = pathname === path
          const baseClasses = active
            ? 'bg-[#3f3f46] text-white'
            : 'text-[#858585] hover:bg-[#37373d]'
          return (
            <Link href={path} key={path}>
              <div className={`flex items-center justify-center w-10 h-10 rounded ${baseClasses}`}>
                <Icon size={20} />
              </div>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default ActivityBar
