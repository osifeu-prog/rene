import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('tasks')

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (!user) {
      window.location.href = '/'
    }
  }

  const handleFirstTask = () => {
    alert('🎉 מתחילים את המשימה הראשונה!')
    // כאן יתווסף הקוד למשימה הראשונה
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

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'tasks' ? 'active' : ''}
          onClick={() => setActiveTab('tasks')}
        >
          📋 משימות
        </button>
        <button 
          className={activeTab === 'cards' ? 'active' : ''}
          onClick={() => setActiveTab('cards')}
        >
          🃏 קלפים
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          📊 סטטיסטיקות
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'tasks' && (
          <div className="tasks-tab">
            <h2>🎯 המשימות שלך</h2>
            
            <div className="task-card">
              <h3>🚀 משימה 1: צור דף נחיתה משלך!</h3>
              <p><strong>המשימה:</strong> צור דף נחיתה אישי ב-GitHub Pages</p>
              
              <div className="task-steps">
                <div className="step">
                  <span>1️⃣</span>
                  <p>קבל קוד HTML מוכן</p>
                </div>
                <div className="step">
                  <span>2️⃣</span>
                  <p>צור repository חדש ב-GitHub</p>
                </div>
                <div className="step">
                  <span>3️⃣</span>
                  <p>העלה את הקוד והפעל GitHub Pages</p>
                </div>
                <div className="step">
                  <span>4️⃣</span>
                  <p>קבל קלף מיוחד ו-50 נקודות!</p>
                </div>
              </div>

              <button onClick={handleFirstTask} className="start-task-btn">
                🚀 התחל משימה
              </button>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="cards-tab">
            <h2>🃏 אוסף הקלפים שלך</h2>
            <div className="no-cards">
              <p>🤔 עדיין אין לך קלפים...</p>
              <p>התחל את המשימה הראשונה כדי לקבל את הקלף הראשון!</p>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-tab">
            <h2>📊 הסטטיסטיקות שלך</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">0</span>
                <span className="stat-label">נקודות</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">1</span>
                <span className="stat-label">דרגה</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">0</span>
                <span className="stat-label">קלפים</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
