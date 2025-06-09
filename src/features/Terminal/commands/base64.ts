import { Command } from '../types'

const base64: Command = {
  name: 'base64',
  description: 'Base64 encode/decode',
  usage: 'base64 -e|-d <text>',
  execute: (args) => {
    const flag = args?.[0]
    const str  = args?.slice(1).join(' ') || ''
    if (flag === '-e') return btoa(str)
    if (flag === '-d') {
      try { return atob(str) } catch { return 'base64: invalid' }
    }
    return 'Usage: base64 -e|-d <text>'
  },
}

export default base64
