import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-surface-950 flex flex-col items-center justify-center z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-xl flex items-center justify-center animate-pulse-glow">
          <span className="text-white font-bold text-lg">CR</span>
        </div>
        <span className="font-bold text-2xl text-white">
          CodeReview <span className="gradient-text">AI</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-surface-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="text-surface-500 text-sm mt-4 animate-fade-in">
        Loading your workspace...
      </p>
    </div>
  )
}
