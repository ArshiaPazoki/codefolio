import { JSX, ReactNode } from 'react'

export interface CommandContext {
  pages: string[]
  startTime: number
  commandHistory: string[]

  userName: string
  exit: () => void
  clearScreen: () => void
  setOutput: (lines: ReactNode[]) => void

  setCwd?: (cwd: string) => void          // optional utility
}

export type Command = {
  name: string
  description: string
  usage?: string
  execute: (
    args?: string[],                      // ⬅ now optional
    context?: CommandContext              // ⬅ now optional
  ) => string | JSX.Element
}
