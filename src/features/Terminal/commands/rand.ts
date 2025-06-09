import { Command } from '../types'

const rand: Command = {
  name: 'rand',
  description: 'Random integer (default 0-100 or [min] [max])',
  usage: 'rand [min] [max]',
  execute: (args) => {
    const min = args?.[0] ? parseInt(args[0], 10) : 0
    const max = args?.[1] ? parseInt(args[1], 10) : 100
    if (Number.isNaN(min) || Number.isNaN(max) || min > max) {
      return 'rand: invalid range'
    }
    const n = Math.floor(Math.random() * (max - min + 1)) + min
    return n.toString()
  },
}

export default rand
