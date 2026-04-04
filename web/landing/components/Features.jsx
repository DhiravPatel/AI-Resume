import { Zap, AlertTriangle, Code2, BarChart3, GitBranch, Lock } from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'

const features = [
  {
    icon: Zap,
    title: 'Auto PR Review',
    description: 'Every pull request is automatically analyzed with our AI engine the moment it\'s opened.',
    color: 'from-brand-500 to-emerald-500',
    bgColor: 'bg-brand-500/10',
    borderColor: 'hover:border-brand-500/40',
  },
  {
    icon: Code2,
    title: 'Code Suggestions',
    description: 'Get actionable suggestions for performance improvements, patterns, and best practices.',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'hover:border-cyan-500/40',
  },
  {
    icon: AlertTriangle,
    title: 'Security Warnings',
    description: 'Detect vulnerabilities, SQL injections, XSS risks, and insecure patterns before production.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'hover:border-amber-500/40',
  },
  {
    icon: BarChart3,
    title: 'Quality Metrics',
    description: 'Track code quality trends across your team with real-time dashboards and alerts.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'hover:border-purple-500/40',
  },
  {
    icon: GitBranch,
    title: 'Smart Merging',
    description: 'AI-powered merge conflict detection and resolution suggestions to speed up delivery.',
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'hover:border-rose-500/40',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC2 compliant with end-to-end encryption. Your code never leaves your infrastructure.',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'hover:border-indigo-500/40',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimateIn className="text-center mb-16">
          <span className="text-brand-400 font-semibold text-sm tracking-wider uppercase mb-3 block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything you need to{' '}
            <span className="gradient-text">ship better code</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            A comprehensive suite of AI-powered tools designed for modern engineering teams.
          </p>
        </AnimateIn>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <AnimateIn key={idx} delay={idx * 100}>
                <div
                  className={`group p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-surface-800/50 to-surface-900/80 
                    border border-surface-700/50 ${feature.borderColor}
                    hover:shadow-lg transition-all duration-300 h-full`}
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 
                    group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 bg-gradient-to-r ${feature.color} bg-clip-text`} 
                      style={{ color: undefined }}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-surface-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
