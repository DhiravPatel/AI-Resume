import { useEffect, useRef, useState } from 'react'

export default function AnimateIn({ 
  children, 
  className = '', 
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  threshold = 0.1 
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  const animationMap = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in',
  }

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationMap[animation] || 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: 'both',
      }}
    >
      {children}
    </div>
  )
}
