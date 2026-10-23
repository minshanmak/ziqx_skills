import { cn } from '../../lib/cn'

interface ProgressBarProps {
  value: number
  label?: string
  className?: string
  /** Tailwind height class, defaults to 6px */
  heightClass?: string
}

export function ProgressBar({ value, label, className, heightClass = 'h-1.5' }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label}
      className={cn('w-full overflow-hidden rounded-full bg-surface', heightClass, className)}
    >
      <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${pct}%` }} />
    </div>
  )
}
