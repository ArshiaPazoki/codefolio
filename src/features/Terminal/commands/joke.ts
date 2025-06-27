import { Command } from '../types'

const jokes = [
  "I'm reading a book on anti-gravity… it's impossible to put down!",
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'I told my computer I needed a break, and it said “No problem — I’ll go to sleep.”',
]

const joke: Command = {
  name: 'joke',
  description: 'Tells a random dad-style joke',
  execute: () => jokes[Math.floor(Math.random() * jokes.length)],
}

export default joke
