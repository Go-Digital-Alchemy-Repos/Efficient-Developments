import { DatabaseSync } from 'node:sqlite'
import { chmodSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { sampleJobs } from './seed.mjs'

export function openStore(path) {
  process.umask(0o077)
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 })
  chmodSync(dirname(path), 0o700)
  const db = new DatabaseSync(path, { timeout: 5000 })
  for (const file of [path, `${path}-wal`, `${path}-shm`]) if (existsSync(file)) chmodSync(file, 0o600)
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY, title TEXT NOT NULL, department TEXT NOT NULL,
      location TEXT NOT NULL, employment TEXT NOT NULL, description TEXT NOT NULL,
      responsibilities TEXT NOT NULL, requirements TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('draft','published','closed')),
      sample INTEGER NOT NULL DEFAULT 0, updatedAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY, jobId TEXT NOT NULL REFERENCES jobs(id), jobTitle TEXT NOT NULL,
      name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, message TEXT NOT NULL,
      resume BLOB NOT NULL, resumeName TEXT NOT NULL, submittedAt TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new', consentAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, action TEXT NOT NULL, entityId TEXT, createdAt TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS applications_job ON applications(jobId);
  `)
  if (!db.prepare("SELECT value FROM settings WHERE key = 'seeded'").get()) {
    db.exec('BEGIN')
    try {
      const insert = db.prepare('INSERT OR IGNORE INTO jobs VALUES (?,?,?,?,?,?,?,?,?,?,?)')
      for (const job of sampleJobs) insert.run(job.id, job.title, job.department, job.location, job.employment, job.description, job.responsibilities, job.requirements, 'published', 0, new Date().toISOString())
      db.prepare("INSERT INTO settings VALUES ('seeded','1')").run()
      db.exec('COMMIT')
    } catch (error) { db.exec('ROLLBACK'); throw error }
  }
  if (!db.prepare("SELECT value FROM settings WHERE key = 'activateSeededCareersJobsV1'").get()) {
    db.exec('BEGIN')
    try {
      const activate = db.prepare("UPDATE jobs SET sample=0, description=replace(description, 'This example role', 'This role'), updatedAt=? WHERE id=? AND sample=1")
      const now = new Date().toISOString()
      for (const job of sampleJobs) activate.run(now, job.id)
      db.prepare("INSERT INTO settings VALUES ('activateSeededCareersJobsV1','1')").run()
      db.exec('COMMIT')
    } catch (error) { db.exec('ROLLBACK'); throw error }
  }
  if (!db.prepare("SELECT value FROM settings WHERE key = 'removeCareerSamplesV2'").get()) {
    db.exec('BEGIN')
    try {
      db.prepare("UPDATE jobs SET sample=0, description=replace(description, 'This example role', 'This role')").run()
      db.prepare("INSERT INTO settings VALUES ('removeCareerSamplesV2','1')").run()
      db.exec('COMMIT')
    } catch (error) { db.exec('ROLLBACK'); throw error }
  }
  return db
}

export function audit(db, action, entityId = null) {
  db.prepare('INSERT INTO audit(action,entityId,createdAt) VALUES(?,?,?)').run(action, entityId, new Date().toISOString())
}
