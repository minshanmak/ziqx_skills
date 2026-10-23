import type { Course, CourseModule, LessonDetail } from '../types'

export const courses: Course[] = [
  // Enrolled
  {
    id: 'data-analysis',
    title: 'Data analysis',
    modules: 6,
    lessons: 40,
    icon: 'database',
    tone: 'lavender',
    progress: 45,
    enrolled: true,
  },
  {
    id: 'spreadsheet-basics',
    title: 'Spreadsheet basics',
    modules: 4,
    lessons: 22,
    icon: 'trending',
    tone: 'sky',
    progress: 100,
    enrolled: true,
  },
  {
    id: 'data-visualization',
    title: 'Data visualization',
    modules: 5,
    lessons: 16,
    icon: 'chart',
    tone: 'lime',
    progress: 0,
    enrolled: true,
  },
  // Catalogue
  {
    id: 'python-for-analysts',
    title: 'Python for analysts',
    modules: 5,
    lessons: 28,
    icon: 'database',
    tone: 'lavender',
    level: 'Beginner',
    price: 0,
    enrolled: false,
  },
  {
    id: 'dashboard-design',
    title: 'Dashboard design',
    modules: 6,
    lessons: 34,
    icon: 'trending',
    tone: 'sky',
    level: 'Intermediate',
    price: 1499,
    enrolled: false,
  },
  {
    id: 'sql-fundamentals',
    title: 'SQL fundamentals',
    modules: 4,
    lessons: 20,
    icon: 'chart',
    tone: 'lime',
    level: 'Beginner',
    price: 999,
    enrolled: false,
  },
]

export const enrolledCourses = courses.filter((c) => c.enrolled)
export const catalogCourses = courses.filter((c) => !c.enrolled)

export function getCourse(id: string | undefined): Course | undefined {
  return courses.find((c) => c.id === id)
}

/** The lesson the learner was last on – powers "Resume lesson". */
export const resumeTarget = {
  courseId: 'data-analysis',
  lessonId: 'fixing-dates',
  moduleTitle: 'Cleaning messy data',
  lessonNumber: 3,
  lessonTitle: 'Fixing dates and text',
}

/** Course outline for the player. Replace with an API response later. */
export const dataAnalysisModules: CourseModule[] = [
  {
    id: 'm1',
    title: 'Getting started',
    lessonCount: 5,
    completedCount: 5,
    items: [],
  },
  {
    id: 'm2',
    title: 'Cleaning messy data',
    lessonCount: 8,
    completedCount: 3,
    items: [
      { id: 'spotting-bad-data', title: 'Spotting bad data', type: 'video', minutes: 9 },
      { id: 'removing-duplicates', title: 'Removing duplicates', type: 'video', minutes: 14 },
      { id: 'fixing-dates', title: 'Fixing dates and text', type: 'video', minutes: 10 },
      { id: 'cleaning-quiz', title: 'Quiz', type: 'quiz', questions: 5, optional: true },
      { id: 'handling-blanks', title: 'Handling blanks', type: 'video', minutes: 6 },
      { id: 'cleaning-checklist', title: 'Cleaning checklist', type: 'video', minutes: 11 },
    ],
  },
  { id: 'm3', title: 'Exploring datasets', lessonCount: 7, completedCount: 0, items: [] },
  { id: 'm4', title: 'Charts and dashboards', lessonCount: 9, completedCount: 0, items: [] },
]

/** Lesson ids that are already complete when the page loads. */
export const initiallyCompleted = ['spotting-bad-data', 'removing-duplicates']

export const lessonDetails: Record<string, LessonDetail> = {
  'fixing-dates': {
    id: 'fixing-dates',
    title: 'Fixing dates and text',
    moduleTitle: 'Cleaning messy data',
    moduleNumber: 2,
    minutes: 10,
    description:
      'Learn how to spot dates stored as text, convert them to real dates and keep one consistent format across a sheet.',
  },
}
