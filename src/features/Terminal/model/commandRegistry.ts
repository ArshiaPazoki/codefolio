// features/terminal/model/commandRegistry.ts
import help from "../commands/help";
import clear from "../commands/clear";
import echo from "../commands/echo";
import date from "../commands/date";
import matrix from "../commands/matrix";
import whoami from "../commands/whoami";
import uname from "../commands/uname";
import uptime from "../commands/uptime";
import history from "../commands/history";
import exit from "../commands/exit";
import pages from "../commands/pages";
import open from "../commands/open";
import rand from "../commands/rand";
import dice from "../commands/dice";
import joke from "../commands/joke";
import quote from "../commands/qoute";
import ls from "../commands/ls";
// import cd from "../commands/cd";
import cat from "../commands/cat";
// import ip from "../commands/ip";
import uuid from "../commands/uuid";
// import hash from "../commands/hash";
import base64 from "../commands/base64";
import json from "../commands/json";
// import timer from "../commands/timer";
import stopwatch from "../commands/stopwatch";
import todo from "../commands/todo";
import starwars from "../commands/starwars";
// ... import other commands

import { Command } from "../types";

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
  exit,
  pages,
  open,
  rand,
  dice,
  joke,
  quote,
  ls,
  // cd,
  cat,
  // ip,
  uuid,
  // hash,
  base64,
  json,
  // timer,
  stopwatch,
  todo,
  starwars,
  // ... other command exports
};
