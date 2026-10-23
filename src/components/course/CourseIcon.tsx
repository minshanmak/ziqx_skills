import { ChartColumn, Database, TrendingUp } from 'lucide-react'
import type { CourseIconName } from '../../types'

const icons = {
  database: Database,
  trending: TrendingUp,
  chart: ChartColumn,
}

export function CourseIcon({ name, size = 28 }: { name: CourseIconName; size?: number }) {
  const Icon = icons[name]
  return <Icon size={size} strokeWidth={1.5} />
}
