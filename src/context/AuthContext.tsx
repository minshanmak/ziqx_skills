'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  updateProfile: (patch: Pick<User, 'name' | 'email'>) => void
  logout: () => void
}

const STORAGE_KEY = 'ziqx.user'
const AuthContext = createContext<AuthValue | null>(null)

function readStoredUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function titleCase(text: string) {
  return text
    .split(/[._-]+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Mock auth – swap the bodies of login/signup for real API calls.
 * The user is kept in localStorage so a refresh keeps you signed in.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(readStoredUser())
    setIsLoading(false)
  }, [])

  const persist = useCallback((next: User | null) => {
    setUser(next)
    try {
      if (typeof window !== 'undefined') {
        if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        else localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      /* storage unavailable – keep in memory only */
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.')
      if (!password) throw new Error('Enter your password.')
      const known = readStoredUser()
      persist({
        name: known?.email === email ? known.name : titleCase(email.split('@')[0]!),
        email,
        joined: known?.joined ?? '5 Oct',
      })
    },
    [persist],
  )

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      if (!name.trim()) throw new Error('Enter your full name.')
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.')
      if (password.length < 8) throw new Error('Use 8 or more characters.')
      const joined = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      persist({ name: name.trim(), email, joined })
    },
    [persist],
  )

  const updateProfile = useCallback(
    (patch: Pick<User, 'name' | 'email'>) => {
      if (user) persist({ ...user, ...patch })
    },
    [persist, user],
  )

  const logout = useCallback(() => persist(null), [persist])

  const value = useMemo(
    () => ({ user, isLoading, login, signup, updateProfile, logout }),
    [user, isLoading, login, signup, updateProfile, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
