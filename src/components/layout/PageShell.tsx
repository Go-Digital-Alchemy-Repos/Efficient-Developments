import { Outlet } from 'react-router-dom'
import { ScrollReveal } from '../motion/ScrollReveal'
import { Footer } from '../navigation/Footer'
import { Header } from '../navigation/Header'

export function PageShell() {
  return (
    <div className="site-shell">
      <ScrollReveal />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
