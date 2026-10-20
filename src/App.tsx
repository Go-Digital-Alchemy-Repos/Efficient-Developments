import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import { routeDefinitions } from './routes/routeDefinitions'

const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const CareersPage = lazy(() => import('./pages/CareersPage').then((module) => ({ default: module.CareersPage })))
const CareerJobPage = lazy(() => import('./pages/CareerJobPage').then((module) => ({ default: module.CareerJobPage })))
const CareersAdminPage = lazy(() => import('./pages/CareersAdminPage').then((module) => ({ default: module.CareersAdminPage })))
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })))
const RouteScaffold = lazy(() => import('./pages/RouteScaffold').then((module) => ({ default: module.RouteScaffold })))
const ServicePage = lazy(() => import('./pages/ServicePage').then((module) => ({ default: module.ServicePage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))
const PrivacyPage = lazy(() => import('./pages/LegalPage').then((module) => ({ default: module.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/LegalPage').then((module) => ({ default: module.TermsPage })))

export function App() {
  return (
    <Suspense fallback={<main className="route-loading" id="main-content"><p role="status">Loading…</p></main>}><Routes>
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
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes></Suspense>
  )
}
