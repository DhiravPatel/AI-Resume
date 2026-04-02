"use client"

import { useEffect, useRef, useState } from "react"
import { Github, GitPullRequest, Sparkles, ArrowRight, Check } from "lucide-react"

const steps = [
  {
    icon: Github,
    number: "01",
    title: "Connect GitHub",
    description: "Authorize CodeReview.AI with one click. We only request read access to your code.",
    code: "$ codereview connect --github",
  },
  {
    icon: GitPullRequest,
    number: "02",
    title: "Open a PR",
    description: "Create or open a pull request. Our AI activates automatically on every PR.",
    code: "$ git push origin feature-branch",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Get AI Review",
    description: "Receive detailed feedback within seconds. Approve, suggest, or request changes.",
    code: "✓ AI Review Complete: Score 87/100",
  },
]

function StepCard({ step, index, isActive }: { step: typeof steps[0]; index: number; isActive: boolean }) {
  const Icon = step.icon
  
  return (
    <div
      className={`relative group transition-all duration-500 ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-50"
      }`}
    >
      {/* Connection line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-px">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-border" />
            <div
              className={`absolute inset-y-0 left-0 bg-neon transition-all duration-1000 ${
                isActive ? "w-full" : "w-0"
              }`}
            />
            <ArrowRight className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors duration-500 ${
              isActive ? "text-neon" : "text-border"
            }`} />
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className={`relative p-6 rounded-xl border transition-all duration-500 ${
          isActive
            ? "border-neon/50 bg-neon/5 shadow-lg shadow-neon/10"
            : "border-border bg-card"
        }`}
      >
        {/* Step number */}
        <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-all duration-500 ${
          isActive ? "bg-neon text-background" : "bg-muted text-muted-foreground"
        }`}>
          {step.number}
        </div>

        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-all duration-500 ${
          isActive ? "bg-neon/20" : "bg-muted"
        }`}>
          <Icon className={`w-7 h-7 transition-colors duration-500 ${
            isActive ? "text-neon" : "text-muted-foreground"
          }`} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {step.description}
        </p>

        {/* Terminal-style code */}
        <div className={`p-3 rounded-lg font-mono text-xs transition-all duration-500 ${
          isActive ? "bg-background border border-neon/30" : "bg-muted/50 border border-transparent"
        }`}>
          <span className={`transition-colors duration-500 ${isActive ? "text-neon" : "text-muted-foreground"}`}>
            {step.code}
          </span>
        </div>

        {/* Completed indicator */}
        {isActive && (
          <div className="absolute top-4 right-4">
            <Check className="w-5 h-5 text-neon" />
          </div>
        )}
      </div>
    </div>
  )
}

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section id="how-it-works" ref={ref} className="relative py-24 bg-muted/30 border-y border-border overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-neon border border-neon/30 rounded-full bg-neon/5">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Get Started in <span className="text-neon">3 Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Simple setup, powerful results. Start improving your code quality today.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isActive={index <= activeStep}
            />
          ))}
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= activeStep ? "bg-neon w-8" : "bg-muted"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
