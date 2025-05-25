// src/widgets/ActivityBar/ActivityBar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { IconType } from 'react-icons'
import {
  VscHome,
  VscFiles,
  VscGithubAlt,
  VscCode,
  VscEdit,
  VscMail,
  VscAccount,
  VscSettings,
  VscGitCommit,
  VscGitMerge,
  VscTerminal,
  VscListTree,
} from 'react-icons/vsc'

export interface ActivityBarProps {
  onToggleExplorer: () => void
  onToggleTerminal: () => void
}

// Discriminated union for top bar items
type LinkItem = { Icon: IconType; path: string }
type ActionItem = { Icon: IconType; action: 'toggleExplorer' | 'toggleTerminal' }
type TopItem = LinkItem | ActionItem

const topItems: TopItem[] = [
  { Icon: VscHome, path: '/' },
  { Icon: VscFiles, action: 'toggleExplorer' },
  { Icon: VscGitCommit, path: '/timeline' },
  { Icon: VscGitMerge, path: '/commits' },
  { Icon: VscGithubAlt, path: '/github' },
  // { Icon: VscCode, path: '/projects' },
  { Icon: VscCode, path: '/ide' },
  { Icon: VscEdit, path: '/articles' },
  { Icon: VscMail, path: '/contact' },
  { Icon: VscTerminal, action: 'toggleTerminal' },
  { Icon: VscListTree, path: '/dependency-tree' },
]

const bottomItems: LinkItem[] = [
  { Icon: VscAccount, path: '/about' },
  { Icon: VscSettings, path: '/settings' },
]

const ActivityBar: FC<ActivityBarProps> = ({
  onToggleExplorer,
  onToggleTerminal,
}) => {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col justify-between w-12 bg-[#1e1e1e] select-none h-full">
      {/* Top section */}
      <div className="flex flex-col items-center space-y-2">
        {topItems.map((item) => {
          const isActiveLink = 'path' in item && item.path === pathname
          const baseClasses = isActiveLink
            ? 'border-l-2 border-white text-white'
            : 'text-[#858585] hover:border-l-2 hover:text-white'
          const common = `flex items-center justify-center w-10 h-10 ${baseClasses}`

          if ('action' in item) {
            const onClick =
              item.action === 'toggleExplorer'
                ? onToggleExplorer
                : onToggleTerminal
            return (
              <button key={item.action} onClick={onClick} className={common}>
                <item.Icon size={24} />
              </button>
            )
          }

          return (
            <Link href={item.path} key={item.path}>
              <div className={common}>
                <item.Icon size={24} />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center space-y-2">
        {bottomItems.map(({ Icon, path }) => {
          const active = path === pathname
          const baseClasses = active
            ? 'border-l-2 border-white text-white'
            : 'text-[#858585] hover:border-l-2 hover:text-white'
          return (
            <Link href={path} key={path}>
              <div className={`flex items-center justify-center w-10 h-10 ${baseClasses}`}>
                <Icon size={24} />
              </div>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default ActivityBar
