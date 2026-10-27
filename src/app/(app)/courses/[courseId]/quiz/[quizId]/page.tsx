'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QuizCard } from '@/components/quiz/QuizCard'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { getCourse } from '@/data/courses'
import { quizzes } from '@/data/quiz'

export default function QuizPage({
  params,
}: {
  params: Promise<{ courseId: string; quizId: string }>
}) {
  const { courseId, quizId } = use(params)
  const router = useRouter()
  const course = getCourse(courseId)
  const quiz = quizId ? quizzes[quizId] : undefined

  useEffect(() => {
    if (!course || !quiz) {
      router.replace('/courses')
    }
  }, [course, quiz, router])

  if (!course || !quiz) return null

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'My courses', to: '/courses' },
          { label: course.title, to: `/courses/${course.id}` },
          { label: 'Quiz' },
        ]}
      />
      <QuizCard key={quiz.id} quiz={quiz} courseId={course.id} />
    </>
  )
}
