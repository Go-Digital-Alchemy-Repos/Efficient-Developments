# Efficient Developments implementation plan

## Evidence status

- Reference screenshots: all 11 desktop JPG files inspected at their original 1440px width.
- Figma target: file `6SGP9lxIhielddd4rH0LCJ`, node `565:3071`.
- Figma connector: connected and authenticated on 2026-09-16; access to file `6SGP9lxIhielddd4rH0LCJ`, node `565:3071`, was verified through metadata retrieval.
- Figma `get_design_context` and the exact 1440×6419 screenshot for homepage frame `565:3145`: retrieved and implemented on 2026-09-16.
- Remaining route design contexts, variables, and per-variant screenshots: pending retrieval. No node IDs beyond verified metadata have been guessed.
- Mobile references: not present in the supplied screenshot folder and not yet retrieved from Figma.
- Website images and logos: intentionally not downloaded; the project owner will supply them.

## Route map

| Route | Figma frame | Reference screenshot | Variant status |
| --- | --- | --- | --- |
| `/` | `565:3145` (`Homepage/`), verified within supplied canvas `565:3071` | `Homepage.jpg` (1440×6419) | Desktop implemented and verified; mobile reference missing |
| `/about` | Pending metadata | `About.jpg` (1440×3333) | Desktop inspected; mobile missing |
| `/projects` | Pending metadata | `Projects.jpg` (1440×1628) | Desktop inspected; mobile missing |
| `/projects/:projectSlug` | Pending metadata | `ProjectsDetail.jpg` (1440×2849) | Desktop inspected; mobile missing |
| `/contact` | Pending metadata | `Contact.jpg` (1440×1166) | Desktop inspected; mobile missing |
| `/services/asphalt-paving` | Pending metadata | `AsphaltService.jpg` (1440×2544) | Desktop inspected; mobile missing |
| `/services/commercial-concrete` | Pending metadata | `CommercialConcrete.jpg` (1440×2498) | Desktop inspected; mobile missing |
| `/services/residential-concrete` | Pending metadata | `ResidentialConcrete.jpg` (1440×2556) | Desktop inspected; mobile missing |
| `/services/greenways` | Pending metadata | `Greenways.jpg` (1440×2542) | Desktop inspected; mobile missing |
| `/services/roads-bridges` | Pending metadata | `RoadsAndBridges.jpg` (1440×2518) | Desktop inspected; mobile missing |
| `/services/underground-utilities` | Pending metadata | `UndergroundUtilities.jpg` (1440×2520) | Desktop inspected; mobile missing |

## Section to component map

| Page pattern | Foundation component | Notes |
| --- | --- | --- |
| Global chrome | `PageShell`, `Header`, `Footer`, `Logo` | Shared by every route; mobile navigation behavior included |
| Horizontal content bounds | `Container` | `content` and `wide` variants only |
| Vertical section rhythm/background | `Section` | Default, muted, dark, and green tones |
| Calls to action | `Button`, `ButtonLink` | Primary, dark, outline, and text variants |
| Display typography | `Heading`, `Eyebrow` | Condensed uppercase heading voice and green label rule |
| Framed imagery | `Media` | Defaults to `contain`; `cover` requires evidence and focal position |
| Repeated content panels | `Card` | White surface with green lower rule seen in references |
| Contact form controls | `FormField` | Input and textarea primitives |
| Projects/supporting navigation | `Badge`, `Tabs`, `Breadcrumbs` | Foundation only; pagination is deferred until evidence appears |
| Service pages | Shared service hero, service sidebar, service overview, service capability cards | To implement after Figma nodes and assets are available |
| Project pages | Project filters, project cards, project facts, gallery, adjacent-project navigation | To implement after asset mapping |

## Asset map

Source assets remain pending delivery in `public/assets/images` and `public/assets/logos`. Preserve exact filenames and bytes. Once supplied, create a manifest that maps each semantic use to its source path, natural dimensions, aspect ratio, fit mode, and focal position.

Observed image treatments include:

- Full-width heroes: intentional `cover` crop with a dark overlay; focal position must be recorded per route.
- Editorial two-column images: fixed responsive containers, usually landscape; verify exact ratios in Figma.
- Project cards: consistent landscape crop, screenshot-estimated near 1.67:1.
- Leadership cards: portrait crop, screenshot-estimated near 0.78:1.
- Logos and icons: use only supplied or Figma-exported assets; no hand-drawn replacements or icon package.

## Design-system status

CSS custom properties live in `src/styles/tokens.css`. Homepage colors and font families have been reconciled against frame `565:3145`; tokens not exercised by that frame still require verification against relevant Figma variables/properties. Exact Figma values take precedence.

The screenshots establish these stable design directions: white and pale-gray surfaces, charcoal text, muted green accents, condensed uppercase display typography, neutral sans-serif body copy, square buttons/controls, fine gray dividers, wide desktop gutters, and a 1440px presentation canvas.

## Unknowns and required follow-up

1. Run `get_design_context` on each verified page/frame node before implementing that route.
2. Use metadata only if the supplied node is too broad; retrieve exact child frames and screenshots for every desktop and mobile variant.
3. Confirm exact font family files/weights and licensing. The screenshot suggests a condensed display family but does not prove its identity.
4. Reconcile exact colors, type metrics, gutters, container widths, breakpoints, radii, shadows, and controls against Figma.
5. Confirm whether a dedicated Services index route exists; current `/services` safely redirects to the first documented service page.
6. Confirm project-detail slug/content model, contact details, careers destination, policy/terms routes, form submission behavior, and map implementation.
7. Add the supplied assets without modifying source files, then complete the semantic asset manifest.
