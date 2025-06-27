import { Command } from '../types'

const ls: Command = {
  name: 'ls',
  description: 'List pages / files',
  execute: (_, ctx) =>
    ctx?.pages.length ? ctx.pages.join('  ') : 'ls: (no files)',
}

export default ls
