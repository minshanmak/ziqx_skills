'use client'

import { BookOpen, CalendarPlus, CirclePlay, Video } from 'lucide-react'
import { toneBg } from '../course/tones'
import { Button } from '../ui/Button'
import type { LiveSession } from '../../types'

export function SessionRow({ session }: { session: LiveSession }) {
  const past = session.kind === 'past'

  return (
    <li
      className={`flex items-center justify-between gap-4 rounded-[20px] px-5 py-[15px] ${
        past ? 'bg-surface' : toneBg[session.tone]
      }`}
    >
      <div className="min-w-0">
        <h3 className="text-[16px] leading-5 font-semibold tracking-[-0.01em]">{session.title}</h3>
        <p className="mt-0.5 text-[13px] leading-[18px] text-muted">{session.when}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[13px] leading-[18px] font-semibold">
          <BookOpen size={15} strokeWidth={1.75} />
          {session.course}
        </p>
      </div>

      {session.action === 'join' && (
        // TODO: link to the real meeting URL once the API provides it
        <Button icon={<Video size={17} strokeWidth={1.9} />}>Join session</Button>
      )}
      {session.action === 'calendar' && (
        // TODO: generate an .ics file or Google Calendar link
        <Button variant="outline" icon={<CalendarPlus size={17} strokeWidth={1.75} />}>
          Add to calendar
        </Button>
      )}
      {session.action === 'recording' && (
        // TODO: open the recording
        <Button variant="ghost" icon={<CirclePlay size={17} strokeWidth={1.75} />}>
          Watch recording
        </Button>
      )}
    </li>
  )
}
