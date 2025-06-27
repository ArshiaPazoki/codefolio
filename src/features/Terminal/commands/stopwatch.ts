import { Command } from '../types'

let start = 0
let running = false

const stopwatch: Command = {
  name: 'stopwatch',
  description: 'Start/stop elapsed timer',
  usage: 'stopwatch start|stop|reset',
  execute: (args) => {
    const cmd = args?.[0] || 'start'
    const now = Date.now()

    if (cmd === 'start') {
      if (!running) { start = now; running = true }
      return 'stopwatch: started'
    }
    if (cmd === 'stop') {
      running = false
      return `⏱ ${(now - start)/1000}s`
    }
    if (cmd === 'reset') {
      start = now; running = false
      return 'stopwatch: reset'
    }
    return 'Usage: stopwatch start|stop|reset'
  },
}

export default stopwatch
