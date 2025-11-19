// components/SupabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase env variables')
    }
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  }
  return supabase
}
// hooks/useSupabaseAuth.ts
import { useEffect, useState, useCallback } from 'react'
import { getSupabaseClient } from '../components/SupabaseClient'
import type { Session, User } from '@supabase/supabase-js'

export function useSupabaseAuth() {
  const supabase = getSupabaseClient()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    supabase.auth.getSession()
      .then(res => {
        if (!mounted) return
        const s = res.data.session ?? null
        setSession(s)
        setUser(s?.user ?? null)
      })
      .catch(e => {
        if (!mounted) return
        setError(e?.message ?? 'Failed to get session')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return
      setSession(s ?? null)
      setUser(s?.user ?? null)
    })

    return () => {
      mounted = false
      // listener may be undefined in some SDK versions
      if (listener && typeof listener.subscription?.unsubscribe === 'function') {
        listener.subscription.unsubscribe()
      } else if (listener && typeof listener.unsubscribe === 'function') {
        // older SDK shapes
        listener.unsubscribe()
      }
    }
  }, [supabase])

  const signInWithGitHub = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await supabase.auth.signInWithOAuth({ provider: 'github' })
      // redirect handled by provider; session update comes from listener
    } catch (e: any) {
      setError(e?.message ?? 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (e: any) {
      setError(e?.message ?? 'Sign out failed')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  return { user, session, loading, error, signInWithGitHub, signOut }
}
// pages/index.tsx
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSupabaseAuth } from '../hooks/useSupabaseAuth'

export default function Home() {
  const { user, loading, error, signInWithGitHub, signOut } = useSupabaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // After sign in redirect client-side to dashboard
      router.replace('/dashboard')
    }
  }, [user, router])

  return (
    <>
      <Head>
        <title>Rene — Improved</title>
        <meta name="description" content="Improved Supabase auth starter" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow">
          <h1 className="text-2xl font-semibold mb-4">Rene — Improved</h1>

          {loading ? (
            <div className="text-sm text-gray-600">Loading authentication status...</div>
          ) : error ? (
            <div className="text-sm text-red-600">Error: {error}</div>
          ) : user ? (
            <section className="space-y-4">
              <div className="flex items-center gap-4">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    {user.email?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-700">
                    Signed in as <strong>{user.email ?? user.user_metadata?.name ?? 'Unknown'}</strong>
                  </p>
                  <p className="text-xs text-gray-500">ID: {user.id}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Go to dashboard
                </a>
                <button
                  onClick={signOut}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Sign out
                </button>
              </div>
            </section>
          ) : (
            <section className="space-y-4">
              <p className="text-gray-600">Sign in to manage your tasks.</p>
              <div className="flex gap-2">
                <button
                  onClick={signInWithGitHub}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Sign in with GitHub
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-4 py-2 border border-slate-200 rounded"
                >
                  Create account
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
