// src/app/(home)/hero/Hero.tsx
'use client'

// import { FC, useState, useMemo, useEffect, useCallback } from 'react'
import { FC, useState, useMemo} from 'react'
import { skillGroups } from '../../../shared/configs/skills'
import { useTypewriterLoop } from '../../../shared/hooks/useTypewriter'
import { useBlink } from '../../../shared/hooks/useBlink'
import { FiChevronRight, FiSearch, FiExternalLink } from 'react-icons/fi'
import clsx from 'clsx'
import Link from 'next/link'
import IDE from '@/widgets/IDE/IDE'

const IntroPane: FC = () => {
  const categories = Object.keys(skillGroups)
  const [activeCategory, setActiveCategory] = useState<string>(categories[0])

  const [search, setSearch] = useState('')

  // keyboard nav: ← / →
  // const onKey = useCallback(
  //   (e: KeyboardEvent) => {
  //     const idx = categories.indexOf(activeCategory)
  //     if ((e.key === 'ArrowRight' || e.key ==='ArrowDown') && idx < categories.length - 1) {
  //       setActiveCategory(categories[idx + 1])
  //     }
  //     if ((e.key === 'ArrowLeft' || e.key ==='ArrowUp') && idx > 0) {
  //       setActiveCategory(categories[idx - 1])
  //     }
  //     if (e.key === 'Enter' && idx > 0) {
  //       setActiveCategory(categories[idx])
  //     }
  //   },
  //   [activeCategory]
  // )
  // useEffect(() => {
  //   window.addEventListener('keydown', onKey)
  //   return () => window.removeEventListener('keydown', onKey)
  // }, [onKey])

  // filtered skills
  const filteredSkills = useMemo(() => {
    return skillGroups[activeCategory].filter((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    )
  }, [activeCategory, search])

  const rotatingTitles = useTypewriterLoop({
    texts: [
      'Senior Test Automation Engineer',
      'Software Development Engineer in Test (S.D.E.T)'
    ],
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseBeforeDelete: 250,
    pauseBeforeType: 100,
  })
  const cursorOn  = useBlink(500)

  return (
    <div className="flex flex-col justify-center p-4 h-full">
      <h1 className="text-xl font-bold mb-4 align-middle whitespace-pre-line">
        <p className="mb-4">Hello World! I’m</p>
        <p className="text-4xl sm:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-purple-800 to-red-800 hover:from-red-800 hover:to-yellow-300 transition-all animate-pulse">
          &lt;Arshia Pazoki /&gt;
        </p>
      </h1>
      <p className="text-xl text-gray-400 mb-6">
        {rotatingTitles}
        <span className={cursorOn ? '' : 'invisible'}> _ </span>
        <Link href="https://asax.ir/" className='hover:text-red-800'>@ Asa.Co</Link>
      </p>

      <div className="flex justify-aroundddddd space-x-4 mb-6">
        <a
          download
          href="/files/cv.pdf"
          className="btn-primary flex items-center justify-center space-x-1 rounded-lg p-2 ring-2 ring-blue-800 w-36 hover:scale-105"
        >
          <FiExternalLink size={16} /> <span>Download CV</span>
        </a>
        <Link
          href="/contact"
          className="btn-secondary flex items-center justify-center space-x-1 rounded-lg p-2 ring-2 ring-red-800 w-36 hover:scale-105"
        >
          <FiExternalLink size={16} /> <span>Let&apos;s Talk</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col sm:flex-row overflow-y-auto bg-neutral-900 rounded-lg shadow-2xl/100 ring-0 ring-neutral-950">
        {/* Category navigation */}
        <nav className="hidden sm:flex flex-col w-1/2 border-r border-gray-700 p-4 space-y-2 top-0">
        <p className='hidden sticky z-10 font-semibold sm:flex p-2 mb-2 border-b-2 rounded-none border-blue-800'>&gt;_ Expertise &amp; Tools</p>
        <div className="overflow-y-auto no-scrollbar h-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'text-sm text-left px-2 py-2 rounded-lg focus:outline-none flex items-center justify-between',
                activeCategory === cat
                  ? 'border-l-2 border-blue-800 rounded-none text-white'
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
          <p className='p-2 mb-2 text-center border-1 rounded-lg border-blue-800'>Expertise & Tools</p>
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
              className="pl-10 pr-4 w-full bg-[#252526] text-white placeholder-gray-500 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-800"
            />
          </div>

          {/* Skills List */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredSkills.map((skill) => (
                <li
                  key={skill}
                  className="text-sm px-2 py-2 border-2 border-[#2d2d2d] rounded-lg hover:border-blue-800 transition"
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

const Home: FC = () => {
  return (
    <section className="max-h-dvh w-full flex flex-col sm:flex-row sm:overflow-hidden sm:no-scrollbar">
      {/* Code editor only on sm+ */}
      <div className="pt-4 m-0 rounded-none sm:w-1/2 bg-neutral-900 sm:order-0 order-1">
        <IDE/>
      </div>

      {/* Always show intro pane; on sm+ it takes half the width */}
      <div className="w-full sm:w-1/2 bg-neutral-900 text-fg-main">
        <IntroPane />
      </div>
    </section>
  )
}

export default Home
