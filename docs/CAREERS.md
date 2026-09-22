# Careers operations

## Client workflow

About → Company retains `/about`. About → Careers opens `/careers`.
The password-protected dashboard is `/careers/manage`.
Create or edit a position, choose Published, and save to accept applications.
Draft and Closed positions are hidden from the public. The three seeded roles
are published openings and accept applications by default. The optional
“Reference posting only” checkbox is reserved for previewing future role content
without accepting applications.

Applications appear in the dashboard with private PDF downloads and editable
review statuses. No email notifications are sent. Check the dashboard regularly.
Applicants upload a PDF of up to 5 MB and consent to recruitment processing.
Downloads require an authenticated session and are served as attachments. Files
are checked for size, extension, and PDF signature; this is not malware scanning.
Open applicant files only in an updated, sandboxed PDF viewer.

## Runtime and storage

Node 22.16+ serves the Vite build and same-origin `/api/careers` API. Native
SQLite stores jobs, applications, PDF bytes, hashed sessions, and an audit trail.
There are no new third-party runtime packages. Jobs and PDFs are committed in
single database writes; seed data is inserted once and never overwrites edits.
Keep one service replica and one database writer. Do not horizontally scale this
SQLite deployment without migrating storage and shared rate limits.

Production requires:

- `CAREERS_DATA_DIR=/data/careers`, on the persistent Railway volume mounted `/data`.
- `CAREERS_ADMIN_PASSWORD_HASH`: scrypt `32-hex-salt:128-hex-derived-key`.
- `PUBLIC_ORIGIN=https://efficient-developments-production.up.railway.app`.
  Add exact comma-separated origins when adding domains; no trailing slash.
- `RAILPACK_NO_SPA=1` so Railpack runs the Node server instead of static Caddy.
- `RAILPACK_NODE_VERSION=22` for the verified runtime.

`pnpm build` then `pnpm start` starts production. `/api/health` checks database
availability. The server listens on Railway's `PORT`. Configuration fails closed
if storage, password hash, or origin is missing. Railway's trusted `X-Real-IP`
is used only inside Railway; direct/local deployments use the socket address.
Reference: https://railpack.com/languages/node and
https://docs.railway.com/networking/public-networking/specs-and-limits.

For development run `pnpm dev:api` and `pnpm dev` in separate terminals.
Set `CAREERS_ADMIN_PASSWORD_HASH` locally to enable dashboard login. Vite proxies
API requests to port 3001. `.data/` and `.env*` are excluded from Git.

## Credentials

The initial production password is delivered privately outside the repository.
Use a password manager to share it with authorized hiring staff. This version has
one shared client account, not individual staff roles or password recovery.
Generate a password and call `hashPassword` from `server/security.mjs`; send only
the hash to Railway's `CAREERS_ADMIN_PASSWORD_HASH` variable using stdin. Never
commit or log the password. Redeploy after rotation; existing sessions are
invalidated automatically. Sessions expire after eight hours. Mutations require
an allowed Origin; login and application submissions are rate-limited.

## Backups and retention

The client owns applicant data and must set a recruitment retention schedule.
Delete expired applications in the dashboard; this removes their attached PDF
from active records. SQLite free pages and historical volume backups may retain
bytes until vacuum/backup expiry, so deletion is not forensic erasure.

Before accepting real applications, enable an appropriate Railway volume backup
schedule and verify restoration. Automated backups are not configured by code.
Restrict Railway workspace and backup access to authorized operators. For a
manual consistent copy use SQLite's online backup API (not a raw copy of an
active WAL database), protect the resulting file, and apply the same retention
policy. Restore only with the service stopped, preserving a recovery copy of the
current database and its WAL/SHM companions, then check health, jobs, and private
downloads before resuming traffic. Never restore test data over production.
Monitor volume usage, especially as resumes accumulate. Database and directory
permissions are restricted to the service account.

## Verification and rollback

`pnpm test` covers authentication, authorization, upload validation, persistence
across restart, reference/draft restrictions, closing roles, application status
and deletion, session revocation, and throttling. Also run lint/build and browser
checks. Use local synthetic applicants; do not seed real personal data.

Deployments are via GitHub main → Railway, never GitHub Actions. Rolling back
application code must preserve the volume. The initial schema is additive; no
existing business database is migrated. Returning to the pre-careers static
build makes the dashboard unavailable but does not remove stored applications.
