import { useNavigate } from 'react-router-dom'
import { Github, ArrowRight } from 'lucide-react'
import AnimateIn from '../../shared/components/AnimateIn'

const steps = [
  {
    step: '01',
    title: 'Connect GitHub',
    description: 'Link your GitHub repos in one click. We support GitHub, GitLab, and Bitbucket.',
  },
  {
    step: '02',
    title: 'Open a PR',
    description: 'Create or update a pull request as you normally would. No workflow changes needed.',
  },
  {
    step: '03',
    title: 'Get AI Review',
    description: 'Receive intelligent code review comments, security alerts, and suggestions in seconds.',
  },
]

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.03] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn className="text-center mb-16">
          <span className="text-brand-400 font-semibold text-sm tracking-wider uppercase mb-3 block">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Up and running in{' '}
            <span className="gradient-text">3 simple steps</span>
          </h2>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            No configuration needed. Just connect and start reviewing.
          </p>
        </AnimateIn>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((item, idx) => (
            <AnimateIn key={idx} delay={idx * 150}>
              <div className="relative text-center group">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-surface-700 to-surface-800" />
                )}
                
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-surface-800 to-surface-900 border border-surface-700/50 mb-6 group-hover:border-brand-500/40 group-hover:shadow-glow transition-all duration-300">
                  <span className="text-2xl font-bold gradient-text">{item.step}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-surface-400 text-sm leading-relaxed max-w-xs mx-auto">{item.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn className="text-center">
          <button
            id="how-it-works-cta"
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-base px-8 py-4"
          >
            <Github size={20} />
            Start Free Trial
            <ArrowRight size={18} />
          </button>
        </AnimateIn>
      </div>
    </section>
  )
}
