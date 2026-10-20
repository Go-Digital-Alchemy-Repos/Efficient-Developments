import { useEffect, useRef, useState } from 'react'
import type { Map as LibreMap } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import { carolinasStyle } from './carolinasStyle'
import 'maplibre-gl/dist/maplibre-gl.css'
import './serviceAreaMap.css'

export function ServiceAreaMap() {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<LibreMap | null>(null)
  const [status, setStatus] = useState('Loading service-area map…')
  const reset = () => map.current?.fitBounds([[-83.6, 32.1], [-76.7, 36.65]], { padding: 28, duration: 0 })

  useEffect(() => {
    const element = container.current
    if (!element) return
    let disposed = false
    let resize: ResizeObserver | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      void import('maplibre-gl').then((libre) => {
        if (disposed) return
        libre.setWorkerUrl(workerUrl)
        const instance = new libre.Map({
          container: element, style: carolinasStyle,
          bounds: [[-83.6, 32.1], [-76.7, 36.65]], fitBoundsOptions: { padding: 28 },
          minZoom: 4, maxZoom: 10, scrollZoom: false, dragRotate: false, pitchWithRotate: false,
          touchPitch: false, attributionControl: false,
        })
        map.current = instance
        instance.touchZoomRotate.disableRotation()
        instance.addControl(new libre.NavigationControl({ showCompass: false }), 'top-right')
        instance.addControl(new libre.AttributionControl({ compact: true }), 'bottom-right')
        instance.on('load', () => { if (!disposed) setStatus('') })
        instance.on('error', () => { if (!disposed) setStatus('Map unavailable. Serving communities throughout North and South Carolina.') })
        resize = new ResizeObserver(() => instance.resize())
        resize.observe(element)
      }).catch(() => { if (!disposed) setStatus('Map unavailable. Serving communities throughout North and South Carolina.') })
    }, { rootMargin: '300px' })
    observer.observe(element)
    return () => { disposed = true; observer.disconnect(); resize?.disconnect(); map.current?.remove(); map.current = null }
  }, [])

  return <div className="service-area__map service-area-map" role="region" aria-label="Interactive service-area map of North and South Carolina">
    <div className="service-area-map__canvas" ref={container} />
    <button className="service-area-map__reset" type="button" onClick={reset} aria-label="Reset map to the Carolinas" title="Reset map">↺</button>
    {status && <p className="service-area-map__status" role="status">{status}</p>}
    <span className="sr-only">Service area: North and South Carolina. Major cities include Charlotte, Raleigh, Greensboro, Asheville, Greenville, Columbia, Florence, Wilmington, and Charleston.</span>
  </div>
}
