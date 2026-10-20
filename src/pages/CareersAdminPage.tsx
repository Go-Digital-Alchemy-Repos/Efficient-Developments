import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/ui/FormField'
import { Heading } from '../components/ui/Typography'
import { careersApi, jsonRequest, type Application, type Job } from '../lib/careers'
import { Seo } from '../components/seo/Seo'

const blankJob: Job = { id: '', title: '', department: 'Field Operations', location: 'Charlotte, NC', employment: 'Full-time', description: '', responsibilities: '', requirements: '', status: 'draft', sample: false }

function JobEditor({ job, onSave, onCancel }: { job: Job; onSave: (job: Job) => Promise<void>; onCancel: () => void }) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setPending(true); setError('')
    const form = new FormData(event.currentTarget)
    const data = { ...job, ...Object.fromEntries(form), sample: false } as Job
    try { await onSave(data) } catch (error) { setError((error as Error).message) } finally { setPending(false) }
  }
  return <section className="careers-editor"><Heading as="h2" size="card">{job.id ? 'Edit position' : 'Create position'}</Heading>
    <form onSubmit={submit} className="contact-form"><fieldset disabled={pending} className="careers-fieldset">
      <FormField label="Job title" name="title" defaultValue={job.title} maxLength={200} required />
      <div className="contact-form__row"><FormField label="Department" name="department" defaultValue={job.department} maxLength={200} required /><FormField label="Employment type" name="employment" defaultValue={job.employment} maxLength={200} required /></div>
      <FormField label="Location" name="location" defaultValue={job.location} maxLength={200} required />
      <FormField multiline label="Role description" name="description" defaultValue={job.description} maxLength={12000} required />
      <FormField multiline label="Responsibilities (one per line)" name="responsibilities" defaultValue={job.responsibilities} maxLength={12000} required />
      <FormField multiline label="Requirements (one per line)" name="requirements" defaultValue={job.requirements} maxLength={12000} required />
      <label className="form-field"><span className="form-field__label">Status</span><select className="form-field__control" name="status" defaultValue={job.status}><option value="draft">Draft — hidden from the public</option><option value="published">Published — visible on Careers</option><option value="closed">Closed — applications stopped</option></select></label>
      {error && <p role="alert" className="careers-error">{error}</p>}
      <div className="careers-actions"><Button type="submit">{pending ? 'Saving…' : 'Save position'}</Button><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button></div>
    </fieldset></form>
  </section>
}

function ApplicationCard({ application, refresh }: { application: Application; refresh: () => Promise<void> }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const update = async (method: string, status?: string) => {
    setPending(true); setError('')
    try { await careersApi(`/admin/applications/${application.id}`, jsonRequest(method, { status })); await refresh() }
    catch (error) { setError((error as Error).message) } finally { setPending(false) }
  }
  return <article className="careers-applicant">
    <div className="careers-section-heading"><div><h3>{application.name}</h3><p>{application.jobTitle}</p></div><time dateTime={application.submittedAt}>{new Date(application.submittedAt).toLocaleDateString()}</time></div>
    <p><a href={`mailto:${application.email}`}>{application.email}</a> · {application.phone}</p>
    {application.message && <p className="careers-message">{application.message}</p>}
    <div className="careers-actions"><a className="button button--outline" href={`/api/careers/admin/applications/${application.id}/resume`} download>Download resume</a>
      <label>Application status <select aria-label={`Status for ${application.name}`} value={application.status} disabled={pending} onChange={(event) => void update('PATCH', event.target.value)}>{['new', 'reviewing', 'contacted', 'closed'].map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
      <button type="button" className="careers-text-button" onClick={() => setConfirmDelete(true)}>Delete application</button>
    </div>
    {confirmDelete && <div className="careers-notice"><p>Permanently delete this application and its resume?</p><div className="careers-actions"><Button variant="dark" type="button" disabled={pending} onClick={() => void update('DELETE')}>Delete permanently</Button><Button variant="outline" type="button" onClick={() => setConfirmDelete(false)}>Keep application</Button></div></div>}
    {error && <p role="alert" className="careers-error">{error}</p>}
  </article>
}

export function CareersAdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [editing, setEditing] = useState<Job | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState(false)
  const [filter, setFilter] = useState('all')
  const refresh = useCallback(async () => {
    const [jobData, applicationData] = await Promise.all([careersApi<{ jobs: Job[] }>('/admin/jobs'), careersApi<{ applications: Application[] }>('/admin/applications')])
    setJobs(jobData.jobs); setApplications(applicationData.applications)
  }, [])
  useEffect(() => {
    careersApi<{ authenticated: boolean }>('/session').then(async (data) => { setAuthenticated(data.authenticated); if (data.authenticated) await refresh() }).catch((error) => { setError(error.message); setAuthenticated(false) })
  }, [refresh])
  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setPending(true); setError('')
    const password = new FormData(event.currentTarget).get('password')
    try { await careersApi('/login', jsonRequest('POST', { password })); await refresh(); setAuthenticated(true) }
    catch (error) { setError((error as Error).message) } finally { setPending(false) }
  }
  const logout = async () => {
    try { await careersApi('/logout', { method: 'POST' }); setAuthenticated(false); setJobs([]); setApplications([]); setEditing(null); setNotice('') }
    catch (error) { setError((error as Error).message) }
  }
  return <main id="main-content" className="careers-page careers-admin"><Seo path="/careers/manage" title="Careers dashboard" noIndex /><Container>
    <div className="careers-back"><Link to="/careers">← Careers</Link></div>
    <header className="careers-section-heading"><Heading as="h1" size="page">Careers dashboard</Heading>{authenticated && <Button variant="outline" type="button" onClick={() => void logout()}>Sign out</Button>}</header>
    {error && <p role="alert" className="careers-error">{error}</p>}
    {notice && <p role="status" className="careers-success">{notice}</p>}
    {authenticated === null ? <p role="status">Checking your session…</p> : !authenticated ? <form className="careers-login contact-form-card" onSubmit={login}><Heading as="h2" size="card">Client sign in</Heading><p>Manage job postings and review applications in one place.</p><FormField label="Password" type="password" name="password" autoComplete="current-password" maxLength={256} required /><Button type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</Button></form> : <>
      <section className="careers-admin-section" aria-labelledby="manage-jobs"><div className="careers-section-heading"><Heading as="h2" id="manage-jobs">Job postings</Heading><Button type="button" onClick={() => { setEditing({ ...blankJob }); setNotice('') }}>Create position</Button></div>
        <div className="careers-admin-jobs">{jobs.map((job) => <article className="careers-admin-job" key={job.id}><div><h3>{job.title}</h3><p>{job.status} · {job.location}</p></div><Button variant="outline" type="button" onClick={() => { setEditing(job); setNotice('') }}>Edit<span className="sr-only"> {job.title}</span></Button></article>)}</div>
        {editing && <JobEditor key={`${editing.id}-${editing.updatedAt ?? 'new'}`} job={editing} onCancel={() => setEditing(null)} onSave={async (job) => { await careersApi('/admin/jobs', jsonRequest('POST', job)); await refresh(); setEditing(null); setNotice('Position saved. Published roles are now visible on Careers.') }} />}
      </section>
      <section className="careers-admin-section" aria-labelledby="manage-applications"><div className="careers-section-heading"><Heading as="h2" id="manage-applications">Applications ({applications.length})</Heading><Button type="button" variant="outline" onClick={() => void refresh().catch((error) => setError(error.message))}>Refresh</Button></div>
        <label className="careers-filter">Filter by position <select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All positions</option>{jobs.map((job) => <option key={job.id} value={job.id}>{job.title}</option>)}</select></label>
        {applications.filter((application) => filter === 'all' || application.jobId === filter).map((application) => <ApplicationCard key={application.id} application={application} refresh={refresh} />)}
        {!applications.some((application) => filter === 'all' || application.jobId === filter) && <p className="careers-notice">No applications to show. New applications will appear here with a private resume download.</p>}
      </section>
    </>}
  </Container></main>
}
