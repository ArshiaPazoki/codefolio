// src/widgets/Terminal/Terminal.tsx
'use client'

import {
  FC,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from 'react'
import { useRouter } from 'next/navigation'

interface TerminalProps {
  isOpen: boolean
  prompt?: string
  initialOutput?: string[]
}

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

const HELP_TEXT = `
Available commands:
• help          Show this message
• clear         Clear the screen
• echo [text]   Print text
• date          Show current date/time
• whoami        Who am I?
• ls            List “files” (your pages)
• pwd           Show “present working directory”
• pages         List your available routes
• goto <route>  Navigate to a page
• cat <route>   Show dummy contents of page
`

const Terminal: FC<TerminalProps> = ({
  isOpen,
  prompt = '$',
  initialOutput = [
    'Welcome to CodeFolio terminal! Type “help”',
  ],
}) => {
  const router = useRouter()
  // ——— hooks up front ———
  const [history, setHistory] = useState<string[]>(initialOutput)
  const [input, setInput] = useState('')
  const [, setHistIdx] = useState<number | null>(null)
  const [cursorOn, setCursorOn] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [pages, setPages] = useState<string[]>([])
  
  //Pages
  useEffect(() => {
    fetch('/api/pages')
      .then((r) => r.json())
      .then((list) => setPages(Array.isArray(list) ? list : []))
      .catch(() => setPages([]))
  }, [])

  // blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 500)
    return () => clearInterval(id)
  }, [])

  // auto-focus
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight
    }
  }, [history])

  if (!isOpen) return null

  const runCommand = async (raw: string) => {
    const [cmd, ...rest] = raw.trim().split(' ')
    const arg = rest.join(' ')
    switch (cmd) {
      case 'help':
        setHistory(h => [...h, `${prompt} ${raw}`, HELP_TEXT])
        break
      case 'clear':
        setHistory([])
        break
      case 'echo':
        setHistory(h => [...h, `${prompt} ${raw}`, arg])
        break
      case 'date':
        setHistory(h => [
          ...h,
          `${prompt} ${raw}`,
          new Date().toString(),
        ])
        break
      case 'whoami':
        setHistory(h => [
          ...h,
          `${prompt} ${raw}`,
          'arshia-pazoki',
        ])
        break
      case 'ls':
      case 'pages':
        setHistory(h => [
          ...h,
          `${prompt} pages`,
          pages.length > 0
         ? pages.join('  ')
         : '(no pages found or still loading…)',
        ])
        break
      case 'pwd':
        setHistory(h => [
          ...h,
          `${prompt} ${raw}`,
          '/app',
        ])
        break
      case 'goto':
        if (pages.includes(arg)) {
          setHistory(h => [
            ...h,
            `${prompt} ${raw}`,
            `Navigating to ${arg}`,
          ])
          router.push(`${arg === 'home' ? '' : arg}`)
        } else {
          setHistory(h => [
            ...h,
            `${prompt} ${raw}`,
            `Unknown page: ${arg}`,
          ])
        }
        break
      case 'cat':
        if (PAGES.includes(arg)) {
          setHistory(h => [
            ...h,
            `${prompt} ${raw}`,
            `*** Contents of /${arg} ***`,
            `(This is just a demo!)`,
          ])
        } else {
          setHistory(h => [
            ...h,
            `${prompt} ${raw}`,
            `No such file or page: ${arg}`,
          ])
        }
        break
      default:
        setHistory(h => [
          ...h,
          `${prompt} ${raw}`,
          `Command not found: ${cmd}`,
        ])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(input)
      setInput('')
      setHistIdx(null)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(idx => {
        const next =
          idx === null
            ? history.length - 1
            : Math.max(0, idx - 1)
        setInput(
          history[next]?.replace(`${prompt} `, '') || ''
        )
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(idx => {
        if (idx === null) return null
        const next = Math.min(history.length - 1, idx + 1)
        setInput(
          history[next]?.replace(`${prompt} `, '') || ''
        )
        return next
      })
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const cands = BUILTIN_COMMANDS.filter(c =>
        c.startsWith(input)
      )
      if (cands.length === 1) {
        setInput(cands[0] + ' ')
      } else if (cands.length > 1) {
        setHistory(h => [
          ...h,
          `${prompt} ${input}`,
          cands.join('  '),
        ])
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="
      h-full
        bg-[#1e1e1e]/50 backdrop-blur-xs
        text-[#d4d4d4] font-mono text-sm
        p-4 overflow-auto no-scrollbar border-t border-[#333] z-50
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
