import { ArrowRight } from 'lucide-react'
import { enrolledCourses, resumeTarget } from '../../data/courses'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'
import { CourseIcon } from './CourseIcon'

export function ContinueBanner() {
  const course = enrolledCourses.find((c) => c.id === resumeTarget.courseId)
  if (!course) return null
  const progress = course.progress ?? 0

  return (
    <section
      aria-label="Continue learning"
      className="flex items-center gap-6 rounded-[28px] bg-lavender p-6"
    >
      <div className="grid size-[88px] shrink-0 place-items-center rounded-[20px] bg-white">
        <CourseIcon name={course.icon} size={34} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[12px] leading-4 font-semibold tracking-[0.12em] text-muted uppercase">
          Jump back in
        </p>
        <h2 className="mt-[9px] text-[18px] leading-6 font-semibold tracking-[-0.01em]">{course.title}</h2>
        <p className="mt-[7px] text-[14px] leading-5 text-muted">
          {resumeTarget.moduleTitle} · Lesson {resumeTarget.lessonNumber}: {resumeTarget.lessonTitle}
        </p>
        <div className="mt-[7px] flex items-center gap-4">
          <ProgressBar
            value={progress}
            label="Course progress"
            heightClass="h-2"
            className="max-w-[280px] bg-white/70"
          />
          <span className="text-[13px] leading-[18px] font-semibold text-muted">{progress}% complete</span>
        </div>
      </div>

      <Button
        to={`/courses/${resumeTarget.courseId}/lessons/${resumeTarget.lessonId}`}
        size="lg"
        icon={<ArrowRight size={17} strokeWidth={2} />}
      >
        Resume lesson
      </Button>
    </section>
  )
}
