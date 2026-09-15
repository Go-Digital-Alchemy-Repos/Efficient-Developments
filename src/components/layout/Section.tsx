import type { HTMLAttributes, ReactNode } from 'react'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  tone?: 'default' | 'muted' | 'dark' | 'green'
  spacing?: 'compact' | 'default' | 'spacious'
}

export function Section({
  children,
  className = '',
  tone = 'default',
  spacing = 'default',
  ...props
}: SectionProps) {
  return (
    <section
      className={`section section--${tone} section--${spacing} ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  )
}
