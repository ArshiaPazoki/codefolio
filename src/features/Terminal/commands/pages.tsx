import React from 'react'
import { Command } from '../types'

const pages: Command = {
  name: 'pages',
  description: 'Lists available pages',
  execute: (_, ctx) => (
    <div>
      {ctx?.pages.length
        ? ctx.pages.map(p => <div key={p}>{p}</div>)
        : 'No pages available'}
    </div>
  ),
}

export default pages
