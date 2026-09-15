import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, projectCategories, type ProjectCategory } from '../data/projects'

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
      <section className="projects-index" aria-labelledby="projects-title">
        <header className="projects-index__header">
          <h1 id="projects-title">Projects</h1>
          <p>Explore our portfolio of civil infrastructure projects across the Carolinas. From highway interchanges<br className="projects-index__desktop-break" /> to underground utilities, each project reflects our commitment to quality, safety, and on-time delivery.</p>
        </header>

        <div className="project-filters" aria-label="Filter projects">
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
          {visibleProjects.map((project) => (
            <Link className="project-card" key={project.slug} to={`/projects/${project.slug}`}>
              <span className="project-card__media">
                <img src={project.image} alt="" />
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
          <nav className="project-pagination" aria-label="Project pages">
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
      </section>
    </main>
  )
}
