import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  /** Leading icon */
  icon?: ReactNode
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined }

type LinkButtonProps = BaseProps & {
  to?: string
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-black border border-ink',
  outline: 'bg-white text-ink border border-line-strong hover:bg-surface',
  ghost: 'bg-transparent text-ink border border-transparent hover:bg-surface',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-4 text-[14px] rounded-xl',
  lg: 'h-12 px-5 text-[15px] rounded-[14px]',
}

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = 'primary', size = 'md', icon, fullWidth, className, children } = props
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )

  if ('href' in props && props.href) {
    const { href, onClick } = props
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {icon}
        {children}
      </Link>
    )
  }

  if ('to' in props && props.to) {
    const { to, onClick } = props
    return (
      <Link href={to} onClick={onClick} className={classes}>
        {icon}
        {children}
      </Link>
    )
  }

  const {
    variant: _v,
    size: _s,
    icon: _i,
    fullWidth: _f,
    className: _c,
    children: _ch,
    type = 'button',
    ...rest
  } = props as ButtonProps
  void [_v, _s, _i, _f, _c, _ch]
  return (
    <button type={type} className={classes} {...rest}>
      {icon}
      {children}
    </button>
  )
}
