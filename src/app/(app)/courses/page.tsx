'use client'

import { ContinueBanner } from '@/components/course/ContinueBanner'
import { CourseTabs } from '@/components/course/CourseTabs'
import { EnrolledCourseCard } from '@/components/course/EnrolledCourseCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useAuth } from '@/context/AuthContext'
import { enrolledCourses } from '@/data/courses'
import { firstName } from '@/lib/format'

export default function MyCoursesPage() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader title={`Welcome back, ${firstName(user?.name ?? '')}`} subtitle="Pick up where you left off." />
      <CourseTabs />

      <div className="mt-5">
        <ContinueBanner />
      </div>

      <div className="mt-6">
        <SectionHeading title="My courses" meta={`${enrolledCourses.length} enrolled`} />
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {enrolledCourses.map((course) => (
            <EnrolledCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  )
}
