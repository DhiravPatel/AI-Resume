"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out",
    features: [
      "5 PRs per month",
      "Basic code review",
      "Bug detection",
      "Community support",
    ],
    popular: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For active developers",
    features: [
      "Unlimited PRs",
      "Advanced AI review",
      "Security insights",
      "Performance analysis",
      "Priority support",
      "Custom rules",
    ],
    popular: true,
    cta: "Get Pro",
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "For growing teams",
    features: [
      "Everything in Pro",
      "Up to 10 members",
      "Advanced analytics",
      "Slack integration",
      "Custom workflows",
      "Dedicated support",
      "API access",
    ],
    popular: false,
    cta: "Contact Sales",
  },
]

function PricingCard({ plan, index, isVisible }: { plan: typeof plans[0]; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-neon text-background text-xs font-mono font-bold rounded-full">
            <Sparkles className="w-3 h-3" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className={`relative h-full p-6 rounded-xl border transition-all duration-500 ${
          plan.popular
            ? "border-neon bg-neon/5 shadow-lg shadow-neon/10"
            : "border-border bg-card hover:border-muted-foreground/50"
        } ${isHovered && !plan.popular ? "shadow-lg -translate-y-1" : ""}`}
      >
        {/* Glow effect for popular */}
        {plan.popular && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-neon/10 to-transparent opacity-50" />
        )}

        <div className="relative z-10">
          {/* Plan name */}
          <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold">{plan.price}</span>
            {plan.period && (
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            )}
          </div>

          {/* CTA Button */}
          <Button
            className={`w-full mb-6 font-mono text-sm transition-all duration-300 ${
              plan.popular
                ? "bg-neon text-background hover:bg-neon/90"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            {plan.cta}
          </Button>

          {/* Features */}
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li
                key={feature}
                className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 100 + i * 50}ms` }}
              >
                <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-neon" : "text-muted-foreground"}`} />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Pricing() {
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
    <section id="pricing" ref={ref} className="relative py-24 bg-muted/30 border-y border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-neon border border-neon/30 rounded-full bg-neon/5">
            PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Simple, <span className="text-neon">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the plan that works for you. Start free, upgrade when you need.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`text-center mt-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-sm text-muted-foreground">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
