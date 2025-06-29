'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()

  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length))
  const [progress, setProgress] = useState(0)

  // Auto-increase progress bar to ~99%
  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 4
      if (current >= 99) {
        current = 99
        clearInterval(interval)
      }
      setProgress(Math.min(current, 99))
    }, 120)
    return () => clearInterval(interval)
  }, [])

  const quote = useMemo(() => QUOTES[quoteIndex], [quoteIndex])

  const cycleQuote = () => {
    let next = Math.floor(Math.random() * QUOTES.length)
    while (next === quoteIndex) next = Math.floor(Math.random() * QUOTES.length)
    setQuoteIndex(next)
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center bg-neutral-900 text-green-400 font-mono text-sm overflow-hidden">
      {/* Left Side */}
      <div className="w-9/10 md:w-1/3 h-1/2 md:h-2/3 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-green-700 px-4 py-6 text-center">
        <h1 className="text-2xl md:text-3xl text-green-500 tracking-widest mb-2 animate-pulse">
          ERROR 404
        </h1>
        <p className="text-md opacity-80 max-w-xs min-h-[1rem]">{quote}</p>

        <Link href="/" className="mt-6">
          <button
            className="w-36 px-4 py-2 ring-1 ring-green-600 rounded bg-black/20 text-green-200 hover:bg-green-600 hover:text-black transition duration-200"
            aria-label="Return to homepage"
          >
            Jack Me In
          </button>
        </Link>

        <button
          onClick={cycleQuote}
          className="mt-4 w-36 px-4 py-2 ring-1 ring-green-800 rounded bg-black/20 text-green-200 hover:bg-green-800 hover:text-black transition duration-200"
          aria-label="Generate another message"
        >
          Generate Signal
        </button>
      </div>

      {/* Right Side */}
      <div className="w-9/10 md:w-2/3 h-1/2 md:h-2/3 flex flex-col justify-center items-center px-6 py-8 relative text-center">
        <p className="text-green-500 text-sm mb-3 truncate">
          Attempting to resolve route: <span className="text-yellow-400">{pathname}</span>
        </p>
        <div className="w-full max-w-md bg-green-900 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-400 h-full transition-all duration-300"
            style={{ width: `${progress.toFixed(2)}%` }}
          />
        </div>
        <p className="text-xs text-green-600 mt-2">
          System unable to trace destination ...
        </p>
      </div>
    </div>
  )
}

// Quote pool (optimized for terminal tone + dev clarity)
const QUOTES = [
  'Wake up, Neo.',
  'The Matrix has you.',
  'Follow the white rabbit.',
  '404: Illusion Detected.',
  'Reality not found.',
  'There is no spoon.',
  'You were never supposed to be here.',
  'Undefined path encountered.',
  'This route is untraceable.',
  '404: Construct missing.',
  'Deja vu... system glitch?',
  'Anomaly detected in CodeFolio.',
  'Try another entry point.',
  'Path not part of this simulation.',
  'Destination does not compute.',
  'Signal lost beyond known reality.',
]
