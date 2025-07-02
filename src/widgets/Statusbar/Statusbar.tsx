// src/widgets/Statusbar/Statusbar.tsx
'use client'

import { FC, memo } from 'react'
import { usePathname } from 'next/navigation'
import { MoreHorizontal } from 'lucide-react'
import { version as nextVersion } from 'next/package.json'
import { useCurrentTime } from '@/shared/lib/useCurrentTime'
import { VscRemote, VscSync, VscGitPullRequest  } from 'react-icons/vsc'
import useSWR from 'swr'


// Fetcher for GitHub API (latest commit)
const fetcher = (url: string) => fetch(url).then(res => res.json())

const Statusbar: FC = () => {
  const currentTime = useCurrentTime()
  const pathname = usePathname()
  const { data } = useSWR(
    'https://api.github.com/repos/ArshiaPazoki/codefolio/commits?per_page=1',
    fetcher,
    { refreshInterval: 300_000 }
  )
  const latest = data?.[0]?.commit
  const commitInfo = latest
    ? `${latest.author.name} at ${new Date(latest.author.date).toUTCString()}`
    : ''

  return (
    <footer
      role="contentinfo"
      aria-label="Status Bar"
      className="w-full flex items-center h-6 bg-blue-800 hover:bg-red-800 text-gray-300 text-[12px] font-sans select-none px-2 sm:px-4"
    >
      {/* Left group: icons always visible; labels responsive */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <VscRemote size={14} className=''/>
        <span className="hidden sm:inline">{pathname}</span>
        <div className="flex items-center space-x-1 whitespace-nowrap">
          <VscGitPullRequest size={14} />
          <span className="hidden sm:inline">main*</span>
        </div>
        <div className="hidden sm:flex items-center whitespace-nowrap">
          <VscSync size={14} className="hover:text-gray-200 cursor-pointer" />
        </div>
        <div className="hidden sm:flex items-center whitespace-nowrap">
          <MoreHorizontal size={14} className="hover:text-gray-200 cursor-pointer" />
        </div>
        <span className="truncate hidden md:inline">last commit by {commitInfo}</span>
      </div>

      {/* Center clock - absolute centered */}
      <div className="absolute inset-x-0 flex justify-center pointer-events-none">
        <span className="truncate px-4 bg-[rgba(0,0,0,0.3)] rounded" suppressHydrationWarning>
          {currentTime}
        </span>
      </div>

      {/* Right group: responsive labels */}
      <div className="ml-auto flex items-center sm:space-x-2 flex-shrink-0">
        <span className="inline">Powered by Next.js v{nextVersion}</span>
        <span className="hidden sm:inline">Ln 69, Col 1</span>
        <span className="hidden md:inline">Spaces: 2</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">CRLF</span>
        <span className="hidden md:inline">TypeScript JSX</span>
      </div>
    </footer>
  )
}

export default memo(Statusbar)
