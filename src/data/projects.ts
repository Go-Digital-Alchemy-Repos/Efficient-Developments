export const projectCategories = [
  'Asphalt',
  'Commercial Concrete',
  'Residential Concrete',
  'Greenways',
  'Roads & Bridges',
  'Underground Utilities',
] as const

export type ProjectCategory = (typeof projectCategories)[number]

export type Project = {
  category: ProjectCategory
  image: string
  slug: string
  title: string
}

export const projects: Project[] = [
  {
    category: 'Asphalt',
    image: '/assets/images/projects/asphalt.jpg',
    slug: 'n-rocky-river-rd-lawyers-rd-roundabout',
    title: 'N. Rocky River Rd / Lawyers Rd Roundabout',
  },
  {
    category: 'Commercial Concrete',
    image: '/assets/images/projects/commercial-concrete-source.jpg',
    slug: 'cabarrus-arena-events-center-parking',
    title: 'Cabarrus Arena & Events Center Parking',
  },
  {
    category: 'Residential Concrete',
    image: '/assets/images/projects/residential-concrete-source.jpg',
    slug: 'westfield-meadows-subdivision-infrastructure',
    title: 'Westfield Meadows Subdivision Infrastructure',
  },
  {
    category: 'Greenways',
    image: '/assets/images/projects/greenways.jpg',
    slug: 'cabarrus-county-greenway-trail-extension',
    title: 'Cabarrus County Greenway Trail Extension',
  },
  {
    category: 'Roads & Bridges',
    image: '/assets/images/projects/roads-bridges.jpg',
    slug: 'i-485-express-lanes-bridge-deck',
    title: 'I-485 Express Lanes & Bridge Deck',
  },
  {
    category: 'Underground Utilities',
    image: '/assets/images/projects/underground-utilities-source.jpg',
    slug: 'highway-74-storm-drainage-water-main',
    title: 'Highway 74 Storm Drainage & Water Main',
  },
  {
    category: 'Asphalt',
    image: '/assets/images/projects/roundabout-alt.png',
    slug: 'union-county-municipal-resurfacing',
    title: 'Union County Municipal Resurfacing',
  },
  {
    category: 'Commercial Concrete',
    image: '/assets/images/projects/commercial-concrete.png',
    slug: 'cms-bus-facility',
    title: 'CMS Bus Facility',
  },
  {
    category: 'Residential Concrete',
    image: '/assets/images/projects/residential-concrete.png',
    slug: 'carolina-heights-flatwork',
    title: 'Carolina Heights Residential Flatwork',
  },
  {
    category: 'Greenways',
    image: '/assets/images/projects/greenway.png',
    slug: 'beatties-ford-road-sidewalk',
    title: 'Beatties Ford Road Sidewalk',
  },
  {
    category: 'Roads & Bridges',
    image: '/assets/images/projects/bridge.png',
    slug: 'charlotte-bypass-bridge-improvements',
    title: 'Charlotte Bypass Bridge Improvements',
  },
  {
    category: 'Underground Utilities',
    image: '/assets/images/projects/underground-utilities.png',
    slug: 'mecklenburg-water-main-extension',
    title: 'Mecklenburg Water Main Extension',
  },
]
