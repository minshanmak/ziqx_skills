'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/cn'

interface TabsProps {
  items: { to: string; label: string }[]
}

export function Tabs({ items }: TabsProps) {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1" aria-label="Course tabs">
      {items.map((item) => {
        const isActive = pathname === item.to
        return (
          <Link
            key={item.to}
            href={item.to}
            className={cn(
              'inline-flex h-11 items-center border-b-2 px-4 text-[14px] font-semibold transition-colors',
              isActive ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
