import { Command } from '../types'

const uptime: Command = {
  name: 'uptime',
  description: 'Shows how long the terminal session has been running',
  execute: (_, ctx) => {
    const ms = Date.now() - ctx!.startTime
    const sec = Math.floor(ms / 1000)
    const min = Math.floor(sec / 60)
    const hrs = Math.floor(min / 60)
    return `${hrs}h ${min % 60}m ${sec % 60}s`
  },
}

export default uptime
