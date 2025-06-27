import { Command } from '../types'

const clear: Command = {
  name: 'clear',
  description: 'Clears the terminal screen',
  execute: (_ /* args */, ctx) => {
    ctx?.clearScreen()
    return ''
  },
}

export default clear