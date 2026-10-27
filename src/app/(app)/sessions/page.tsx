'use client'

import { SessionRow } from '@/components/sessions/SessionRow'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sessions } from '@/data/sessions'

export default function LiveSessionsPage() {
  const upcoming = sessions.filter((s) => s.kind === 'upcoming')
  const past = sessions.filter((s) => s.kind === 'past')

  return (
    <>
      <PageHeader title="Live sessions" subtitle="Join your trainer's Q&As and workshops." />

      <section className="mt-6">
        <SectionHeading title="Coming up" />
        <ul className="mt-3 flex flex-col gap-3">
          {upcoming.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </ul>
      </section>

      <section className="mt-[30px]">
        <SectionHeading title="Past sessions" />
        <ul className="mt-3 flex flex-col gap-3">
          {past.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </ul>
      </section>
    </>
  )
}
