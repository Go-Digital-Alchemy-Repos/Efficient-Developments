import { Link } from 'react-router-dom'
import { Container } from '../layout/Container'
import { Logo } from '../ui/Logo'

const serviceLinks = [
  ['Asphalt Paving', '/services/asphalt-paving'],
  ['Commercial Concrete', '/services/commercial-concrete'],
  ['Residential Concrete', '/services/residential-concrete'],
  ['Greenways', '/services/greenways'],
  ['Roads & Bridges', '/services/roads-bridges'],
  ['Underground Utilities', '/services/underground-utilities'],
]

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid" size="wide">
        <div className="site-footer__brand">
          <Link aria-label="Efficient Developments home" className="site-footer__logo-link" to="/">
            <Logo />
          </Link>
          <p>Heavy civil infrastructure contractor serving municipalities and developers across the Carolinas.</p>
        </div>
        <nav aria-label="Services">
          <p className="site-footer__heading">Services</p>
          {serviceLinks.map(([label, to]) => (
            <Link key={to} to={to}>{label}</Link>
          ))}
        </nav>
        <nav aria-label="Company">
          <p className="site-footer__heading">Company</p>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">Careers</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="site-footer__contact">
          <p className="site-footer__heading">Contact</p>
          <span>+1 (XXX) XXX-XXXX</span>
          <span>info@example.com</span>
          <span>Address line</span>
        </div>
      </Container>
      <div className="site-footer__legal">
        <p>
          © Efficient Developments
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms">Terms</Link>
        </p>
        <div className="site-footer__made-by">
          <span>Made by</span>
          <img src="/assets/logos/digital-alchemy.svg" alt="Digital Alchemy" />
        </div>
      </div>
    </footer>
  )
}
