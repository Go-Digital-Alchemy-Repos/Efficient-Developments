# Project content migration

Imported the seven projects listed at https://efficientdev.com/ on 2026-09-17.
The existing page layout, CSS, typography, colors, and lightbox styling are retained.
`src/data/projects.ts` is the canonical content and image mapping for the listing,
detail pages, adjacent-project navigation, and homepage featured project.

| Project | Source | Gallery photos |
| --- | --- | ---: |
| CMS Bus Facility | https://efficientdev.com/project/cms-bus-facility/ | 9 |
| Franklin Blvd and Trenton Street | https://efficientdev.com/project/franklin-blvd-and-trenton-street/ | 3 |
| N. Rocky River Rd / Lawyers Rd Roundabout | https://efficientdev.com/project/n-rocky-river-rd-lawyers-rd-roundabout/ | 19 |
| Beatties Ford Road Sidewalk | https://efficientdev.com/project/beatties-ford-road-sidewalk/ | 7 |
| Intersections of Lawyers Rd at Indian Trail- Fairview Rd | https://efficientdev.com/project/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/ | 23 |
| Intersections of Davidson-Concord Rd and Robert Walker Rd | https://efficientdev.com/ | 0 |
| 832 Dobson Storm Drainage Improvement Project | https://efficientdev.com/ | 0 |

Descriptions, work scopes, and Owner/GC/CM labels are copied from the source.
Only explicitly supplied locations are shown. Unsupported generic durations,
completion claims, and Highway 74 narrative have been removed. Existing category
labels are assigned by work scope; they are not classifications published by the
source. Filters include only categories represented by these projects.

The last two projects have no photos or detail links on the source homepage.
Per the owner's direction, they remain in the portfolio with neutral “Photos
coming soon” images and their available descriptions. No unrelated photography
is assigned to them. Their galleries are omitted until real photos are supplied.

The homepage feature remains the Rocky River/Lawyers Road project, with its
source description, matching photo, and canonical project link. Its former
`/projects/n-rocky-river-road-roundabout` URL redirects to the canonical slug.
Unmatched former placeholder project URLs return to the portfolio rather than
showing an unrelated real project.

## Image optimization

- 67 source images: 61 gallery photos plus five listing photos and one distinct hero.
- Full-size gallery links were downloaded instead of WordPress's cropped thumbnails.
- Converted to WebP at quality 82, method 6, with EXIF orientation applied and metadata removed.
- Long edge capped at 1920px; detailed images resized further toward a 480 KB download target.
- No upscaling. Aspect ratios are retained; existing CSS still controls display crops.
- Up to three responsive widths per image: 480px, 960px, and the bounded full size.
- 178 WebP files, totaling 33,978,332 bytes including every responsive size.
- Largest variants total 22,400,536 bytes versus 64,273,751 source bytes: 65.1% smaller.
- 480px card variants range from 27,934 to 42,622 bytes.
- Listing, overview, gallery, and adjacent-project images use lazy loading.

`project-image-manifest.json` records every original URL, source hash, dimensions,
local variant path, and byte count. Original downloads are not deployed. Older
assets outside this migration are retained to avoid affecting other site sections.

## Verification

- ESLint and TypeScript/Vite production build passed.
- Seven unique project slugs and all local image paths checked.
- Source gallery counts matched: 9, 3, 19, 7, 23, 0, 0.
- All 178 WebP variants decoded and matched their declared dimensions.
- All seven detail pages checked at 1440px and 390px without horizontal overflow.
- Listing pagination, gallery/lightbox endpoints, Escape dismissal, and gallery
  reset between projects checked in the browser.
