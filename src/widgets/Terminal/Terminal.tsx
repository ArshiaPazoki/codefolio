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

const BUILTIN_COMMANDS = ['help', 'clear', 'echo']

const HELP_TEXT = `Available commands:
• help
• clear
• echo [text]`

const Terminal: FC<TerminalProps> = ({
  isOpen,
  prompt = '$',
  initialOutput = ['Welcome to CodeFolio terminal! Type "help"'],
}) => {
  // ————— All hooks up front —————
  const [history, setHistory] = useState<string[]>(initialOutput)
  const [input, setInput] = useState('')
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Blink cursor (you can style this in CSS if you like)
  const [cursorOn, setCursorOn] = useState(true)
  useEffect(() => {
    const iv = setInterval(() => setCursorOn(v => !v), 500)
    return () => clearInterval(iv)
  }, [])

  // Auto-focus whenever we open
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // Always scroll to bottom on new output
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  // ————— early return —————
  if (!isOpen) return null

  // ————— command runner —————
  const runCommand = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    if (cmd === 'help') {
      setHistory(h => [...h, `${prompt} ${cmd}`, HELP_TEXT])
      return
    }

    if (cmd.startsWith('echo ')) {
      setHistory(h => [...h, `${prompt} ${cmd}`, cmd.slice(5)])
      return
    }

    setHistory(h => [...h, `${prompt} ${cmd}`, `Unknown command: ${cmd}`])
  }

  // ————— handle key input —————
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(input)
      setInput('')
      setHistoryIndex(null)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIndex(idx => {
        const next = idx === null ? history.length - 1 : Math.max(0, idx - 1)
        const prevCmd = history[next]?.replace(`${prompt} `, '') ?? ''
        setInput(prevCmd)
        return next
      })
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIndex(idx => {
        if (idx === null) return null
        const next = Math.min(history.length - 1, idx + 1)
        const nextCmd = history[next]?.replace(`${prompt} `, '') ?? ''
        setInput(nextCmd)
        return next
      })
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      // simple Tab completion
      const candidates = BUILTIN_COMMANDS.filter(c => c.startsWith(input))
      if (candidates.length === 1) {
        setInput(candidates[0] + ' ')
      } else if (candidates.length > 1) {
        setHistory(h => [...h, `${prompt} ${input}`, candidates.join('  ')])
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="
        fixed bottom-0 left-0 right-0 h-1/3
        bg-[#1e1e1e]/80 backdrop-blur-md
        text-[#d4d4d4] font-mono text-sm
        p-4 overflow-y-auto
        border-t border-[#333]
        z-50
      "
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}

      <div className="flex items-center mt-2">
        <span className="mr-2 text-[#569CD6]">{prompt}</span>
        <input
          ref={inputRef}
          className="bg-transparent flex-1 focus:outline-none caret-transparent"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span
          className={`ml-1 w-2 h-5 bg-[#d4d4d4] ${
            cursorOn ? 'visible' : 'invisible'
          }`}
        />
      </div>
    </div>
  )
}

export default Terminal
