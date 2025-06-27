import { Command } from '../types'

const json: Command = {
  name: 'json',
  description: 'Pretty or minify JSON',
  usage: 'json -p|-m <json>',
  execute: (args) => {
    const flag = args?.[0]
    const txt  = args?.slice(1).join(' ') || ''
    try {
      const obj = JSON.parse(txt)
      return flag === '-m'
        ? JSON.stringify(obj)
        : JSON.stringify(obj, null, 2)
    } catch {
      return 'json: invalid JSON'
    }
  },
}

export default json
