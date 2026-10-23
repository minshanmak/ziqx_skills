# Ziqx Skills – Learner app

React 19 + TypeScript + Vite + Tailwind CSS v4 + React Router. Built from the "Trainly LMS – Design System" Figma file.

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
```
Log in with any valid email and any password (auth is mocked in `src/context/AuthContext.tsx`).

## Routes
| Path | Screen |
| --- | --- |
| `/login`, `/signup` | Auth (split layout with testimonial) |
| `/courses` | My courses (+ continue-learning banner) |
| `/courses/explore` | Other courses |
| `/courses/:id` and `/courses/:id/lessons/:lessonId` | Course player |
| `/courses/:id/quiz/:quizId` | Quiz |
| `/courses/:id/certificate` | Certificate |
| `/sessions` | Live sessions |
| `/profile` | Profile |

## Where to change things
- Colours / font: `src/index.css` (`@theme` block)
- Mock data (replace with API calls): `src/data/*`
- Places marked `TODO` need a real backend (join session, add to calendar, video player, enrol, change password).
