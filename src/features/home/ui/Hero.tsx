// src/app/(home)/hero/Hero.tsx
'use client'
import { FC } from 'react'
import CodeEditor from '@/widgets/CodeEditor/CodeEditor'
import { useActiveLine } from '@/features/home/lib/useActiveLine'

const IntroPane: FC = () => (
  <div className="flex flex-col justify-center p-8 space-y-4">
    <h1 className="text-5xl font-bold">Hi, I’m <br/>&#60; Arshia Pazoki &#47;&#62;</h1>
    <p className="text-xl text-gray-300">
      Senior Test Automation Engineer & SDET building modern web experiences.
    </p>
    <div className="flex space-x-4">
      <a href="#projects" className="btn-primary">View Projects</a>
      <a href="#contact" className="btn-secondary">Contact Me</a>
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      {['Next.js','TypeScript','Playwright','Cypress','React'].map(skill => (
        <span key={skill} className="px-2 py-1 bg-[#094771] rounded text-sm">
          {skill}
        </span>
      ))}
    </div>
  </div>
)

const Hero: FC = () => {
  const activeLine = useActiveLine(1500)
  return (
    <section className="h-screen flex overflow-hidden">
      <div className="w-1/2 bg-[#1e1e1e]">
        <CodeEditor
          code={`// const intro = () => {\n  console.log('Hello from Arshia!')\n}`/* or codeLines.join('\n') */}
          language="tsx"
          className="h-full"
          highlightLines={[activeLine]}
        />
      </div>
      <div className="w-1/2 bg-bg-main text-fg-main">
        <IntroPane />
      </div>
    </section>
  )
}

export default Hero
