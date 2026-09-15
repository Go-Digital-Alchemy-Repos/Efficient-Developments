import type { HTMLAttributes, ReactNode } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  size?: 'content' | 'wide'
}

export function Container({
  children,
  className = '',
  size = 'content',
  ...props
}: ContainerProps) {
  return (
    <div className={`container container--${size} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
