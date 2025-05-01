// src/features/home/lib/useActiveLine.ts
'use client'

import { useState, useEffect } from 'react'
import { codeLines } from '@/shared/configs/homeConfig'

/**
 * Custom hook to cycle through code lines at a given interval.
 * @param intervalMs - time in ms between line highlights (default 2000ms)
 * @returns the index of the currently active line
 */
export function useActiveLine(intervalMs: number = 2000): number {
  const [activeLineIndex, setActiveLineIndex] = useState(0)
  const total = codeLines.length

  useEffect(() => {
    const id = setInterval(() => {
      setActiveLineIndex(prev => (prev + 1) % total)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, total])

  return activeLineIndex
}