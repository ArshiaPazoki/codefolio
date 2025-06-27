'use client'

import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { commandRegistry } from './model/commandRegistry'
import { useCommandHistory } from './model/commandHistory'
import { CommandContext } from './types'

interface TerminalProps {
  isOpen: boolean
}

const USER = 'arshia-pazoki'
const HOSTNAME = 'codefolio'
const INITIAL_CWD = '~/app'

/* ------------------------------------------------------------------
 * Prompt component
 * ----------------------------------------------------------------*/
const Prompt: FC<{ cwd: string }> = ({ cwd }) => (
  <span className="mr-2">
    <span className="text-green-400">{USER}@{HOSTNAME}</span>
    <span className="text-gray-300">:</span>
    <span className="text-blue-400">{cwd}</span>
    <span className="text-gray-300">$</span>
  </span>
)

/* ------------------------------------------------------------------
 * Terminal component
 * ----------------------------------------------------------------*/
const Terminal: FC<TerminalProps> = ({ isOpen }) => {
  /* Refs ---------------------------------------------------------- */
  const inputRef      = useRef<HTMLInputElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const lineCounter   = useRef(0)               // stable unique keys
  const startTimeRef  = useRef(Date.now())

  /* State --------------------------------------------------------- */
  const [output,  setOutput]  = useState<ReactNode[]>([
    'Welcome to CodeFolio Terminal!',
    'Type "help" to see available commands.',
    <br key="br‑0" />,
  ])
  const [input,   setInput]   = useState('')
  const [cwd,     setCwd]     = useState(INITIAL_CWD)
  const [pages,   setPages]   = useState<string[]>([])
  const [open,    setOpen]    = useState(true)

  const {
    history: commandHistory,
    add:     addHistory,
    prev:    prevHistory,
    next:    nextHistory,
  } = useCommandHistory()

  /* Fetch page list once ----------------------------------------- */
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/pages')
        const data = await res.json()
        setPages(Array.isArray(data) ? data : [])
      } catch {
        setPages([])
      }
    })()
  }, [])

  /* Auto‑focus when opened --------------------------------------- */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  /* Auto‑scroll on new output ------------------------------------ */
  useEffect(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [output])

  /* -------------------------------------------------------------- */
  /* Helpers                                                        */
  /* -------------------------------------------------------------- */
  const context: CommandContext = {
    pages,
    startTime: startTimeRef.current,
    commandHistory,
    userName: USER,
    exit: () => setOpen(false),
    clearScreen: () => setOutput([]),
    setOutput: setOutput,
    setCwd: setCwd,
  }

  /** Execute a command line (no leading/trailing spaces) */
  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const [name, ...args] = trimmed.split(' ')
    const cmd = commandRegistry[name]

    addHistory(trimmed)
    lineCounter.current += 1
    const keySuffix = lineCounter.current

    /* Unknown command ------------------------------------------- */
    if (!cmd) {
      setOutput(o => [
        ...o,
        <div key={`in-${keySuffix}`}><Prompt cwd={cwd} />{trimmed}</div>,
        <span key={`nf-${keySuffix}`}>bash: {name}: command not found</span>,
      ])
      return
    }

    /* Special‑case: clear should not re‑add its own line -------- */
    if (name === 'clear') {
      cmd.execute(args, context)
      return
    }

    /* Normal command ------------------------------------------- */
    const commandLine = <div key={`in-${keySuffix}`}><Prompt cwd={cwd} />{trimmed}</div>
    const result      = cmd.execute(args, context)
    setOutput(o => [...o, commandLine, result])
  }, [cwd, context, addHistory])

  /* Key handling ------------------------------------------------- */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        runCommand(input)
        setInput('')
        break
      case 'ArrowUp':
        setInput(prevHistory() || '')
        break
      case 'ArrowDown':
        setInput(nextHistory())
        break
      case 'Tab': {
        e.preventDefault()
        const matches = Object.keys(commandRegistry).filter(c => c.startsWith(input))
        if (matches.length === 1) {
          setInput(matches[0] + ' ')
        } else if (matches.length > 1) {
          lineCounter.current += 1
          const k = lineCounter.current
          setOutput(o => [
            ...o,
            <div key={`in-${k}`       }><Prompt cwd={cwd} />{input}</div>,
            <br  key={`br-${k}`       } />,
            <div key={`sugg-${k}`} className="flex flex-wrap gap-2">
              {matches.map(cmd => <span key={cmd}>{cmd}</span>)}
            </div>,
          ])
        }
        break
      }
      default:
        break
    }
  }

  /* Change handler ---------------------------------------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  /* Early return ------------------------------------------------- */
  if (!isOpen || !open) return null

  /* Render ------------------------------------------------------- */
  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#1e1e1e] text-[#cccccc] font-mono text-sm p-4 overflow-y-auto no-scrollbar border-t border-[#333]"
    >
      {output.map((line, i) => (
        <div key={`out-${i}`} className="whitespace-pre-wrap leading-normal">
          {line}
        </div>
      ))}

      <div className="flex items-center">
        <Prompt cwd={cwd} />
        <input
          ref={inputRef}
          className="bg-transparent flex-1 focus:outline-none"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="terminal-input"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}

export default Terminal
