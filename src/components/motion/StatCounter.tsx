import { useLayoutEffect, useRef, useState } from 'react'

type StatCounterProps = {
  delay?: number
  duration?: number
  value: string
}

const numericTokenPattern = /\d[\d,]*(?:\.\d+)?/g

function formatValueAtProgress(value: string, progress: number) {
  if (progress >= 1) return value

  return value.replace(numericTokenPattern, (token) => {
    const normalized = token.replaceAll(',', '')
    const finalValue = Number(normalized)
    const decimalPlaces = normalized.split('.')[1]?.length ?? 0
    const currentValue = finalValue * progress

    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimalPlaces,
      minimumFractionDigits: decimalPlaces,
      useGrouping: token.includes(','),
    }).format(currentValue)
  })
}

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3
}

export function StatCounter({ delay = 0, duration = 1200, value }: StatCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimatedRef = useRef(false)
  const [displayValue, setDisplayValue] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? value
      : formatValueAtProgress(value, 0)
  ))

  useLayoutEffect(() => {
    const counter = counterRef.current
    if (!counter) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const statisticsSection = counter.closest('[data-statistics]') ?? counter
    let animationFrame = 0

    const finishImmediately = () => {
      if (!reducedMotion.matches) return
      window.cancelAnimationFrame(animationFrame)
      hasAnimatedRef.current = true
      setDisplayValue(value)
      observer.disconnect()
    }

    const startCounting = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true
      let startTime: number | undefined

      const tick = (time: number) => {
        startTime ??= time + delay

        if (time < startTime) {
          animationFrame = window.requestAnimationFrame(tick)
          return
        }

        const progress = Math.min((time - startTime) / duration, 1)
        setDisplayValue(formatValueAtProgress(value, easeOutCubic(progress)))

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick)
        } else {
          setDisplayValue(value)
        }
      }

      animationFrame = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        startCounting()
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.2 },
    )

    observer.observe(statisticsSection)
    reducedMotion.addEventListener('change', finishImmediately)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', finishImmediately)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [delay, duration, value])

  return (
    <span className="stat-counter" ref={counterRef}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="stat-counter__sizer">{value}</span>
      <span aria-hidden="true" className="stat-counter__value">{displayValue}</span>
    </span>
  )
}
