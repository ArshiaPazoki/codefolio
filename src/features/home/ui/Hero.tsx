// src/app/(home)/hero/Hero.tsx
'use client'

import { FC, useState, useMemo, useEffect, useCallback } from 'react'
import CodeEditor from '../../../widgets/CodeEditor/CodeEditor'
import { useActiveLine } from '../../../features/home/lib/useActiveLine'
import { codeLines } from '../../../shared/configs/homeConfig'
import { skillGroups } from '@/shared/configs/skills'
import { FiChevronRight, FiSearch, FiExternalLink } from 'react-icons/fi'
import clsx from 'clsx'
import Link from 'next/link'
const IntroPane: FC = () => {
  const categories = Object.keys(skillGroups)
  const [activeCategory, setActiveCategory] = useState<string>(categories[0])

  const [search, setSearch] = useState('')

  // keyboard nav: ← / →
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const idx = categories.indexOf(activeCategory)
      if ((e.key === 'ArrowRight' || e.key ==='ArrowDown') && idx < categories.length - 1) {
        setActiveCategory(categories[idx + 1])
      }
      if ((e.key === 'ArrowLeft' || e.key ==='ArrowUp') && idx > 0) {
        setActiveCategory(categories[idx - 1])
      }
      if (e.key === 'Enter' && idx > 0) {
        setActiveCategory(categories[idx])
      }
    },
    [activeCategory]
  )
  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  // filtered skills
  const filteredSkills = useMemo(() => {
    return skillGroups[activeCategory].filter((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    )
  }, [activeCategory, search])

  return (
    <div className="flex flex-col justify-center p-4 h-full">
      <h1 className="text-xl font-bold mb-4">
        Hi, I’m
        <br />
        <span className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 transition-all animate-pulse">
          &lt;Arshia Pazoki /&gt;
        </span>
      </h1>
      <p className="text-xl text-gray-400 mb-6">
        Senior Test Automation Engineer & SDET @ <Link href="https://asax.ir/" className='hover:text-red-600'>Asa.Co</Link>
      </p>

      <div className="flex space-x-4 mb-6">
        <a
          href="#projects"
          className="btn-primary flex items-center space-x-1"
        >
          <FiExternalLink size={16} /> <span>View Projects</span>
        </a>
        <a
          href="#contact"
          className="btn-secondary flex items-center space-x-1"
        >
          <FiExternalLink size={16} /> <span>Contact Me</span>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col sm:flex-row overflow-auto bg-[#1e1e1e] rounded-lg shadow-lg">
        {/* Category navigation */}
        <nav className="hidden sm:flex flex-col w-1/2 border-r border-gray-700 p-4 space-y-2 top-0">
        <p className='hidden sticky z-10 font-semibold sm:flex p-2 mb-2 border-b-2 rounded-none border-blue-600'>Expertise &amp; Tools</p>
        <div className="overflow-y-auto no-scrollbar h-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'text-sm text-left px-2 py-2 rounded-lg focus:outline-none flex items-center justify-between',
                activeCategory === cat
                  ? 'border-l-2 border-blue-600 rounded-none text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              )}
              aria-current={activeCategory === cat ? 'true' : undefined}
            >
              {cat}
              {activeCategory === cat && <FiChevronRight size={16} />}
            </button>
          ))}
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className="sm:hidden p-4 border-b border-gray-700">
          <p className='p-2 mb-2 text-center border-1 rounded-lg border-blue-600'>Expertise & Tools</p>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full bg-[#252526] text-white p-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Skill panel */}
        <div className="flex-1 flex flex-col p-4">
          {/* Search */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search skills…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 w-full bg-[#252526] text-white placeholder-gray-500 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-600"
            />
          </div>

          {/* Skills List */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredSkills.map((skill) => (
                <li
                  key={skill}
                  className="text-sm px-2 py-2 border-2 border-[#2d2d2d] rounded-lg hover:border-blue-600 transition"
                >
                  {skill}
                </li>
              ))}

              {filteredSkills.length === 0 && (
                <li className="col-span-full text-center text-gray-500">
                  No skills found.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const Hero: FC = () => {
  const activeLine = useActiveLine(500)
  return (
    <section className="max-h-screen w-full flex flex-col sm:flex-row sm:overflow-hidden sm:no-scrollbar">
      {/* Code editor only on sm+ */}
      <div className="m-4 sm:m-0 rounded-lg sm:rounded-none sm:w-1/2 bg-[#1e1e1e] sm:order-0 order-1">
        <CodeEditor
          code={codeLines.map(line => line.code).join('\n')}
          language="tsx"
          className="w-full h-full"
          highlightLines={[activeLine]}
        />
      </div>

      {/* Always show intro pane; on sm+ it takes half the width */}
      <div className="w-full sm:w-1/2 bg-bg-main text-fg-main">
        <IntroPane />
      </div>
    </section>
  )
}

export default Hero
