import { Award, Check } from 'lucide-react'
import type { Course } from '../../types'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'
import { CourseIcon } from './CourseIcon'
import { toneBg } from './tones'

export function EnrolledCourseCard({ course }: { course: Course }) {
  const progress = course.progress ?? 0
  const completed = progress >= 100
  const notStarted = progress === 0
  const base = `/courses/${course.id}`

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_1px_2px_rgba(20,21,26,0.03)]">
      <div className={`relative grid h-[104px] place-items-center ${toneBg[course.tone]}`}>
        {completed && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-[12px] font-semibold text-success">
            <Check size={13} strokeWidth={2.5} />
            Completed
          </span>
        )}
        <CourseIcon name={course.icon} />
      </div>

      <div className="px-5 pt-[17px] pb-5">
        <h3 className="text-[17px] leading-6 font-semibold tracking-[-0.01em]">{course.title}</h3>
        <p className="mt-[5px] text-[13px] leading-[18px] text-muted">
          {course.modules} modules · {course.lessons} lessons
        </p>

        <ProgressBar value={progress} label={`${course.title} progress`} className="mt-1.5" />
        <p className="mt-2 text-[13px] leading-[18px] font-semibold text-muted">
          {notStarted ? 'Not started' : progress >= 100 ? 'Finished' : `${progress}% complete`}
        </p>

        <div className="mt-[5px] flex gap-2.5">
          {completed ? (
            <>
              <Button to={base} variant="outline" className="flex-1">
                Review course
              </Button>
              <Button
                to={`${base}/certificate`}
                icon={<Award size={16} strokeWidth={2} />}
                className="flex-1"
              >
                See certificate
              </Button>
            </>
          ) : (
            <Button to={base} fullWidth>
              {notStarted ? 'Start course' : 'Continue Learning'}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
