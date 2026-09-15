import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'
import { Eyebrow, Heading } from '../components/ui/Typography'

const services = [
  {
    title: 'Asphalt Paving',
    description: 'Full-depth paving, resurfacing, and maintenance for roads, parking lots, and driveways.',
    image: '/assets/images/service-asphalt.png',
    to: '/services/asphalt-paving',
  },
  {
    title: 'Commercial Concrete',
    description: 'Slabs, foundations, sidewalks, curbs, and loading areas for commercial and municipal sites.',
    image: '/assets/images/service-commercial-concrete.png',
    to: '/services/commercial-concrete',
  },
  {
    title: 'Residential Concrete',
    description: 'Concrete flatwork for housing developments, estates, and large residential properties.',
    image: '/assets/images/service-residential-concrete.png',
    to: '/services/residential-concrete',
  },
  {
    title: 'Greenways',
    description: 'Shared-use paths, trails, and pedestrian infrastructure for communities.',
    image: '/assets/images/service-greenways.png',
    to: '/services/greenways',
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

function ArrowIcon() {
  return <img className="cta-arrow" aria-hidden="true" src="/assets/icons/cta-arrow.svg" alt="" />
}

export function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__shade" />
        <div className="home-hero__content">
          <Heading as="h1" id="home-hero-title" size="hero">
            Heavy Civil<br />
            Infrastructure Contractor<br />
            <span>Serving the Carolinas</span>
          </Heading>
          <p>Asphalt, concrete, utilities, greenways, and road &amp; bridge work — self-performed by our own crews under a single contract.</p>
        </div>
      </section>

      <section className="home-intro" aria-label="Company introduction">
        <p>
          <strong>Efficient Developments is a heavy highway and civil contractor serving municipalities, government agencies, and developers across the Carolinas.</strong>{' '}
          We self-perform asphalt paving, concrete work, underground utilities, greenway construction, and road and bridge work — managing every phase of a project with our own crews under a single contract.
        </p>
      </section>

      <section className="how-we-work" aria-labelledby="how-we-work-title">
        <img className="how-we-work__image" src="/assets/images/home-how-we-work.png" alt="Road paving crew operating heavy equipment" />
        <div className="how-we-work__content">
          <div className="how-we-work__heading">
            <Eyebrow>How We Work</Eyebrow>
            <Heading id="how-we-work-title">Building With Purpose &amp; Precision</Heading>
            <p>Our own crews handle every discipline - from grading and paving to concrete and utility installation - keeping scheduling and quality control under one roof.</p>
          </div>
          <ButtonLink to="/about">Learn More <ArrowIcon /></ButtonLink>
          <div className="work-principles">
            <article className="work-principle work-principle--active">
              <Heading as="h3" size="card">Self-Performed Work</Heading>
              <p>Our own crews handle grading, paving, concrete, and utility installation - keeping scheduling and quality control under one roof.</p>
            </article>
            {['One Contract, One Contractor', 'Experienced Management', 'Thorough Estimating', 'Clear Communication'].map((item) => (
              <article className="work-principle" key={item}>
                <Heading as="h3" size="card">{item}</Heading>
                <span aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-services" aria-labelledby="home-services-title">
        <div className="home-section-heading home-section-heading--center">
          <Eyebrow>Services</Eyebrow>
          <Heading id="home-services-title">Our Heavy<br />Construction Services</Heading>
          <p>Paving, concrete, utilities, greenways, and bridge work - performed by our own crews.</p>
        </div>
        <div className="services-carousel">
          <div className="services-carousel__row">
            {services.map((service) => (
              <Link className="service-card" to={service.to} key={service.title}>
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
          <img className="services-carousel__bar" src="/assets/icons/slider-bar.svg" alt="" aria-hidden="true" />
        </div>
      </section>

      <section className="who-we-work-with" aria-labelledby="who-title">
        <div className="client-list">
          {clientTypes.map((client, index) => (
            <div className="client-list__item" key={client}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{client}</h3>
            </div>
          ))}
        </div>
        <div className="who-we-work-with__image">
          <img src="/assets/images/home-who-we-work-with.png" alt="Civil construction site serving a growing community" />
          <div className="who-we-work-with__overlay">
            <p>Who We Work With</p>
            <Heading id="who-title">Building For Those Who Build Communities</Heading>
            <p>From municipal governments to private developers, we partner with organizations that shape the built environment. Our expertise spans public infrastructure, commercial construction, and residential development.</p>
          </div>
        </div>
      </section>

      <section className="expectations" aria-labelledby="expectations-title">
        <div className="home-section-heading home-section-heading--center">
          <Eyebrow>What To Expect</Eyebrow>
          <Heading id="expectations-title">What To Expect<br />On Every Project</Heading>
          <p>A consistent experience across every project: durable construction, transparent budgeting, clear accountability, and a safe jobsite.</p>
          <ButtonLink to="/contact">Contact Us <span aria-hidden="true">↗</span></ButtonLink>
        </div>
        <div className="expectations__grid">
          {expectations.map((expectation) => (
            <article className="expectation-card" key={expectation.title}>
              <img src={expectation.icon} alt="" aria-hidden="true" />
              <Heading as="h3" size="card">{expectation.title}</Heading>
              <p>{expectation.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="featured-project" aria-labelledby="featured-title">
        <div className="featured-project__header">
          <div>
            <Eyebrow>Featured Project</Eyebrow>
            <Heading id="featured-title">Take a look at our most recent project</Heading>
          </div>
          <ButtonLink to="/projects">View Portfolio <span aria-hidden="true">↗</span></ButtonLink>
        </div>
        <div className="featured-project__body">
          <img className="featured-project__image" src="/assets/images/home-featured-project.png" alt="N. Rocky River Road and Lawyers Road roundabout under construction" />
          <div className="featured-project__content">
            <div>
              <Heading as="h3" size="card">N. Rocky River Rd / Lawyers Rd Roundabout</Heading>
              <p>The N. Rocky River Rd / Lawyers Rd Roundabout project was a complex infrastructure development designed to improve traffic flow and safety in the region. Our team managed the excavation, grading, and asphalt paving, ensuring a seamless transition for commuters and local residents. This project showcases our expertise in heavy civil construction and our commitment to delivering high-quality results on time.</p>
              <ButtonLink variant="dark" to="/projects/n-rocky-river-road-roundabout">View Project <span aria-hidden="true">↗</span></ButtonLink>
            </div>
            <div className="project-stats">
              <div><strong>600+</strong><span>Projects Built</span></div>
              <div><strong>30+</strong><span>Years Experience</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial" aria-labelledby="testimonial-title">
        <div className="testimonial__shade" />
        <Heading id="testimonial-title">What Our Clients Say</Heading>
        <blockquote>
          <p>“Efficient Developments stepped in when our project schedule was failing due to poor trade coordination. Their disciplined team took extreme ownership of the site and self-performed the critical path work to get us back on track. We finally found a partner who values precision as much as we do.”</p>
          <footer>Marcus Thorne - Senior Director of Facilities</footer>
        </blockquote>
        <img src="/assets/icons/carousel-dots.svg" alt="" aria-hidden="true" />
      </section>

      <section className="service-area" aria-labelledby="service-area-title">
        <div className="service-area__content">
          <Eyebrow>Service Area</Eyebrow>
          <Heading id="service-area-title">Serving Communities Across The Carolinas</Heading>
          <p>To discuss an upcoming project, get in touch with our team.</p>
          <ButtonLink to="/contact">Contact Us <span aria-hidden="true">↗</span></ButtonLink>
        </div>
        <img className="service-area__map" src="/assets/images/home-service-area-map.png" alt="Map of the Efficient Developments service area across the Carolinas" />
      </section>
    </main>
  )
}
