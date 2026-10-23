import { cn } from '../../lib/cn'
import { initials } from '../../lib/format'

interface AvatarProps {
  name: string
  size?: number
  className?: string
}

export function Avatar({ name, size = 36, className }: AvatarProps) {
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-full bg-peach font-semibold text-ink',
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
