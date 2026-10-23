import { Navigate, useParams } from 'react-router-dom'
import { QuizCard } from '../../components/quiz/QuizCard'
import { Breadcrumbs } from '../../components/layout/Breadcrumbs'
import { getCourse } from '../../data/courses'
import { quizzes } from '../../data/quiz'

export default function QuizPage() {
  const { courseId, quizId } = useParams()
  const course = getCourse(courseId)
  const quiz = quizId ? quizzes[quizId] : undefined

  if (!course || !quiz) return <Navigate to="/courses" replace />

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
