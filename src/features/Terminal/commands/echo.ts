import { Command } from '../types'

const echo: Command = {
  name: 'echo',
  description: 'Print text',
  usage: 'echo [text]',
  execute: (args = []) => args.join(' '),   // args is always an array
}

export default echo
