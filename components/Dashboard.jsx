import { useEffect, useState } from 'react'
import { getTasks, getUserProgress, createUserProgress } from '../lib/database'
import ProgressBar from './ProgressBar'
import TaskCard from './TaskCard'

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
      console.log('📥 טוען נתונים...')
      const [tasksData, progressData] = await Promise.all([
        getTasks(),
        getUserProgress(user.id)
      ])
      
      setTasks(tasksData)
      setCompletedTasks(new Set(progressData.map(item => item.task_id)))
      console.log(`✅ נטענו ${tasksData.length} משימות`)
    } catch (error) {
      console.error('❌ שגיאה בטעינת נתונים:', error)
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
      console.error('❌ שגיאה בשמירת המשימה:', error)
      alert('❌ שגיאה בשמירת המשימה')
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div>🔄 טוען...</div>
        <small>אם זה לוקח יותר מדי זמן, בדוק את חיבור ה-Database</small>
      </div>
    )
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
        {tasks.length === 0 ? (
          <div className="no-tasks">
            <p>❌ לא נמצאו משימות. ייתכן שיש בעיה בחיבור ל-Database.</p>
            <button onClick={loadUserData}>🔄 נסה שוב</button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}
