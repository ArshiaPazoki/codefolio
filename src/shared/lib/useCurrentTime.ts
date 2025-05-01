// src/shared/lib/useCurrentTime.ts
'use client'

import { useState, useEffect } from 'react'

/**
 * Returns the current time as a formatted string (HH:MM:SS),
 * updating once a second.
 */
export function useCurrentTime(): string {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return now.toLocaleTimeString()
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return time
}
