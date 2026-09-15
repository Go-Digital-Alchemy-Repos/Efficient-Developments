export type RouteDefinition = {
  path: string
  title: string
  referenceScreenshot: string
  figmaNode: string | null
}

export const routeDefinitions: RouteDefinition[] = [
  { path: '/', title: 'Home', referenceScreenshot: 'Homepage.jpg', figmaNode: '565:3145' },
  { path: '/about', title: 'About', referenceScreenshot: 'About.jpg', figmaNode: null },
  { path: '/projects', title: 'Projects', referenceScreenshot: 'Projects.jpg', figmaNode: null },
  {
    path: '/projects/:projectSlug',
    title: 'Project detail',
    referenceScreenshot: 'ProjectsDetail.jpg',
    figmaNode: null,
  },
  { path: '/contact', title: 'Contact', referenceScreenshot: 'Contact.jpg', figmaNode: '565:3751' },
  {
    path: '/services/asphalt-paving',
    title: 'Asphalt Paving',
    referenceScreenshot: 'AsphaltService.jpg',
    figmaNode: null,
  },
  {
    path: '/services/commercial-concrete',
    title: 'Commercial Concrete',
    referenceScreenshot: 'CommercialConcrete.jpg',
    figmaNode: null,
  },
  {
    path: '/services/residential-concrete',
    title: 'Residential Concrete',
    referenceScreenshot: 'ResidentialConcrete.jpg',
    figmaNode: null,
  },
  {
    path: '/services/greenways',
    title: 'Greenways',
    referenceScreenshot: 'Greenways.jpg',
    figmaNode: null,
  },
  {
    path: '/services/roads-bridges',
    title: 'Roads & Bridges',
    referenceScreenshot: 'RoadsAndBridges.jpg',
    figmaNode: null,
  },
  {
    path: '/services/underground-utilities',
    title: 'Underground Utilities',
    referenceScreenshot: 'UndergroundUtilities.jpg',
    figmaNode: null,
  },
]
