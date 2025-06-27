import React from 'react'
import { Command } from '../types'

const history: Command = {
  name: 'history',
  description: 'Shows command history',
  execute: (_, ctx) => (
    <div>
      {ctx!.commandHistory.map((cmd, i) => (
        <div key={i}>{i + 1} {cmd}</div>
      ))}
    </div>
  ),
}

export default history
