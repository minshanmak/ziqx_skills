import { CoursePlayerView } from '@/components/course/CoursePlayerView'

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  return <CoursePlayerView courseId={courseId} />
}
