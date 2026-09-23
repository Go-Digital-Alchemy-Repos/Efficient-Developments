import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { Seo } from '../components/seo/Seo'
import { Heading } from '../components/ui/Typography'

export function PrivacyPage() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy">
    <p>Efficient Developments collects information you choose to submit through its careers application form, including contact details, application answers, and a resume.</p>
    <h2>How application information is used</h2>
    <p>Application information is used for recruiting, reviewing qualifications, and contacting candidates about employment opportunities. It is available through the private careers dashboard.</p>
    <h2>Your choices</h2>
    <p>Do not submit sensitive identity or financial documents. To ask about information you submitted, call <a href="tel:+17043175966">704-317-5966</a>.</p>
    <h2>Website operation</h2>
    <p>The site uses a necessary session cookie only when an authorized user signs in to the careers dashboard. The public website does not include advertising or third-party analytics cookies.</p>
  </LegalPage>
}

export function TermsPage() {
  return <LegalPage title="Terms of Use" path="/terms">
    <p>This website provides general information about Efficient Developments, its services, projects, and employment opportunities.</p>
    <h2>Website content</h2>
    <p>Project details and availability may change. Website content is not a proposal, contract, warranty, or guarantee of project scope, schedule, or pricing.</p>
    <h2>Acceptable use</h2>
    <p>Do not attempt to disrupt the site, gain unauthorized access, or submit unlawful or malicious material. Job applications must be truthful and relevant to the listed opportunity.</p>
    <h2>Questions</h2>
    <p>For questions about this website, call <a href="tel:+17043175966">704-317-5966</a>.</p>
  </LegalPage>
}

function LegalPage({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return <main className="legal-page" id="main-content">
    <Seo path={path} title={title} description={`${title} for the Efficient Developments website.`} />
    <Container>
      <Heading as="h1" size="page">{title}</Heading>
      <p className="legal-page__updated">Last updated September 22, 2026</p>
      <div className="legal-page__content">{children}</div>
      <Link to="/">← Return home</Link>
    </Container>
  </main>
}
