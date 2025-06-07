// features/terminal/model/commandRegistry.ts
import help     from '../commands/help'
import clear    from '../commands/clear'
import echo     from '../commands/echo'
import date     from '../commands/date'
import matrix   from '../commands/matrix'
import whoami   from '../commands/whoami'
import uname    from '../commands/uname'
import uptime   from '../commands/uptime'
import history  from '../commands/history'
import exit     from '../commands/exit'
// ... import other commands

import { Command } from '../types'

export const commandRegistry: Record<string, Command> = {
  help,
  clear,
  echo,
  date,
  matrix,
  whoami,
  uname,
  uptime,
  history,
  exit
  // ... other command exports
}

