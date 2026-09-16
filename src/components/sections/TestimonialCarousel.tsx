import { useEffect, useState } from 'react'

type Testimonial = {
  quote: string
  author: string
  title: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Efficient Developments stepped in when our project schedule was failing due to poor trade coordination. Their disciplined team took extreme ownership of the site and self-performed the critical path work to get us back on track. We finally found a partner who values precision as much as we do.',
    author: 'Marcus Thorne',
    title: 'Senior Director of Facilities',
  },
  {
    quote: 'Placeholder testimonial: Efficient Developments brought dependable communication, careful coordination, and a clear commitment to quality throughout our project. Their team kept the work moving and delivered with the professionalism we expected.',
    author: 'Client Name',
    title: 'Client Title',
  },
]

const autoplayInterval = 6500

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length)
    }, autoplayInterval)

    return () => window.clearInterval(interval)
  }, [isPaused, prefersReducedMotion])

  return (
    <div
      className="testimonial-carousel"
      data-reveal-delay="1"
      data-reveal-item
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
      role="region"
      aria-label="Client testimonials"
    >
      <div className="testimonial-carousel__viewport">
        <div
          className="testimonial-carousel__track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {testimonials.map((testimonial, index) => (
            <blockquote
              className="testimonial-carousel__slide"
              key={testimonial.author}
              aria-hidden={index !== activeIndex}
            >
              <p>“{testimonial.quote}”</p>
              <footer>
                <span>{testimonial.author}</span>
                <span aria-hidden="true"> - </span>
                <span>{testimonial.title}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      <div className="testimonial-carousel__pagination" role="group" aria-label="Choose a testimonial">
        {testimonials.map((testimonial, index) => (
          <button
            type="button"
            className="testimonial-carousel__dot"
            aria-label={`Show testimonial ${index + 1} from ${testimonial.author}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            key={testimonial.author}
          />
        ))}
      </div>
    </div>
  )
}
