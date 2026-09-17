import { ServiceAreaMap } from '../components/maps/ServiceAreaMap'
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { StatCounter } from '../components/motion/StatCounter'
import { TestimonialCarousel } from '../components/sections/TestimonialCarousel'
import { ButtonLink } from '../components/ui/Button'
import { Eyebrow, Heading } from '../components/ui/Typography'
import { serviceHeroImages } from '../data/serviceImages'
import { featuredProject } from '../data/projects'

const services = [
  {
    title: 'Asphalt Paving',
    description: 'Full-depth paving, resurfacing, and maintenance for roads, parking lots, and driveways.',
    image: serviceHeroImages['asphalt-paving'],
    to: '/services/asphalt-paving',
  },
  {
    title: 'Commercial Concrete',
    description: 'Slabs, foundations, sidewalks, curbs, and loading areas for commercial and municipal sites.',
    image: serviceHeroImages['commercial-concrete'],
    to: '/services/commercial-concrete',
  },
  {
    title: 'Residential Concrete',
    description: 'Concrete flatwork for housing developments, estates, and large residential properties.',
    image: serviceHeroImages['residential-concrete'],
    to: '/services/residential-concrete',
  },
  {
    title: 'Greenways',
    description: 'Shared-use paths, trails, and pedestrian infrastructure for communities.',
    image: serviceHeroImages.greenways,
    to: '/services/greenways',
  },
  {
    title: 'Roads & Bridges',
    description: 'Road and bridge construction for municipalities and DOT projects across the Carolinas.',
    image: serviceHeroImages['roads-bridges'],
    to: '/services/roads-bridges',
  },
  {
    title: 'Underground Utilities',
    description: 'Water, sewer, and storm line installation for municipalities and developments.',
    image: serviceHeroImages['underground-utilities'],
    to: '/services/underground-utilities',
  },
]

const clientTypes = [
  'Municipalities',
  'Government Agencies',
  'Housing Developers',
  'Large Property Owners',
  'Educational Institutions',
  'Architects',
  'Civil Engineers',
  'Trade Partners',
]

const expectations = [
  {
    title: 'Work Built to Last',
    description: 'Civil infrastructure constructed to stand up to decades of public use.',
    icon: '/assets/icons/shield.svg',
  },
  {
    title: 'Budget Discipline',
    description: 'Careful estimating and cost tracking from first bid to final invoice.',
    icon: '/assets/icons/dollar-sign.svg',
  },
  {
    title: 'A Single Point of Responsibility',
    description: 'One contractor accountable for the entire scope of work.',
    icon: '/assets/icons/user-check.svg',
  },
  {
    title: 'A Safe Jobsite',
    description: 'Safety practices guide every decision on our sites.',
    icon: '/assets/icons/hard-hat.svg',
  },
]

const workPrinciples = [
  {
    title: 'Self-Performed Work',
    description: 'Our own crews handle grading, paving, concrete, and utility installation - keeping scheduling and quality control under one roof.',
  },
  {
    title: 'One Contract, One Contractor',
    description: 'One contractor remains accountable for the full scope of work, giving every phase one clear owner.',
  },
  {
    title: 'Experienced Management',
    description: 'Experienced leadership keeps crews, schedules, and quality standards aligned from planning through completion.',
  },
  {
    title: 'Thorough Estimating',
    description: 'Detailed estimating establishes realistic scopes, schedules, and budgets before work begins.',
  },
  {
    title: 'Clear Communication',
    description: 'Straightforward communication keeps owners, partners, and crews informed throughout every phase.',
  },
]

function ArrowIcon() {
  return <img className="cta-arrow" aria-hidden="true" src="/assets/icons/cta-arrow.svg" alt="" />
}

export function HomePage() {
  const servicesViewportRef = useRef<HTMLDivElement>(null)
  const servicesSliderRef = useRef<HTMLInputElement>(null)
  const [servicesScroll, setServicesScroll] = useState(0)
  const [servicesThumbWidth, setServicesThumbWidth] = useState(298)
  const [activeWorkPrinciple, setActiveWorkPrinciple] = useState<number | null>(0)

  const syncServicesSlider = useCallback(() => {
    const viewport = servicesViewportRef.current
    const slider = servicesSliderRef.current

    if (!viewport || !slider) return

    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    setServicesScroll(maxScroll > 0 ? (viewport.scrollLeft / maxScroll) * 100 : 0)
    setServicesThumbWidth(Math.max(40, slider.clientWidth * (viewport.clientWidth / viewport.scrollWidth)))
  }, [])

  useEffect(() => {
    syncServicesSlider()

    const viewport = servicesViewportRef.current
    const slider = servicesSliderRef.current
    if (!viewport || !slider) return

    const observer = new ResizeObserver(syncServicesSlider)
    observer.observe(viewport)
    observer.observe(slider)

    return () => observer.disconnect()
  }, [syncServicesSlider])

  const handleServicesSlider = (value: number) => {
    const viewport = servicesViewportRef.current
    if (!viewport) return

    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    viewport.scrollLeft = maxScroll * (value / 100)
    setServicesScroll(value)
  }

  const servicesSliderStyle = {
    '--services-slider-thumb-width': `${servicesThumbWidth}px`,
  } as CSSProperties

  return (
    <main id="main-content" className="home-page">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__shade" />
        <div className="home-hero__content" data-reveal-sequence>
          <Heading as="h1" data-reveal-item id="home-hero-title" size="hero">
            Heavy Civil<br />
            Infrastructure Contractor<br />
            <span>Serving the Carolinas</span>
          </Heading>
          <p data-reveal-delay="1" data-reveal-item>Asphalt, concrete, utilities, greenways, and road &amp; bridge work — self-performed by our own crews under a single contract.</p>
        </div>
      </section>

      <section className="home-intro" aria-label="Company introduction">
        <p data-reveal>
          <strong>Efficient Developments is a heavy highway and civil contractor serving municipalities, government agencies, and developers across the Carolinas.</strong>{' '}
          We self-perform asphalt paving, concrete work, underground utilities, greenway construction, and road and bridge work — managing every phase of a project with our own crews under a single contract.
        </p>
      </section>

      <section className="how-we-work" aria-labelledby="how-we-work-title" data-reveal-sequence>
        <img className="how-we-work__image" data-reveal-item src="/assets/images/home-how-we-work.jpg" alt="Road paving crew operating heavy equipment" />
        <div className="how-we-work__content">
          <div className="how-we-work__content-inner">
            <div className="how-we-work__heading">
              <Eyebrow data-reveal-delay="1" data-reveal-item>How We Work</Eyebrow>
              <Heading data-reveal-delay="2" data-reveal-item id="how-we-work-title">Building With Purpose &amp; Precision</Heading>
              <p data-reveal-delay="3" data-reveal-item>Our own crews handle every discipline - from grading and paving to concrete and utility installation - keeping scheduling and quality control under one roof.</p>
            </div>
            <ButtonLink data-reveal-delay="4" data-reveal-item to="/about">Learn More <ArrowIcon /></ButtonLink>
            <div className="work-principles">
              {workPrinciples.map((item, index) => {
                const isActive = activeWorkPrinciple === index
                const panelId = `work-principle-panel-${index}`

                return (
                  <article className={`work-principle${isActive ? ' is-active' : ''}`} data-reveal-delay={String(index + 5)} data-reveal-item key={item.title}>
                    <button
                      aria-controls={panelId}
                      aria-expanded={isActive}
                      className="work-principle__trigger"
                      onClick={() => setActiveWorkPrinciple(isActive ? null : index)}
                      type="button"
                    >
                      <Heading as="h3" size="card">{item.title}</Heading>
                      <span className="work-principle__indicator" aria-hidden="true">{isActive ? '−' : '↗'}</span>
                    </button>
                    <div className="work-principle__panel" id={panelId} aria-hidden={!isActive}>
                      <div><p>{item.description}</p></div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="home-services" aria-labelledby="home-services-title" data-reveal-sequence>
        <div className="home-section-heading home-section-heading--center">
          <Eyebrow data-reveal-item>Services</Eyebrow>
          <Heading data-reveal-delay="1" data-reveal-item id="home-services-title">Our Heavy<br />Construction Services</Heading>
          <p data-reveal-delay="2" data-reveal-item>Paving, concrete, utilities, greenways, and bridge work - performed by our own crews.</p>
        </div>
        <div className="services-carousel">
          <div
            aria-label="Service cards"
            className="services-carousel__viewport"
            onScroll={syncServicesSlider}
            ref={servicesViewportRef}
            tabIndex={0}
          >
            <div className="services-carousel__row">
              {services.map((service, index) => (
                <Link className="service-card" data-reveal-delay={String(index + 3)} data-reveal-item to={service.to} key={service.title}>
                  <img src={service.image} alt="" />
                  <div className="service-card__panel">
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <span className="service-card__arrow" aria-hidden="true"><img src="/assets/icons/chevron.svg" alt="" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <input
            aria-label="Scroll through services"
            className="services-carousel__slider"
            data-reveal-delay="9"
            data-reveal-item
            max="100"
            min="0"
            onChange={(event) => handleServicesSlider(Number(event.currentTarget.value))}
            ref={servicesSliderRef}
            step="0.1"
            style={servicesSliderStyle}
            type="range"
            value={servicesScroll}
          />
        </div>
      </section>

      <section className="who-we-work-with" aria-labelledby="who-title" data-reveal-sequence>
        <div className="client-list">
          {clientTypes.map((client, index) => (
            <div className="client-list__item" data-reveal-delay={String(index)} data-reveal-item key={client}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{client}</h3>
            </div>
          ))}
        </div>
        <div className="who-we-work-with__image">
          <img data-reveal-delay="8" data-reveal-item src="/assets/images/home-who-we-work-with.png" alt="Civil construction site serving a growing community" />
          <div className="who-we-work-with__overlay">
            <Eyebrow className="eyebrow--on-dark" data-reveal-delay="9" data-reveal-item>Who We Work With</Eyebrow>
            <Heading data-reveal-delay="10" data-reveal-item id="who-title">Building For Those Who Build Communities</Heading>
            <p data-reveal-delay="11" data-reveal-item>From municipal governments to private developers, we partner with organizations that shape the built environment. Our expertise spans public infrastructure, commercial construction, and residential development.</p>
          </div>
        </div>
      </section>

      <section className="expectations" aria-labelledby="expectations-title" data-reveal-sequence>
        <div className="expectations__inner">
          <div className="home-section-heading home-section-heading--center">
            <Eyebrow data-reveal-item>What To Expect</Eyebrow>
            <Heading data-reveal-delay="1" data-reveal-item id="expectations-title">What To Expect<br />On Every Project</Heading>
            <p data-reveal-delay="2" data-reveal-item>A consistent experience across every project: durable construction, transparent budgeting, clear accountability, and a safe jobsite.</p>
            <ButtonLink data-reveal-delay="3" data-reveal-item to="/contact">Contact Us <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <div className="expectations__grid">
            {expectations.map((expectation, index) => (
              <article className="expectation-card" data-reveal-delay={String(index + 4)} data-reveal-item key={expectation.title}>
                <img src={expectation.icon} alt="" aria-hidden="true" />
                <Heading as="h3" size="card">{expectation.title}</Heading>
                <p>{expectation.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-project" aria-labelledby="featured-title" data-reveal-sequence>
        <div className="featured-project__inner">
          <div className="featured-project__header">
            <div>
              <Eyebrow data-reveal-item>Featured Project</Eyebrow>
              <Heading data-reveal-delay="1" data-reveal-item id="featured-title">Take a look at our most recent project</Heading>
            </div>
            <ButtonLink data-reveal-delay="2" data-reveal-item to="/projects">View Portfolio <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <div className="featured-project__body">
            <img className="featured-project__image" data-reveal-delay="3" data-reveal-item {...featuredProject.image} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 96px), 60vw" loading="lazy" decoding="async" />
            <div className="featured-project__content">
              <div>
                <Heading as="h3" data-reveal-delay="4" data-reveal-item size="card">{featuredProject.title}</Heading>
                <p data-reveal-delay="5" data-reveal-item>{featuredProject.description}</p>
                <ButtonLink data-reveal-delay="6" data-reveal-item variant="dark" to={`/projects/${featuredProject.slug}`}>View Project <span aria-hidden="true">↗</span></ButtonLink>
              </div>
              <div className="project-stats" data-statistics>
                <div data-reveal-delay="7" data-reveal-item><strong><StatCounter value="600+" /></strong><span>Projects Built</span></div>
                <div data-reveal-delay="8" data-reveal-item><strong><StatCounter delay={180} value="30+" /></strong><span>Years Experience</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial" aria-labelledby="testimonial-title" data-reveal-sequence>
        <div className="testimonial__shade" />
        <Heading data-reveal-item id="testimonial-title">What Our Clients Say</Heading>
        <TestimonialCarousel />
      </section>

      <section className="service-area" aria-labelledby="service-area-title" data-reveal-sequence>
        <div className="service-area__content">
          <Eyebrow className="eyebrow--on-dark" data-reveal-item>Service Area</Eyebrow>
          <Heading data-reveal-delay="1" data-reveal-item id="service-area-title">Serving Communities Across The Carolinas</Heading>
          <p data-reveal-delay="2" data-reveal-item>To discuss an upcoming project, get in touch with our team.</p>
          <ButtonLink data-reveal-delay="3" data-reveal-item to="/contact">Contact Us <span aria-hidden="true">↗</span></ButtonLink>
        </div>
        <ServiceAreaMap />
      </section>
    </main>
  )
}
