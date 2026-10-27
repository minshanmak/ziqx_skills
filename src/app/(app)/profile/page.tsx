'use client'

import { LogOut } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAuth } from '@/context/AuthContext'

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const router = useRouter()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  if (!user) return null

  function onSave(e: FormEvent) {
    e.preventDefault()
    updateProfile({ name: name.trim() || user!.name, email: email.trim() || user!.email })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <PageHeader title="Profile" subtitle="Your details and account." />

      <div className="mt-6 flex max-w-[640px] flex-col gap-6">
        <form onSubmit={onSave} className="rounded-3xl border border-line bg-white p-6">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} size={64} />
            <div>
              <p className="text-[18px] leading-6 font-semibold tracking-[-0.01em]">{user.name}</p>
              <p className="text-[13px] leading-[18px] text-muted">Learner · joined {user.joined}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <Field label="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              hint="Used to log in and for session reminders."
            />
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit">{saved ? 'Saved' : 'Save changes'}</Button>
          </div>
        </form>

        <section className="rounded-3xl border border-line bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[14px] leading-[18px] font-semibold">Password</h2>
              <p className="mt-0.5 text-[13px] leading-[18px] text-muted">Use a strong password you don't use elsewhere.</p>
            </div>
            {/* TODO: open a change-password dialog / route */}
            <Button variant="outline">Change password</Button>
          </div>
          <hr className="my-4 border-line" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[14px] leading-[18px] font-semibold">Sign out</h2>
              <p className="mt-0.5 text-[13px] leading-[18px] text-muted">You can log back in any time.</p>
            </div>
            <Button
              variant="outline"
              className="text-danger!"
              icon={<LogOut size={16} strokeWidth={2} />}
              onClick={() => {
                logout()
                router.replace('/login')
              }}
            >
              Sign out
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
