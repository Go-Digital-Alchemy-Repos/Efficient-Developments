# Project Status

## Current Phase

Core desktop marketing pages are implemented. The project is ready for content
replacement, mobile-reference reconciliation, and production integration work.

## Repository

- GitHub: `https://github.com/Go-Digital-Alchemy-Repos/Efficient-Developments`
- Default branch: `main`

## Railway

- Project name: `efficient developments`
- Project ID: `8b6c9f12-09ec-4df7-a25f-a742f7d812c1`
- Project URL: `https://railway.com/project/8b6c9f12-09ec-4df7-a25f-a742f7d812c1`
- Environment: `production`
- Service name: `Efficient-Developments`
- Service ID: `8add55f7-d482-4e61-98da-20380da11216`
- GitHub service connection: Connected to `Go-Digital-Alchemy-Repos/Efficient-Developments`
- Automatic deployment source: GitHub `main`
- Automatic deployments follow the latest pushed commit on GitHub `main`.

## Active Blockers

- Mobile reference frames have not yet been identified in Figma.

## Completed

- Replaced the placeholder portfolio with all seven projects from efficientdev.com,
  preserving the existing page styles and layouts. Imported project descriptions,
  client details, work scopes, and 61 gallery photos; converted 67 source images
  into responsive WebP variants. Added approved neutral photo placeholders for
  the two source projects without photography. See `docs/PROJECT_CONTENT.md`.
- Implemented the `/` route from Figma frame `565:3145` using exact exported
  imagery, logos, icons, and locally hosted Inter and Oswald fonts.
- Reconciled the shared color and typography tokens used by the homepage against
  the Figma design context.
- Verified the 1440px desktop render against the exact 1440×6419 Figma screenshot
  and the supplied `Homepage.jpg`; all documented section boundaries align.
- Verified lint, TypeScript/Vite production build, responsive overflow at tablet
  and mobile widths, and a clean browser console.
- Implemented and visually validated the `/about` route from Figma frame
  `565:3418`, including the leadership-card modal interaction.
- Implemented the six service routes from Figma frames `565:3488`, `565:3887`,
  `565:3995`, `565:4101`, `565:4218`, and `565:4341` with exact local Figma
  imagery/icons, shared service-page structure, and the cross-service sidebar.
- Confirmed that service-page heroes contain no CTA button, per the owner's
  correction to the supplied Figma frames and screenshots.
- Implemented the `/contact` route using the established shared header, footer,
  typography, form controls, and responsive layout system.
- Implemented `/projects` and `/projects/:projectSlug`, including category
  filtering, six-card pagination, the responsive project gallery, image
  lightbox, and adjacent-project navigation.
- Made the shared navigation sticky and reconciled the affected hero and project
  offsets so completed routes retain their intended geometry.
- Constrained homepage foreground content to the established 1296px content
  boundary while keeping background images, gradients, and maps full bleed.
- Reconciled the Commercial Concrete overview section to the shared 80px desktop
  top padding used by the other service pages.
- Updated the canonical primary green token and all former `#5FA67A` references
  to `#7FA67A`, including shared states and local SVG assets.
- Verified the latest implementation with ESLint, the TypeScript/Vite production
  build, major-route browser inspection, and a repository-wide old-color scan.
- Replaced the matched homepage, About, service, project-list, and project-detail
  imagery with the supplied source assets, retaining the established responsive
  containers and verifying the affected routes at desktop and mobile widths.
- Added one-time, reduced-motion-aware viewport reveals to static content across
  the implemented routes without changing the existing interactive transitions
  or accordion, hover, modal, carousel, and navigation behavior.
- Updated the global ink/deep-surface color and all matching translucent and SVG
  uses from `#1A1D21` to `#333333` across the implemented website.
- Standardized every page-level hero heading to uppercase while preserving the
  existing hero typography, dimensions, and responsive behavior.
- Replaced all six service-page hero images and matching homepage service-card
  images with the owner-supplied service photography.
- Converted the homepage testimonial into an accessible two-slide text carousel
  with paused-on-interaction autoplay and reduced-motion support.
- Increased the homepage How We Work image and its aligned section by 60px at
  each responsive layout size while preserving the image crop behavior.
- Updated the desktop featured-project layout so the text column stays fixed at
  its designed width while the adjacent project image absorbs width changes.
- Implemented the Figma-matched responsive navigation drawer at 1200px and
  below, including nested service links, focus trapping, scroll locking, and
  accessible close behavior.
- Added the requested white-and-green hover treatment specifically to the
  homepage Service Area contact button.
- Made the homepage expectation cards content-driven in height, with equal
  heights per grid row and responsive four-, two-, and one-column layouts.
- Added outside-click and Escape dismissal to the desktop Services dropdown.
- Changed the desktop Who We Work With section to two equal fluid columns so
  both sides shrink proportionally with the viewport.
- Set exact 64px top spacing above both the How We Work image and text content
  throughout the 768px–1023px tablet range.
- Made service-page detail sections grow with their content and kept every
  approach image in normal flow at its intrinsic aspect ratio across breakpoints.
- Removed the Asphalt Paving top divider in the two-column service navigation
  and added 40px more space below its Contact Us button.
- Aligned the Projects listing and project-detail content to the shared site
  container and responsive gutters while retaining full-width project navigation.
- Prevented the active Projects pagination button from receiving the inactive
  button hover treatment.
- Grouped the responsive footer with explicit grid areas so Brand and Contact
  share one row while Services and Company remain together on the next row.
- Kept the responsive header visible above its drawer and refined the mobile
  navigation spacing, hover states, service disclosure, and child-route active state.
- Preserved a 32px desktop gap between wrapping project-detail titles and their
  hero images without changing the mobile title layout.
- Re-sequenced viewport entry effects by section and visual hierarchy, slowed
  their duration and stagger by 50%, and preserved one-time and reduced-motion
  behavior across desktop and mobile layouts.
- Replaced the shared header and footer brand marks with the supplied primary
  Efficient Developments SVG while retaining responsive logo containers.
- Rebuilt the supplied Digital Alchemy EPS as an inline footer vector, linked it
  to the agency site, and added the requested text-only green hover treatment.
- Standardized the service offering and homepage expectation cards on the same
  4px `#7FA67A` bottom accent border.
- Centralized the six service hero image sources and reused them directly for
  the matching homepage service cards with cache-safe asset URLs.
- Added a one-time, staggered, reduced-motion-aware count-up treatment to the
  homepage project statistics without changing their final content or sizing.
- Matched the project image lightbox to the About bio modal with a shared
  rounded shell treatment and reusable circular close control.
- Isolated the project image lightbox dimensions from the bio modal with a
  dedicated viewport-constrained dialog and internally scrollable content area.
- Added accessible previous and next controls to the project image lightbox,
  including keyboard arrow navigation and endpoint states matching the gallery.
- Standardized project-detail category eyebrows to uppercase across every
  project route.
- Moved the project lightbox navigation controls onto the photo edges so their
  existing gallery-arrow styling remains visible against the overlay.
- Updated the project lightbox to size itself to each image and proportionally
  contain it within the viewport without internal or page scrollbars.
- Removed the project lightbox's residual native scrollbar gutter so gallery
  images meet the popup edge consistently without a white strip.

## Known Limitations

- The contact form is presentational only and has no submission endpoint.
- Phone, email, address, some leadership biographies, and a testimonial
  are placeholders awaiting final business content.
- Davidson-Concord/Robert Walker and 832 Dobson await project photography;
  their available source descriptions are implemented.
- The exact primary green `#7FA67A` has 2.75:1 contrast against white; an approved
  foreground or palette change is required for WCAG AA text contrast.
- Careers API integration tests are available via `pnpm test`.
- Careers reference roles must be activated before accepting applications;
  client operations, storage, and backup requirements are in `docs/CAREERS.md`.

## Next Action

On the next device, follow the root `README.md`, pull `origin/main`, and verify a
clean working tree before editing. Then identify available mobile Figma frames
or replace placeholder business/contact content when final copy is provided.

## Careers implementation — September 17, 2026

About now contains Company and Careers. Careers includes three reference jobs,
role-specific application forms, private PDF resumes, and a password-protected
client dashboard for job publishing and application review. The Node server
serves the existing Vite site and uses a persistent Railway SQLite volume.
See `docs/CAREERS.md` for configuration, credential rotation, and operations.
