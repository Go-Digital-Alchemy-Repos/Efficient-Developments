import { Outlet } from 'react-router-dom'
import { Footer } from '../navigation/Footer'
import { Header } from '../navigation/Header'

export function PageShell() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
