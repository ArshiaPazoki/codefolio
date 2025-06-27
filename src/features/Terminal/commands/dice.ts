import { Command } from '../types'

const dice: Command = {
  name: 'dice',
  description: 'Roll dice, e.g. dice 2d6',
  usage: 'dice [NdM]  (N dice, M sides)',
  execute: (args) => {
    const spec = args?.[0] || '1d6'
    const match = spec.match(/^(\\d*)d(\\d+)$/i)
    if (!match) return 'dice: invalid spec'
    const n = parseInt(match[1] || '1', 10)
    const sides = parseInt(match[2], 10)
    if (n <= 0 || sides <= 0) return 'dice: invalid numbers'
    const rolls = Array.from({ length: n }, () =>
      Math.floor(Math.random() * sides) + 1,
    )
    return `${rolls.join(' ')}  (total ${rolls.reduce((a, b) => a + b, 0)})`
  },
}

export default dice
