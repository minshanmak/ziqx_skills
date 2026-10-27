'use client'

import { ArrowRight, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '../../lib/cn'
import { formatTimer } from '../../lib/format'
import type { Quiz } from '../../types'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'

interface QuizCardProps {
  quiz: Quiz
  courseId: string
}

export function QuizCard({ quiz, courseId }: QuizCardProps) {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.questions.map(() => null))
  const [seconds, setSeconds] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (finished) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [finished])

  const total = quiz.questions.length
  const question = quiz.questions[index]!
  const selected = answers[index]
  const isLast = index === total - 1
  const backToCourse = () => router.push(`/courses/${courseId}`)

  const score = answers.filter((a, i) => a === quiz.questions[i]!.correctIndex).length
  const percent = Math.round((score / total) * 100)
  const passed = percent >= quiz.passMark

  const shell =
    'mx-auto w-full max-w-[720px] rounded-3xl border border-line bg-white px-8 pt-[26px] pb-8 shadow-[0_1px_2px_rgba(20,21,26,0.03)]'

  if (finished) {
    return (
      <section className={shell} aria-live="polite">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">Quiz result</p>
        <h2 className="mt-2 text-[24px] font-bold tracking-[-0.02em]">
          {passed ? 'Nicely done' : 'Keep practising'}
        </h2>
        <p className="mt-2 text-[14px] text-muted">
          You answered {score} of {total} correctly ({percent}%). Pass mark is {quiz.passMark}%.
        </p>
        <ProgressBar value={percent} label="Score" heightClass="h-2" className="mt-5" />
        <div className="mt-6 flex gap-3">
          <Button onClick={backToCourse}>Back to course</Button>
          <Button
            variant="outline"
            onClick={() => {
              setAnswers(quiz.questions.map(() => null))
              setIndex(0)
              setSeconds(0)
              setFinished(false)
            }}
          >
            Try again
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className={shell}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[14px] leading-5 font-semibold">{quiz.title}</h2>
          <p className="text-[13px] leading-[18px] text-muted">
            Pass mark {quiz.passMark}%{quiz.optional && ' · Optional'}
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-[13px] font-semibold text-warning tabular-nums"
          aria-label="Time elapsed"
        >
          <Clock size={14} strokeWidth={2} />
          {formatTimer(seconds)}
        </span>
      </div>

      <p className="mt-4 text-[13px] leading-[18px] text-muted">
        Question {index + 1} of {total}
      </p>
      <ProgressBar
        value={((index + 1) / total) * 100}
        label="Quiz progress"
        heightClass="h-2"
        className="mt-2"
      />

      <h3 className="mt-[18px] text-[20px] leading-7 font-semibold tracking-[-0.01em]">{question.prompt}</h3>

      <div role="radiogroup" aria-label={question.prompt} className="mt-[17px] flex flex-col gap-2.5">
        {question.options.map((option, i) => {
          const active = selected === i
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setAnswers((prev) => prev.map((a, idx) => (idx === index ? i : a)))}
              className={cn(
                'flex h-[52px] w-full items-center gap-3.5 rounded-xl px-4 text-left text-[14px] transition-colors',
                active
                  ? 'border-2 border-ink bg-wash'
                  : 'border border-line-strong bg-white hover:bg-surface',
              )}
            >
              <span
                className={cn(
                  'grid size-[20px] shrink-0 place-items-center rounded-full',
                  active ? 'bg-ink' : 'border border-line-strong bg-white',
                )}
              />
              {option}
            </button>
          )
        })}
      </div>

      <div className="mt-[18px] flex items-center justify-between">
        <button
          type="button"
          onClick={backToCourse}
          className="rounded-lg px-4 py-2 text-[14px] font-semibold hover:bg-surface"
        >
          Skip quiz
        </button>
        <Button
          disabled={selected === null}
          icon={<ArrowRight size={17} strokeWidth={2} />}
          onClick={() => (isLast ? setFinished(true) : setIndex((i) => i + 1))}
          className="text-[15px]"
        >
          {isLast ? 'Finish quiz' : 'Next question'}
        </Button>
      </div>
    </section>
  )
}
