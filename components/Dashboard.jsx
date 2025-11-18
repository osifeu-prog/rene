import { useEffect, useState } from 'react'
import { getUserProgress, createUserProgress } from '../lib/database'
import ProgressBar from './ProgressBar'
import TaskCard from './TaskCard'

export default function Dashboard({ user }) {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      // טען משימות מהשרת
      const tasksRes = await fetch('/api/tasks')
      const tasksData = await tasksRes.json()
      setTasks(tasksData)

      // טען התקדמות משתמש
      const progress = await getUserProgress(user.id)
      setCompletedTasks(new Set(progress.map(item => item.task_id)))
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTaskComplete = async (taskId, submission) => {
    try {
      await createUserProgress(user.id, taskId, submission)
      setCompletedTasks(prev => new Set([...prev, taskId]))
    } catch (error) {
      console.error('Error completing task:', error)
    }
  }

  if (loading) {
    return <div className="loading">🔄 טוען...</div>
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🎯 לוח הבקרה הלימודי</h1>
        <p>שלום {user.name}!</p>
      </header>

      <ProgressBar 
        completed={completedTasks.size} 
        total={tasks.length} 
      />

      <div className="tasks-section">
        <h2>📋 המשימות שלך ({tasks.length})</h2>
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
