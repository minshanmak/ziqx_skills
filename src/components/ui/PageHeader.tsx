import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-[24px] leading-[28px] font-semibold tracking-[-0.015em]">{title}</h1>
      {subtitle && <p className="mt-1 text-[14px] leading-5 text-muted">{subtitle}</p>}
      {children}
    </header>
  )
}
