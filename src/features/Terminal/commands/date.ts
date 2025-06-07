import { Command } from '../types'

const date: Command = {
  name: 'date',
  description: 'Displays current date and time',
  execute: () => new Date().toString(),
}

export default date
