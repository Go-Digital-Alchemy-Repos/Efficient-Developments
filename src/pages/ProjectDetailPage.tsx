import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { ModalCloseButton } from '../components/ui/ModalCloseButton'
import { projects } from '../data/projects'

const galleryImages = [
  '/assets/images/projects/detail/gallery-01.jpg',
  '/assets/images/projects/detail/gallery-02.jpg',
  '/assets/images/projects/detail/gallery-03.jpg',
  '/assets/images/projects/detail/gallery-04.jpg',
  '/assets/images/projects/detail/hero-project-detail.jpg',
  '/assets/images/projects/detail/at-a-glance.jpg',
]

export function ProjectDetailPage() {
  const { projectSlug = projects[0].slug } = useParams()
  const projectIndex = Math.max(0, projects.findIndex((project) => project.slug === projectSlug))
  const project = projects[projectIndex]
  const previousProject = projectIndex === 0
    ? projects.find((item) => item.slug === 'cms-bus-facility') ?? projects.at(-1)!
    : projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projectIndex === 0
    ? projects.find((item) => item.slug === 'beatties-ford-road-sidewalk') ?? projects[1]
    : projects[(projectIndex + 1) % projects.length]
  const [galleryStart, setGalleryStart] = useState(0)
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(4)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const visibleGallery = useMemo(
    () => galleryImages.slice(galleryStart, galleryStart + visibleGalleryCount),
    [galleryStart, visibleGalleryCount],
  )
  const maxGalleryStart = galleryImages.length - visibleGalleryCount

  useEffect(() => {
    const updateCount = () => {
      const nextCount = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4
      setVisibleGalleryCount(nextCount)
      setGalleryStart((value) => Math.min(value, galleryImages.length - nextCount))
    }
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [])

  useEffect(() => {
    if (!lightboxImage) return
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null)
      if (event.key === 'Tab') {
        event.preventDefault()
        lightboxCloseRef.current?.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    lightboxCloseRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxImage])

  return (
    <main id="main-content" className="project-detail-page">
      <Container data-reveal-sequence>
        <header className="project-detail-heading">
          <p data-reveal-item><span aria-hidden="true" />{project.category}</p>
          <h1 data-reveal-delay="1" data-reveal-item>{project.title}</h1>
        </header>
      </Container>

      <Container data-reveal-sequence>
        <section className="project-detail-hero" aria-label={`${project.title} overview image`}>
          <img data-reveal-item src={projectIndex === 0 ? '/assets/images/projects/detail/hero-project-detail.jpg' : project.image} alt="" />
        </section>
      </Container>

      <Container data-reveal-sequence>
        <section className="project-overview" aria-labelledby="project-overview-title">
          <aside className="project-facts" aria-labelledby="project-facts-title">
            <h2 data-reveal-item id="project-facts-title">At a Glance</h2>
            <div className="project-facts__divider" />
            <dl data-reveal-delay="2" data-reveal-item>
              <div><dt>Project Name</dt><dd>{project.title}</dd></div>
              <div><dt>Location</dt><dd>Charlotte, NC</dd></div>
              <div><dt>Duration</dt><dd>18 Months</dd></div>
              <div><dt>Project Type</dt><dd>Roads &amp; Bridges</dd></div>
              <div><dt>Status</dt><dd>Completed</dd></div>
            </dl>
            <div className="project-facts__divider" />
            <Link data-reveal-delay="4" data-reveal-item to="/projects">← Return to Portfolio</Link>
          </aside>

          <article className="project-overview__content">
            <h2 data-reveal-delay="1" data-reveal-item id="project-overview-title">Project Overview</h2>
            <p data-reveal-delay="3" data-reveal-item>Efficient Developments was awarded the contract for the Highway 74 Interchange reconstruction project in Charlotte, NC. This complex infrastructure project involved the complete redesign and rebuild of a critical interchange connecting Highway 74 with Interstate 485, serving over 80,000 vehicles daily.</p>
            <p data-reveal-delay="5" data-reveal-item>Our team managed all phases of the project including demolition of the existing interchange structure, earthwork and grading for the new alignment, construction of reinforced concrete bridge decks and abutments, installation of modern drainage systems, and integration of intelligent transportation systems.</p>
            <p data-reveal-delay="6" data-reveal-item>The project was completed on schedule within the 18-month timeline, maintaining traffic flow throughout construction through carefully planned detour routes and phased construction sequences. Safety remained our top priority with zero lost-time incidents recorded across the project lifecycle.</p>
            <p data-reveal-delay="7" data-reveal-item>Key achievements include the installation of 4 new bridge structures, over 12,000 linear feet of storm drainage, and 28,000 tons of asphalt paving. The new interchange design improves traffic capacity by 35% and significantly reduces accident rates at the intersection.</p>
            <img className="project-overview__media" data-reveal-delay="8" data-reveal-item src="/assets/images/projects/detail/at-a-glance.jpg" alt="Aerial view of the roundabout under construction" />
          </article>
        </section>
      </Container>

      <section className="project-gallery" aria-label="Project photos" data-reveal-sequence>
        <Container className="project-gallery__inner">
          <button className="project-gallery__arrow" data-reveal-item disabled={galleryStart === 0} onClick={() => setGalleryStart((value) => value - 1)} type="button" aria-label="Previous photos">‹</button>
          <div className="project-gallery__row">
            {visibleGallery.map((image, index) => (
              <button className="project-gallery__image" data-reveal-delay={String(index + 1)} data-reveal-item key={image} onClick={() => setLightboxImage(image)} type="button" aria-label={`Enlarge project photo ${galleryStart + index + 1}`}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <button className="project-gallery__arrow" data-reveal-delay={String(visibleGallery.length + 1)} data-reveal-item disabled={galleryStart === maxGalleryStart} onClick={() => setGalleryStart((value) => value + 1)} type="button" aria-label="Next photos">›</button>
        </Container>
      </section>

      <nav className="project-sequence" aria-label="Adjacent projects" data-reveal-sequence>
        <Link className="project-sequence__item project-sequence__item--previous" data-reveal-item to={`/projects/${previousProject.slug}`}>
          <img src="/assets/images/projects/detail/nav-prev.jpg" alt="" />
          <span><small>← Previous Project</small><strong>{previousProject.title}</strong></span>
        </Link>
        <Link className="project-sequence__item project-sequence__item--next" data-reveal-delay="1" data-reveal-item to={`/projects/${nextProject.slug}`}>
          <span><small>Next Project →</small><strong>{nextProject.title}</strong></span>
          <img src="/assets/images/projects/detail/nav-next.jpg" alt="" />
        </Link>
      </nav>
      <div className="project-stripes" aria-hidden="true" />

      {lightboxImage && (
        <div className="project-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxImage(null) }}>
          <section aria-label="Enlarged project photo" aria-modal="true" role="dialog">
            <img src={lightboxImage} alt="Enlarged project view" />
            <ModalCloseButton aria-label="Close enlarged photo" onClick={() => setLightboxImage(null)} ref={lightboxCloseRef} />
          </section>
        </div>
      )}
    </main>
  )
}
