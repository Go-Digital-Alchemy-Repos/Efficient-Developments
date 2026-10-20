import { useEffect } from 'react'
import { seoSiteOrigin } from './config'

const siteName = 'Efficient Developments'
const defaultDescription = 'Heavy civil infrastructure contractor serving municipalities and developers across the Carolinas.'

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>

interface SeoProps {
  title?: string
  description?: string
  path: string
  image?: string
  noIndex?: boolean
  structuredData?: StructuredData
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.append(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value))
}

export function Seo({ title, description = defaultDescription, path, image, noIndex = false, structuredData }: SeoProps) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteName}` : siteName
    const canonical = new URL(path, seoSiteOrigin).toString()
    const imageUrl = image ? new URL(image.split('?')[0], seoSiteOrigin).toString() : undefined
    document.title = pageTitle
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })

    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove()
      document.head.querySelector('meta[name="twitter:image"]')?.remove()
    }

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.append(canonicalLink)
    }
    canonicalLink.href = canonical

    document.head.querySelectorAll('script[data-site-structured-data]').forEach((node) => node.remove())
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: seoSiteOrigin,
      telephone: '+1-704-317-5966',
      areaServed: ['North Carolina', 'South Carolina'],
    }
    const entries = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : []
    for (const data of [organization, ...entries]) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.siteStructuredData = 'true'
      script.text = JSON.stringify(data).replace(/</g, '\\u003c')
      document.head.append(script)
    }
  }, [description, image, noIndex, path, structuredData, title])

  return null
}
