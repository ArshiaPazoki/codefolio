import React, { useEffect, useState } from 'react'
import { Command } from '../types'

const crawl = [
  'A long time ago in a galaxy far,',
  'far away....',
  '',
  'Episode IV',
  'A NEW HOPE',
  '',
  'It is a period of civil war.',
  'Rebel spaceships, striking',
  'from a hidden base, have won',
  'their first victory against',
  'the evil Galactic Empire.',
  // (add more lines if you want)
]

const StarWars: React.FC = () => {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFrame(f => f + 1), 400)
    return () => clearInterval(id)
  }, [])
  const visible = crawl.slice(frame, frame + 10).join('\\n')
  return <pre>{visible}</pre>
}

const starwars: Command = {
  name: 'starwars',
  description: 'ASCII Star Wars crawl',
  execute: () => <StarWars />,
}

export default starwars
