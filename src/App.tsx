import { Navigate, Route, Routes } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { RouteScaffold } from './pages/RouteScaffold'
import { routeDefinitions } from './routes/routeDefinitions'

export function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        {routeDefinitions.filter((route) => route.path !== '/' && route.path !== '/contact').map((route) => (
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
