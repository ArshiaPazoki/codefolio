// src/app/(home)/hero/Hero.tsx
'use client'

import { FC, useState } from 'react'
import CodeEditor from '../../../widgets/CodeEditor/CodeEditor'
import { useActiveLine } from '../../../features/home/lib/useActiveLine'
import { codeLines } from '../../../shared/configs/homeConfig'
// Group skills by category
const skillGroups: Record<string, string[]> = {
  'Programming Languages': [
    'C', 'C++','C#','JavaScript', 'ECMAScript', 'TypeScript', 'Python',  'Java',  'Go', 'SQL'
  ],
  'Front-End Frameworks': [
    'React.js', 'Redux.js', 'Svelte', 'Bootstrap', 'Ant Design'
  ],
  'Back-End & APIs': [
    'Next.js', 'Node.js', 'Flask', 'Django', 'REST APIs', 'Elastic Stack'
  ],
  'Testing & Automation': [
    'Selenium', 'Cypress', 'Appium', 'Robot Framework', 'k6 Load Testing'
  ],
  'DevOps & Infrastructure': [
    'Docker', 'Git', 'Linux', 'MySQL', 'HPC'
  ],
  'Data & AI': [
    'Machine Learning', 'Data Science', 'Computer Vision', 'OpenCV'
  ],
  'Principles & Methodologies': [
    'SOLID', 'OOP', 'Agile', 'Algorithms', 'Data Structures'
  ]
}

const IntroPane: FC = () => {
  const categories = Object.keys(skillGroups)
  const [activeCategory, setActiveCategory] = useState<string>(categories[0])

  return (
    <div className="flex flex-col justify-center p-8 h-full">
      <h1 className="text-xl font-bold leading-tight mb-4">
        Hi, I’m 
        <br />
        <span className="text-5xl text-blue-500">&lt;Arshia Pazoki /&gt;</span>
      </h1>
      <p className="text-xl text-gray-400 mb-6">
        Senior Test Automation Engineer &amp; SDET 
        <br />
        building scalable automation frameworks and full-stack applications.
      </p>
      <div className="flex space-x-4 mb-6">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#contact" className="btn-secondary">Contact Me</a>
      </div>

      {/* Vertical tabs + two-column skill grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Category navigation */}
        <nav className="w-40 h flex-shrink-0 flex flex-col space-y-2 pr-4 border-r border-white-100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm text-left px-2 py-1 focus:outline-none hover:text-white
                ${activeCategory === cat
                  ? 'text-white border-l-2 border-blue-500'
                  : 'text-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Skill list */}
        <div className="flex-1 pl-8">
          <ul className="grid grid-cols-2 gap-2 text-gray-200 text-sm list-disc list-inside">
            {skillGroups[activeCategory].map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const Hero: FC = () => {
  const activeLine = useActiveLine(500)
  return (
    <section className="flex h-full overflow-hidden">
      {/* Left: Code Editor */}
      <div className="hidden md:block w-1/2 flex-1 h-full overflow-hidden">
        <CodeEditor
          code={codeLines.map(line => line.code).join('\n')}
          // code={`// const intro = () => {\n  console.log('Hello from Arshia!')\n}`/* or codeLines.join('\n') */}
          language="tsx"
          className="h-full"
          highlightLines={[activeLine]}
        />
      </div>

      {/* Right: Intro + Skills */}
      <div className="w-full md:w-1/2 h-full bg-bg-main text-fg-main overflow-hidden">
        <IntroPane />
      </div>
    </section>
  )
}

export default Hero
