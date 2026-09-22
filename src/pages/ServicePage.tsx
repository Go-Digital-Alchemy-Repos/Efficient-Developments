import { Navigate, NavLink, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'
import { Eyebrow, Heading } from '../components/ui/Typography'
import { serviceHeroImages } from '../data/serviceImages'

type ServiceCard = {
  description: string
  icon: string
  title: string
}

type ServicePageDefinition = {
  approach: string
  approachImage: string
  approachTitle: string
  cards: ServiceCard[]
  detailHeight: number
  detailTop: number
  heroImage: string
  heroPosition?: string
  overlayImage: string
  overlayTitleLines: [string, string]
  overview: string
  slug: string
  support: string
  title: string
}

const services: ServicePageDefinition[] = [
  {
    slug: 'asphalt-paving',
    title: 'Asphalt Paving',
    support: 'Quality paving for roads, parking lots, and driveways across the Carolinas.',
    heroImage: serviceHeroImages['asphalt-paving'],
    approachImage: '/assets/images/services/asphalt-paving-roadwork.jpg?v=20260922',
    overlayImage: '/assets/images/services/asphalt-paving-overlay.png',
    detailHeight: 958,
    detailTop: 80,
    overview: 'We build and resurface asphalt roads, parking lots, and driveways for municipalities, DOT projects, developers, and commercial sites. Our crews handle the full scope - subgrade preparation, base stone, and every lift of asphalt through the final surface course.',
    approachTitle: 'How We Approach Paving',
    approach: 'Good asphalt is the sum of a hundred decisions made before the first truck arrives - subgrade compaction, base depth, mix selection, and weather timing. We manage all of them with our own crews, so the finished surface carries heavy traffic and holds up for the long haul.',
    overlayTitleLines: ['Asphalt Services for', 'Every Project Type'],
    cards: [
      { title: 'Resurfacing', description: 'Milling and overlay work that restores worn pavement to a smooth driving surface.', icon: '/assets/icons/services/asphalt-paving-2.svg' },
      { title: 'Repair and Maintenance', description: 'Patching, crack sealing, and ongoing maintenance that extend pavement life.', icon: '/assets/icons/services/asphalt-paving-3.svg' },
      { title: 'New Construction', description: 'New roads and parking lots built from the subgrade up.', icon: '/assets/icons/services/asphalt-paving-4.svg' },
    ],
  },
  {
    slug: 'commercial-concrete',
    title: 'Commercial Concrete',
    support: 'Structural and flatwork concrete for commercial and municipal sites.',
    heroImage: serviceHeroImages['commercial-concrete'],
    approachImage: '/assets/images/services/commercial-concrete-approach-provided.jpg',
    overlayImage: '/assets/images/services/commercial-concrete-overlay.jpg',
    detailHeight: 904,
    detailTop: 80,
    overview: 'We pour the concrete that commercial and municipal sites are built on: slabs, foundations, sidewalks, curb and gutter, and heavy-duty loading and industrial areas. Our crews handle formwork, reinforcement, placement, and finishing.',
    approachTitle: 'How We Approach Concrete Work',
    approach: 'Your site plan drives every choice we make on a pour - subgrade preparation, mix design, joint layout, and finish. We tie slabs into the parking, docks, and utilities around them so the entire property works as one connected surface.',
    overlayTitleLines: ['Every Pour Your', 'Property Demands'],
    cards: [
      { title: 'Slabs and Foundations', description: "Footings and slabs poured and reinforced to carry the building's load.", icon: '/assets/icons/services/commercial-concrete-1.svg' },
      { title: 'Sidewalks and Curbs', description: 'Walkways, curb, and gutter finished level and true.', icon: '/assets/icons/services/commercial-concrete-3.svg' },
      { title: 'Loading and Industrial Areas', description: 'Heavy-duty concrete rated for trucks and equipment in daily service.', icon: '/assets/icons/services/commercial-concrete-4.svg' },
    ],
  },
  {
    slug: 'residential-concrete',
    title: 'Residential Concrete',
    support: 'Concrete flatwork for housing developments, estates, and large residential properties.',
    heroImage: serviceHeroImages['residential-concrete'],
    approachImage: '/assets/images/services/residential-concrete-approach-provided.jpg',
    overlayImage: '/assets/images/services/residential-concrete-overlay.jpg',
    detailHeight: 958,
    detailTop: 80,
    overview: 'We build and resurface asphalt roads, parking lots, and driveways for municipalities, DOT projects, developers, and commercial sites. Our crews handle the full scope - subgrade preparation, base stone, and every lift of asphalt through the final surface course.',
    approachTitle: 'How We Approach Paving',
    approach: 'Good asphalt is the sum of a hundred decisions made before the first truck arrives - subgrade compaction, base depth, mix selection, and weather timing. We manage all of them with our own crews, so the finished surface carries heavy traffic and holds up for the long haul.',
    overlayTitleLines: ['Flatwork for Large', 'Residential Properties'],
    cards: [
      { title: 'Driveways', description: 'Long private drives, shared entrances, and development-wide driveway packages.', icon: '/assets/icons/services/residential-concrete-1.svg' },
      { title: 'Patios and Walkways', description: 'Estate patios, pool decks, and connecting walkways poured to a consistent finish.', icon: '/assets/icons/services/residential-concrete-3.svg' },
      { title: 'Steps and Porches', description: 'Steps, stoops, and porches built to carry daily foot traffic.', icon: '/assets/icons/services/residential-concrete-4.svg' },
    ],
  },
  {
    slug: 'greenways',
    title: 'Greenways',
    support: 'Trail and greenway construction connecting parks, neighborhoods, and schools.',
    heroImage: serviceHeroImages.greenways,
    approachImage: '/assets/images/services/greenways-trail-construction-1440.webp?v=20260922',
    overlayImage: '/assets/images/services/greenways-overlay-provided.jpg',
    detailHeight: 948,
    detailTop: 80,
    overview: 'We build greenways and multi-use trails for municipalities, counties, and park systems - from clearing and grading through drainage, surfacing, and pedestrian bridges. Our crews carry a trail project from the first survey stake to a finished, open path.',
    approachTitle: 'How We Approach Trail Construction',
    approach: 'The base under a trail matters more than the surface on top. We grade and compact each section so heavy rain drains away rather than washing out the path from below, and the trail holds its shape through decades of storms and steady use.',
    overlayTitleLines: ['Everything a Trail Demands', 'from Start to Finish'],
    cards: [
      { title: 'Site Grading', description: "A stable route carved to follow the land's natural flow.", icon: '/assets/icons/services/greenways-1.svg' },
      { title: 'Patios & Walkways', description: 'Banks and surfaces stabilized to hold firm year-round.', icon: '/assets/icons/services/greenways-3.svg' },
      { title: 'Trail Surfacing', description: 'Paved and natural surfaces laid smooth and even underfoot.', icon: '/assets/icons/services/greenways-3.svg' },
      { title: 'Pedestrian Bridges', description: 'Crossings that carry the trail over creeks and roads.', icon: '/assets/icons/services/greenways-4.svg' },
    ],
  },
  {
    slug: 'roads-bridges',
    title: 'Roads & Bridges',
    support: 'Road and bridge construction for municipalities and DOT projects across the Carolinas.',
    heroImage: '/assets/images/services/roads-bridges-hero-roadwork.jpg?v=20260922',
    approachImage: '/assets/images/services/roads-bridges-roadwork-aerial-1536.webp?v=20260922',
    overlayImage: '/assets/images/services/roads-bridges-overlay.jpg',
    detailHeight: 924,
    detailTop: 80,
    overview: "We build and improve the road network: new road construction, widening, intersection improvements, roundabouts, and bridge construction. Our crews self-perform the grading, drainage, paving, and structural work that these projects require.",
    approachTitle: 'How We Approach Roadwork',
    approach: "Roadwork starts well below the pavement. We set the earthwork, subgrade, and drainage first, then build the road section on top of it - so the finished corridor carries today's traffic and is built to serve for decades.",
    overlayTitleLines: ['Road and Bridge', 'Construction Services'],
    cards: [
      { title: 'Road Construction', description: 'New roads and corridor widening built to state and municipal standards.', icon: '/assets/icons/services/roads-bridges-1.svg' },
      { title: 'Bridge Construction', description: 'Banks and Crossings engineered and constructed for long-term durability.', icon: '/assets/icons/services/roads-bridges-3.svg' },
      { title: 'Roundabouts', description: 'Intersection construction that keeps traffic moving without a signal.', icon: '/assets/icons/services/roads-bridges-4.svg' },
      { title: 'Grading & Earthwork', description: 'The site preparation and subgrade that every road section is built on.', icon: '/assets/icons/services/roads-bridges-5.svg' },
    ],
  },
  {
    slug: 'underground-utilities',
    title: 'Underground Utilities',
    support: 'Water, sewer, and storm line installation for municipalities and developments.',
    heroImage: serviceHeroImages['underground-utilities'],
    approachImage: '/assets/images/services/underground-utilities-approach-provided.jpg',
    overlayImage: '/assets/images/services/underground-utilities-overlay.jpg',
    detailHeight: 924,
    detailTop: 80,
    overview: 'We install the underground systems that communities and developments run on: water mains, sanitary sewer, storm drainage, and site utilities. Our crews handle excavation, trenching, pipe installation, backfill, and surface restoration.',
    approachTitle: 'How We Approach Utility Work',
    approach: 'Careful trenching and precise grade work set each line at the depth and slope the flow demands. The system runs clean, the road above stays whole, and the installation is built to last from the first day of service.',
    overlayTitleLines: ['One Scope for Everything', 'Below Grade'],
    cards: [
      { title: 'Water Mains', description: 'Water lines installed and pressure-tested for leak-free service.', icon: '/assets/icons/services/underground-utilities-2.svg' },
      { title: 'Sanitary Sewer', description: 'Gravity and force main sewer installed to proper grade.', icon: '/assets/icons/services/underground-utilities-4.svg' },
      { title: 'Storm Drainage', description: 'Pipe, structures, and channels that move stormwater away from roads and properties.', icon: '/assets/icons/services/underground-utilities-3.svg' },
      { title: 'Site Utilities', description: 'The connections that tie a new development into existing systems.', icon: '/assets/icons/services/underground-utilities-5.svg' },
    ],
  },
]

const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]))

export function ServicePage() {
  const { serviceSlug } = useParams()
  const service = serviceSlug ? serviceBySlug[serviceSlug] : undefined

  if (!service) return <Navigate replace to="/services/asphalt-paving" />

  return (
    <main className={`service-page service-page--${service.slug}`}>
      <section
        aria-labelledby="service-page-title"
        className="service-hero"
        data-reveal-sequence
        style={{
          '--service-hero-image': `url(${service.heroImage})`,
          '--service-hero-position': service.heroPosition ?? 'center',
        } as React.CSSProperties}
      >
        <div className="service-hero__content">
          <Eyebrow className="eyebrow--on-dark" data-reveal-item>Service</Eyebrow>
          <Heading as="h1" className="service-hero__title" data-reveal-delay="1" data-reveal-item id="service-page-title" size="hero">{service.title}</Heading>
          <p className="service-hero__support" data-reveal-delay="2" data-reveal-item>{service.support}</p>
        </div>
      </section>

      <section className="service-detail" data-reveal-sequence style={{ '--service-detail-height': `${service.detailHeight}px`, '--service-detail-top': `${service.detailTop}px` } as React.CSSProperties}>
        <div className="service-detail__inner">
          <aside className="service-sidebar" aria-label="Services" data-reveal-item>
            <nav>
              {services.map((item) => (
                <NavLink className={({ isActive }) => `service-sidebar__link${isActive ? ' is-active' : ''}`} key={item.slug} to={`/services/${item.slug}`}>
                  {item.title.replace('\n', ' ')}
                </NavLink>
              ))}
            </nav>
            <ButtonLink className="service-sidebar__cta" to="/contact">
              Contact Us <img aria-hidden="true" alt="" src="/assets/icons/cta-arrow.svg" />
            </ButtonLink>
          </aside>

          <div className="service-detail__content">
            <div className="service-detail__copy service-detail__copy--overview">
              <Heading as="h2" data-reveal-delay="1" data-reveal-item size="section">What We Do</Heading>
              <p data-reveal-delay="2" data-reveal-item>{service.overview}</p>
            </div>
            <div className="service-detail__copy service-detail__copy--approach">
              <Heading as="h2" data-reveal-delay="3" data-reveal-item size="section">{service.approachTitle}</Heading>
              <p data-reveal-delay="4" data-reveal-item>{service.approach}</p>
              <div className="service-detail__image" data-reveal-delay="5" data-reveal-item><img alt="" src={service.approachImage} /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-offerings" data-reveal-sequence style={{ '--service-overlay-image': `url(${service.overlayImage})` } as React.CSSProperties}>
        <div className="service-offerings__top">
          <div className="service-offerings__heading">
            <Eyebrow className="eyebrow--on-dark" data-reveal-item>Services</Eyebrow>
            <Heading as="h2" data-reveal-delay="1" data-reveal-item size="section">
              {service.overlayTitleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </Heading>
          </div>
          <div className="service-offerings__contact">
            <p data-reveal-delay="2" data-reveal-item>To discuss an upcoming project,<br />get in touch with our team.</p>
            <ButtonLink data-reveal-delay="3" data-reveal-item to="/contact">Contact Us <img aria-hidden="true" alt="" src="/assets/icons/cta-arrow.svg" /></ButtonLink>
          </div>
        </div>
        <div className="service-offerings__cards" data-count={service.cards.length}>
          {service.cards.map((card, index) => (
            <article className="service-offerings__card" data-reveal-delay={String(index + 4)} data-reveal-item key={card.title}>
              <div className="service-offerings__icon"><img aria-hidden="true" alt="" src={card.icon} /></div>
              <div>
                <Heading as="h3" size="card">{card.title}</Heading>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
