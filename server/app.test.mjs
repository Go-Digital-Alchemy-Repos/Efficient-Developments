import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { once } from 'node:events'
import { createApp } from './app.mjs'
import { hashPassword } from './security.mjs'
import { openStore } from './store.mjs'

const password = 'test-only-password-not-a-production-credential'
const origin = 'http://localhost:5173'
const job = { title: 'Test operator', department: 'Field', location: 'Charlotte, NC', employment: 'Full-time', description: 'Test description', responsibilities: 'Operate equipment safely.', requirements: 'Field experience.', status: 'published', sample: false }
async function setup(t) {
  const directory = await mkdtemp(join(tmpdir(), 'careers-test-'))
  const config = { dbPath: join(directory, 'careers.sqlite'), adminHash: await hashPassword(password), origins: [origin] }
  let server
  let base
  async function start() { server = createApp(config); server.listen(0, '127.0.0.1'); await once(server, 'listening'); base = `http://127.0.0.1:${server.address().port}` }
  async function stop() { await new Promise((done) => server.close(done)) }
  await start()
  t.after(async () => { await stop(); await rm(directory, { recursive: true, force: true }) })
  const request = (path, options = {}) => fetch(`${base}/api/careers${path}`, { ...options, headers: { Origin: origin, ...options.headers } })
  const json = (path, data, cookie, method = 'POST') => request(path, { method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(data) })
  const login = async () => { const response = await json('/login', { password }); assert.equal(response.status, 200); return response.headers.get('set-cookie').split(';')[0] }
  const createJob = async (cookie, changes = {}) => { const response = await json('/admin/jobs', { ...job, ...changes }, cookie); assert.equal(response.status, 200); return (await response.json()).job }
  const apply = (id, overrides = {}) => {
    const form = new FormData()
    for (const [key, value] of Object.entries({ jobId: id, name: 'Test Applicant', email: 'applicant@example.test', phone: '555-0100', message: 'Synthetic test only', consent: 'yes', ...overrides })) form.set(key, value)
    if (!form.has('resume')) form.set('resume', new File(['%PDF-1.7\nSynthetic test resume\n%%EOF'], 'resume.pdf', { type: 'application/pdf' }))
    return request('/applications', { method: 'POST', body: form })
  }
  return { request, json, login, createJob, apply, config, directory, restart: async () => { await stop(); await start() } }
}

test('seeded openings accept applications while admin data remains private', async (t) => {
  const api = await setup(t)
  const response = await api.request('/jobs')
  const { jobs } = await response.json()
  assert.equal(jobs.length, 3)
  assert(jobs.every((job) => !job.sample))
  assert(jobs.every((job) => !job.description.includes('example role')))
  assert.equal((await api.apply(jobs[0].id)).status, 201)
  for (const path of ['/admin/jobs', '/admin/applications', '/admin/applications/anything/resume']) assert.equal((await api.request(path)).status, 401)
  assert.equal((await api.json('/admin/jobs', job)).status, 401)
})

test('legacy seeded role flags are removed without reopening closed roles', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'careers-migration-test-'))
  const dbPath = join(directory, 'careers.sqlite')
  t.after(() => rm(directory, { recursive: true, force: true }))
  let db = openStore(dbPath)
  const openJob = db.prepare("SELECT id, description FROM jobs WHERE status='published' LIMIT 1").get()
  const closedJob = db.prepare("SELECT id FROM jobs WHERE id<>? LIMIT 1").get(openJob.id)
  db.prepare("UPDATE jobs SET sample=1, description=replace(description, 'This role', 'This example role') WHERE id=?").run(openJob.id)
  db.prepare("UPDATE jobs SET sample=1, status='closed' WHERE id=?").run(closedJob.id)
  db.prepare("DELETE FROM settings WHERE key='activateSeededCareersJobsV1'").run()
  db.prepare("DELETE FROM settings WHERE key='removeCareerSamplesV2'").run()
  db.close()

  db = openStore(dbPath)
  const migratedOpenJob = db.prepare('SELECT sample, description, status FROM jobs WHERE id=?').get(openJob.id)
  const migratedClosedJob = db.prepare('SELECT sample, status FROM jobs WHERE id=?').get(closedJob.id)
  assert.equal(migratedOpenJob.sample, 0)
  assert(!migratedOpenJob.description.includes('example role'))
  assert.equal(migratedOpenJob.status, 'published')
  assert.equal(migratedClosedJob.sample, 0)
  assert.equal(migratedClosedJob.status, 'closed')
  db.close()
})

test('admin publishes a job, an applicant uploads a private resume, and data survives restart', async (t) => {
  const api = await setup(t)
  const cookie = await api.login()
  const position = await api.createJob(cookie)
  const response = await api.apply(position.id)
  assert.equal(response.status, 201)
  const application = await response.json()
  assert.equal((await api.apply(position.id)).status, 200, 'retry is idempotent for same email/job')
  await api.restart()
  const applications = await (await api.request('/admin/applications', { headers: { Cookie: cookie } })).json()
  assert.equal(applications.applications.length, 1)
  assert.equal(applications.applications[0].jobTitle, job.title)
  assert.equal(applications.applications[0].resume, undefined)
  const resume = await api.request(`/admin/applications/${application.id}/resume`, { headers: { Cookie: cookie } })
  assert.equal(resume.status, 200)
  assert.match(resume.headers.get('content-disposition'), /^attachment/)
  assert.match(await resume.text(), /Synthetic test resume/)
  assert.equal((await stat(api.config.dbPath)).mode & 0o777, 0o600)
  await api.json('/admin/jobs', { ...position, status: 'closed' }, cookie)
  assert.equal((await api.apply(position.id, { email: 'other@example.test' })).status, 409)
  assert.equal((await api.json(`/admin/applications/${application.id}`, { status: 'reviewing' }, cookie, 'PATCH')).status, 200)
  assert.equal((await api.json(`/admin/applications/${application.id}`, {}, cookie, 'DELETE')).status, 200)
  assert.equal((await api.request(`/admin/applications/${application.id}/resume`, { headers: { Cookie: cookie } })).status, 404)
})

test('invalid uploads, invalid JSON, cross-origin writes and draft jobs are rejected', async (t) => {
  const api = await setup(t)
  assert.equal((await api.json('/login', null)).status, 400)
  assert.equal((await api.json('/login', { password: 'wrong' })).status, 401)
  assert.equal((await api.request('/login', { method: 'POST', headers: { Origin: 'https://attacker.test', 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })).status, 403)
  const cookie = await api.login()
  const position = await api.createJob(cookie)
  assert.equal((await api.apply(position.id, { resume: new File(['not a PDF'], 'resume.pdf') })).status, 400)
  assert.equal((await api.apply(position.id, { resume: new File(['%PDF-' + 'a'.repeat(5 * 1024 * 1024)], 'resume.pdf') })).status, 400)
  assert.equal((await api.apply(position.id, { consent: 'no' })).status, 400)
  assert.equal((await api.apply(position.id, { email: 'invalid' })).status, 400)
  const draft = await api.createJob(cookie, { status: 'draft' })
  assert(!(await (await api.request('/jobs')).json()).jobs.some((job) => job.id === draft.id))
  await api.request('/logout', { method: 'POST', headers: { Cookie: cookie } })
  assert.equal((await api.request('/admin/jobs', { headers: { Cookie: cookie } })).status, 401)
})

test('local clients cannot spoof proxy identity and password rotation expires sessions', async (t) => {
  const api = await setup(t)
  const cookie = await api.login()
  api.config.adminHash = await hashPassword('rotated-test-password')
  await api.restart()
  assert.equal((await api.request('/admin/jobs', { headers: { Cookie: cookie } })).status, 401)
  for (let i = 0; i < 10; i++) await api.request('/login', { method: 'POST', headers: { 'X-Real-IP': `192.0.2.${i}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ password: 'wrong' }) })
  assert.equal((await api.request('/login', { method: 'POST', headers: { 'X-Real-IP': '192.0.2.100', 'Content-Type': 'application/json' }, body: JSON.stringify({ password: 'wrong' }) })).status, 429)
})
