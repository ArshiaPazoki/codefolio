import React, { useEffect, useState } from 'react'
import { Command } from '../types'

const cat: Command = {
  name: 'cat',
  description: 'Show page content',
  usage: 'cat <page>',
  execute: (args) => {
    const page = args?.[0]
    if (!page) return 'Usage: cat <page>'

    // Lazy JSX component so fetch runs after render
    const Viewer = () => {
      const [text, setText] = useState('Loading…')
      useEffect(() => {
        fetch(`/pages/${page}.txt`)
          .then(r => r.ok ? r.text() : 'cat: not found')
          .then(setText)
          .catch(() => setText('cat: error fetching'))
      }, [])
      return <pre>{text}</pre>
    }
    return <Viewer />
  },
}

export default cat
