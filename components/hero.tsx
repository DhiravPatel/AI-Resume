"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Sparkles, Check, X } from "lucide-react"
import { CodeRain } from "./code-rain"

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span>
      {displayText}
      <span className="animate-blink text-neon">|</span>
    </span>
  )
}

function TerminalWindow() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`terminal-card shadow-2xl shadow-black/20 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="flex-1 text-center font-mono text-xs text-muted-foreground">
          pull-request-review.md
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm space-y-4">
        {/* File header */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-border pb-3">
          <Github className="w-4 h-4" />
          <span>feature/add-authentication</span>
          <span className="ml-auto px-2 py-0.5 bg-neon/10 text-neon rounded text-xs">
            +142 -23
          </span>
        </div>

        {/* Code diff */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <span className="text-muted-foreground w-6 text-right flex-shrink-0">12</span>
            <div className="flex-1 bg-red-500/10 text-red-400 px-2 py-1 rounded">
              <span className="text-red-500">-</span> const password = req.body.password;
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-muted-foreground w-6 text-right flex-shrink-0">12</span>
            <div className="flex-1 bg-green-500/10 text-green-400 px-2 py-1 rounded">
              <span className="text-green-500">+</span> const password = await hashPassword(req.body.password);
            </div>
          </div>
        </div>

        {/* AI Review comment */}
        <div className="mt-4 border border-neon/30 rounded-lg p-3 bg-neon/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-neon" />
            </div>
            <span className="font-medium text-neon text-xs">AI Reviewer</span>
            <span className="text-xs text-muted-foreground">just now</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Security improvement detected. Password is now properly hashed before storage.
          </p>
          <div className="flex gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs">
              <Check className="w-3 h-3" /> Approved
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
              Security +15pts
            </span>
          </div>
        </div>

        {/* PR Score preview */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <span className="text-xs text-muted-foreground">PR Score</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[87%] bg-gradient-to-r from-neon to-neon-secondary rounded-full" />
            </div>
            <span className="text-neon font-bold">87</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern dark:opacity-100 opacity-50" />
      <CodeRain />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon/20 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-secondary/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon/30 bg-neon/5 animate-slide-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
              </span>
              <span className="text-xs font-mono text-neon">Now with GPT-4 Vision support</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight animate-slide-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <span className="block text-balance">Your AI Code Reviewer</span>
              <span className="block text-balance">That <span className="text-neon dark:neon-text">Never Sleeps</span></span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              Automatically review pull requests, detect bugs, and improve code quality instantly. Ship faster, ship safer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              <Button
                size="lg"
                className="group relative font-mono text-sm bg-foreground text-background hover:bg-neon hover:text-background transition-all duration-300 px-8"
              >
                Start Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-mono text-sm border-border hover:border-foreground transition-colors px-8"
              >
                <Github className="mr-2 w-4 h-4" />
                Connect GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4 animate-slide-up opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              {[
                { value: "50K+", label: "PRs reviewed" },
                { value: "2.3s", label: "Avg review time" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Terminal */}
          <div className="relative animate-slide-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <TerminalWindow />
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-3 py-2 rounded-lg border border-border bg-card shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon" />
                <span className="text-sm font-medium">Auto-merged</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-lg border border-border bg-card shadow-lg animate-float" style={{ animationDelay: "-2s" }}>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium">3 issues found</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
