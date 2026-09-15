import type { ImgHTMLAttributes } from 'react'

type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  variant?: 'default' | 'inverse'
}

export function Logo({ className = '', onError, variant = 'default', ...props }: LogoProps) {
  const source = variant === 'inverse'
    ? '/assets/logos/efficient-developments-inverse.svg'
    : '/assets/logos/efficient-developments.svg'

  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={source}
      alt="Efficient Developments"
      onError={(event) => {
        event.currentTarget.hidden = true
        onError?.(event)
      }}
      {...props}
    />
  )
}
