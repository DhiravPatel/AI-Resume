"use client"

import { Github, Twitter, Linkedin, Terminal } from "lucide-react"

const links = {
  Product: ["Features", "Pricing", "Security", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "API Docs", "Community", "Status"],
  Legal: ["Privacy", "Terms", "Cookie Policy"],
}

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-neon/20 rounded-lg blur-lg" />
                <Terminal className="w-5 h-5 text-neon relative z-10" />
              </div>
              <span className="font-mono font-bold text-lg tracking-tight">
                code<span className="text-neon">review</span>.ai
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              AI-powered code review for smarter, faster development workflows.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-all"
                    aria-label={link.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-neon transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CodeReview.AI. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
