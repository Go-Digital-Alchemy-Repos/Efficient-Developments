import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonLink } from '../ui/Button'
import { Container } from '../layout/Container'
import { Logo } from '../ui/Logo'

const primaryNavigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services/asphalt-paving' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <Logo className="site-header__logo" variant="header" />
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true" className="mobile-nav-toggle__line" />
          <span aria-hidden="true" className="mobile-nav-toggle__line" />
          <span aria-hidden="true" className="mobile-nav-toggle__line" />
        </button>
        <nav
          id="primary-navigation"
          className="primary-navigation"
          data-open={isOpen || undefined}
          aria-label="Primary navigation"
        >
          {primaryNavigation.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `primary-navigation__link${isActive ? ' is-active' : ''}`}
              end={item.to === '/'}
              to={item.to}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ButtonLink className="site-header__cta" to="/contact">
          Contact Us <img aria-hidden="true" src="/assets/icons/cta-arrow.svg" alt="" />
        </ButtonLink>
      </Container>
    </header>
  )
}
