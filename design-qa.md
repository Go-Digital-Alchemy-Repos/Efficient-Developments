# Career job hero design QA

- Source visual truth: `/tmp/efficient-careers-hero-comparison/reference.png`
- Desktop implementation: `/tmp/efficient-careers-hero-comparison/implementation.jpg`
- Mobile implementation: `/tmp/efficient-careers-hero-comparison/mobile.jpg`
- Combined comparison: `/tmp/efficient-careers-hero-comparison/comparison.jpg`
- Desktop viewport: 1280 × 720 CSS pixels at 1× density
- Mobile content viewport: 390 × 844 CSS pixels in a same-browser iframe at 1× density
- Source pixels: 2550 × 1968; desktop implementation pixels: 1280 × 720
- Normalization: source and implementation were placed side by side with `object-fit: contain` and top alignment.
- State: published Concrete Finisher job detail with the application form available.

## Full-view comparison evidence

The reference establishes the existing information hierarchy: back link, department eyebrow, large role title, location/employment metadata, then a two-column description/application area. The implementation preserves that hierarchy while moving the first four elements into the requested construction-photo hero. The hero occupies the full content width beneath the site header and the original two-column content begins immediately afterward.

## Focused region evidence

The hero was reviewed independently at desktop and mobile sizes. Oswald remains the display face; Inter remains the UI/body face. The dark directional overlay keeps white eyebrow, title, metadata, and back-link copy legible over bright sky, equipment, and earthwork. At 390px, the title wraps without clipping and the metadata remains readable. No separate focus crop was required because the full viewport captures the complete changed region at readable size.

## Findings

- No remaining P0, P1, or P2 issues.
- P3: future job photography may benefit from per-role focal-point metadata if administrators need exact crop control.

## Comparison history

1. Initial desktop capture found a P1 container-width regression: the hero content touched the viewport edge because `.career-role-hero__inner` overrode the shared container width with `width: 100%`.
2. Removed the width override and rebuilt.
3. The revised desktop capture restored the 72px content gutter and aligned the hero copy with the page content.
4. A 390px mobile capture confirmed correct responsive wrapping, contrast, and continuation into the role body.
5. Browser console checks returned no application errors.

## Implementation checklist

- [x] Stable per-job construction image selection
- [x] Dark layered overlay across all supplied image values
- [x] White eyebrow, title, metadata, and back link
- [x] Responsive desktop and mobile layouts
- [x] Existing application workflow preserved
- [x] Keyboard-accessible back navigation preserved

final result: passed
