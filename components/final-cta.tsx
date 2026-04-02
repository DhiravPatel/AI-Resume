"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/20 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Card */}
          <div className="relative p-8 sm:p-12 rounded-2xl border border-neon/30 bg-card overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-neon/50 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-neon/50 rounded-br-2xl" />

            {/* Content */}
            <div className="text-center relative z-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon/10 mb-6 animate-pulse-glow">
                <Terminal className="w-8 h-8 text-neon" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
                Start Reviewing <span className="text-neon">Smarter</span> Today
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Join thousands of developers improving their code quality with AI-powered reviews.
                Start free, no credit card required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="group font-mono text-sm bg-neon text-background hover:bg-neon/90 px-8 animate-pulse-glow"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-mono text-sm border-border hover:border-neon hover:text-neon transition-all px-8"
                >
                  Schedule a Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon" />
                  14-day free trial
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
