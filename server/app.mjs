import { createServer } from 'node:http'
import { randomBytes, randomUUID } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { isIP } from 'node:net'
import { audit, openStore } from './store.mjs'
import { createLimiter, digest, sessionToken, text, verifyPassword } from './security.mjs'

const fail = (status, message) => Object.assign(new Error(message), { status })
const maxResume = 5 * 1024 * 1024
const jobFields = ['title', 'department', 'location', 'employment', 'description', 'responsibilities', 'requirements']
const contentTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.ico': 'image/x-icon' }

async function body(req, maxBytes = 64000) {
  if (Number(req.headers['content-length'] ?? 0) > maxBytes) throw fail(413, 'The uploaded file is too large.')
  const chunks = []
  let bytes = 0
  for await (const chunk of req) {
    bytes += chunk.length
    if (bytes > maxBytes) throw fail(413, 'The uploaded file is too large.')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}
async function jsonBody(req) {
  if (!req.headers['content-type']?.includes('application/json')) throw fail(415, 'Expected JSON.')
  try {
    const parsed = JSON.parse((await body(req)).toString())
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw fail(400, 'Invalid request.')
    return parsed
  } catch (error) {
    if (error.status) throw error
    throw fail(400, 'Invalid request.')
  }
}
const presentJob = (job) => ({ ...job, sample: Boolean(job.sample) })

export function createApp({ dbPath, adminHash, origins, production = false, trustRailway = false, distPath = 'dist' }) {
  const db = openStore(dbPath)
  const authFingerprint = digest(adminHash ?? '')
  if (db.prepare("SELECT value FROM settings WHERE key='authFingerprint'").get()?.value !== authFingerprint) {
    db.prepare('DELETE FROM sessions').run()
    db.prepare("INSERT OR REPLACE INTO settings VALUES('authFingerprint',?)").run(authFingerprint)
  }
  const limit = createLimiter()
  const dist = resolve(distPath)
  let activeWrites = 0
  const authenticated = (req) => {
    const token = sessionToken(req)
    return token && db.prepare('SELECT token FROM sessions WHERE token=? AND expires>?').get(digest(token), Date.now())
  }
  const cookie = (token, seconds) => `careers_session=${token}; HttpOnly; SameSite=Strict; Path=/api/careers; Max-Age=${seconds}${production ? '; Secure' : ''}`
  const server = createServer(async (req, res) => {
    let countedWrite = false
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://tiles.openfreemap.org; worker-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'")
    const send = (status, data) => {
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
      res.end(JSON.stringify(data))
    }
    try {
      const path = new URL(req.url, 'http://localhost').pathname
      const method = req.method
      if (path === '/api/health') return send(200, { ok: Boolean(db.prepare('SELECT 1').get()) })
      if (!path.startsWith('/api/')) {
        if (method !== 'GET' && method !== 'HEAD') throw fail(405, 'Method not allowed.')
        let file = resolve(dist, '.' + decodeURIComponent(path))
        if (file !== dist && !file.startsWith(dist + sep)) throw fail(404, 'Not found.')
        try { if (!(await stat(file)).isFile()) file = resolve(dist, 'index.html') } catch {
          if (extname(path)) throw fail(404, 'Not found.')
          file = resolve(dist, 'index.html')
        }
        const bytes = await readFile(file)
        res.writeHead(200, { 'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream', 'Content-Length': bytes.length,
          'Cache-Control': extname(file) === '.html' ? 'no-cache' : /\/assets\/index-[\w-]+\./.test(path) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600' })
        return res.end(method === 'HEAD' ? undefined : bytes)
      }
      res.setHeader('Cache-Control', 'no-store')
      if (!['GET', 'HEAD'].includes(method) && !origins.includes(req.headers.origin)) throw fail(403, 'Request origin is not allowed.')
      if (!['GET', 'HEAD'].includes(method)) {
        if (activeWrites >= 4) throw fail(503, 'The server is busy. Please try again shortly.')
        activeWrites++; countedWrite = true
      }
      // Railway's edge supplies X-Real-IP. Ignore proxy headers on direct/local deployments.
      const forwardedIp = req.headers['x-real-ip']
      const client = digest(trustRailway && typeof forwardedIp === 'string' && isIP(forwardedIp) ? forwardedIp : req.socket.remoteAddress ?? 'unknown')
      if (path === '/api/careers/jobs' && method === 'GET') {
        return send(200, { jobs: db.prepare("SELECT * FROM jobs WHERE status='published' ORDER BY sample, updatedAt DESC, title").all().map(presentJob) })
      }
      if (path === '/api/careers/session' && method === 'GET') return send(200, { authenticated: Boolean(authenticated(req)) })
      if (path === '/api/careers/login' && method === 'POST') {
        limit(`login:${client}`, 10, 15 * 60_000)
        if (!adminHash) throw fail(503, 'The careers dashboard is not configured yet.')
        const payload = await jsonBody(req)
        if (!await verifyPassword(payload.password, adminHash)) throw fail(401, 'Incorrect password.')
        const token = randomBytes(32).toString('hex')
        db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now())
        db.prepare('INSERT INTO sessions VALUES (?,?)').run(digest(token), Date.now() + 8 * 60 * 60_000)
        audit(db, 'login')
        res.setHeader('Set-Cookie', cookie(token, 8 * 60 * 60))
        return send(200, { authenticated: true })
      }
      if (path === '/api/careers/logout' && method === 'POST') {
        db.prepare('DELETE FROM sessions WHERE token=?').run(digest(sessionToken(req)))
        res.setHeader('Set-Cookie', cookie('', 0))
        return send(200, { ok: true })
      }
      if (path === '/api/careers/applications' && method === 'POST') {
        limit(`application:${client}`, 5, 60 * 60_000)
        if (!req.headers['content-type']?.startsWith('multipart/form-data')) throw fail(415, 'Please use the application form.')
        const bytes = await body(req, maxResume + 64000)
        let form
        try { form = await new Request('http://localhost/', { method: 'POST', headers: { 'Content-Type': req.headers['content-type'] }, body: bytes }).formData() } catch { throw fail(400, 'Invalid application form.') }
        if (form.get('website')) throw fail(400, 'Unable to accept this application.')
        const jobId = text(form.get('jobId'), 'job', 100)
        const job = db.prepare("SELECT * FROM jobs WHERE id=? AND status='published'").get(jobId)
        if (!job) throw fail(409, 'This position is no longer accepting applications.')
        if (job.sample) throw fail(409, 'This is a reference posting and is not accepting applications.')
        const name = text(form.get('name'), 'name', 150)
        const email = text(form.get('email'), 'email address', 254).toLowerCase()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw fail(400, 'Please enter a valid email address.')
        const phone = text(form.get('phone'), 'phone number', 40)
        const message = text(form.get('message') ?? '', 'message', 5000, false)
        if (form.get('consent') !== 'yes') throw fail(400, 'Please confirm your consent to submit this application.')
        const resume = form.get('resume')
        if (!resume || typeof resume === 'string' || resume.size === 0 || resume.size > maxResume) throw fail(400, 'Attach a PDF resume, up to 5 MB.')
        const resumeBytes = Buffer.from(await resume.arrayBuffer())
        if (!/\.pdf$/i.test(resume.name) || resumeBytes.subarray(0, 5).toString() !== '%PDF-') throw fail(400, 'Your resume must be a PDF file.')
        const now = new Date().toISOString()
        const duplicate = db.prepare('SELECT id FROM applications WHERE jobId=? AND email=? AND submittedAt>?').get(jobId, email, new Date(Date.now() - 10 * 60_000).toISOString())
        if (duplicate) return send(200, { id: duplicate.id, message: 'Your application has already been received.' })
        // Recheck after reading the upload: the client may have closed the role meanwhile.
        if (!db.prepare("SELECT id FROM jobs WHERE id=? AND status='published' AND sample=0").get(jobId)) throw fail(409, 'This position is no longer accepting applications.')
        const id = randomUUID()
        const resumeName = resume.name.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(-120)
        db.prepare('INSERT INTO applications(id,jobId,jobTitle,name,email,phone,message,resume,resumeName,submittedAt,consentAt) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run(id, jobId, job.title, name, email, phone, message, resumeBytes, resumeName, now, now)
        return send(201, { id, message: 'Your application and resume have been received. Thank you for your interest in Efficient Developments.' })
      }
      if (path.startsWith('/api/careers/admin/')) {
        if (!authenticated(req)) throw fail(401, 'Please sign in to manage careers.')
        if (path === '/api/careers/admin/jobs' && method === 'GET') return send(200, { jobs: db.prepare('SELECT * FROM jobs ORDER BY updatedAt DESC, title').all().map(presentJob) })
        if (path === '/api/careers/admin/jobs' && method === 'POST') {
          const data = await jsonBody(req)
          const values = jobFields.map((field) => text(data[field], field, ['description', 'responsibilities', 'requirements'].includes(field) ? 12000 : 200))
          if (!['draft', 'published', 'closed'].includes(data.status) || typeof data.sample !== 'boolean') throw fail(400, 'Choose a valid job status.')
          const id = data.id ? text(data.id, 'job identifier', 100) : randomUUID()
          if (data.id && !db.prepare('SELECT id FROM jobs WHERE id=?').get(id)) throw fail(404, 'Job not found.')
          db.prepare(`INSERT INTO jobs VALUES(?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,department=excluded.department,location=excluded.location,employment=excluded.employment,description=excluded.description,responsibilities=excluded.responsibilities,requirements=excluded.requirements,status=excluded.status,sample=excluded.sample,updatedAt=excluded.updatedAt`).run(id, ...values, data.status, Number(data.sample), new Date().toISOString())
          audit(db, 'save_job', id)
          return send(200, { job: presentJob(db.prepare('SELECT * FROM jobs WHERE id=?').get(id)) })
        }
        if (path === '/api/careers/admin/applications' && method === 'GET') return send(200, { applications: db.prepare('SELECT id,jobId,jobTitle,name,email,phone,message,resumeName,submittedAt,status FROM applications ORDER BY submittedAt DESC').all() })
        const match = path.match(/^\/api\/careers\/admin\/applications\/([\w-]+)(\/resume)?$/)
        if (match) {
          const application = db.prepare('SELECT * FROM applications WHERE id=?').get(match[1])
          if (!application) throw fail(404, 'Application not found.')
          if (match[2] && method === 'GET') {
            audit(db, 'download_resume', application.id)
            res.writeHead(200, { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${application.resumeName}"`, 'Content-Length': application.resume.length, 'Content-Security-Policy': "sandbox; default-src 'none'" })
            return res.end(Buffer.from(application.resume))
          }
          if (!match[2] && method === 'PATCH') {
            const data = await jsonBody(req)
            if (!['new', 'reviewing', 'contacted', 'closed'].includes(data.status)) throw fail(400, 'Invalid application status.')
            db.prepare('UPDATE applications SET status=? WHERE id=?').run(data.status, application.id)
            audit(db, 'update_application', application.id)
            return send(200, { ok: true })
          }
          if (!match[2] && method === 'DELETE') {
            db.prepare('DELETE FROM applications WHERE id=?').run(application.id)
            audit(db, 'delete_application', application.id)
            return send(200, { ok: true })
          }
        }
      }
      throw fail(404, 'Not found.')
    } catch (error) {
      if (!error.status) console.error(JSON.stringify({ event: 'request_error', code: error.code ?? 'internal' }))
      if (!res.headersSent) send(error.status ?? 500, { error: error.status ? error.message : 'Something went wrong. Please try again.' })
      else res.end()
    } finally { if (countedWrite) activeWrites-- }
  })
  server.requestTimeout = 30000
  server.headersTimeout = 15000
  server.on('close', () => db.close())
  return server
}
