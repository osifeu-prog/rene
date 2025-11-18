import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { 
  getUserStats, 
  getUserCards, 
  getUserPages, 
  addUserCard,
  addUserPage,
  updateUserStats 
} from '../lib/database'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [userCards, setUserCards] = useState([])
  const [userPages, setUserPages] = useState([])
  const [activeTab, setActiveTab] = useState('tasks')
  const [showLandingPageCode, setShowLandingPageCode] = useState(false)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    
    if (user) {
      const [stats, cards, pages] = await Promise.all([
        getUserStats(user.id),
        getUserCards(user.id),
        getUserPages(user.id)
      ])
      
      setUserStats(stats)
      setUserCards(cards)
      setUserPages(pages)
    }
  }

  const handleFirstTask = async () => {
    if (!user) return
    
    // הוסף קלף למשימה ראשונה
    await addUserCard(
      user.id,
      'first-landing-page',
      '🎨 בונה הדפים הראשון',
      'קיבלת את הקלף הראשון על יצירת דף הנחיתה שלך!'
    )
    
    // עדכן נקודות
    await updateUserStats(user.id, {
      points: (userStats?.points || 0) + 50
    })
    
    setShowLandingPageCode(true)
    await loadUserData() // רענן נתונים
  }

  const copyLandingPageCode = async () => {
    const code = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>הדף הראשון שלי - ${user?.user_metadata?.full_name || 'תלמיד Rene'}</title>
    <style>
        body { 
            font-family: Arial; 
            text-align: center; 
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 50px;
        }
        .card {
            background: white;
            color: black;
            padding: 40px;
            border-radius: 15px;
            margin: 20px auto;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🎉 זה הדף הראשון שלי!</h1>
        <p>נוצר על ידי ${user?.user_metadata?.full_name || 'תלמיד Rene'}</p>
        <p>🏆 נקודות ב-Rene: ${userStats?.points || 0}</p>
        <p>🃏 קלפים שנאספו: ${userStats?.cards_collected || 0}</p>
        <p>📚 למדתי לתכנת עם Rene!</p>
    </div>
</body>
</html>`
    
    await navigator.clipboard.writeText(code)
    alert('✅ הקוד הועתק! עכשיו שמור אותו ב-GitHub שלך')
  }

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="not-logged-in">
          <h2>⚠️ צריך להתחבר</h2>
          <p>אנא התחבר עם GitHub כדי לצפות בלוח הבקרה</p>
          <button onClick={() => window.location.href = '/'}>
            חזרה לדף הבית
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <img 
            src={user.user_metadata?.avatar_url} 
            alt="Profile" 
            className="user-avatar"
          />
          <div className="user-details">
            <h1>👋 {user.user_metadata?.full_name || 'משתמש'}</h1>
            <p>@{user.user_metadata?.user_name || 'github-user'}</p>
          </div>
        </div>
        
        <div className="user-stats-preview">
          <div className="stat">
            <span className="stat-value">{userStats?.points || 0}</span>
            <span className="stat-label">נקודות</span>
          </div>
          <div className="stat">
            <span className="stat-value">{userStats?.level || 1}</span>
            <span className="stat-label">דרגה</span>
          </div>
          <div className="stat">
            <span className="stat-value">{userStats?.cards_collected || 0}</span>
            <span className="stat-label">קלפים</span>
          </div>
        </div>
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
          className={activeTab === 'pages' ? 'active' : ''}
          onClick={() => setActiveTab('pages')}
        >
          🌐 דפים שלי
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
            
            <div className="task-card first-task">
              <div className="task-header">
                <h3>🚀 משימה 1: צור דף נחיתה משלך!</h3>
                <span className="task-points">+50 נקודות</span>
              </div>
              
              <div className="task-description">
                <p><strong>המשימה:</strong> צור דף נחיתה אישי ב-GitHub Pages שיציג את ההתקדמות שלך ב-Rene</p>
                
                <div className="task-steps">
                  <div className="step">
                    <span>1️⃣</span>
                    <p>לחץ על "קבל קוד" כדי לקבל את קוד הדף</p>
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

                {!showLandingPageCode ? (
                  <button onClick={handleFirstTask} className="start-task-btn">
                    🚀 התחל משימה
                  </button>
                ) : (
                  <div className="code-section">
                    <h4>📋 הקוד שלך מוכן!</h4>
                    <button onClick={copyLandingPageCode} className="copy-code-btn">
                      📋 העתק קוד
                    </button>
                    <div className="instructions">
                      <h5>📖 הוראות:</h5>
                      <ol>
                        <li>לחץ על "העתק קוד" למעלה</li>
                        <li>היכנס ל-GitHub וצור repository חדש</li>
                        <li>צור קובץ `index.html` והדבק את הקוד</li>
                        <li>לך להגדרות repository → Pages → בחר main branch</li>
                        <li>הדף שלך יהיה זמין תוך 2 דקות!</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="task-card upcoming-task">
              <h3>📝 משימה 2: שפר את הדף שלך</h3>
              <p>הוסף סגנונות מתקדמים ותכונות אינטראקטיביות</p>
              <button disabled className="disabled-btn">
                🔒 זמין לאחר השלמת משימה 1
              </button>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="cards-tab">
            <h2>🃏 אוסף הקלפים שלך</h2>
            <div className="cards-grid">
              {userCards.length > 0 ? (
                userCards.map(card => (
                  <div key={card.id} className="card-item">
                    <div className="card-icon">🎨</div>
                    <h4>{card.card_name}</h4>
                    <p>{card.card_description}</p>
                    <span className="card-date">
                      {new Date(card.earned_at).toLocaleDateString('he-IL')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="no-cards">
                  <p>🤔 עדיין אין לך קלפים...</p>
                  <p>התחל את המשימה הראשונה כדי לקבל את הקלף הראשון!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="pages-tab">
            <h2>🌐 הדפים שיצרת</h2>
            {userPages.length > 0 ? (
              <div className="pages-list">
                {userPages.map(page => (
                  <div key={page.id} className="page-item">
                    <h4>{page.page_name}</h4>
                    <a href={page.page_url} target="_blank" rel="noopener noreferrer">
                      {page.page_url}
                    </a>
                    <span>נוצר ב: {new Date(page.created_at).toLocaleDateString('he-IL')}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-pages">
                <p>🌱 עדיין לא יצרת דפים...</p>
                <p>התחל עם המשימה הראשונה למעלה!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-tab">
            <h2>📊 הסטטיסטיקות שלך</h2>
            <div className="stats-grid">
              <div className="stat-card large">
                <span className="stat-value">{userStats?.points || 0}</span>
                <span className="stat-label">נקודות כוללות</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{userStats?.level || 1}</span>
                <span className="stat-label">דרגה</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{userStats?.cards_collected || 0}</span>
                <span className="stat-label">קלפים</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{userStats?.pages_created || 0}</span>
                <span className="stat-label">דפים</span>
              </div>
            </div>
            
            <div className="progress-section">
              <h4>התקדמות לרמה הבאה</h4>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((userStats?.points || 0) % 100)}%` }}
                ></div>
              </div>
              <p>{100 - ((userStats?.points || 0) % 100)} נקודות עד לרמה {((userStats?.level || 1) + 1)}</p>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={() => supabase.auth.signOut()}
        className="logout-btn"
      >
        🚪 התנתק
      </button>
    </div>
  )
}
