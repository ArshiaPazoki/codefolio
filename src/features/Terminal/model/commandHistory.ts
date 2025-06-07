// features/terminal/model/commandHistory.ts
'use client'

import { useState } from 'react'

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([])
  const [index, setIndex] = useState<number | null>(null)

  const add = (cmd: string) => {
    setHistory(prev => [...prev, cmd])
    setIndex(null)
  }

  const prev = () => {
    if (!history.length) return ''
    const i = index === null ? history.length - 1 : Math.max(0, index - 1)
    setIndex(i)
    return history[i]
  }

  const next = () => {
    if (index === null || index >= history.length - 1) {
      setIndex(null)
      return ''
    }
    const i = index + 1
    setIndex(i)
    return history[i]
  }

  return { history, add, prev, next }
}
