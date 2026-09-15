import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  interactive?: boolean
}

export function Card({ children, className = '', interactive = false, ...props }: CardProps) {
  return (
    <article className={`card${interactive ? ' card--interactive' : ''} ${className}`.trim()} {...props}>
      {children}
    </article>
  )
}
