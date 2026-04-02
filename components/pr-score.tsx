"use client"

import { useState, useEffect, useRef } from "react"
import { TrendingUp, Shield, Zap, FileCode, CheckCircle2 } from "lucide-react"

const metrics = [
  { label: "Performance", value: 92, icon: Zap, color: "neon" },
  { label: "Readability", value: 88, icon: FileCode, color: "neon-secondary" },
  { label: "Security", value: 95, icon: Shield, color: "neon-tertiary" },
  { label: "Best Practices", value: 85, icon: CheckCircle2, color: "neon" },
]

function CircularProgress({ score, isVisible }: { score: number; isVisible: boolean }) {
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = isVisible ? circumference - (score / 100) * circumference : circumference

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-neon/10 rounded-full blur-2xl animate-pulse" />
      
      {/* SVG circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Track */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted"
        />
        {/* Progress */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-[2000ms] ease-out"
        />
        {/* Glow filter */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--neon)" />
            <stop offset="50%" stopColor="var(--neon-secondary)" />
            <stop offset="100%" stopColor="var(--neon-tertiary)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-6xl font-bold text-foreground tabular-nums">
          {isVisible ? score : 0}
        </div>
        <div className="text-sm text-muted-foreground font-mono mt-1">
          / 100
        </div>
        <div className="flex items-center gap-1 mt-2 text-neon text-xs font-mono">
          <TrendingUp className="w-3 h-3" />
          <span>+12 from last PR</span>
        </div>
      </div>
    </div>
  )
}

function MetricBar({ metric, index, isVisible }: { metric: typeof metrics[0]; index: number; isVisible: boolean }) {
  const Icon = metric.icon
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const duration = 1500
    const steps = 60
    const increment = metric.value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= metric.value) {
        setDisplayValue(metric.value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, metric.value])

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 text-${metric.color}`} />
          <span className="text-sm font-medium">{metric.label}</span>
        </div>
        <span className={`text-sm font-mono font-bold text-${metric.color}`}>
          {displayValue}%
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full bg-${metric.color} rounded-full transition-all duration-[1500ms] ease-out`}
          style={{ width: isVisible ? `${metric.value}%` : "0%" }}
        />
      </div>
    </div>
  )
}

export function PRScore() {
  const [isVisible, setIsVisible] = useState(false)
  const [score, setScore] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const duration = 2000
    const targetScore = 87
    const steps = 60
    const increment = targetScore / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetScore) {
        setScore(targetScore)
        clearInterval(timer)
      } else {
        setScore(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon/10 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-secondary/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-neon border border-neon/30 rounded-full bg-neon/5">
            PR SCORE SYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Quantify Your <span className="text-neon">Code Quality</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get objective metrics for every pull request with our advanced scoring algorithm.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Circular score */}
          <div className={`transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <CircularProgress score={score} isVisible={isVisible} />
            
            {/* Quick stats */}
            <div className="flex justify-center gap-8 mt-8">
              {[
                { label: "Issues Fixed", value: "12" },
                { label: "Suggestions", value: "5" },
                { label: "Time Saved", value: "2.3h" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics breakdown */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-bold mb-6">Score Breakdown</h3>
              <div className="space-y-5">
                {metrics.map((metric, index) => (
                  <MetricBar
                    key={metric.label}
                    metric={metric}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>

            {/* Insight card */}
            <div
              className={`p-4 rounded-lg border border-neon/30 bg-neon/5 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">AI Insight</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This PR shows 15% improvement in security practices compared to your team average.
                    Great work on input validation!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
