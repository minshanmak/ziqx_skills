'use client'

import { Award } from 'lucide-react'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { certificates } from '@/data/certificates'
import { getCourse } from '@/data/courses'

export default function CertificatePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  const course = getCourse(courseId)
  const certificate = courseId ? certificates[courseId] : undefined

  useEffect(() => {
    if (!course || !certificate) {
      router.replace('/courses')
    }
  }, [course, certificate, router])

  if (!course || !certificate) return null

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'My courses', to: '/courses' },
          { label: course.title, to: `/courses/${course.id}` },
          { label: 'Certificate' },
        ]}
      />

      <section
        aria-label="Certificate of completion"
        className="mx-auto mt-1 flex w-full max-w-[760px] flex-col items-center rounded-3xl bg-lavender px-8 pt-[46px] pb-11 text-center"
      >
        <span className="grid size-16 place-items-center rounded-full bg-white">
          <Award size={28} strokeWidth={1.5} />
        </span>
        <p className="mt-3.5 text-[13px] leading-[18px] font-semibold tracking-[0.12em] text-muted uppercase">
          Certificate of completion
        </p>
        <p className="mt-[13px] text-[15px] leading-[22px] text-muted">This certifies that</p>
        <p className="mt-[15px] text-[24px] leading-8 font-bold tracking-[-0.02em]">{user?.name}</p>
        <p className="mt-3.5 text-[15px] leading-[22px] text-muted">has successfully completed</p>
        <p className="mt-3.5 text-[18px] leading-[26px] font-semibold tracking-[-0.01em]">{certificate.courseTitle}</p>

        <hr className="mt-3.5 w-[320px] max-w-full border-t border-ink/10" />

        <p className="mt-3.5 text-[13px] leading-[18px] text-muted">
          Issued {certificate.issuedOn} · {certificate.issuedBy}
        </p>
        <p className="mt-3.5 text-[13px] leading-[18px] text-muted">Certificate ID {certificate.id}</p>
      </section>

      <div className="no-print mt-5 flex justify-center gap-3">
        <Button onClick={() => window.print()}>Download PDF</Button>
        <Button variant="outline" onClick={copyLink}>
          {copied ? 'Link copied' : 'Copy link'}
        </Button>
      </div>
    </>
  )
}
