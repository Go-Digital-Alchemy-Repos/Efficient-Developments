import { useCallback, useEffect, useRef, useState } from 'react'
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
  const drawerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const shouldRestoreFocusRef = useRef(false)
  const { pathname } = useLocation()
  const isServiceRoute = pathname.startsWith('/services/')

  const closeMobileNavigation = useCallback((restoreFocus = false) => {
    shouldRestoreFocusRef.current = restoreFocus
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen) return
    if (!shouldRestoreFocusRef.current) return

    shouldRestoreFocusRef.current = false
    window.requestAnimationFrame(() => toggleRef.current?.focus())
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const root = document.documentElement
    const drawer = drawerRef.current
    const focusableSelector = 'a[href], button:not([disabled])'
    const focusableElements = drawer?.querySelectorAll<HTMLElement>(focusableSelector)

    root.classList.add('mobile-navigation-open')
    window.requestAnimationFrame(() => focusableElements?.[0]?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMobileNavigation(true)
        return
      }

      if (event.key !== 'Tab' || !drawer) return

      const currentFocusableElements = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector))
      const firstElement = currentFocusableElements[0]
      const lastElement = currentFocusableElements.at(-1)

      if (!firstElement || !lastElement) return

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      root.classList.remove('mobile-navigation-open')
    }
  }, [closeMobileNavigation, isOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 75.0625rem)')
    const closeAtDesktopWidth = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) closeMobileNavigation(false)
    }

    closeAtDesktopWidth(desktopQuery)
    desktopQuery.addEventListener('change', closeAtDesktopWidth)
    return () => desktopQuery.removeEventListener('change', closeAtDesktopWidth)
  }, [closeMobileNavigation])

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <Link aria-label="Efficient Developments home" className="site-header__logo-link" to="/">
          <Logo className="site-header__logo" variant="header" />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => {
            if (isOpen) {
              closeMobileNavigation(true)
            } else {
              setIsOpen(true)
            }
          }}
        >
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
      <nav
        ref={drawerRef}
        id="mobile-navigation"
        className="mobile-navigation"
        data-open={isOpen || undefined}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="mobile-navigation__links">
          {primaryNavigation.slice(0, 2).map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `mobile-navigation__link${isActive ? ' is-active' : ''}`}
              end={item.to === '/'}
              to={item.to}
              onClick={() => closeMobileNavigation(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mobile-navigation__services">
            <span className={`mobile-navigation__link mobile-navigation__services-label${isServiceRoute ? ' is-active' : ''}`}>Services</span>
            <div className="mobile-navigation__service-links">
              {serviceNavigation.map((item) => (
                <NavLink
                  className={({ isActive }) => `mobile-navigation__service-link${isActive ? ' is-active' : ''}`}
                  key={item.to}
                  onClick={() => closeMobileNavigation(false)}
                  tabIndex={isOpen ? 0 : -1}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          {primaryNavigation.slice(2).map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `mobile-navigation__link${isActive ? ' is-active' : ''}`}
              to={item.to}
              onClick={() => closeMobileNavigation(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <ButtonLink
          className="mobile-navigation__cta"
          to="/contact"
          onClick={() => closeMobileNavigation(false)}
          tabIndex={isOpen ? 0 : -1}
        >
          Contact Us <img aria-hidden="true" src="/assets/icons/cta-arrow.svg" alt="" />
        </ButtonLink>
      </nav>
    </header>
  )
}
