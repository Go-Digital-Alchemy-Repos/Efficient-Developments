import { projects } from '../data/projects'
import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { Eyebrow, Heading } from '../components/ui/Typography'
import { useJobs } from '../lib/careers'

const heroImage = projects.find((project) => project.slug === 'intersections-of-lawyers-rd-at-indian-trail-fairview-rd')!.hero

export function CareersPage() {
  const { jobs, loading, error } = useJobs()
  const openCount = jobs.length
  return (
    <main id="main-content" className="careers-page careers-page--landing">
      <header className="careers-hero">
        <img className="careers-hero__image" src={heroImage.src} srcSet={heroImage.srcSet} sizes="100vw" width={heroImage.width} height={heroImage.height} alt={heroImage.alt} fetchPriority="high" />
        <Container>
        <div className="careers-heading careers-hero__content">
          <Eyebrow className="eyebrow--on-dark">Careers</Eyebrow>
          <Heading as="h1" size="page">Build your future.<br />Build our communities.</Heading>
          <p>Bring your skills to the roads, utilities, and infrastructure that keep the Carolinas moving. Explore opportunities with Efficient Developments.</p>
        </div>
        </Container>
      </header>
      <Container>
        <section className="careers-openings" aria-labelledby="open-positions">
          <div className="careers-section-heading"><Heading as="h2" id="open-positions">Find your next role</Heading><span>{!loading && !error && `${openCount} open ${openCount === 1 ? 'position' : 'positions'}`}</span></div>
          {loading && <p role="status">Loading opportunities…</p>}
          {error && <p role="alert" className="careers-notice">{error} <button type="button" onClick={() => window.location.reload()}>Try again</button></p>}
          {!loading && !error && jobs.length === 0 && <p className="careers-notice">There are no open positions right now. Please check back for new opportunities.</p>}
          <div className="careers-job-grid">
            {jobs.map((job) => <Link aria-label={`View ${job.title} role and apply`} className="careers-job-card" key={job.id} to={`/careers/${job.id}`}>
              <div className="careers-job-meta"><span>{job.department}</span></div>
              <Heading as="h3" size="card">{job.title}</Heading>
              <p className="careers-job-location">{job.location}<br />{job.employment}</p>
              <p className="careers-job-summary">{job.description}</p>
              <span className="careers-job-link">View role &amp; apply <span aria-hidden="true">↗</span></span>
            </Link>)}
          </div>
        </section>
        <div className="careers-manage-link"><Link to="/careers/manage">Client sign in</Link></div>
      </Container>
    </main>
  )
}
