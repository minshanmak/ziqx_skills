import { CoursePlayerView } from '@/components/course/CoursePlayerView'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const { courseId, lessonId } = await params
  return <CoursePlayerView courseId={courseId} lessonId={lessonId} />
}
