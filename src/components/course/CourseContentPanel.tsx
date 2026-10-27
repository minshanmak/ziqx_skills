'use client'

import {
  CircleCheck,
  CircleHelp,
  CirclePlay,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '../../lib/cn'
import type { CourseModule, LessonItem } from '../../types'
import { ProgressBar } from '../ui/ProgressBar'

interface CourseContentPanelProps {
  courseId: string
  modules: CourseModule[]
  progress: number
  currentLessonId: string
  completed: Set<string>
  initiallyCompleted: string[]
}

function DashedCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="text-muted">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.6 2.6" />
    </svg>
  )
}

function LessonIcon({ item, done, current }: { item: LessonItem; done: boolean; current: boolean }) {
  if (done) return <CircleCheck size={20} strokeWidth={1.75} className="text-success" />
  if (current) return <CirclePlay size={20} strokeWidth={1.75} className="text-ink" />
  if (item.type === 'quiz') return <CircleHelp size={20} strokeWidth={1.75} className="text-muted" />
  return <DashedCircle />
}

export function CourseContentPanel({
  courseId,
  modules,
  progress,
  currentLessonId,
  completed,
  initiallyCompleted,
}: CourseContentPanelProps) {
  // The module containing the current lesson starts open
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(modules.filter((m) => m.items.some((i) => i.id === currentLessonId)).map((m) => m.id)),
  )

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <aside className="self-start rounded-[20px] border border-line bg-white px-5 pt-5 pb-3.5 shadow-[0_1px_2px_rgba(20,21,26,0.03)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] leading-6 font-semibold tracking-[-0.01em]">Course content</h2>
        <span className="text-[13px] leading-[18px] font-semibold text-muted">{progress}%</span>
      </div>
      <ProgressBar value={progress} label="Course progress" className="mt-1.5" />

      <ul className="mt-2 flex flex-col">
        {modules.map((mod, index) => {
          const newlyDone = mod.items.filter((i) => completed.has(i.id) && !initiallyCompleted.includes(i.id)).length
          const done = Math.min(mod.lessonCount, mod.completedCount + newlyDone)
          const finished = done >= mod.lessonCount
          const isOpen = open.has(mod.id)
          const expandable = mod.items.length > 0

          return (
            <li key={mod.id}>
              <button
                type="button"
                onClick={() => expandable && toggle(mod.id)}
                aria-expanded={expandable ? isOpen : undefined}
                className="flex w-full items-center gap-3 rounded-[10px] px-3 py-4 text-left"
              >
                {finished ? (
                  <CircleCheck size={20} strokeWidth={1.75} className="shrink-0 text-success" />
                ) : (
                  <Layers size={20} strokeWidth={1.5} className="shrink-0 text-muted" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] leading-5 font-semibold">
                    {index + 1}. {mod.title}
                  </span>
                  <span className="block text-[12px] leading-[18px] text-muted">
                    {done > 0 || finished ? `${done} of ${mod.lessonCount} lessons` : `${mod.lessonCount} lessons`}
                  </span>
                </span>
                {isOpen ? (
                  <ChevronUp size={16} strokeWidth={2} />
                ) : (
                  <ChevronDown size={16} strokeWidth={2} />
                )}
              </button>

              {isOpen && expandable && (
                <ul className="-mt-[3px] flex flex-col gap-[7px] pb-2.5">
                  {mod.items.map((item) => {
                    const isDone = completed.has(item.id)
                    const isCurrent = item.id === currentLessonId
                    const href =
                      item.type === 'quiz'
                        ? `/courses/${courseId}/quiz/${item.id}`
                        : `/courses/${courseId}/lessons/${item.id}`
                    return (
                      <li key={item.id}>
                        <Link
                          href={href}
                          aria-current={isCurrent ? 'true' : undefined}
                          className={cn(
                            'flex h-[37px] items-center gap-3 rounded-[10px] px-3 text-[14px] hover:bg-surface',
                            isCurrent && 'bg-surface font-medium',
                          )}
                        >
                          <LessonIcon item={item} done={isDone} current={isCurrent} />
                          <span className="flex-1 truncate">
                            {item.type === 'quiz' ? `${item.title} · ${item.questions} questions` : item.title}
                          </span>
                          {item.optional && (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-chip px-2 py-1 text-[12px] font-medium">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <circle cx="6" cy="6" r="4.6" stroke="currentColor" strokeWidth="1.3" strokeDasharray="1.8 1.8" />
                              </svg>
                              Optional
                            </span>
                          )}
                          {item.minutes && (
                            <span className="text-[12px] text-muted">{item.minutes} min</span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
