"use client"

import { useEffect, useState } from "react"

const CODE_CHARS = "const let var function return async await import export class interface type => {} [] () ; : . + - * / = < > ! ? & | ^ ~ @"

function CodeColumn({ delay, speed, x }: { delay: number; speed: number; x: number }) {
  const [chars, setChars] = useState<string[]>([])

  useEffect(() => {
    const charArray = CODE_CHARS.split(" ")
    const newChars = Array.from({ length: 15 }, () => 
      charArray[Math.floor(Math.random() * charArray.length)]
    )
    setChars(newChars)
  }, [])

  return (
    <div
      className="absolute font-mono text-xs text-neon/40 whitespace-nowrap pointer-events-none"
      style={{
        left: `${x}%`,
        animation: `code-rain ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {chars.map((char, i) => (
        <div
          key={i}
          className="leading-relaxed"
          style={{
            opacity: 1 - i * 0.06,
          }}
        >
          {char}
        </div>
      ))}
    </div>
  )
}

export function CodeRain() {
  const columns = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    speed: 8 + Math.random() * 12,
    x: i * 5 + Math.random() * 3,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-50">
      {columns.map((col) => (
        <CodeColumn key={col.id} delay={col.delay} speed={col.speed} x={col.x} />
      ))}
    </div>
  )
}
