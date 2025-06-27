import { Command } from '../types'

const exit: Command = {
  name: 'exit',
  description: 'Closes the terminal',
  execute: (_, ctx) => {
    ctx!.exit()
    return 'Terminal closed.'
  },
}

export default exit
