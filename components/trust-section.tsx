"use client"

import { useEffect, useRef, useState } from "react"

const COMPANIES = [
  "Vercel",
  "Stripe",
  "Linear",
  "Notion",
  "Figma",
  "Supabase",
  "Railway",
  "Planetscale",
]

export function TrustSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-20 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Trusted by developers at
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling logos */}
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, i) => (
              <div
                key={`${company}-${i}`}
                className={`flex-shrink-0 mx-12 transition-all duration-500 ${
                  isVisible ? "opacity-60 hover:opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${(i % COMPANIES.length) * 50}ms` }}
              >
                <span className="text-xl font-bold text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
