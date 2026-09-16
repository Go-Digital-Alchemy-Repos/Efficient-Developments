import { useEffect, useRef, useState } from 'react'
import { ModalCloseButton } from '../components/ui/ModalCloseButton'
import { Eyebrow, Heading } from '../components/ui/Typography'

const stories = [
  {
    eyebrow: 'Background',
    title: <>Heavy Civil Work,<br />Done Right</>,
    body: 'Efficient Developments is a turnkey civil contractor serving municipalities and developers across the Carolinas. We build the roads, bridges, and underground systems that keep communities running. Since 2019, we have grown into a trusted name in civil infrastructure, known for finishing quality work ahead of schedule.',
    image: '/assets/images/about/aerial-view-4-way-stop.jpg',
    alt: 'Aerial view of a completed downtown road and pedestrian intersection',
  },
  {
    eyebrow: 'Differentiator',
    title: <>Built Around Efficiency</>,
    body: 'Efficiency is how we operate, not just our name. Prompt estimates, fast mobilization, and tight scheduling keep projects moving from bid through completion. It is the reason much of our work comes from long-standing relationships with the municipalities and agencies we serve.',
    image: '/assets/images/about/road-construction-paved-dirt.jpg',
    alt: 'Graded construction site beside a municipal building',
    reverse: true,
    muted: true,
  },
  {
    eyebrow: 'Multi-Disciplinary',
    title: <>Heavy Civil Work,<br />Done Right</>,
    body: 'On our jobs, the grading crew, the paving crew, and the utility crew all answer to the same project team. We self-perform across disciplines, so a single contractor manages the full scope of work and there is always one clear point of responsibility.',
    image: '/assets/images/about/roundabout-concrete-edge.jpg',
    alt: 'Crew installing the concrete edge of a roundabout',
  },
]

const leaders = [
  {
    name: 'David Mitchell',
    role: 'President & CEO',
    modalRole: 'President & Chief Executive Officer',
    image: '/assets/images/about/team-mitchell.jpg',
    modalImage: '/assets/images/about/bio-mitchell.jpg',
    bio: [
      'David Mitchell has served as President & CEO of Efficient Developments since its founding in 2019. With over 25 years of experience in heavy civil infrastructure, he has directed the successful completion of major highway systems, complex bridge structures, and massive utility networks across both North and South Carolina.',
      "Prior to founding Efficient Developments, David served as Vice President of Infrastructure at one of the country's largest civil contracting firms, where he championed the integration of GPS-guided grading technology and real-time project tracking. His leadership philosophy centers on meticulous planning, strict safety protocols, and a commitment to completing turnkey projects ahead of schedule.",
    ],
  },
  {
    name: 'Sarah Jennings',
    role: 'Vice President of Operations',
    modalRole: 'Vice President of Operations',
    image: '/assets/images/about/team-jennings.jpg',
    modalImage: '/assets/images/about/team-jennings.jpg',
    bio: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },
  {
    name: 'Marcus Thompson',
    role: 'Director of Project Management',
    modalRole: 'Director of Project Management',
    image: '/assets/images/about/team-thompson.jpg',
    modalImage: '/assets/images/about/team-thompson.jpg',
    bio: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },
]

export function AboutPage() {
  const [activeLeader, setActiveLeader] = useState<(typeof leaders)[number] | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const activeCardRef = useRef<HTMLButtonElement | null>(null)

  const closeModal = () => {
    setActiveLeader(null)
    window.requestAnimationFrame(() => activeCardRef.current?.focus())
  }

  useEffect(() => {
    if (!activeLeader) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeLeader])

  return (
    <main id="main-content" className="about-page">
      <section className="about-hero" aria-labelledby="about-hero-title" data-reveal-sequence>
        <div className="about-hero__shade" />
        <div className="about-hero__content">
          <Eyebrow className="eyebrow--on-dark" data-reveal-item>Efficient Developments</Eyebrow>
          <Heading as="h1" data-reveal-delay="1" data-reveal-item id="about-hero-title" size="page">About Us</Heading>
          <p data-reveal-delay="2" data-reveal-item>A heavy civil contractor building infrastructure across the Carolinas.</p>
        </div>
      </section>

      {stories.map((story) => (
        <section
          className={`about-story${story.muted ? ' about-story--muted' : ''}`}
          data-reveal-sequence
          key={story.eyebrow}
        >
          <div className={`about-story__inner${story.reverse ? ' about-story__inner--reverse' : ''}`}>
            <div className="about-story__copy">
              <Eyebrow data-reveal-delay={story.reverse ? '1' : '0'} data-reveal-item>{story.eyebrow}</Eyebrow>
              <Heading data-reveal-delay={story.reverse ? '2' : '1'} data-reveal-item>{story.title}</Heading>
              <p data-reveal-delay={story.reverse ? '3' : '2'} data-reveal-item>{story.body}</p>
            </div>
            <div className="about-story__media" data-reveal-delay={story.reverse ? '0' : '3'} data-reveal-item>
              <img src={story.image} alt={story.alt} />
            </div>
          </div>
        </section>
      ))}

      <section className="about-team" aria-labelledby="about-team-title" data-reveal-sequence>
        <div className="about-team__gradient" aria-hidden="true" />
        <div className="about-team__heading">
          <p data-reveal-item>Our Team</p>
          <Heading data-reveal-delay="1" data-reveal-item id="about-team-title">Meet the Leadership</Heading>
          <p data-reveal-delay="2" data-reveal-item>Our experienced leadership team brings decades of heavy civil construction expertise to every project.</p>
        </div>
        <div className="about-team__grid">
          {leaders.map((leader, index) => (
            <button
              aria-haspopup="dialog"
              className="leader-card"
              data-reveal-delay={String(index + 3)}
              data-reveal-item
              key={leader.name}
              onClick={(event) => {
                activeCardRef.current = event.currentTarget
                setActiveLeader(leader)
              }}
              type="button"
            >
              <img className="leader-card__photo" src={leader.image} alt={`${leader.name}, ${leader.role}`} />
              <div className="leader-card__panel">
                <div>
                  <h3>{leader.name}</h3>
                  <p>{leader.role}</p>
                </div>
                <span className="leader-card__arrow" aria-hidden="true">
                  <img src="/assets/icons/chevron.svg" alt="" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeLeader && (
        <div
          className="member-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal()
          }}
          role="presentation"
        >
          <section
            aria-labelledby="member-modal-name"
            aria-modal="true"
            className="member-modal__card"
            role="dialog"
          >
            <div className="member-modal__portrait">
              <img src={activeLeader.modalImage} alt="" />
            </div>
            <div className="member-modal__content">
              <header className="member-modal__header">
                <Eyebrow className="member-modal__eyebrow">Leadership Profile</Eyebrow>
                <div className="member-modal__identity">
                  <Heading as="h2" id="member-modal-name">{activeLeader.name}</Heading>
                  <p>{activeLeader.modalRole}</p>
                </div>
              </header>
              <img className="member-modal__divider" src="/assets/icons/modal-divider.svg" alt="" />
              <div className="member-modal__bio">
                {activeLeader.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <ModalCloseButton
              aria-label={`Close ${activeLeader.name} profile`}
              onClick={closeModal}
              ref={closeButtonRef}
            />
          </section>
        </div>
      )}
    </main>
  )
}
