import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ProgressBar from './ProgressBar'
import TaskCard from './TaskCard'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    
    if (user) {
      await Promise.all([fetchTasks(), fetchCompletedTasks(user.id)])
    }
    setLoading(false)
  }

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('order_index')
    setTasks(data || [])
  }

  const fetchCompletedTasks = async (userId) => {
    const { data } = await supabase
      .from('user_progress')
      .select('task_id')
      .eq('user_id', userId)
      .eq('completed', true)
    
    if (data) {
      setCompletedTasks(new Set(data.map(item => item.task_id)))
    }
  }

  const handleTaskComplete = (taskId) => {
    setCompletedTasks(prev => new Set([...prev, taskId]))
  }

  if (loading) {
    return <div className="loading">🔄 טוען...</div>
  }

  if (!user) {
    return (
      <div className="auth-container">
        <div className="welcome-card">
          <h1>🎮 ברוכים הבאים למערכת הלימוד!</h1>
          <p>התחבר כדי להתחיל את המסע הלימודי שלך</p>
          <button 
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
            className="auth-btn"
          >
            📚 התחבר עם GitHub
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🎯 לוח הבקרה הלימודי</h1>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="logout-btn"
        >
          התנתק
        </button>
      </header>

      <ProgressBar 
        completed={completedTasks.size} 
        total={tasks.length} 
      />

      <div className="tasks-section">
        <h2>📋 המשימות שלך</h2>
        <div className="tasks-grid">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={completedTasks.has(task.id)}
              onTaskComplete={handleTaskComplete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
