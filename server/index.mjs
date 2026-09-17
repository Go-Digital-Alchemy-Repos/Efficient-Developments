import { createApp } from './app.mjs'
import { isPasswordHash } from './security.mjs'

const production = process.env.NODE_ENV === 'production'
if (production && (!process.env.CAREERS_DATA_DIR || !isPasswordHash(process.env.CAREERS_ADMIN_PASSWORD_HASH) || !process.env.PUBLIC_ORIGIN)) {
  throw new Error('Careers requires persistent storage, an admin password hash, and PUBLIC_ORIGIN in production.')
}
const server = createApp({
  dbPath: `${process.env.CAREERS_DATA_DIR ?? '.data'}/careers.sqlite`,
  adminHash: process.env.CAREERS_ADMIN_PASSWORD_HASH,
  origins: (process.env.PUBLIC_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:3001').split(','),
  production,
  trustRailway: Boolean(process.env.RAILWAY_PROJECT_ID),
})
server.listen(Number(process.env.PORT ?? 3001), '0.0.0.0', () => console.log('Careers server ready'))
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)))
