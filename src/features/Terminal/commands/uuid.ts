import { Command } from '../types'

const uuid: Command = {
  name: 'uuid',
  description: 'Generate a UUID v4',
  execute: () => crypto.randomUUID(),
}

export default uuid
