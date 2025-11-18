import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import TaskCard from '../components/TaskCard'
import ProgressBar from '../components/ProgressBar'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const s = await supabase.auth.getSession()
      const user = s.data.session?.user
      if (!user) { setLoading(false); return }
      const { data } = await supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      if (!mounted) return
      setTasks(data || [])
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  const addTask = async () => {
    if (!title) return
    const s = await supabase.auth.getSession()
    const user = s.data.session?.user
    if (!user) return
    const { data, error } = await supabase.from('tasks').insert({ title, user_id: user.id }).select().single()
    if (error) return alert(error.message)
    setTasks(prev => [data, ...prev])
    setTitle('')
  }

  const toggle = async (id, completed) => {
    const { data, error } = await supabase.from('tasks').update({ completed: !completed }).eq('id', id).select().single()
    if (error) return alert(error.message)
    setTasks(t => t.map(x => x.id === id ? data : x))
  }

  const completedCount = tasks.filter(t => t.completed).length
  const pct = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        <section className="mb-6">
          <ProgressBar percent={pct} />
          <p className="text-sm text-slate-600 mt-2">{completedCount} of {tasks.length} completed ({pct}%)</p>
        </section>

        <section className="mb-6">
          <div className="flex gap-2">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task title" className="flex-1 p-2 border rounded" />
            <button onClick={addTask} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </section>

        <section className="space-y-3">
          {tasks.map(t => <TaskCard key={t.id} task={t} onToggle={() => toggle(t.id, t.completed)} />)}
        </section>
      </div>
    </main>
  )
}
