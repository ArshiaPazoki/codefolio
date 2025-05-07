// src/widgets/Terminal/Terminal.tsx
'use client'

import { FC, useState, useEffect, useRef, KeyboardEvent } from 'react'

interface TerminalProps {
  isOpen: boolean
  /** The prompt string to show before each input line */
  prompt?: string
  /** Initial lines to render in the terminal */
  initialOutput?: string[]
}

const BUILTIN_COMMANDS: Record<string, string> = {
  help: 'Available commands: help, clear, echo [text]',
}

const Terminal: FC<TerminalProps> = ({
  isOpen,
  prompt = '$',
  initialOutput = [`Welcome to CodeFolio terminal! Type “help”.`],
}) => {
  if (!isOpen) return null
  const [history, setHistory] = useState<string[]>(initialOutput)
  const [input, setInput] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [historyIdx, setHistoryIdx] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 500)
    return () => clearInterval(id)
  }, [])

  // Always scroll to bottom when history changes
  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
  }, [history])

  const runCommand = (cmd: string) => {
    if (!cmd.trim()) return
    if (cmd === 'clear') {
      setHistory([])
      return
    }
    const out =
      BUILTIN_COMMANDS[cmd] ??
      (cmd.startsWith('echo ')
        ? cmd.slice(5)
        : `Command not found: ${cmd}`)
    setHistory(h => [...h, `${prompt} ${cmd}`, out])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setHistoryIdx(null)
      setInput('')
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIdx(i => {
        const next = i === null ? history.length - 1 : Math.max(0, i - 1)
        setInput(history[next]?.replace(`${prompt} `, '') || '')
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIdx(i => {
        if (i === null) return null
        const next = Math.min(history.length - 1, i + 1)
        setInput(history[next]?.replace(`${prompt} `, '') || '')
        return next
      })
    }
  }

  return (
    <div
      className="bg-[#1e1e1e]/50 backdrop-blur-sm h-full text-[#d4d4d4] font-mono text-sm p-4 overflow-auto rounded-lg border border-[#333]"
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}

      <div className="flex items-center mt-1">
        <span className="mr-2 text-[#569CD6]">{prompt}</span>
        <input
          ref={inputRef}
          className="bg-transparent flex-1 focus:outline-none caret-transparent"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        {/* blinking block cursor */}
        <span
          // className={`w-2 h-5 ml-1 bg-[#d4d4d4] ${cursorVisible ? 'visible' : 'invisible'}`}
        />
      </div>
    </div>
  )
}

export default Terminal