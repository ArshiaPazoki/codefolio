import { Command } from '../types'

type Item = { text: string; done: boolean }
const storeKey = 'terminal-todo'
const get = (): Item[] => JSON.parse(localStorage.getItem(storeKey) || '[]')
const save = (list: Item[]) => localStorage.setItem(storeKey, JSON.stringify(list))

const todo: Command = {
  name: 'todo',
  description: 'Tiny todo list',
  usage: 'todo add <task> | list | done <n>',
  execute: (args) => {
    const action = args?.[0]
    const list = get()

    if (action === 'add') {
      const text = args?.slice(1).join(' ')
      if (!text) return 'todo: add <task>'
      list.push({ text, done: false }); save(list); return 'added'
    }
    if (action === 'done') {
      const i = parseInt(args?.[1] || '', 10) - 1
      if (isNaN(i) || !list[i]) return 'todo: bad index'
      list[i].done = true; save(list); return 'done'
    }
    // default list
    return list.length
      ? list.map((t, i) => `${i+1}. [${t.done?'x':' '}] ${t.text}`).join('\\n')
      : '(empty)'
  },
}

export default todo
