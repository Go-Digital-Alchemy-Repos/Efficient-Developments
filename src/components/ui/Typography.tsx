import type { HTMLAttributes, ReactNode } from 'react'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3'
  children: ReactNode
  size?: 'hero' | 'page' | 'section' | 'card'
}

export function Heading({ as: Component = 'h2', children, className = '', size = 'section', ...props }: HeadingProps) {
  return (
    <Component className={`heading heading--${size} ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}

export function Eyebrow({ children, className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`eyebrow ${className}`.trim()} {...props}>
      {children}
    </p>
  )
}
