'use client'

import { CatalogCourseCard } from '@/components/course/CatalogCourseCard'
import { CourseTabs } from '@/components/course/CourseTabs'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { catalogCourses } from '@/data/courses'

export default function ExploreCoursesPage() {
  return (
    <>
      <PageHeader
        title="Explore more courses"
        subtitle="Discover new skills and take the next step in your learning journey."
      />
      <CourseTabs />

      <div className="mt-5">
        <SectionHeading title="Available courses" meta={`${catalogCourses.length} courses`} />
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {catalogCourses.map((course) => (
            // TODO: wire onEnroll to your enrolment / payment flow
            <CatalogCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  )
}
