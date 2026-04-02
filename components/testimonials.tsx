"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "Vercel",
    quote: "CodeReview.AI has transformed how we handle code reviews. It catches bugs we would have missed and saves us hours every week.",
    avatar: "SC",
  },
  {
    name: "Alex Rodriguez",
    role: "Tech Lead",
    company: "Stripe",
    quote: "The PR scoring system is incredibly useful for maintaining code quality standards. It is like having an expert reviewer on every PR.",
    avatar: "AR",
  },
  {
    name: "Emma Watson",
    role: "CTO",
    company: "Linear",
    quote: "Finally, a tool that understands security implications. It has caught potential vulnerabilities that could have been serious.",
    avatar: "EW",
  },
]

function TestimonialCard({ testimonial, index, isVisible }: { testimonial: typeof testimonials[0]; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isHovered ? "-translate-y-2" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative p-6 rounded-xl border border-border bg-card h-full transition-all duration-300 group-hover:border-neon/30 group-hover:shadow-lg">
        {/* Quote icon */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-neon/10 flex items-center justify-center">
          <Quote className="w-4 h-4 text-neon" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-neon text-neon" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-foreground/90 leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon to-neon-secondary flex items-center justify-center text-background font-bold text-sm">
            {testimonial.avatar}
          </div>
          <div>
            <p className="font-medium text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
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
    <section id="testimonials" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-neon border border-neon/30 rounded-full bg-neon/5">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Loved by <span className="text-neon">Developers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            See what developers are saying about CodeReview.AI
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
