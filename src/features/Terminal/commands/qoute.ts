import { Command } from '../types'

const quotes = [
  'Simplicity is the ultimate sophistication. – Leonardo da Vinci',
  'Code is like humor. When you have to explain it, it’s bad. – Cory House',
  'Programs must be written for people to read, and only incidentally for machines to execute. – Abelson & Sussman',
]

const quote: Command = {
  name: 'quote',
  description: 'Displays a random inspirational quote',
  execute: () => quotes[Math.floor(Math.random() * quotes.length)],
}

export default quote
