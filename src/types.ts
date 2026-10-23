export type Tone = 'lavender' | 'sky' | 'lime'
export type CourseIconName = 'database' | 'trending' | 'chart'

export interface Course {
  id: string
  title: string
  modules: number
  lessons: number
  icon: CourseIconName
  tone: Tone
  /** 0–100, only for enrolled courses */
  progress?: number
  enrolled: boolean
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  /** price in INR, 0 = free */
  price?: number
}

export interface LessonItem {
  id: string
  title: string
  type: 'video' | 'quiz'
  minutes?: number
  questions?: number
  optional?: boolean
}

export interface CourseModule {
  id: string
  title: string
  /** Lesson count shown in the outline (the API would return this) */
  lessonCount: number
  /** Completed lessons at load time */
  completedCount: number
  /** Empty when the module is fully collapsed / not loaded */
  items: LessonItem[]
}

export interface LessonDetail {
  id: string
  title: string
  moduleTitle: string
  moduleNumber: number
  minutes: number
  description: string
}

export interface LiveSession {
  id: string
  title: string
  when: string
  course: string
  tone: Tone
  kind: 'upcoming' | 'past'
  action: 'join' | 'calendar' | 'recording'
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

export interface Quiz {
  id: string
  title: string
  passMark: number
  optional: boolean
  questions: QuizQuestion[]
}

export interface Certificate {
  id: string
  courseId: string
  courseTitle: string
  issuedOn: string
  issuedBy: string
}

export interface User {
  name: string
  email: string
  joined: string
}
