import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { RequireAuth } from './components/layout/RequireAuth'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import CertificatePage from './pages/courses/CertificatePage'
import CoursePlayerPage from './pages/courses/CoursePlayerPage'
import ExploreCoursesPage from './pages/courses/ExploreCoursesPage'
import MyCoursesPage from './pages/courses/MyCoursesPage'
import QuizPage from './pages/courses/QuizPage'
import ProfilePage from './pages/profile/ProfilePage'
import LiveSessionsPage from './pages/sessions/LiveSessionsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route path="/courses" element={<MyCoursesPage />} />
          <Route path="/courses/explore" element={<ExploreCoursesPage />} />
          <Route path="/courses/:courseId" element={<CoursePlayerPage />} />
          <Route path="/courses/:courseId/lessons/:lessonId" element={<CoursePlayerPage />} />
          <Route path="/courses/:courseId/quiz/:quizId" element={<QuizPage />} />
          <Route path="/courses/:courseId/certificate" element={<CertificatePage />} />
          <Route path="/sessions" element={<LiveSessionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/courses" replace />} />
    </Routes>
  )
}
