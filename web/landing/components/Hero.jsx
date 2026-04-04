import { useNavigate } from 'react-router-dom'
import { ArrowRight, Github, Sparkles, Shield, Zap, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import AnimateIn from '../../shared/components/AnimateIn'

const typewriterWords = ['Pull Requests', 'Code Quality', 'Security Bugs', 'Performance', 'Best Practices']

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, isDeleting ? text.length - 1 : text.length + 1))
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

function FloatingParticle({ delay, x, y, size }) {
  return (
    <div
      className="absolute rounded-full bg-brand-500/20 animate-float"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
      }}
    />
  )
}

export default function Hero() {
  const navigate = useNavigate()
  const typedText = useTypewriter(typewriterWords)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGithubConnect = () => {
    navigate('/dashboard')
  }

  return (
    <section id="hero" className="relative overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24">
      {/* Animated background */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-brand-500/[0.06] rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/[0.04] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

      {/* Floating particles */}
      <FloatingParticle delay={0} x={10} y={20} size={6} />
      <FloatingParticle delay={1} x={85} y={15} size={4} />
      <FloatingParticle delay={2} x={70} y={60} size={5} />
      <FloatingParticle delay={3} x={25} y={70} size={3} />
      <FloatingParticle delay={4} x={90} y={80} size={4} />
      <FloatingParticle delay={1.5} x={50} y={10} size={5} />
      <FloatingParticle delay={2.5} x={15} y={50} size={4} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-sm text-brand-400 font-medium">Now in Public Beta — Try for Free</span>
          </div>

          {/* Main Heading with typewriter */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-[1.08] tracking-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            AI-Powered{' '}
            <span className="gradient-text">Code Reviews</span>
          </h1>

          {/* Typewriter line */}
          <div className={`text-2xl sm:text-3xl md:text-4xl font-bold text-surface-400 mb-6 h-12 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span>for </span>
            <span className="gradient-text">{typedText}</span>
            <span className="typewriter-cursor" />
          </div>

          {/* Subheading */}
          <p className={`text-base md:text-lg text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Automatically review pull requests, detect bugs, and ship better code
            with AI that understands your codebase. Get started in 30 seconds.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button
              id="hero-connect-github-btn"
              onClick={handleGithubConnect}
              className="group btn-primary text-base px-8 py-4 shadow-glow relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <Github size={20} />
              Connect GitHub
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-demo-btn"
              onClick={handleGithubConnect}
              className="btn-ghost text-base px-8 py-4 group"
            >
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              View Live Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-wrap justify-center gap-6 md:gap-10 mb-14 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {[
              { icon: Shield, text: 'SOC2 Compliant' },
              { icon: Zap, text: 'Reviews in <30s' },
              { icon: Github, text: 'GitHub Native' },
              { icon: CheckCircle, text: 'Free to Start' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 text-surface-500 hover:text-surface-300 transition-colors cursor-default">
                <Icon size={15} className="text-brand-500" />
                <span className="text-xs sm:text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16 transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {[
              { value: '10K+', label: 'PRs Reviewed' },
              { value: '98%', label: 'Accuracy Rate' },
              { value: '2M+', label: 'Issues Found' },
              { value: '500+', label: 'Teams Active' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-4 rounded-2xl bg-surface-800/20 border border-surface-700/20 hover:border-brand-500/20 hover:bg-surface-800/40 transition-all duration-300"
              >
                <div className="text-xl md:text-2xl font-bold gradient-text mb-0.5">
                  {stat.value}
                </div>
                <p className="text-surface-500 text-[11px] md:text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Code preview mockup */}
          <AnimateIn delay={700}>
            <div className="max-w-4xl mx-auto">
              <div className="glow-border rounded-2xl">
                <div className="glass-card overflow-hidden rounded-2xl">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-surface-900/90 border-b border-surface-700/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-surface-500 font-mono">PR #234 — auth-service / authenticate.ts</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="badge-success text-[10px] py-0.5 px-2">
                        <CheckCircle size={10} />
                        AI Reviewed
                      </span>
                    </div>
                  </div>
                  {/* Code content with staggered lines */}
                  <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed text-left overflow-x-auto">
                    {[
                      { type: 'remove', line: 12, content: 'async function login(email, password) {' },
                      { type: 'add', line: 12, content: 'async function authenticate(email: string, password: string) {' },
                      { type: 'neutral', line: 13, content: '  const user = await db.findUser(email)' },
                      { type: 'add', line: 14, content: '  await logAuthAttempt(email, \'attempt\')' },
                      { type: 'neutral', line: 15, content: '  if (!user) throw new AuthError(\'User not found\')' },
                      { type: 'add', line: 16, content: '  const isValid = await verifyPassword(password, user.hash)' },
                      { type: 'neutral', line: 17, content: '  return generateToken(user)' },
                      { type: 'neutral', line: 18, content: '}' },
                    ].map((line, idx) => (
                      <div
                        key={idx}
                        className={`stagger-item px-3 py-0.5 rounded-sm ${
                          line.type === 'add' ? 'code-line-add' :
                          line.type === 'remove' ? 'code-line-remove' :
                          'code-line-neutral'
                        }`}
                        style={{ animationDelay: `${800 + idx * 100}ms` }}
                      >
                        <span className="text-surface-600 select-none inline-block w-8 text-right mr-3">{line.line}</span>
                        <span className="select-none mr-2 inline-block w-3 text-center">
                          {line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' '}
                        </span>
                        {line.content}
                      </div>
                    ))}

                    {/* AI comment overlay */}
                    <div className="stagger-item mt-4 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20" style={{ animationDelay: '1600ms' }}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-md flex items-center justify-center">
                          <Sparkles size={10} className="text-white" />
                        </div>
                        <span className="text-brand-400 text-xs font-semibold">AI Suggestion — Security</span>
                      </div>
                      <p className="text-surface-400 text-xs leading-relaxed">
                        Consider adding rate limiting on authentication attempts to prevent brute-force attacks.
                        Use <code className="text-brand-300 bg-brand-500/10 px-1 rounded">express-rate-limit</code> with a 5 request/min window.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
