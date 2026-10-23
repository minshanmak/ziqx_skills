import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Field } from '../../components/ui/Field'
import { testimonial } from '../../data/certificates'
import { useAuth } from '../../context/AuthContext'

export default function SignupPage() {
  const { user, signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/courses" replace />

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await signup(name, email.trim(), password)
      navigate('/courses', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle={`Join to start learning with ${testimonial.trainer}.`}
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-link hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <Field
          label="Full name"
          autoComplete="name"
          placeholder="Maria Santos"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          hint="Use 8 or more characters."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p role="alert" className="-mt-2 text-[13px] font-medium text-danger">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" fullWidth disabled={busy} className="h-[48px]">
          Create account
        </Button>
      </form>
    </AuthLayout>
  )
}
