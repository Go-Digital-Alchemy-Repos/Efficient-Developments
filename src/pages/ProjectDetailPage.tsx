import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { ModalCloseButton } from '../components/ui/ModalCloseButton'
import { projects } from '../data/projects'

export function ProjectDetailPage() {
  const { projectSlug } = useParams()
  if (projectSlug === 'n-rocky-river-road-roundabout') {
    return <Navigate replace to="/projects/n-rocky-river-rd-lawyers-rd-roundabout" />
  }
  const projectIndex = projects.findIndex((project) => project.slug === projectSlug)
  if (projectIndex < 0) return <Navigate replace to="/projects" />
  return <ProjectDetailContent key={projectSlug} projectIndex={projectIndex} />
}

function ProjectDetailContent({ projectIndex }: { projectIndex: number }) {
  const project = projects[projectIndex]
  const galleryImages = project.gallery
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const overviewImage = galleryImages[0] ?? project.hero
  const [galleryStart, setGalleryStart] = useState(0)
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(4)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const lightboxDialogRef = useRef<HTMLElement>(null)
  const isLightboxOpen = lightboxIndex !== null
  const visibleGallery = useMemo(
    () => galleryImages.slice(galleryStart, galleryStart + visibleGalleryCount),
    [galleryImages, galleryStart, visibleGalleryCount],
  )
  const maxGalleryStart = Math.max(0, galleryImages.length - visibleGalleryCount)

  useEffect(() => {
    const updateCount = () => {
      const nextCount = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4
      setVisibleGalleryCount(nextCount)
      setGalleryStart((value) => Math.min(value, Math.max(0, galleryImages.length - nextCount)))
    }
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [galleryImages.length])

  useEffect(() => {
    if (!isLightboxOpen) return
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowLeft') setLightboxIndex((value) => value === null ? null : Math.max(0, value - 1))
      if (event.key === 'ArrowRight') setLightboxIndex((value) => value === null ? null : Math.min(galleryImages.length - 1, value + 1))
      if (event.key === 'Tab') {
        const controls = [...(lightboxDialogRef.current?.parentElement?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])]
        if (!controls.length) return
        const activeIndex = controls.indexOf(document.activeElement as HTMLButtonElement)
        const nextIndex = event.shiftKey
          ? (activeIndex <= 0 ? controls.length - 1 : activeIndex - 1)
          : (activeIndex + 1) % controls.length
        event.preventDefault()
        controls[nextIndex].focus()
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    lightboxCloseRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [galleryImages.length, isLightboxOpen])

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
          <img data-reveal-item {...project.hero} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1440px) calc(100vw - 144px), 1296px" fetchPriority="high" />
        </section>
      </Container>

      <Container data-reveal-sequence>
        <section className="project-overview" aria-labelledby="project-overview-title">
          <aside className="project-facts" aria-labelledby="project-facts-title">
            <h2 data-reveal-item id="project-facts-title">At a Glance</h2>
            <div className="project-facts__divider" />
            <dl data-reveal-delay="2" data-reveal-item>
              <div><dt>Project Name</dt><dd>{project.title}</dd></div>
              <div><dt>{project.clientLabel}</dt><dd>{project.client}</dd></div>
              {project.location && <div><dt>Location</dt><dd>{project.location}</dd></div>}
              <div><dt>Project Type</dt><dd>{project.category}</dd></div>
            </dl>
            <div className="project-facts__divider" />
            <Link data-reveal-delay="4" data-reveal-item to="/projects">← Return to Portfolio</Link>
          </aside>

          <article className="project-overview__content">
            <h2 data-reveal-delay="1" data-reveal-item id="project-overview-title">Project Overview</h2>
            <p data-reveal-delay="3" data-reveal-item>{project.description}</p>
            <h2 data-reveal-delay="5" data-reveal-item>Type of Work</h2>
            <p data-reveal-delay="6" data-reveal-item>{project.work}</p>
            <img className="project-overview__media" data-reveal-delay="8" data-reveal-item {...overviewImage} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 60vw, 757px" loading="lazy" decoding="async" />
          </article>
        </section>
      </Container>

      {galleryImages.length > 0 && <section className="project-gallery" aria-label="Project photos" data-reveal-sequence>
        <Container className="project-gallery__inner">
          <button className="project-gallery__arrow" data-reveal-item disabled={galleryStart === 0} onClick={() => setGalleryStart((value) => value - 1)} type="button" aria-label="Previous photos">‹</button>
          <div className="project-gallery__row" style={{ gridTemplateColumns: `repeat(${visibleGallery.length}, minmax(0, 1fr))` }}>
            {visibleGallery.map((image, index) => (
              <button className="project-gallery__image" data-reveal-delay={String(index + 1)} data-reveal-item key={image.src} onClick={() => setLightboxIndex(galleryStart + index)} type="button" aria-label={`Enlarge project photo ${galleryStart + index + 1}`}>
                <img {...image} sizes="(max-width: 767px) calc(100vw - 112px), (max-width: 1023px) 40vw, 280px" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <button className="project-gallery__arrow" data-reveal-delay={String(visibleGallery.length + 1)} data-reveal-item disabled={galleryStart === maxGalleryStart} onClick={() => setGalleryStart((value) => value + 1)} type="button" aria-label="Next photos">›</button>
        </Container>
      </section>}

      <nav className="project-sequence" aria-label="Adjacent projects" data-reveal-sequence>
        <Link className="project-sequence__item project-sequence__item--previous" data-reveal-item to={`/projects/${previousProject.slug}`}>
          <img {...previousProject.image} alt="" sizes="220px" loading="lazy" decoding="async" />
          <span><small>← Previous Project</small><strong>{previousProject.title}</strong></span>
        </Link>
        <Link className="project-sequence__item project-sequence__item--next" data-reveal-delay="1" data-reveal-item to={`/projects/${nextProject.slug}`}>
          <span><small>Next Project →</small><strong>{nextProject.title}</strong></span>
          <img {...nextProject.image} alt="" sizes="220px" loading="lazy" decoding="async" />
        </Link>
      </nav>
      <div className="project-stripes" aria-hidden="true" />

      {lightboxIndex !== null && (
        <div className="project-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null) }}>
          <section aria-label={`Enlarged project photo ${lightboxIndex + 1} of ${galleryImages.length}`} aria-modal="true" className="project-lightbox__dialog" ref={lightboxDialogRef} role="dialog">
            <div className="project-lightbox__content">
              <img {...galleryImages[lightboxIndex]} sizes="(max-width: 1244px) calc(100vw - 144px), 1100px" />
            </div>
            <button aria-label="Previous project image" className="project-gallery__arrow project-lightbox__arrow project-lightbox__arrow--previous" disabled={lightboxIndex === 0} onClick={() => setLightboxIndex((value) => value === null ? null : value - 1)} type="button">‹</button>
            <ModalCloseButton className="modal-close--project-lightbox" aria-label="Close enlarged photo" onClick={() => setLightboxIndex(null)} ref={lightboxCloseRef} />
            <button aria-label="Next project image" className="project-gallery__arrow project-lightbox__arrow project-lightbox__arrow--next" disabled={lightboxIndex === galleryImages.length - 1} onClick={() => setLightboxIndex((value) => value === null ? null : value + 1)} type="button">›</button>
          </section>
        </div>
      )}
    </main>
  )
}
