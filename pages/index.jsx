import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.getSession().then(r => r.data.session)
    session.then(s => setUser(s?.user ?? null))

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub?.subscription?.unsubscribe?.()
  }, [])

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-xl p-8 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Rene — Improved</h1>
        {user ? (
          <>
            <p className="mb-4">Signed in as {user.email || user.user_metadata?.full_name}</p>
            <a href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded">Go to dashboard</a>
          </>
        ) : (
          <>
            <p className="mb-4">Sign in to manage your tasks.</p>
            <button onClick={signIn} className="px-4 py-2 bg-green-600 text-white rounded">Sign in with GitHub</button>
          </>
        )}
      </div>
    </main>
  )
}
