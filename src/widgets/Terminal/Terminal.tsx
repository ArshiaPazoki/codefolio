'use client'

import {
  FC,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ReactNode,
  ChangeEvent,
} from 'react'
import { useRouter } from 'next/navigation'

interface TerminalProps {
  isOpen: boolean
}

// --- Constants ---
const USER = 'arshia-pazoki'
const HOSTNAME = 'codefolio'
const CWD = '~/app'

const BUILTIN_COMMANDS = [
  'help',
  'clear',
  'echo',
  'date',
  'whoami',
  'ls',
  'pwd',
  'pages',
  'goto',
  'cat',
]

const HELP_TEXT = `CodeFolio Terminal - v1.0.0

These shell commands are defined internally:

  help                Show this message
  clear               Clear the terminal screen
  date                Display the current date and time
  echo [text]         Display a line of text
  whoami              Print the current user
  ls                  List "files" (your pages)
  pwd                 Print the working directory
  pages               Alias for 'ls'
  goto <route>        Navigate to a page route
  cat <route>         Show demo content of a route
`

const WELCOME_MESSAGES: ReactNode[] = [
  'Welcome to CodeFolio Terminal!',
  'Type "help" to see available commands.',
  <br key="break" />,
]

// --- Helper Component ---
const Prompt: FC = () => (
  <span className="mr-2">
    <span className="text-green-400">{USER}@{HOSTNAME}</span>
    <span className="text-gray-300">:</span>
    <span className="text-blue-400">{CWD}</span>
    <span className="text-gray-300">$</span>
  </span>
)

// --- Main Terminal Component ---
const Terminal: FC<TerminalProps> = ({ isOpen }) => {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [history, setHistory] = useState<ReactNode[]>(WELCOME_MESSAGES)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [cursorVisible, setCursorVisible] = useState(false)
  const [pages, setPages] = useState<string[]>([])

  // --- Effects ---
  useEffect(() => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(data => setPages(Array.isArray(data) ? data : []))
      .catch(() => setPages([]))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(c => !c), 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
  }, [history])

  // --- Command Logic ---
  const runCommand = (raw: string) => {
    const command = raw.trim()
    if (!command) {
      setHistory(h => [...h, <div key={Date.now()}><Prompt /></div>])
      return
    }

    const [cmd, ...argsArr] = command.split(' ')
    const args = argsArr.join(' ')
    const commandLine = <div key={Date.now()}><Prompt />{command}</div>

    let output: ReactNode

    switch (cmd) {
      case 'help':
        output = <pre className="whitespace-pre-wrap">{HELP_TEXT}</pre>
        break
      case 'clear':
        setHistory([])
        return
      case 'echo':
        output = <span>{args}</span>
        break
      case 'date':
        output = <span>{new Date().toString()}</span>
        break
      case 'whoami':
        output = <span>{USER}</span>
        break
      case 'ls':
      case 'pages':
        output = pages.length > 0
          ? (
            <div className="flex flex-wrap gap-2">
              {pages.map(page => (
                <span key={page} className="text-blue-400">{page}</span>
              ))}
            </div>
          )
          : <span>(no pages found)</span>
        break
      case 'pwd':
        output = <span>{CWD.replace('~', `/home/${USER}`)}</span>
        break
      case 'goto':
        if (pages.includes(args)) {
          output = <span>Navigating to /{args}...</span>
          router.push(`/${args === 'home' ? '' : args}`)
        } else {
          output = <span>bash: goto: no such page: {args}</span>
        }
        break
      case 'cat':
        if (pages.includes(args)) {
          output = (
            <div>
              <div>*** Contents of /{args} ***</div>
              <div>(Simulated content preview)</div>
            </div>
          )
        } else {
          output = <span>cat: {args}: No such file or directory</span>
        }
        break
      default:
        output = <span>bash: command not found: {cmd}</span>
    }

    setHistory(h => [...h, commandLine, output])
    setCommandHistory(h => [...h, command])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        runCommand(input)
        setInput('')
        setCommandHistoryIndex(null)
        break
      case 'ArrowUp':
        e.preventDefault()
        if (commandHistory.length === 0) return
        const upIndex = commandHistoryIndex === null
          ? commandHistory.length - 1
          : Math.max(0, commandHistoryIndex - 1)
        setCommandHistoryIndex(upIndex)
        setInput(commandHistory[upIndex])
        break
      case 'ArrowDown':
        e.preventDefault()
        if (commandHistoryIndex === null || commandHistoryIndex >= commandHistory.length - 1) {
          setCommandHistoryIndex(null)
          setInput('')
        } else {
          const downIndex = commandHistoryIndex + 1
          setCommandHistoryIndex(downIndex)
          setInput(commandHistory[downIndex])
        }
        break
      case 'Tab':
        e.preventDefault()
        const matches = BUILTIN_COMMANDS.filter(c => c.startsWith(input))
        if (matches.length === 1) {
          setInput(matches[0] + ' ')
        } else if (matches.length > 1) {
          setHistory(h => [
            ...h,
            <div key={`cmd-${Date.now()}`}><Prompt />{input}</div>,
            <div key={`sugg-${Date.now()}`} className="flex flex-wrap gap-2">
              {matches.map(cmd => <span key={cmd}>{cmd}</span>)}
            </div>,
          ])
        }
        break
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  // --- Render ---
  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#1e1e1e] text-[#cccccc] font-mono text-sm p-4 overflow-y-auto no-scrollbar border-t border-[#333] z-50"
    >
      {history.map((line, i) => (
        <div key={`line-${i}`} className="whitespace-pre-wrap leading-normal">
          {line}
        </div>
      ))}

      <div className="flex items-center">
        <Prompt />
        <div className="relative flex-1">
          <input
            ref={inputRef}
            className="bg-transparent w-full caret-transparent focus:outline-none"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            aria-label="terminal-input"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <span
            className={`absolute left-0 top-0 transition-opacity duration-100 ${
              cursorVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: `translateX(${input.length}ch)` }}
          >
            <span className="w-2 h-[1.2em] bg-[#cccccc] inline-block -mb-1" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Terminal
