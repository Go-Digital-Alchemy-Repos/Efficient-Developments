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
          <Logo />
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
          <Link to="/contact">Contact</Link>
        </nav>
        <div>
          <p className="site-footer__heading">Contact</p>
        </div>
      </Container>
    </footer>
  )
}
