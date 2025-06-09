import { Command } from '../types'

const cd: Command = {
  name: 'cd',
  description: 'Change directory (mock)',
  usage: 'cd <path>',
  execute: (args, ctx) => {
    if (!ctx?.setCwd) return 'cd: not supported'
    const path = args?.[0]
    if (!path) return ctx.cwd || '~'
    ctx.setCwd(path)
    return ''
  },
}

export default cd
