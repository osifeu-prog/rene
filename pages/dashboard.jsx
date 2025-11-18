import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    checkUser()
    fetchTasks()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (!user) {
      window.location.href = '/'
    }
  }

  const fetchTasks = async () => {
    // כאן תהיה בקשה לאתר - בינתיים נתונים דמיוניים
    setTasks([
      {
        id: 1,
        title: "🚀 המשימה הראשונה - הכרות עם תכנות",
        description: "צרו משחק פשוט שירוץ במחשב או בטלפון שלכם",
        completed: false
      }
    ])
  }

  if (!user) {
    return <div className="loading">🔄 טוען...</div>
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🎯 הלוח האישי של {user.user_metadata?.full_name || 'משתמש'}</h1>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="logout-btn"
        >
          התנתק
        </button>
      </header>

      <div className="dashboard-content">
        <div className="welcome-message">
          <h2>🎉 ברוכים הבאים ל-Rene!</h2>
          <p>הצלחתם להתחבר עם GitHub. עכשיו אתם יכולים:</p>
        </div>

        <div className="tasks-section">
          <h3>📋 המשימות שלכם</h3>
          <div className="tasks-grid">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <button className="start-task-btn">
                  {task.completed ? '✅ הושלם' : '🚀 התחל משימה'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="next-steps">
          <h3>📚 מה הלאה?</h3>
          <div className="steps-grid">
            <div className="step-card">
              <span>1️⃣</span>
              <h4>פתרו את המשימה הראשונה</h4>
              <p>צרו משחק פשוט ותקבלו קלף מתנה</p>
            </div>
            <div className="step-card">
              <span>2️⃣</span>
              <h4>בנו את אוסף הקלפים</h4>
              <p>אספו קלפים מיוחדים על כל משימה שתפתרו</p>
            </div>
            <div className="step-card">
              <span>3️⃣</span>
              <h4>צרו קלפים משלכם</h4>
              <p>תרמו לקהילה וצרו קלפים לתלמידים אחרים</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
