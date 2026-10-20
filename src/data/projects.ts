// Project copy and photography imported from efficientdev.com on 2026-09-17.
// Source image URLs and optimization details: docs/project-image-manifest.json.
export const projectCategories = [
  'Asphalt',
  'Commercial Concrete',
  'Roads & Bridges',
  'Underground Utilities',
] as const

export type ProjectCategory = (typeof projectCategories)[number]

export type ProjectImage = {
  src: string
  srcSet?: string
  width: number
  height: number
  alt: string
}

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  sourceUrl: string
  clientLabel: 'Owner' | 'GC/CM'
  client: string
  location?: string
  description: string
  work: string
  image: ProjectImage
  hero: ProjectImage
  gallery: ProjectImage[]
}

export const projects: Project[] = [
  {
    "slug": "cms-bus-facility",
    "title": "CMS Bus Facility",
    "category": "Commercial Concrete",
    "sourceUrl": "https://efficientdev.com/project/cms-bus-facility/",
    "clientLabel": "Owner",
    "client": "Charlotte Mecklenburg School District",
    "description": "Reconstruct existing parking lot and utilities",
    "work": "Grading, Concrete Curb, Sidewalk, Milling, Paving, Waterline, Erosion Control",
    "gallery": [
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-01-944.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-01-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-01-944.webp 944w",
        "width": 944,
        "height": 1260,
        "alt": "CMS Bus Facility — project photo 1"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-02-944.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-02-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-02-944.webp 944w",
        "width": 944,
        "height": 1260,
        "alt": "CMS Bus Facility — project photo 2"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-03-1049.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-03-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-03-960.webp 960w, /assets/images/projects/current/cms-bus-facility/gallery-03-1049.webp 1049w",
        "width": 1049,
        "height": 1400,
        "alt": "CMS Bus Facility — project photo 3"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-04-1728.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-04-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-04-960.webp 960w, /assets/images/projects/current/cms-bus-facility/gallery-04-1728.webp 1728w",
        "width": 1728,
        "height": 1296,
        "alt": "CMS Bus Facility — project photo 4"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-05-1555.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-05-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-05-960.webp 960w, /assets/images/projects/current/cms-bus-facility/gallery-05-1555.webp 1555w",
        "width": 1555,
        "height": 1166,
        "alt": "CMS Bus Facility — project photo 5"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-06-1555.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-06-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-06-960.webp 960w, /assets/images/projects/current/cms-bus-facility/gallery-06-1555.webp 1555w",
        "width": 1555,
        "height": 1166,
        "alt": "CMS Bus Facility — project photo 6"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-07-1555.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-07-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-07-960.webp 960w, /assets/images/projects/current/cms-bus-facility/gallery-07-1555.webp 1555w",
        "width": 1555,
        "height": 1166,
        "alt": "CMS Bus Facility — project photo 7"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-08-1728.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-08-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-08-960.webp 960w, /assets/images/projects/current/cms-bus-facility/gallery-08-1728.webp 1728w",
        "width": 1728,
        "height": 1296,
        "alt": "CMS Bus Facility — project photo 8"
      },
      {
        "src": "/assets/images/projects/current/cms-bus-facility/gallery-09-1166.webp",
        "srcSet": "/assets/images/projects/current/cms-bus-facility/gallery-09-480.webp 480w, /assets/images/projects/current/cms-bus-facility/gallery-09-960.webp 960w, /assets/images/projects/current/cms-bus-facility/gallery-09-1166.webp 1166w",
        "width": 1166,
        "height": 1555,
        "alt": "CMS Bus Facility — project photo 9"
      }
    ],
    "image": {
      "src": "/assets/images/projects/current/cms-bus-facility/card-945.webp",
      "srcSet": "/assets/images/projects/current/cms-bus-facility/card-480.webp 480w, /assets/images/projects/current/cms-bus-facility/card-945.webp 945w",
      "width": 945,
      "height": 485,
      "alt": "CMS Bus Facility — project overview"
    },
    "hero": {
      "src": "/assets/images/projects/current/cms-bus-facility/card-945.webp",
      "srcSet": "/assets/images/projects/current/cms-bus-facility/card-480.webp 480w, /assets/images/projects/current/cms-bus-facility/card-945.webp 945w",
      "width": 945,
      "height": 485,
      "alt": "CMS Bus Facility — project overview"
    }
  },
  {
    "slug": "franklin-blvd-and-trenton-street",
    "title": "Franklin Blvd and Trenton Street",
    "category": "Roads & Bridges",
    "sourceUrl": "https://efficientdev.com/project/franklin-blvd-and-trenton-street/",
    "clientLabel": "Owner",
    "client": "City of Gastonia",
    "description": "Widening of Franklin Blvd and Realignment of Trenton Street.",
    "work": "Grading, Drainage, Concrete Curb & Gutter, Monolithic Stamped Concrete Islands, Concrete Sidewalks, Milling, Paving, Waterline, Pavement Markings and Signals Construction.",
    "gallery": [
      {
        "src": "/assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-01-1920.webp",
        "srcSet": "/assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-01-480.webp 480w, /assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-01-960.webp 960w, /assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-01-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Franklin Blvd and Trenton Street — project photo 1"
      },
      {
        "src": "/assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-02-1920.webp",
        "srcSet": "/assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-02-480.webp 480w, /assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-02-960.webp 960w, /assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-02-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Franklin Blvd and Trenton Street — project photo 2"
      },
      {
        "src": "/assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-03-1920.webp",
        "srcSet": "/assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-03-480.webp 480w, /assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-03-960.webp 960w, /assets/images/projects/current/franklin-blvd-and-trenton-street/gallery-03-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Franklin Blvd and Trenton Street — project photo 3"
      }
    ],
    "location": "Gastonia, NC",
    "image": {
      "src": "/assets/images/projects/current/franklin-blvd-and-trenton-street/card-1296.webp",
      "srcSet": "/assets/images/projects/current/franklin-blvd-and-trenton-street/card-480.webp 480w, /assets/images/projects/current/franklin-blvd-and-trenton-street/card-960.webp 960w, /assets/images/projects/current/franklin-blvd-and-trenton-street/card-1296.webp 1296w",
      "width": 1296,
      "height": 680,
      "alt": "Franklin Blvd and Trenton Street — project overview"
    },
    "hero": {
      "src": "/assets/images/projects/current/franklin-blvd-and-trenton-street/card-1296.webp",
      "srcSet": "/assets/images/projects/current/franklin-blvd-and-trenton-street/card-480.webp 480w, /assets/images/projects/current/franklin-blvd-and-trenton-street/card-960.webp 960w, /assets/images/projects/current/franklin-blvd-and-trenton-street/card-1296.webp 1296w",
      "width": 1296,
      "height": 680,
      "alt": "Franklin Blvd and Trenton Street — project overview"
    }
  },
  {
    "slug": "n-rocky-river-rd-lawyers-rd-roundabout",
    "title": "N. Rocky River Rd / Lawyers Rd Roundabout",
    "category": "Asphalt",
    "sourceUrl": "https://efficientdev.com/project/n-rocky-river-rd-lawyers-rd-roundabout/",
    "clientLabel": "GC/CM",
    "client": "NCDOT",
    "description": "Construction from a 4 way stop intersection to a new Roundabout, Realignment of existing Rocky River Road and Lawyers Road",
    "work": "Grading, Drainage, Concrete Curb & Gutter, Monolithic Concrete Islands, Milling, Paving, Waterline and Pavement Markings",
    "gallery": [
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-01-1728.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-01-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-01-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-01-1728.webp 1728w",
        "width": 1728,
        "height": 972,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 1"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-02-1728.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-02-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-02-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-02-1728.webp 1728w",
        "width": 1728,
        "height": 972,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 2"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-03-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-03-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-03-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-03-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 3"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-04-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-04-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-04-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-04-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 4"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-05-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-05-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-05-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-05-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 5"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-06-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-06-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-06-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-06-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 6"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-07-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-07-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-07-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-07-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 7"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-08-1728.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-08-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-08-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-08-1728.webp 1728w",
        "width": 1728,
        "height": 972,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 8"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-09-1728.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-09-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-09-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-09-1728.webp 1728w",
        "width": 1728,
        "height": 972,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 9"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-10-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-10-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-10-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-10-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 10"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-11-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-11-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-11-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-11-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 11"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-12-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-12-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-12-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-12-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 12"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-13-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-13-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-13-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-13-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 13"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-14-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-14-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-14-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-14-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 14"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-15-1166.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-15-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-15-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-15-1166.webp 1166w",
        "width": 1166,
        "height": 1555,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 15"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-16-1166.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-16-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-16-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-16-1166.webp 1166w",
        "width": 1166,
        "height": 1555,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 16"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-17-1920.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-17-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-17-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-17-1920.webp 1920w",
        "width": 1920,
        "height": 1440,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 17"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-18-1049.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-18-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-18-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-18-1049.webp 1049w",
        "width": 1049,
        "height": 1400,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 18"
      },
      {
        "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-19-1440.webp",
        "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-19-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-19-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/gallery-19-1440.webp 1440w",
        "width": 1440,
        "height": 1920,
        "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project photo 19"
      }
    ],
    "image": {
      "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-1286.webp",
      "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-1286.webp 1286w",
      "width": 1286,
      "height": 675,
      "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project overview"
    },
    "hero": {
      "src": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-1286.webp",
      "srcSet": "/assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-480.webp 480w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-960.webp 960w, /assets/images/projects/current/n-rocky-river-rd-lawyers-rd-roundabout/card-1286.webp 1286w",
      "width": 1286,
      "height": 675,
      "alt": "N. Rocky River Rd / Lawyers Rd Roundabout — project overview"
    }
  },
  {
    "slug": "beatties-ford-road-sidewalk",
    "title": "Beatties Ford Road Sidewalk",
    "category": "Commercial Concrete",
    "sourceUrl": "https://efficientdev.com/project/beatties-ford-road-sidewalk/",
    "clientLabel": "Owner",
    "client": "City of Charlotte",
    "description": "Beatties Ford Road between Russell Avenue and Lasalle Street, Charlotte NC",
    "work": "Grading, Concrete Curb, Sidewalk, Milling, Paving, Waterline, Signals, Retaining Walls.",
    "gallery": [
      {
        "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-01-1296.webp",
        "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-01-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-01-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-01-1296.webp 1296w",
        "width": 1296,
        "height": 1728,
        "alt": "Beatties Ford Road Sidewalk — project photo 1"
      },
      {
        "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-02-1049.webp",
        "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-02-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-02-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-02-1049.webp 1049w",
        "width": 1049,
        "height": 1400,
        "alt": "Beatties Ford Road Sidewalk — project photo 2"
      },
      {
        "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-03-1166.webp",
        "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-03-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-03-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-03-1166.webp 1166w",
        "width": 1166,
        "height": 1555,
        "alt": "Beatties Ford Road Sidewalk — project photo 3"
      },
      {
        "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-04-1296.webp",
        "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-04-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-04-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-04-1296.webp 1296w",
        "width": 1296,
        "height": 1728,
        "alt": "Beatties Ford Road Sidewalk — project photo 4"
      },
      {
        "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-05-944.webp",
        "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-05-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-05-944.webp 944w",
        "width": 944,
        "height": 1260,
        "alt": "Beatties Ford Road Sidewalk — project photo 5"
      },
      {
        "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-06-1440.webp",
        "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-06-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-06-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-06-1440.webp 1440w",
        "width": 1440,
        "height": 1920,
        "alt": "Beatties Ford Road Sidewalk — project photo 6"
      },
      {
        "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-07-1296.webp",
        "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/gallery-07-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-07-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/gallery-07-1296.webp 1296w",
        "width": 1296,
        "height": 1728,
        "alt": "Beatties Ford Road Sidewalk — project photo 7"
      }
    ],
    "location": "Charlotte, NC",
    "image": {
      "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/card-1137.webp",
      "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/card-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/card-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/card-1137.webp 1137w",
      "width": 1137,
      "height": 666,
      "alt": "Beatties Ford Road Sidewalk — project overview"
    },
    "hero": {
      "src": "/assets/images/projects/current/beatties-ford-road-sidewalk/card-1137.webp",
      "srcSet": "/assets/images/projects/current/beatties-ford-road-sidewalk/card-480.webp 480w, /assets/images/projects/current/beatties-ford-road-sidewalk/card-960.webp 960w, /assets/images/projects/current/beatties-ford-road-sidewalk/card-1137.webp 1137w",
      "width": 1137,
      "height": 666,
      "alt": "Beatties Ford Road Sidewalk — project overview"
    }
  },
  {
    "slug": "intersections-of-lawyers-rd-at-indian-trail-fairview-rd",
    "title": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd",
    "category": "Roads & Bridges",
    "sourceUrl": "https://efficientdev.com/project/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/",
    "clientLabel": "GC/CM",
    "client": "NCDOT",
    "description": "Construction from a 4 way stop intersection to a new Roundabout",
    "work": "Grading, Drainage, Concrete Curb & Gutter, Monolithic Concrete Islands, Milling, Paving, Waterline and Pavement Markings",
    "gallery": [
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-01-640.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-01-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-01-640.webp 640w",
        "width": 640,
        "height": 480,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 1"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-02-1920.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-02-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-02-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-02-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 2"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-03-640.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-03-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-03-640.webp 640w",
        "width": 640,
        "height": 480,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 3"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-04-640.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-04-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-04-640.webp 640w",
        "width": 640,
        "height": 480,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 4"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-05-1920.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-05-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-05-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-05-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 5"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-06-640.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-06-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-06-640.webp 640w",
        "width": 640,
        "height": 480,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 6"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-07-640.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-07-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-07-640.webp 640w",
        "width": 640,
        "height": 480,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 7"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-08-480.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-08-480.webp 480w",
        "width": 480,
        "height": 640,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 8"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-09-480.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-09-480.webp 480w",
        "width": 480,
        "height": 640,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 9"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-10-640.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-10-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-10-640.webp 640w",
        "width": 640,
        "height": 480,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 10"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-11-640.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-11-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-11-640.webp 640w",
        "width": 640,
        "height": 480,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 11"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-12-480.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-12-480.webp 480w",
        "width": 480,
        "height": 640,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 12"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-13-1728.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-13-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-13-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-13-1728.webp 1728w",
        "width": 1728,
        "height": 972,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 13"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-14-480.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-14-480.webp 480w",
        "width": 480,
        "height": 640,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 14"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-15-480.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-15-480.webp 480w",
        "width": 480,
        "height": 640,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 15"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-16-1920.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-16-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-16-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-16-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 16"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-17-1920.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-17-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-17-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-17-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 17"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-18-480.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-18-480.webp 480w",
        "width": 480,
        "height": 640,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 18"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-19-1440.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-19-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-19-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-19-1440.webp 1440w",
        "width": 1440,
        "height": 1920,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 19"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-20-1260.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-20-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-20-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-20-1260.webp 1260w",
        "width": 1260,
        "height": 1220,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 20"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-21-1920.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-21-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-21-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-21-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 21"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-22-1920.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-22-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-22-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-22-1920.webp 1920w",
        "width": 1920,
        "height": 1080,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 22"
      },
      {
        "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-23-1728.webp",
        "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-23-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-23-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/gallery-23-1728.webp 1728w",
        "width": 1728,
        "height": 972,
        "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project photo 23"
      }
    ],
    "image": {
      "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/card-1920.webp",
      "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/card-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/card-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/card-1920.webp 1920w",
      "width": 1920,
      "height": 1080,
      "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — project overview"
    },
    "hero": {
      "src": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/hero-1920.webp",
      "srcSet": "/assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/hero-480.webp 480w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/hero-960.webp 960w, /assets/images/projects/current/intersections-of-lawyers-rd-at-indian-trail-fairview-rd/hero-1920.webp 1920w",
      "width": 1920,
      "height": 1080,
      "alt": "Intersections of Lawyers Rd at Indian Trail- Fairview Rd — aerial overview"
    }
  },
  {
    "slug": "intersections-of-davidson-concord-rd-and-robert-walker-rd",
    "title": "Intersections of Davidson-Concord Rd and Robert Walker Rd",
    "category": "Roads & Bridges",
    "sourceUrl": "https://efficientdev.com/",
    "clientLabel": "GC/CM",
    "client": "NCDOT",
    "description": "New Roundabout",
    "work": "Grading, Drainage, Paving, Concrete Curb & Gutter, Monolithic Concrete Islands, Thermoplastic Pavement Markings, and Signal",
    "gallery": [],
    "image": {
      "src": "/assets/images/projects/photos-coming-soon.svg",
      "width": 1600,
      "height": 900,
      "alt": "Photos coming soon"
    },
    "hero": {
      "src": "/assets/images/projects/photos-coming-soon.svg",
      "width": 1600,
      "height": 900,
      "alt": "Photos coming soon"
    }
  },
  {
    "slug": "832-dobson-storm-drainage-improvement-project",
    "title": "832 Dobson Storm Drainage Improvement Project",
    "category": "Underground Utilities",
    "sourceUrl": "https://efficientdev.com/",
    "clientLabel": "GC/CM",
    "client": "City of Charlotte",
    "description": "Storm Drainage Improvements",
    "work": "Storm Drainage Improvements with Concrete, Asphalt and Utilities",
    "gallery": [],
    "image": {
      "src": "/assets/images/projects/photos-coming-soon.svg",
      "width": 1600,
      "height": 900,
      "alt": "Photos coming soon"
    },
    "hero": {
      "src": "/assets/images/projects/photos-coming-soon.svg",
      "width": 1600,
      "height": 900,
      "alt": "Photos coming soon"
    }
  }
]

export const featuredProject = projects.find((project) => project.slug === 'n-rocky-river-rd-lawyers-rd-roundabout')!
