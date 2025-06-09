import { Command } from '../types'

async function sha256(str: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

const hash: Command = {
  name: 'hash',
  description: 'SHA-256 of given text',
  usage: 'hash <text>',
  execute: (args, ctx) => {
    const text = args?.join(' ')
    if (!text) return 'Usage: hash <text>'
    sha256(text).then(h => ctx?.setOutput?.(o => [...o, h]))
    return 'hashing…'
  },
}

export default hash
