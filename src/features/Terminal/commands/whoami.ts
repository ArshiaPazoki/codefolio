import { Command } from '../types'

const whoami: Command = {
  name: 'whoami',
  description: 'Displays current user',
  execute: (_, ctx) => ctx!.userName,
}

export default whoami
