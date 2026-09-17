import type { StyleSpecification } from 'maplibre-gl'

const cities: [string, number, number][] = [
  ['Charlotte', -80.8431, 35.2271], ['Asheville', -82.5515, 35.5951],
  ['Greensboro', -79.792, 36.0726], ['Raleigh', -78.6382, 35.7796],
  ['Greenville', -82.394, 34.8526], ['Columbia', -81.0348, 34.0007],
  ['Florence', -79.7626, 34.1954], ['Wilmington', -77.9447, 34.2257],
  ['Charleston', -79.9311, 32.7765],
]

export const carolinasStyle: StyleSpecification = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    osm: { type: 'vector', url: 'https://tiles.openfreemap.org/planet' },
    cities: { type: 'geojson', data: { type: 'FeatureCollection', features: cities.map(([name, lng, lat]) => ({
      type: 'Feature', properties: { name }, geometry: { type: 'Point', coordinates: [lng, lat] },
    })) } },
    states: { type: 'geojson', data: { type: 'FeatureCollection', features: [
      { type: 'Feature', properties: { name: 'NORTH CAROLINA' }, geometry: { type: 'Point', coordinates: [-77.9, 35.55] } },
      { type: 'Feature', properties: { name: 'SOUTH CAROLINA' }, geometry: { type: 'Point', coordinates: [-80.8, 33.4] } },
    ] } },
  },
  layers: [
    { id: 'land', type: 'background', paint: { 'background-color': '#f5f6f2' } },
    { id: 'water', type: 'fill', source: 'osm', 'source-layer': 'water', paint: { 'fill-color': '#e3ebea' } },
    { id: 'state-borders', type: 'line', source: 'osm', 'source-layer': 'boundary', filter: ['all', ['==', ['get', 'admin_level'], 4], ['!=', ['get', 'maritime'], 1]], paint: { 'line-color': '#c8d0c4', 'line-width': 1.2 } },
    { id: 'interstates', type: 'line', source: 'osm', 'source-layer': 'transportation', filter: ['all', ['==', ['get', 'class'], 'motorway'], ['==', ['get', 'network'], 'us-interstate']], paint: { 'line-color': '#7fa67a', 'line-width': ['interpolate', ['linear'], ['zoom'], 5, 1, 8, 2, 11, 3] } },
    { id: 'state-names', type: 'symbol', source: 'states', layout: { 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'], 'text-size': 12, 'text-letter-spacing': 0.15 }, paint: { 'text-color': '#747e70', 'text-halo-color': '#f5f6f2', 'text-halo-width': 2 } },
    { id: 'city-dots', type: 'circle', source: 'cities', paint: { 'circle-radius': 3, 'circle-color': '#383b37', 'circle-stroke-color': '#f5f6f2', 'circle-stroke-width': 1.5 } },
    { id: 'city-names', type: 'symbol', source: 'cities', layout: { 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'], 'text-size': 15, 'text-anchor': 'bottom', 'text-offset': [0, -0.5] }, paint: { 'text-color': '#383b37', 'text-halo-color': '#f5f6f2', 'text-halo-width': 2 } },
  ],
}
