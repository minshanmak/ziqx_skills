export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name
}

export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free'
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatTimer(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
