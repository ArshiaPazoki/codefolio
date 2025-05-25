// src/app/about/page.tsx
'use client'

import Image from 'next/image'
import ExtendedTimeline from '@/features/timeline/ui/ExtendedTimeline'
import { skillGroups } from '@/shared/configs/skills'

export default function AboutPage() {
  return (
    <section className="flex flex-col space-y-12 p-8">
      {/* Intro */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-[#1e1e1e] p-8 rounded-lg shadow-lg">
        <Image
          src="/images/AP.jpg"             // <-- swap in your actual image
          alt="Arshia Pazoki"
          width={240}
          height={240}
          className="brightness-75 rounded-2xl border-2 border-[#007acc]"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">
            Arshia Pazoki
          </h1>
          <p className="text-lg text-gray-400 mb-4">
            Computer Engineer , Programmer & Developer Cuurently work as Senior Test Automation Engineer & SDET at Asa.Co
          </p>
          <p className="text-gray-300 max-w-prose leading-relaxed">
            I’m a Computer Engineer turned Senior Test Automation Engineer and SDET with
            a passion for crafting rock-solid, maintainable test frameworks and
            intuitive user experiences. On the side, I build CodeFolio—a VS Code-themed
            portfolio platform showcasing interactive editors, Git-style timelines
            and more.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Expertise & Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillGroups).map(([category, skills]) => (
            <div
              key={category}
              className="bg-[#1e1e1e] p-6 rounded-lg shadow-inner"
            >
              <h3 className="text-xl text-[#9CDCFE] font-medium mb-3">
                {category}
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Career Timeline
        </h2>
        <ExtendedTimeline />
      </div>
    </section>
  )
}
