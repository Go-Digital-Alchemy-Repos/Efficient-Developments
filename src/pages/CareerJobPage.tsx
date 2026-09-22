import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/ui/FormField'
import { Heading, Eyebrow } from '../components/ui/Typography'
import { careersApi, useJobs, type Job } from '../lib/careers'

function ApplicationForm({ job }: { job: Job }) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (pending) return
    const form = new FormData(event.currentTarget)
    const resume = form.get('resume') as File | null
    if (!resume || resume.size === 0 || resume.size > 5 * 1024 * 1024 || !/\.pdf$/i.test(resume.name)) {
      setError('Please attach a PDF resume, up to 5 MB.'); return
    }
    setPending(true); setError('')
    try {
      const result = await careersApi<{ message: string }>('/applications', { method: 'POST', body: form })
      setSuccess(result.message)
    } catch (error) { setError((error as Error).message) } finally { setPending(false) }
  }
  return <section className="careers-application contact-form-card" aria-labelledby="application-title">
    <Heading as="h2" id="application-title" size="card">Apply for this role</Heading>
    {success ? <div role="status" className="careers-success"><h3>Application received</h3><p>{success}</p><Link to="/careers">Back to careers</Link></div> : <form className="contact-form" onSubmit={submit}>
      <fieldset disabled={pending} className="careers-fieldset">
        <input type="hidden" name="jobId" value={job.id} />
        <div className="careers-honeypot" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
        <FormField label="Full name" name="name" autoComplete="name" maxLength={150} required />
        <div className="contact-form__row">
          <FormField label="Email address" name="email" type="email" autoComplete="email" maxLength={254} required />
          <FormField label="Phone number" name="phone" type="tel" autoComplete="tel" maxLength={40} required />
        </div>
        <FormField label="Tell us about yourself (optional)" multiline name="message" maxLength={5000} placeholder="Share relevant experience or anything else you would like our team to know." />
        <FormField label="Resume (PDF, up to 5 MB)" name="resume" type="file" accept=".pdf,application/pdf" required />
        <label className="careers-consent"><input type="checkbox" name="consent" value="yes" required /><span>I consent to Efficient Developments storing my application and resume for recruitment and contacting me about this role.</span></label>
        <p className="careers-privacy">Your application and resume are accessible only through the private careers dashboard. Please do not include sensitive identity or financial documents.</p>
        {error && <p role="alert" className="careers-error">{error}</p>}
        <Button type="submit" disabled={pending}>{pending ? 'Submitting…' : 'Submit application'} <span aria-hidden="true">↗</span></Button>
      </fieldset>
    </form>}
  </section>
}

export function CareerJobPage() {
  const { jobId } = useParams()
  const { jobs, loading, error } = useJobs()
  const job = jobs.find((item) => item.id === jobId)
  return <main id="main-content" className="careers-page"><Container>
    <div className="careers-back"><Link to="/careers">← All opportunities</Link></div>
    {loading ? <p role="status">Loading role…</p> : error ? <p role="alert">{error}</p> : !job ? <><Heading as="h1">Position unavailable</Heading><p>This position is no longer listed. Explore our other opportunities.</p></> : <>
      <header className="careers-heading careers-heading--role"><Eyebrow>{job.department}</Eyebrow><Heading as="h1" size="page">{job.title}</Heading><p>{job.location} · {job.employment}</p></header>
      <div className="careers-detail-grid">
        <article className="careers-description"><Heading as="h2" size="card">About the role</Heading><p>{job.description}</p>
          <Heading as="h2" size="card">What you’ll do</Heading><ul>{job.responsibilities.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}</ul>
          <Heading as="h2" size="card">What you’ll bring</Heading><ul>{job.requirements.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}</ul>
        </article>
        <ApplicationForm job={job} key={job.id} />
      </div>
    </>}
  </Container></main>
}
