import type { LiveSession } from '../types'

export const sessions: LiveSession[] = [
  {
    id: 's1',
    title: 'Data analysis: Q&A',
    when: 'Today · 10:00 – 11:00 AM',
    course: 'Data analysis',
    tone: 'sky',
    kind: 'upcoming',
    action: 'join',
  },
  {
    id: 's2',
    title: 'Data visualization workshop',
    when: 'Mon 26 Oct · 2:00 – 3:00 PM',
    course: 'Data visualization',
    tone: 'lime',
    kind: 'upcoming',
    action: 'calendar',
  },
  {
    id: 's3',
    title: 'Office hours',
    when: 'Wed 28 Oct · 11:00 AM – 12:00 PM',
    course: 'Spreadsheet basics',
    tone: 'lavender',
    kind: 'upcoming',
    action: 'calendar',
  },
  {
    id: 's4',
    title: 'Cleaning data workshop',
    when: 'Sun 18 Oct · 24 attendees',
    course: 'Data analysis',
    tone: 'lavender',
    kind: 'past',
    action: 'recording',
  },
  {
    id: 's5',
    title: 'Kickoff session',
    when: 'Mon 12 Oct',
    course: 'Data analysis',
    tone: 'lavender',
    kind: 'past',
    action: 'recording',
  },
]
