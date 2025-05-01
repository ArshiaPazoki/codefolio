// src/features/home/model/useDeveloperInfo.ts
'use client'

import { useEffect } from 'react'

/**
 * Developer information for the Home page.
 */
export interface DeveloperInfo {
  name: string
  role: string
  bio: string
}

/**
 * Custom hook to provide developer info and set the document title.
 * @returns The developer's name, role, and bio.
 */
export function useDeveloperInfo(): DeveloperInfo {
  const developerInfo: DeveloperInfo = {
    name: 'Arshia Pazoki',
    role: 'Senior Test Automation Engineer & SDET',
    bio: 'Building modern web experiences',
  }

  useEffect(() => {
    document.title = `${developerInfo.name} | Portfolio`
  }, [developerInfo.name])

  return developerInfo
}
