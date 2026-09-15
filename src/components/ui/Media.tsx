import type { ImgHTMLAttributes } from 'react'

type MediaProps = ImgHTMLAttributes<HTMLImageElement> & {
  fit?: 'contain' | 'cover'
  aspectRatio?: string
  focalPosition?: string
}

export function Media({
  alt,
  aspectRatio,
  className = '',
  fit = 'contain',
  focalPosition = '50% 50%',
  ...props
}: MediaProps) {
  return (
    <span className={`media media--${fit} ${className}`.trim()} style={{ aspectRatio }}>
      <img alt={alt} style={{ objectPosition: focalPosition }} {...props} />
    </span>
  )
}
