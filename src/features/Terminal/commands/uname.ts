import { Command } from '../types'

const uname: Command = {
  name: 'uname',
  description: 'Displays system information',
  usage: 'uname [-a]',
  execute: (args) => {
    const info = 'CodeFolio TerminalOS 1.0.0'
    return args?.includes('-a') ? `${info} x86_64 Web` : info
  },
}

export default uname
