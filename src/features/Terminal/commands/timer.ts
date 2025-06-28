// import { Command } from '../types'

// const timer: Command = {
//   name: 'timer',
//   description: 'Countdown N seconds',
//   usage: 'timer <seconds>',
//   execute: (args, ctx) => {
//     const sec = parseInt(args?.[0] || '', 10)
//     if (isNaN(sec) || sec <= 0) return 'Usage: timer <seconds>'
//     ctx?.setOutput?.(o => [...o, `⏳ ${sec}s`])

//     let left = sec
//     const id = setInterval(() => {
//       left--
//       ctx?.setOutput?.(o => [...o, `⏳ ${left}s`])
//       if (left <= 0) {
//         clearInterval(id)
//         ctx?.setOutput?.(o => [...o, '⏰ Time!'])
//       }
//     }, 1000)
//     return ''
//   },
// }

// export default timer
