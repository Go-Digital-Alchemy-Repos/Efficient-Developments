import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>
}

export function Tabs({ children, label }: { children: ReactNode; label: string }) {
  return <div className="tabs" role="tablist" aria-label={label}>{children}</div>
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item) => (
          <li key={`${item.to ?? ''}${item.label}`}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
