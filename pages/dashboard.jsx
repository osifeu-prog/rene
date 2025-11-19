// pages/dashboard.js
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import TaskCard from '../components/TaskCard'
import ProgressBar from '../components/ProgressBar'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(null)
  const [saving, setSaving] = useState(false)

  // load tasks for current session and subscribe to auth changes
  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    const loadSessionAndTasks = async () => {
      try {
        const s = await supabase.auth.getSession()
        const user = s?.data?.session?.user ?? null
        if (!mounted) return
        setUserId(user?.id ?? null)

        if (!user) {
          setTasks([])
          setLoading(false)
          return
        }

        const { data, error: fetchError } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (!mounted) return
        if (fetchError) throw fetchError
        setTasks(data ?? [])
      } catch (e) {
        console.error('Failed to load tasks', e)
        if (mounted) setError(e?.message ?? 'Failed to load tasks')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadSessionAndTasks()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null
      setUserId(uid)
      if (!uid) {
        setTasks([])
      } else {
        // refetch tasks on sign in
        supabase
          .from('tasks')
          .select('*')
          .eq('user_id', uid)
          .order('created_at', { ascending: false })
          .then(res => {
            if (res.error) {
              console.error('Refetch tasks after auth change', res.error)
            } else {
              setTasks(res.data ?? [])
            }
          })
      }
    })

    return () => {
      mounted = false
      // cleanup listener (SDK may expose unsubscribe differently across versions)
      if (listener) {
        if (typeof listener.subscription?.unsubscribe === 'function') {
          listener.subscription.unsubscribe()
        } else if (typeof listener.unsubscribe === 'function') {
          listener.unsubscribe()
        }
      }
    }
  }, [])

  const addTask = useCallback(async () => {
    const value = (title ?? '').trim()
    if (!value || saving) return
    if (!userId) {
      setError('You must be signed in to add tasks.')
      return
    }

    setSaving(true)
    setError(null)
    // optimistic UI: create a temporary task until DB returns real id
    const tempId = `temp-${Date.now()}`
    const optimisticTask = {
      id: tempId,
      title: value,
      completed: false,
      user_id: userId,
      created_at: new Date().toISOString()
    }
    setTasks(prev => [optimisticTask, ...prev])
    setTitle('')

    try {
      const { data, error: insertError } = await supabase
        .from('tasks')
        .insert({ title: value, user_id: userId })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      // replace the optimistic item with real one
      setTasks(prev => prev.map(t => (t.id === tempId ? data : t)))
    } catch (e) {
      console.error('Add task failed', e)
      setError(e?.message ?? 'Failed to add task')
      // rollback optimistic change
      setTasks(prev => prev.filter(t => t.id !== tempId))
    } finally {
      setSaving(false)
    }
  }, [title, userId, saving])

  const addTaskOnEnter = useCallback(
    e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        addTask()
      }
    },
    [addTask]
  )

  const toggle = useCallback(
    async (id, completed) => {
      // optimistic toggle
      setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !completed } : t)))
      try {
        const { data, error: updateError } = await supabase
          .from('tasks')
          .update({ completed: !completed })
          .eq('id', id)
          .select()
          .single()

        if (updateError) throw updateError
        setTasks(prev => prev.map(t => (t.id === id ? data : t)))
      } catch (e) {
        console.error('Toggle failed', e)
        setError(e?.message ?? 'Failed to update task')
        // rollback on error: flip back
        setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed } : t)))
      }
    },
    []
  )

  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks])
  const pct = useMemo(() => (tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0), [
    tasks,
    completedCount
  ])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        <section className="mb-6">
          <ProgressBar percent={pct} />
          <p className="text-sm text-slate-600 mt-2">
            {completedCount} of {tasks.length} completed ({pct}%)
          </p>
        </section>

        <section className="mb-6">
          <div className="flex gap-2">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={addTaskOnEnter}
              placeholder={userId ? 'New task title' : 'Sign in to add tasks'}
              className="flex-1 p-2 border rounded"
              disabled={!userId || saving}
              aria-label="New task title"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              disabled={!userId || saving || !title.trim()}
            >
              {saving ? 'Adding...' : 'Add'}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}
        </section>

        <section className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-slate-500">No tasks yet.</p>
          ) : (
            tasks.map(t => (
              <TaskCard key={t.id} task={t} onToggle={() => toggle(t.id, !!t.completed)} />
            ))
          )}
        </section>
      </div>
    </main>
  )
}
