import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { projects, projectCategories, type ProjectCategory } from '../data/projects'
import { Seo } from '../components/seo/Seo'

const pageSize = 6

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All')
  const [page, setPage] = useState(1)
  const filteredProjects = useMemo(
    () => activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  )
  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / pageSize))
  const visibleProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize)

  return (
    <main id="main-content" className="projects-page">
      <Seo path="/projects" title="Projects" image={projects[0]?.image.src} description="Explore Efficient Developments road, concrete, utility, drainage, and civil infrastructure projects across the Carolinas." />
      <section className="projects-index" aria-labelledby="projects-title" data-reveal-sequence>
        <Container>
          <header className="projects-index__header">
            <h1 data-reveal-item id="projects-title">Projects</h1>
            <p data-reveal-delay="1" data-reveal-item>Explore our portfolio of civil infrastructure projects across the Carolinas. From highway interchanges<br className="projects-index__desktop-break" /> to underground utilities, each project reflects our commitment to quality, safety, and on-time delivery.</p>
          </header>

          <div className="project-filters" aria-label="Filter projects" data-reveal-delay="2" data-reveal-item>
            {(['All', ...projectCategories] as const).map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className="project-filter"
                data-active={activeCategory === category || undefined}
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setPage(1)
                }}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="project-grid" aria-live="polite">
            {visibleProjects.map((project, index) => (
              <Link className="project-card" data-reveal-delay={String(index + 3)} data-reveal-item key={project.slug} to={`/projects/${project.slug}`}>
                <span className="project-card__media">
                  <img {...project.image} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc((100vw - 96px) / 2), (max-width: 1440px) calc((100vw - 192px) / 3), 416px" loading="lazy" decoding="async" />
                </span>
                <span className="project-card__content">
                  <span className="project-card__category">{project.category}</span>
                  <span className="project-card__divider" />
                  <span className="project-card__title-row">
                    <span className="project-card__title">{project.title}</span>
                    <span aria-hidden="true" className="project-card__arrow">↗</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="project-pagination" aria-label="Project pages" data-reveal-delay="9" data-reveal-item>
              <button disabled={page === 1} onClick={() => setPage((value) => value - 1)} type="button" aria-label="Previous project page">←</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  aria-current={page === pageNumber ? 'page' : undefined}
                  data-active={page === pageNumber || undefined}
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  type="button"
                >
                  {pageNumber}
                </button>
              ))}
              <button disabled={page === pageCount} onClick={() => setPage((value) => value + 1)} type="button" aria-label="Next project page">→</button>
            </nav>
          )}
        </Container>
      </section>
    </main>
  )
}
