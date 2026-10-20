import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { aboutLinks } from '../../data/navigation'

export function AboutDropdown() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const active = pathname === '/about' || pathname.startsWith('/careers')

  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !wrapper.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

  return (
    <div className="primary-navigation__services primary-navigation__about" ref={wrapper}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() }
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setOpen(true)
          requestAnimationFrame(() => wrapper.current?.querySelector<HTMLAnchorElement>('a')?.focus())
        }
      }}>
      <button ref={trigger} type="button" aria-expanded={open} aria-controls="about-dropdown"
        className={`primary-navigation__link primary-navigation__services-trigger${active ? ' is-active' : ''}`}
        onClick={() => setOpen((value) => !value)}>
        About <span aria-hidden="true">▾</span>
      </button>
      <div id="about-dropdown" className="service-dropdown" hidden={!open} data-open={open || undefined}>
        {aboutLinks.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}
          className={({ isActive }) => `service-dropdown__link${isActive ? ' is-active' : ''}`}>{item.label}</NavLink>)}
      </div>
    </div>
  )
}
