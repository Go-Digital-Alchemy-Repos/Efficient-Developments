# Service-area maps

`ServiceAreaMap` is the shared MapLibre GL JS component. The homepage service-area
panel was the only rendered map found in the current React site; its existing
split layout and responsive height are preserved. Contact's address pin is an
icon, not a map. Reuse this component for future service-area map placements.

The local style in `carolinasStyle.ts` uses OpenFreeMap's OpenStreetMap vector
tiles with pale land/water, state boundaries, sage interstate lines, and nine
selected city labels. Local streets, businesses, land-use colors, buildings,
and terrain are omitted. Zoom, pan, and reset work; scroll-wheel zoom is disabled
to preserve page scrolling. No location permission or API key is needed.

MapLibre (BSD-3-Clause) is dynamically imported when the panel approaches the
viewport. Its worker is bundled locally through Vite, with `worker-src 'self'`.
The server CSP permits tile and glyph requests only to `tiles.openfreemap.org`
in addition to existing same-origin requests. Provider/OSM attribution remains
visible. Map data requires network access to OpenFreeMap; loading/failure text
and a screen-reader service-area description accompany the map.

References: https://openfreemap.org/quick_start/ and
https://maplibre.org/maplibre-gl-js/docs/.
