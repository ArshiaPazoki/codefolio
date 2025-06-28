// import { Command } from '../types'

// const ip: Command = {
//   name: 'ip',
//   description: 'Show public IP',
//   execute: (_, ctx) => {
//     ctx?.setOutput?.(o => [...o, 'Fetching IP…'])
//     fetch('https://api.ipify.org?format=json')
//       .then(r => r.json())
//       .then(d => ctx?.setOutput?.(o => [...o, d.ip]))
//       .catch(() => ctx?.setOutput?.(o => [...o, 'ip: error']))
//     return ''
//   },
// }

// export default ip
