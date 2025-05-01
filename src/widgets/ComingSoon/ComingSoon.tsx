// src/widgets/ComingSoon/ComingSoon.tsx
'use client'

import { FC, ReactNode } from 'react'

interface ComingSoonProps {
  title?: string
  subtitle?: string | ReactNode
}

const ComingSoon: FC<ComingSoonProps> = ({
  title = '🚧 Coming Soon! 🚧',
  subtitle = 'Stay tuned for updates…',
}) => (
  <div className="bg-black flex flex-col items-center justify-center h-full w-full">
    <h1 className="text-4xl font-extrabold mb-2 animate-pulse">{title}</h1>
    <p className="text-gray-400">{subtitle}</p>
  </div>
)

export default ComingSoon
