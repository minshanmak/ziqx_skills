import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface TabsProps {
  items: { to: string; label: string }[]
}

export function Tabs({ items }: TabsProps) {
  return (
    <nav className="flex gap-1" aria-label="Course tabs">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            cn(
              'inline-flex h-11 items-center border-b-2 px-4 text-[14px] font-semibold transition-colors',
              isActive ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
