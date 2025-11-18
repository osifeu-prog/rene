import { useEffect, useState } from 'react'
import { getTasks, getUserProgress, createUserProgress } from '../lib/database'

export default function Dashboard() {
  const [user] = useState({ id: 'demo-user', name: 'משתמש' })
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const [tasksData, progressData] = await Promise.all([
        getTasks(),
        getUserProgress(user.id)
      ])
      
      setTasks(tasksData)
      setCompletedTasks(new Set(progressData.map(item => item.task_id)))
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
      alert('🎉 המשימה הושלמה בהצלחה!')
    } catch (error) {
      console.error('Error completing task:', error)
      alert('❌ שגיאה בשמירת המשימה')
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

      {/* ProgressBar ו-TaskCard נשארים כמו קודם */}
      {/* ... */}
    </div>
  )
}
