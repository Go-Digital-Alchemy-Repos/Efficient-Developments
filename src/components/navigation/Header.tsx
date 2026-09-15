import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ButtonLink } from '../ui/Button'
import { Container } from '../layout/Container'
import { Logo } from '../ui/Logo'

const primaryNavigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

const serviceNavigation = [
  { label: 'Asphalt Paving', to: '/services/asphalt-paving' },
  { label: 'Commercial Concrete', to: '/services/commercial-concrete' },
  { label: 'Residential Concrete', to: '/services/residential-concrete' },
  { label: 'Greenways', to: '/services/greenways' },
  { label: 'Roads & Bridges', to: '/services/roads-bridges' },
  { label: 'Underground Utilities', to: '/services/underground-utilities' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [areServicesOpen, setAreServicesOpen] = useState(false)
  const { pathname } = useLocation()
  const isServiceRoute = pathname.startsWith('/services/')

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <Link aria-label="Efficient Developments home" className="site-header__logo-link" to="/">
          <Logo className="site-header__logo" variant="header" />
        </Link>
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
          {primaryNavigation.slice(0, 2).map((item) => (
            <NavLink key={item.to} className={({ isActive }) => `primary-navigation__link${isActive ? ' is-active' : ''}`} end={item.to === '/'} to={item.to} onClick={() => setIsOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <div className="primary-navigation__services">
            <button
              aria-expanded={areServicesOpen}
              aria-haspopup="menu"
              className={`primary-navigation__link primary-navigation__services-trigger${isServiceRoute ? ' is-active' : ''}`}
              onClick={() => setAreServicesOpen((value) => !value)}
              type="button"
            >
              Services <span aria-hidden="true">▾</span>
            </button>
            <div aria-label="Services submenu" className="service-dropdown" data-open={areServicesOpen || undefined} role="menu">
              {serviceNavigation.map((item) => (
                <NavLink
                  className={({ isActive }) => `service-dropdown__link${isActive ? ' is-active' : ''}`}
                  key={item.to}
                  onClick={() => {
                    setAreServicesOpen(false)
                    setIsOpen(false)
                  }}
                  role="menuitem"
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          {primaryNavigation.slice(2).map((item) => (
            <NavLink key={item.to} className={({ isActive }) => `primary-navigation__link${isActive ? ' is-active' : ''}`} to={item.to} onClick={() => setIsOpen(false)}>
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
