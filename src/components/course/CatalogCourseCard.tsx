'use client'

import type { Course } from '../../types'
import { formatPrice } from '../../lib/format'
import { Button } from '../ui/Button'
import { CourseIcon } from './CourseIcon'
import { toneBg } from './tones'

interface CatalogCourseCardProps {
  course: Course
  onEnroll?: (course: Course) => void
}

export function CatalogCourseCard({ course, onEnroll }: CatalogCourseCardProps) {
  const free = (course.price ?? 0) === 0

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_1px_2px_rgba(20,21,26,0.03)]">
      <div className={`grid h-[104px] place-items-center ${toneBg[course.tone]}`}>
        <CourseIcon name={course.icon} />
      </div>

      <div className="px-5 pt-[17px] pb-5">
        <h3 className="text-[17px] leading-6 font-semibold tracking-[-0.01em]">{course.title}</h3>
        <p className="mt-[5px] text-[13px] leading-[18px] text-muted">
          {course.modules} modules · {course.lessons} lessons
        </p>

        <div className="mt-1.5 flex items-center justify-between text-[13px] leading-[18px]">
          <span className="text-muted">{course.level}</span>
          <span className="font-semibold">{formatPrice(course.price ?? 0)}</span>
        </div>

        <Button
          variant={free ? 'primary' : 'outline'}
          fullWidth
          className="mt-[5px]"
          onClick={() => onEnroll?.(course)}
        >
          {free ? 'Enroll for free' : 'Enroll'}
        </Button>
      </div>
    </article>
  )
}
