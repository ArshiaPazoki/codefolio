// src/app/(home)/hero/Hero.tsx
'use client'

import { FC, useState, useMemo, useEffect, useCallback } from 'react'
import CodeEditor from '../../../widgets/CodeEditor/CodeEditor'
import { useActiveLine } from '../../../features/home/lib/useActiveLine'
import { codeLines } from '../../../shared/configs/homeConfig'
import { skillGroups } from '@/shared/configs/skills'
import { FiChevronRight, FiSearch, FiExternalLink } from 'react-icons/fi'
import clsx from 'clsx'

const IntroPane: FC = () => {
  const categories = Object.keys(skillGroups)
  const [activeCategory, setActiveCategory] = useState<string>(categories[0])

  const [search, setSearch] = useState('')

  // keyboard nav: ← / →
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const idx = categories.indexOf(activeCategory)
      if (e.key === 'ArrowRight' && idx < categories.length - 1) {
        setActiveCategory(categories[idx + 1])
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        setActiveCategory(categories[idx - 1])
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
        <span className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 transition-all animate-text">
          &lt;Arshia Pazoki /&gt;
        </span>
      </h1>

      <p className="text-xl text-gray-400 mb-6">
        Senior Test Automation Engineer & SDET
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
      <div className="flex flex-1 overflow-hidden bg-[#1e1e1e] rounded-lg shadow-lg">
        {/* Category navigation */}
        <nav className="hidden sm:flex flex-col w-1/2 border-r border-gray-700 p-4 space-y-2 sticky top-0 overflow-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'text-sm text-left px-2 py-2 rounded-lg focus:outline-none flex items-center justify-between',
                activeCategory === cat
                  ? 'border-2 border-[#007acc] text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              )}
              aria-current={activeCategory === cat ? 'true' : undefined}
            >
              {cat}
              {activeCategory === cat && <FiChevronRight size={16} />}
            </button>
          ))}
        </nav>

        {/* Mobile dropdown */}
        <div className="sm:hidden p-4 border-b border-gray-700">
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
              className="pl-10 pr-4 w-full bg-[#252526] text-white placeholder-gray-500 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Skills List */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredSkills.map((skill) => (
                <li
                  key={skill}
                  className="px-2 py-2 bg-[#2d2d2d] rounded-lg hover:bg-[#3a3a3a] transition"
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
    <section className="max-h-screen w-full flex flex-col sm:flex-row overflow-hidden no-scrollbar">
      {/* Code editor only on sm+ */}
      <div className="hidden sm:flex sm:w-1/2 bg-[#1e1e1e]">
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
