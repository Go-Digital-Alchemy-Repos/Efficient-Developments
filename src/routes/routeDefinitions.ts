export type RouteDefinition = {
  path: string
  title: string
  referenceScreenshot: string
  figmaNode: string | null
}

export const routeDefinitions: RouteDefinition[] = [
  { path: '/', title: 'Home', referenceScreenshot: 'Homepage.jpg', figmaNode: '565:3145' },
  { path: '/about', title: 'About', referenceScreenshot: 'About.jpg', figmaNode: '565:3418' },
  { path: '/projects', title: 'Projects', referenceScreenshot: 'Projects.jpg', figmaNode: '565:3802' },
  {
    path: '/projects/:projectSlug',
    title: 'Project detail',
    referenceScreenshot: 'ProjectsDetail.jpg',
    figmaNode: '565:3595',
  },
  { path: '/contact', title: 'Contact', referenceScreenshot: 'Contact.jpg', figmaNode: '565:3751' },
  {
    path: '/services/asphalt-paving',
    title: 'Asphalt Paving',
    referenceScreenshot: 'AsphaltService.jpg',
    figmaNode: '565:3488',
  },
  {
    path: '/services/commercial-concrete',
    title: 'Commercial Concrete',
    referenceScreenshot: 'CommercialConcrete.jpg',
    figmaNode: '565:3887',
  },
  {
    path: '/services/residential-concrete',
    title: 'Residential Concrete',
    referenceScreenshot: 'ResidentialConcrete.jpg',
    figmaNode: '565:3995',
  },
  {
    path: '/services/greenways',
    title: 'Greenways',
    referenceScreenshot: 'Greenways.jpg',
    figmaNode: '565:4101',
  },
  {
    path: '/services/roads-bridges',
    title: 'Roads & Bridges',
    referenceScreenshot: 'RoadsAndBridges.jpg',
    figmaNode: '565:4218',
  },
  {
    path: '/services/underground-utilities',
    title: 'Underground Utilities',
    referenceScreenshot: 'UndergroundUtilities.jpg',
    figmaNode: '565:4341',
  },
]
