

// src/shared/ui/TechIcon.tsx
'use client'

import Image from 'next/image'
import { FC } from 'react'

interface TechIconProps {
  name: string
  size?: number
}

const iconMap: Record<string, string> = {
  react:    '/icons/react_icon.svg',
  nextjs:   '/icons/next_icon.svg',
  vue:      '/icons/vue_icon.svg',
  javascript: '/icons/js_icon.svg',
  typescript: '/icons/ts_icon.svg',
  html:     '/icons/html_icon.svg',
  css:      '/icons/css_icon.svg',
  json:     '/icons/json_icon.svg',
  markdown: '/icons/markdown_icon.svg',
  docker:   '/icons/docker_icon.svg',
  git:      '/icons/git_icon.svg',
}

const TechIcon: FC<TechIconProps> = ({ name, size = 16 }) => {
  const src = iconMap[name.toLowerCase()] || '/icons/default_icon.svg'
  return <Image src={src} alt={name} width={size} height={size} />
}

export default TechIcon
