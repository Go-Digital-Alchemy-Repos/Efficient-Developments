import { useLayoutEffect } from 'react'

const revealSelector = '[data-reveal]'

export function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const observedElements = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
          observedElements.delete(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const observeElement = (element: Element) => {
      if (element.classList.contains('is-revealed') || observedElements.has(element)) return
      observedElements.add(element)
      observer.observe(element)
    }

    const observeWithin = (node: Node) => {
      if (!(node instanceof Element)) return
      if (node.matches(revealSelector)) observeElement(node)
      node.querySelectorAll(revealSelector).forEach(observeElement)
    }

    root.classList.add('reveal-ready')
    document.querySelectorAll(revealSelector).forEach(observeElement)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach(observeWithin))
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      observedElements.clear()
      root.classList.remove('reveal-ready')
    }
  }, [])

  return null
}
