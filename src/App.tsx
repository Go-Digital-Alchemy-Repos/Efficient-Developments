import { Navigate, Route, Routes } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { RouteScaffold } from './pages/RouteScaffold'
import { routeDefinitions } from './routes/routeDefinitions'

export function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetailPage />} />
        {routeDefinitions
          .filter((route) => (
            route.path !== '/'
            && route.path !== '/contact'
            && route.path !== '/projects'
            && route.path !== '/projects/:projectSlug'
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
