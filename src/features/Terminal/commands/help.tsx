import { Command } from '../types'
import { commandRegistry } from '../model/commandRegistry'

const help: Command = {
  name: 'help',
  description: 'Show this help message',
  execute: () => {
    const cmds = Object.values(commandRegistry)
    return (
      <pre className="whitespace-pre-wrap">
        {[
          'Available commands:\n',
          ...cmds.map(c => `  ${c.name.padEnd(14)} ${c.description}`),
        ].join('\n')}
      </pre>
    )
  },
}

export default help
