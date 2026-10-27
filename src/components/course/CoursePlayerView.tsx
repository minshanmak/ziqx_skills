'use client'

import { ArrowRight, Check, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CourseContentPanel } from '@/components/course/CourseContentPanel'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import {
  dataAnalysisModules,
  getCourse,
  initiallyCompleted,
  lessonDetails,
  resumeTarget,
} from '@/data/courses'

export function CoursePlayerView({
  courseId,
  lessonId,
}: {
  courseId: string
  lessonId?: string
}) {
  const router = useRouter()
  const course = getCourse(courseId)

  const [completed, setCompleted] = useState<Set<string>>(() => new Set(initiallyCompleted))

  const currentId = lessonId ?? resumeTarget.lessonId
  const lesson = lessonDetails[currentId]

  const flat = useMemo(() => dataAnalysisModules.flatMap((m) => m.items), [])
  const nextItem = flat[flat.findIndex((i) => i.id === currentId) + 1]

  if (!course) {
    router.replace('/courses')
    return null
  }
  // Only the Data analysis outline is mocked – other courses fall back to it too.
  if (!lesson) {
    router.replace(`/courses/${course.id}`)
    return null
  }

  const isDone = completed.has(currentId)
  const toggleComplete = () =>
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(currentId)) next.delete(currentId)
      else next.add(currentId)
      return next
    })

  const goNext = () => {
    if (!nextItem) return router.push('/courses')
    setCompleted((prev) => new Set(prev).add(currentId))
    router.push(
      nextItem.type === 'quiz'
        ? `/courses/${course.id}/quiz/${nextItem.id}`
        : `/courses/${course.id}/lessons/${nextItem.id}`,
    )
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'My courses', to: '/courses' }, { label: course.title }]} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="relative grid aspect-[955/500] w-full place-items-center rounded-[20px] bg-ink">
            {/* TODO: replace with your real <video> / embed player */}
            <button
              type="button"
              aria-label="Play lesson video"
              className="grid size-[72px] place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <span className="grid size-[44px] place-items-center rounded-full border-[1.5px] border-white">
                <Play size={18} strokeWidth={1.75} className="translate-x-px" />
              </span>
            </button>
          </div>

          <h1 className="mt-[17px] text-[18px] leading-6 font-semibold tracking-[-0.01em]">{lesson.title}</h1>
          <p className="mt-[5px] text-[13px] leading-[18px] text-muted">
            Module {lesson.moduleNumber} · {lesson.moduleTitle} · {lesson.minutes} min
          </p>
          <p className="mt-1 text-[14px] leading-[22px] text-muted">{lesson.description}</p>

          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              icon={<Check size={16} strokeWidth={2.2} />}
              onClick={toggleComplete}
              aria-pressed={isDone}
            >
              {isDone ? 'Completed' : 'Mark as complete'}
            </Button>
            <Button icon={<ArrowRight size={16} strokeWidth={2.2} />} onClick={goNext}>
              Next lesson
            </Button>
          </div>
        </div>

        <CourseContentPanel
          courseId={course.id}
          modules={dataAnalysisModules}
          progress={course.progress ?? 0}
          currentLessonId={currentId}
          completed={completed}
          initiallyCompleted={initiallyCompleted}
        />
      </div>
    </>
  )
}
