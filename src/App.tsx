import { Navigate, Route, Routes } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { CareersPage } from './pages/CareersPage'
import { CareerJobPage } from './pages/CareerJobPage'
import { CareersAdminPage } from './pages/CareersAdminPage'
import { HomePage } from './pages/HomePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { RouteScaffold } from './pages/RouteScaffold'
import { ServicePage } from './pages/ServicePage'
import { routeDefinitions } from './routes/routeDefinitions'

export function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/manage" element={<CareersAdminPage />} />
        <Route path="/careers/:jobId" element={<CareerJobPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetailPage />} />
        <Route path="/services/:serviceSlug" element={<ServicePage />} />
        {routeDefinitions
          .filter((route) => (
            route.path !== '/'
            && route.path !== '/about'
            && route.path !== '/contact'
            && route.path !== '/projects'
            && route.path !== '/projects/:projectSlug'
            && !route.path.startsWith('/services/')
          ))
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteScaffold title={route.title} />}
            />
          ))}
        <Route path="/services" element={<Navigate replace to="/services/asphalt-paving" />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  )
}
