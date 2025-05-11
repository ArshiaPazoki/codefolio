import { useState, useEffect, useRef } from 'react'

export interface TypewriterConfig {
  texts: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseBeforeDelete?: number
  pauseBeforeType?: number
}

export function useTypewriterLoop({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseBeforeDelete = 1500,
  pauseBeforeType = 500,
}: TypewriterConfig) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // ← give useRef a null initial value
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const currentText = texts[textIndex]

    if (!deleting && subIndex < currentText.length) {
      timeoutRef.current = window.setTimeout(
        () => setSubIndex((i) => i + 1),
        typeSpeed
      )
    } else if (!deleting && subIndex === currentText.length) {
      timeoutRef.current = window.setTimeout(
        () => setDeleting(true),
        pauseBeforeDelete
      )
    } else if (deleting && subIndex > 0) {
      timeoutRef.current = window.setTimeout(
        () => setSubIndex((i) => i - 1),
        deleteSpeed
      )
    } else if (deleting && subIndex === 0) {
      timeoutRef.current = window.setTimeout(() => {
        setDeleting(false)
        setTextIndex((i) => (i + 1) % texts.length)
      }, pauseBeforeType)
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    subIndex,
    deleting,
    textIndex,
    texts,
    typeSpeed,
    deleteSpeed,
    pauseBeforeDelete,
    pauseBeforeType,
  ])

  useEffect(() => {
    setDisplayed(texts[textIndex].slice(0, subIndex))
  }, [textIndex, subIndex, texts])

  return displayed
}
