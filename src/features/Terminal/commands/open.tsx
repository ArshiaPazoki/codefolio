import React from 'react'
import { Command } from '../types'

const open: Command = {
  name: 'open',
  description: 'Returns a link to the specified page',
  usage: 'open <page-name>',
  execute: (args, ctx) => {
    if (!args?.length) return 'Usage: open <page>'
    const page = args[0]
    if (!ctx?.pages.includes(page)) return `open: ${page}: not found`
    return (
      <a
        href={`/${page}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline"
      >
        Open {page}
      </a>
    )
  },
}

export default open