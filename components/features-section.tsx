"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Bug, Zap, Shield, Lightbulb, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "AI Code Review",
    description: "Advanced AI analyzes your code for best practices and style improvements.",
    color: "neon",
  },
  {
    icon: Bug,
    title: "Bug Detection",
    description: "Automatically detect potential bugs, issues, and edge cases.",
    color: "neon-secondary",
  },
  {
    icon: BarChart3,
    title: "PR Scoring",
    description: "Get an objective score for each PR based on quality metrics.",
    color: "neon-tertiary",
  },
  {
    icon: Shield,
    title: "Security Insights",
    description: "Identify security vulnerabilities before they reach production.",
    color: "neon",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Receive actionable recommendations to improve performance.",
    color: "neon-secondary",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get review comments within seconds of opening a PR.",
    color: "neon-tertiary",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const Icon = feature.icon

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-6 rounded-xl border border-border bg-card transition-all duration-500 cursor-pointer
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${isHovered ? "-translate-y-2 shadow-lg" : ""}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${feature.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      
      {/* Border glow */}
      <div className={`absolute inset-0 rounded-xl border border-${feature.color}/0 group-hover:border-${feature.color}/50 transition-all duration-500`} />

      {/* Content */}
      <div className="relative z-10">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${feature.color}/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 text-${feature.color}`} />
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-neon transition-colors duration-300">
          {feature.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Animated indicator */}
        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-neon transition-colors">
          <span className={`w-1.5 h-1.5 rounded-full bg-${feature.color} group-hover:animate-pulse`} />
          <span>Learn more</span>
        </div>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-neon border border-neon/30 rounded-full bg-neon/5">
            FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Powerful Features for <span className="text-neon">Better Code</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to improve code quality and catch issues before they ship.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
