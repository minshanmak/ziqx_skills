import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print -mt-1 mb-4 flex items-center gap-2.5 text-[14px] leading-5">
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <Fragment key={item.label}>
            {item.to && !last ? (
              <Link to={item.to} className="font-medium text-muted hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current={last ? 'page' : undefined} className="font-semibold text-ink">
                {item.label}
              </span>
            )}
            {!last && <ChevronRight size={14} strokeWidth={2} className="text-muted" />}
          </Fragment>
        )
      })}
    </nav>
  )
}
