// src/features/timeline/ui/ExtendedTimeline.tsx
'use client'

import React, { FC, useMemo } from 'react'
import { timelineEvents } from '@/shared/configs/timelineData'
import { skillsByEvent } from '@/shared/configs/skills'

/**
 * VSCode-themed career timeline displaying only relevant skills per event.
 * Uses case-insensitive mapping to ensure proper lookup.
 */
const ExtendedTimeline: FC = () => {
  // Build a lowercase-keyed map for case-insensitive title matching
  const normalizedSkillsMap = useMemo(() => {
    // force Object.entries to know that each value is string[]
    const entries = Object.entries(skillsByEvent) as [string, string[]][]
    return entries.reduce<Record<string, string[]>>((acc, [title, skills]) => {
      const key = title.trim().toLowerCase().replace('@', '')
      acc[key] = skills
      return acc
    }, {} as Record<string, string[]>)
  }, [])

  return (
    <section className="bg-[#1e1e1e] text-[#d4d4d4] p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Professional Experiences</h2>
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-8 md:left-8 border-r-2 border-[#007acc] h-full" />
        <div className="space-y-12">
          {timelineEvents.map((ev, idx) => {
            const key = ev.title.trim().toLowerCase()
            const eventSkills = normalizedSkillsMap[key] || []
            return (
              <div key={ev.title} className="flex items-start relative">
                <div className="flex flex-col items-center">
                  {/* Node */}
                    <div className="w-4 h-4 bg-[#007acc] rounded mt-1 z-10" />
                  {/* Connector */}
                  {idx < timelineEvents.length - 1 && (
                    <div className="w-px flex-1 bg-[#007acc]" />
                  )}
                </div>
                <div className="ml-8">
                  <time className="block text-sm text-[#808080] mb-1">{ev.date}</time>
                  <h3 className="text-xl font-semibold text-[#ffffff] mb-2">{ev.title}</h3>
                  {ev.description && (
                    <p className="mb-4 text-[#c0c0c0]">{ev.description}</p>
                  )}

                  {/* Display only relevant skills for this event */}
                  {eventSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {eventSkills.map(skill => (
                        <span
                          key={skill}
                          className="text-xs bg-[#252526] text-[#d4d4d4] px-2 py-1 rounded border border-[#3c3c3c]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#565656] italic">No specific skills listed.</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExtendedTimeline
