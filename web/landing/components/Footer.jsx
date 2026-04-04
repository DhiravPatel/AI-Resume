import { Github, Twitter } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Security', 'Changelog', 'Integrations'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit'],
  Developers: ['Documentation', 'API Reference', 'GitHub', 'Status Page'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
}

export default function Footer() {
  return (
    <footer className="border-t border-surface-800/80 bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">CR</span>
              </div>
              <span className="font-bold text-white">CodeReview AI</span>
            </div>
            <p className="text-surface-500 text-sm leading-relaxed mb-4">
              AI-powered code reviews for modern development teams.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 hover:text-white hover:border-surface-600 transition-all">
                <Github size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-400 hover:text-white hover:border-surface-600 transition-all">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-surface-500 hover:text-surface-300 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-800/80 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-surface-600 text-sm">
              © {new Date().getFullYear()} CodeReview AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-surface-600 hover:text-surface-400 transition-colors text-sm">Privacy</a>
              <a href="#" className="text-surface-600 hover:text-surface-400 transition-colors text-sm">Terms</a>
              <a href="#" className="text-surface-600 hover:text-surface-400 transition-colors text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
