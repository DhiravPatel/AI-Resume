"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-neon/20 rounded-lg blur-lg group-hover:bg-neon/40 transition-all duration-300" />
              <Terminal className="w-5 h-5 text-neon relative z-10" />
            </div>
            <span className="font-mono font-bold text-lg tracking-tight">
              code<span className="text-neon">review</span>.ai
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-neon group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
              </button>
            )}

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex font-mono text-xs border-border hover:border-neon hover:text-neon transition-colors"
            >
              Sign in
            </Button>

            <Button
              size="sm"
              className="hidden sm:inline-flex font-mono text-xs bg-foreground text-background hover:bg-neon hover:text-background transition-all duration-300"
            >
              Get Started
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 border-b border-border" : "max-h-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-neon mr-2">$</span>
              {link.label}
            </a>
          ))}
          <div className="pt-4 flex gap-3">
            <Button variant="outline" size="sm" className="flex-1 font-mono text-xs">
              Sign in
            </Button>
            <Button size="sm" className="flex-1 font-mono text-xs bg-foreground text-background">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
