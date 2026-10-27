'use client'

import { Suspense, useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { useAuth } from '@/context/AuthContext'

function LoginForm() {
  const { user, login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/courses'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (user) {
      router.replace(from)
    }
  }, [user, router, from])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email.trim(), password)
      router.replace(from)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  if (user) {
    return null
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue learning."
      footer={
        <>
          New here?{' '}
          <Link href="/signup" className="font-semibold text-link hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Field
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 text-right">
            <a href="#" className="text-[13px] font-semibold text-link hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        {error && (
          <p role="alert" className="-mt-2 text-[13px] font-medium text-danger">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" fullWidth disabled={busy} className="h-[48px]">
          Log in
        </Button>
      </form>
    </AuthLayout>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-line-strong border-t-ink" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
