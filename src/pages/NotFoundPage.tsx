import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { Seo } from '../components/seo/Seo'
import { Heading } from '../components/ui/Typography'

export function NotFoundPage() {
  return (
    <main className="status-page" id="main-content">
      <Seo description="The requested page could not be found." noIndex path={window.location.pathname} title="Page not found" />
      <Container>
        <p className="status-page__code">404</p>
        <Heading as="h1" size="page">Page not found</Heading>
        <p>The page may have moved or the address may be incorrect.</p>
        <Link className="button" to="/">Return home</Link>
      </Container>
    </main>
  )
}
