import { useState, useEffect } from 'react'

/** Blinks a boolean on/off at the given interval. */
export function useBlink(interval = 500) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setOn(v => !v), interval)
    return () => clearInterval(id)
  }, [interval])
  return on
}