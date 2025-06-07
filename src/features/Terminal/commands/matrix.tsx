import { Command } from '../types'
import { useEffect, useState } from 'react'

const MatrixText: React.FC = () => {
  const [columns, setColumns] = useState<string[][]>([])

  useEffect(() => {
    const chars = '0123456789'
    const cols = 60
    const lines = 16

    const generateMatrix = () => {
      const matrix: string[][] = []
      for (let i = 0; i < cols; i++) {
        const col = Array.from({ length: lines }, () =>
          chars.charAt(Math.floor(Math.random() * chars.length)),
        )
        matrix.push(col)
      }
      return matrix
    }

    setColumns(generateMatrix())

    const interval = setInterval(() => {
      setColumns(generateMatrix())
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 overflow-hidden bg-black border border-green-500 rounded p-2 font-mono text-[12px] leading-[14px] text-green-500">
      <div className="flex gap-[2px]">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col animate-matrixFade">
            {col.map((char, i) => (
              <span key={i} className="opacity-70">
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const matrix: Command = {
  name: 'matrix',
  description: 'Matrix rain effect (Tailwind-only)',
  execute: () => <MatrixText />,
}

export default matrix
