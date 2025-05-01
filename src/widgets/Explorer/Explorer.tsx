// src/widgets/Explorer/Explorer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FC } from 'react'
import { VscChevronRight } from 'react-icons/vsc'

interface ExplorerItem {
  name: string
  path: string
  icon: string
}

const explorerItems: ExplorerItem[] = [
  { name: 'home.tsx',     path: '/',         icon: '/icons/react_icon.svg'    },
  { name: 'about.html',   path: '/about',    icon: '/icons/html_icon.svg'     },
  { name: 'contact.css',  path: '/contact',  icon: '/icons/css_icon.svg'      },
  { name: 'projects.js',  path: '/projects', icon: '/icons/js_icon.svg'       },
  { name: 'articles.json',path: '/articles', icon: '/icons/json_icon.svg'     },
  { name: 'github.md',    path: '/github',   icon: '/icons/markdown_icon.svg' },
]

interface ExplorerProps {
  isOpen: boolean
}

const Explorer: FC<ExplorerProps> = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <aside className="w-1/8 min-w-[200px] bg-[#1e1e1e] text-[#cccccc] overflow-auto">
      <div className="px-3 py-4">
        <h2 className="text-xs font-semibold uppercase text-gray-400 mb-2">
          Explorer
        </h2>

        <div className="flex items-center mb-2 cursor-pointer" onClick={() => {}}>
          <VscChevronRight className="text-gray-400 rotate-90" />
          <span className="ml-1 text-sm">Portfolio</span>
        </div>

        <div className="ml-4">
          {explorerItems.map(item => (
            <Link href={item.path} key={item.name}>
              <div className="flex items-center gap-2 px-1 py-1 rounded hover:bg-[#37373d]">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={16}
                  height={16}
                  className="flex-shrink-0"
                />
                <span className="text-sm truncate">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Explorer
