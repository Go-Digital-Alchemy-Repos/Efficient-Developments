import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const derive = promisify(scrypt)
export const digest = (value) => createHash('sha256').update(value).digest('hex')
export const isPasswordHash = (value) => typeof value === 'string' && /^[0-9a-f]{32}:[0-9a-f]{128}$/i.test(value)
export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = await derive(password, salt, 64)
  return `${salt}:${hash.toString('hex')}`
}
export async function verifyPassword(password, encoded) {
  if (typeof password !== 'string' || password.length > 256 || !isPasswordHash(encoded)) return false
  const [salt, hex] = encoded.split(':')
  if (!salt || !hex || hex.length !== 128) return false
  const hash = await derive(password, salt, 64)
  return timingSafeEqual(hash, Buffer.from(hex, 'hex'))
}
export function sessionToken(req) {
  return req.headers.cookie?.split(';').map((value) => value.trim()).find((value) => value.startsWith('careers_session='))?.slice(16) ?? ''
}
export function createLimiter() {
  const buckets = new Map()
  return (key, limit, windowMs) => {
    const now = Date.now()
    for (const [id, bucket] of buckets) if (bucket.expires < now) buckets.delete(id)
    const bucket = buckets.get(key) ?? { count: 0, expires: now + windowMs }
    bucket.count++
    buckets.set(key, bucket)
    if (bucket.count > limit) throw Object.assign(new Error('Too many attempts. Please try again later.'), { status: 429 })
  }
}
export function text(value, label, max, required = true) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) {
    throw Object.assign(new Error(`Please provide a valid ${label}.`), { status: 400 })
  }
  return value.trim()
}
