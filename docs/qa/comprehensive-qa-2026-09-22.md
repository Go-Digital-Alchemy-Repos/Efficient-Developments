# Comprehensive Website QA and Optimization Report

Date: September 22, 2026  
Repository revision audited: `abd7ddc15b3c35e41f4155ff3112d2f3fd3a1958` plus the working-tree fixes documented below  
Production origin observed: `https://efficient-developments-production.up.railway.app`  
Overall post-fix QA score: **4/5** (good, with documented content, rendering, and deployment follow-ups)

## Executive summary

The site now has route-specific metadata, canonical URLs, robots directives, XML sitemap discovery, structured data, real legal and 404 pages, improved response headers, route-level JavaScript splitting, lazy loading for major below-the-fold images, and a smaller media library. All 23 audited public/admin routes rendered with one `main`, one `h1`, no missing `alt` attributes, no detected placeholder copy, and no horizontal overflow at the desktop test viewport. Representative templates also passed at 320×568, 390×844, 768×1024, and 844×390.

The most important functionality correction was the contact form: it previously called `preventDefault()` and silently discarded every submission. Because no approved email, CRM, or contact endpoint exists, it was replaced with an honest telephone CTA using the verified number. Placeholder address, leadership biographies, and testimonial content were removed rather than published as facts.

The production site was observed but not deployed or altered during this pass. At observation time, production still returned 404 for `robots.txt` and `sitemap.xml`, returned 200 for unknown URLs, and served an earlier 603-byte app shell. Those items are corrected in the local build but require the normal production release path.

## Prioritized findings and disposition

| Severity | Finding | Evidence | Disposition |
|---|---|---|---|
| High | Contact form silently discarded messages | Previous `ContactPage` submit handler only called `preventDefault()` | Fixed: replaced with verified `tel:+17043175966` CTA |
| High | Search discovery was absent | Production `robots.txt` and `sitemap.xml` returned 404; pages had no canonical | Fixed locally: robots, 20-URL sitemap, canonical and route metadata |
| High | Unknown URLs and footer legal links did not have real destinations | Unknown production route returned HTTP 200 and client-routed home; legal links resolved home | Fixed locally: Privacy, Terms, client 404, and server 404 status for unknown routes |
| High | 69 confirmed obsolete image files inflated the repository/deploy artifact | 177.76 MiB and 281 media files before; 73.40 MiB and 212 after | Fixed: removed 104.36 MiB of unreferenced PNG/JPG media |
| High | Placeholder/unverified public content was present | Lorem ipsum leadership bios, placeholder testimonial, fake street address | Fixed: removed affected leaders/testimonial section/address |
| Medium | Every route shared one generic title/description and lacked social metadata | 23-route baseline | Fixed: route title, description, canonical, robots, Open Graph/Twitter metadata |
| Medium | No machine-readable entity/service/project/job context | No JSON-LD in baseline | Fixed: Organization, Service, CreativeWork, and JobPosting JSON-LD |
| Medium | Main JavaScript entry included all page code | Baseline main JS 391.03 kB / 110.28 kB gzip | Fixed: page-level lazy loading; main JS 275.83 kB / 86.64 kB gzip |
| Medium | Missing modern policy headers | Production lacked HSTS and Permissions-Policy | Fixed locally: production HSTS and restrictive Permissions-Policy |
| Medium | Home service scroller target was 8 px high | Mobile computed control audit | Fixed: 24 px interactive input box while retaining 8 px visual track |
| Medium | Below-fold images loaded eagerly | Home, About, and Service templates | Fixed for primary direct image elements with `loading="lazy"` and `decoding="async"` |
| Low | No favicon | Baseline `index.html` | Fixed with local SVG favicon |

No critical findings were identified.

## Route and template test matrix

Automated browser checks covered:

- Home, About, Contact, Projects index.
- All seven project detail routes.
- All six service routes.
- Careers index, a career detail, and the private dashboard sign-in route.
- Privacy Policy, Terms of Use, and an unknown URL.

Post-fix results for all 23 routes:

| Check | Result |
|---|---|
| Exactly one visible `main` | Pass, 23/23 |
| Exactly one visible `h1` | Pass, 23/23 |
| Unique route title/description where applicable | Pass |
| Canonical URL | Pass, 23/23 |
| Admin and 404 `noindex, nofollow` | Pass |
| Missing image `alt` attributes | 0 |
| Placeholder text pattern | 0 matches |
| Desktop horizontal overflow | 0 px, 23/23 |
| Browser console warnings/errors | 0 during exercised flows |

Responsive checks covered Home, service, job, About, Contact, Projects, project detail, Careers, legal, and 404 templates. No horizontal overflow was detected at 320×568, 390×844, 768×1024, or 844×390. The mobile drawer opened, moved focus into the drawer, closed with Escape, and restored focus to the trigger. Projects pagination changed from six cards on page one to one card on page two. The contact CTA resolved to the verified telephone URI.

## Image and media inventory

The complete current inventory is in [`image-inventory-2026-09-22.csv`](./image-inventory-2026-09-22.csv). It records public path, format, bytes, intrinsic dimensions, source-reference status, and treatment for all 212 retained images. Regenerate it with `node scripts/generate-image-inventory.mjs`.

| Metric | Before | After | Change |
|---|---:|---:|---:|
| Image files | 281 | 212 | -69 |
| Total image bytes | 177.76 MiB | 73.40 MiB | -104.36 MiB (-58.7%) |
| PNG | 33 | 4 | -29 |
| JPG | 62 | 22 | -40 |
| WebP | 184 | 184 | unchanged |
| SVG | 2 | 2 | unchanged |

Representative baseline sizing observations:

| Template asset | Intrinsic | Typical rendered size | Treatment |
|---|---:|---:|---|
| Home service photographs | about 2400×1075 | about 370×410 | Retained; lazy loaded. Responsive derivatives remain recommended. |
| About story photographs | 1248×870 | about 547×435 | Retained; lazy loaded. |
| Service approach photograph | about 1900×827 | about 795×364 | Retained; lazy loaded. |
| Project galleries | Multiple responsive WebP sources | Responsive card/gallery sizes | Retained; existing `srcset`, `sizes`, lazy loading, dimensions. |

No WebP/AVIF encoder was available in the audited environment, so remaining legacy PNG/JPG assets were not recompressed with an improvised or unreviewed toolchain. The next media pass should create width-appropriate AVIF/WebP variants for CSS hero/background images and Home service cards, while retaining source masters outside the public bundle.

## Performance and Core Web Vitals evidence

These results are **lab/build evidence**, not field Core Web Vitals. No CrUX/RUM data was available, and Lighthouse was not installed. The browser QA environment intentionally did not expose Navigation Timing, so no Lighthouse score or LCP/INP/CLS number is claimed.

| Build artifact | Before | After |
|---|---:|---:|
| Main JavaScript | 391.03 kB (110.28 kB gzip) | 275.83 kB (86.64 kB gzip) |
| Main/shared CSS | 149.75 kB (22.96 kB gzip) | 65.01 kB (12.17 kB gzip), plus route CSS |
| Home route JavaScript | Included in main | 19.21 kB (5.90 kB gzip) |
| Image library | 177.76 MiB | 73.40 MiB |

The MapLibre dependency remains a large Home-only chunk: 1,017.48 kB JavaScript (274.42 kB gzip) plus a 507.75 kB worker. Page-level splitting prevents non-Home routes from paying for Home page code, but the map should be loaded only when its section nears the viewport or replaced with a lighter static-first experience.

Production transport observations (single non-destructive `curl` sample, therefore not a benchmark): representative HTML TTFB was 41–89 ms and the app shell was 603 bytes. Local post-fix responses were 945 bytes and 1–4 ms. These environments are not directly comparable.

## SEO, structured data, and AI readiness

- Added route-specific titles, descriptions, canonicals, robots policy, Open Graph, and Twitter metadata.
- Added `robots.txt` and a valid XML sitemap with 20 public canonical URLs; the private dashboard and API are disallowed.
- Added JSON-LD: Organization globally, Service on service routes, CreativeWork on projects, and JobPosting on live career details.
- JSON syntax was parsed successfully in-browser for each structured-data type.
- Added a dedicated, noindexed 404 experience and a server-level 404 for unknown non-route paths.
- Added a noindex directive to the private careers dashboard.

Limitation: metadata is updated by the client SPA. Search engines that execute JavaScript can consume it, but social unfurl bots and some AI/search crawlers may only see the generic HTML shell. Static prerendering or server rendering is recommended for complete crawler parity. JobPosting rich-result eligibility also needs confirmed physical address/lifecycle data such as `validThrough`; no unsupported facts were invented.

## Accessibility and mobile UX

- Existing skip link, landmark structure, semantic headings, modal focus traps, Escape handling, reduced-motion handling, and form labels were retained.
- Every audited route had exactly one `h1` and one `main`.
- All rendered images had an `alt` attribute; decorative images use empty alt text.
- Mobile navigation focus entry/restoration and Escape dismissal passed.
- No template overflow appeared down to the supported 320 px minimum.
- Service range control target increased from 8 px to 24 px.
- A full assistive-technology session and a standards-engine contrast crawler were not available; representative keyboard and visual checks passed, but these are not a substitute for a formal WCAG conformance audit.

## Security and reliability

A Standard source-backed Codex Security scan completed against the original repository snapshot with six reviewed surfaces and **zero reportable findings**. It covered public routing, application intake/upload, administrator auth/session/authorization, SQLite storage, response controls, and dependency/deployment configuration. `pnpm audit --prod` returned no known vulnerabilities.

Existing strengths include parameterized SQLite statements, request and upload caps, PDF extension/magic checks, exact-origin state-change checks, SameSite/HttpOnly/Secure production cookies, hashed session tokens, login/application rate limits, generic internal errors, private resume access, restrictive CSP, and filesystem permissions. This pass added HSTS in production and Permissions-Policy. Automated server tests now verify the headers and real unknown-route status.

The security scan used the documented sequential fallback because delegated scan workers were unavailable. Daybreak access was not granted, so no program-specific Daybreak context was used. Scan ID: `5e46ebd8-6eb9-42a2-8b19-abf14d9ea975`.

## Functionality and code quality

- `pnpm lint`: pass, zero warnings.
- `pnpm test`: pass, 6/6 tests.
- `pnpm build`: pass.
- `pnpm audit --prod`: no known vulnerabilities.
- Browser route matrix: pass for 23 routes.
- Console review: no warnings or errors in exercised flows.
- XML sitemap validation: pass with `xmllint`.
- Broken placeholder contact form removed; careers application submission remains covered by end-to-end server tests, including authentication, resume privacy, persistence, validation, origin rejection, password rotation, and deletion.

## Remaining blockers and recommendations

1. **Production release:** local fixes are not reflected in the observed production deployment. Use the normal non-GitHub-Actions release path after review.
2. **Business hours confirmation:** the supplied copy is “8:00 pm – 5:00 pm,” which appears unusual. It was preserved exactly and should be confirmed before changing it to “am.”
3. **Contact integration:** if an online contact form is desired, provide an approved CRM/mail endpoint, recipient policy, spam controls, retention policy, and success/failure behavior. Until then, the phone CTA is the only honest workflow.
4. **Legal review:** the new Privacy and Terms pages are concise, implementation-aligned operational copy and should receive counsel/client approval.
5. **Static metadata delivery:** add prerendering/SSR so crawlers that do not execute JavaScript receive route-specific metadata and JSON-LD in the initial HTML.
6. **Map weight:** intersection-observe and dynamically import the map, or serve a lightweight static map before interaction.
7. **Media derivatives:** add a reviewed AVIF/WebP pipeline for remaining JPG/PNG hero/background assets and define responsive variants for service cards.
8. **Field CWV:** connect privacy-approved real-user monitoring or review CrUX after production has enough traffic; do not treat build sizes as LCP/INP/CLS.

## Exact verification commands

```sh
pnpm audit --prod
pnpm lint
pnpm test
pnpm build
/usr/bin/xmllint --noout public/sitemap.xml
/usr/bin/git diff --check
node scripts/generate-image-inventory.mjs
```

Production read-only spot checks used:

```sh
/usr/bin/curl -sSI https://efficient-developments-production.up.railway.app/
/usr/bin/curl -sS -o /dev/null -w '%{http_code} %{time_starttransfer} %{size_download}\n' \
  https://efficient-developments-production.up.railway.app/robots.txt
/usr/bin/curl -sS -o /dev/null -w '%{http_code} %{time_starttransfer} %{size_download}\n' \
  https://efficient-developments-production.up.railway.app/sitemap.xml
```
