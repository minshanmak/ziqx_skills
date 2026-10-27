import { ChevronLeft, Quote } from 'lucide-react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { testimonial } from '../../data/certificates'
import { Logo } from '../ui/Logo'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 bg-white p-4 lg:grid-cols-[637fr_760fr]">
      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px]">
          <div className="pl-[22px]">
            <Logo />
          </div>
          <h1 className="mt-7 text-[28px] leading-tight font-bold tracking-[-0.02em]">{title}</h1>
          <p className="mt-1.5 text-[14px] text-muted">{subtitle}</p>

          <div className="mt-6">{children}</div>

          <p className="mt-5 text-center text-[14px] text-muted">{footer}</p>
          <Link
            href="/courses"
            className="mt-5 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink"
          >
            <ChevronLeft size={14} strokeWidth={2.2} />
            Back to course page
          </Link>
        </div>
      </section>

      <aside className="hidden min-h-[calc(100vh-2rem)] flex-col items-center justify-center rounded-[32px] bg-lavender px-10 lg:flex">
        <figure className="w-full max-w-[420px] rounded-3xl bg-white p-7 shadow-[0_6px_20px_rgba(20,21,26,0.06)]">
          <Quote size={22} strokeWidth={1.75} className="text-muted" />
          <blockquote className="mt-4 text-[17px] leading-[1.45] font-semibold tracking-[-0.01em]">
            {testimonial.quote}
          </blockquote>
          <figcaption className="mt-4 text-[13px] text-muted">
            {testimonial.author} · {testimonial.role}
          </figcaption>
        </figure>
        <p className="mt-7 text-center text-[18px] font-semibold tracking-[-0.01em]">
          {testimonial.tagline}
        </p>
      </aside>
    </div>
  )
}
