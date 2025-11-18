import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Head from 'next/head'

export default function Home() {
  const [user, setUser] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    checkUser()
    // בדיקה אם זה ביקור ראשון
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore')
    if (isFirstVisit) {
      setShowTutorial(true)
    }
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      await updateUserPoints(user.id, 10) // נקודות על התחברות ראשונה
      await loadUserStats(user.id)
    }
  }

  const updateUserPoints = async (userId, points) => {
    await supabase
      .from('user_stats')
      .upsert({ 
        user_id: userId, 
        points: points,
        last_activity: new Date().toISOString()
      })
  }

  const loadUserStats = async (userId) => {
    const { data } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()
    setUserStats(data)
  }

  const handleGitHubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        scopes: 'public_repo'
      }
    })
  }

  const completeTutorial = () => {
    setShowTutorial(false)
    localStorage.setItem('hasVisitedBefore', 'true')
  }

  return (
    <>
      <Head>
        <title>Rene - מערכת לימוד תכנות משחקית</title>
        <meta name="description" content="למד תכנות דרך יצירת דפי נחיתה וקלפים מיוחדים" />
      </Head>

      <div className="home-container">
        {/* הדרכה לביקור ראשון */}
        {showTutorial && (
          <div className="tutorial-overlay">
            <div className="tutorial-card">
              <h2>🎯 ברוכים הבאים למסע הלימודי!</h2>
              <div className="tutorial-steps">
                <div className="step">
                  <span>1️⃣</span>
                  <div>
                    <h4>התחברו עם GitHub</h4>
                    <p>קבלו 10 נקודות על התחברות ראשונה!</p>
                  </div>
                </div>
                <div className="step">
                  <span>2️⃣</span>
                  <div>
                    <h4>צרו דף נחיתה משלכם</h4>
                    <p>המשימה הראשונה - העתיקו את הקוד ל-GitHub שלכם</p>
                  </div>
                </div>
                <div className="step">
                  <span>3️⃣</span>
                  <div>
                    <h4>קבלו קלף מיוחד</h4>
                    <p>כל משימה מקנה קלף ייחודי לאוסף שלכם</p>
                  </div>
                </div>
                <div className="step">
                  <span>4️⃣</span>
                  <div>
                    <h4>שתפו והתקדמו</h4>
                    <p>צברו נקודות ושתפו את הדפים שיצרתם</p>
                  </div>
                </div>
              </div>
              <button onClick={completeTutorial} className="tutorial-btn">
                🚀 הבנתי, בואו נתחיל!
              </button>
            </div>
          </div>
        )}

        <div className="main-content">
          <header className="hero-section">
            <div className="hero-content">
              <h1>🎮 Rene - המסע הלימודי שלך מתחיל כאן!</h1>
              <p className="tagline">למד תכנות דרך יצירת דפי נחיתה מדהימים וצבירת קלפים מיוחדים</p>
              
              {userStats && (
                <div className="user-points-display">
                  <div className="points-card">
                    <span className="points-icon">⭐</span>
                    <div className="points-info">
                      <h3>{userStats.points || 0} נקודות</h3>
                      <p>הצטרפו עכשיו וקבלו 10 נקודות מתנה!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>

          {!user ? (
            <div className="auth-section">
              <div className="login-guide">
                <h2>🚀 איך מתחילים?</h2>
                
                <div className="guide-steps">
                  <div className="guide-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>התחברות עם GitHub</h4>
                      <p>אנחנו משתמשים ב-GitHub כי זה הכלי הכי חשוב שמפתחים אמיתיים משתמשים בו!</p>
                      <ul>
                        <li>📚 <strong>לומדים כלי אמיתי</strong> - GitHub הוא סטנדרט בתעשייה</li>
                        <li>💾 <strong>שומרים את כל הקוד</strong> - תיצרו תיק עבודות אמיתי</li>
                        <li>🌐 <strong>מתארחים בחינם</strong> - GitHub Pages נותן לכם אתר חינם</li>
                        <li>👥 <strong>משתפים פעולה</strong> - לומדים עבודה בצוות כמו מפתחים אמיתיים</li>
                      </ul>
                    </div>
                  </div>

                  <div className="guide-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>מה תקבלו בהתחברות?</h4>
                      <div className="rewards-grid">
                        <div className="reward">
                          <span>🎁</span>
                          <p><strong>10 נקודות</strong> מתנה</p>
                        </div>
                        <div className="reward">
                          <span>📄</span>
                          <p><strong>קוד לדף נחיתה</strong> ראשון</p>
                        </div>
                        <div className="reward">
                          <span>🃏</span>
                          <p><strong>קלף אספנות</strong> מיוחד</p>
                        </div>
                        <div className="reward">
                          <span>📊</span>
                          <p><strong>לוח ניקוד</strong> אישי</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="guide-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>המשימה הראשונה מחכה!</h4>
                      <p>מיד לאחר ההתחברות תוכלו:</p>
                      <ol>
                        <li>📋 לקבל את המשימה הראשונה - יצירת דף נחיתה</li>
                        <li>💻 להעתיק את הקוד ל-GitHub שלכם</li>
                        <li>🌐 להפעיל את GitHub Pages</li>
                        <li>🎉 לקבל קלף מיוחד ולשתף את הדף עם חברים!</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="login-action">
                  <button onClick={handleGitHubLogin} className="github-login-btn">
                    <span className="github-icon">🐙</span>
                    <span className="login-text">
                      <strong>התחבר עם GitHub</strong>
                      <small>וקבל 10 נקודות מתנה!</small>
                    </span>
                  </button>
                  
                  <div className="login-note">
                    <p>💡 <strong>אין לכם GitHub?</strong> 
                    <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer">
                      צרו חשבון חינם כאן
                    </a> - זה לוקח 2 דקות!</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="user-welcome">
              <div className="welcome-card">
                <h2>🎉 {user.user_metadata?.full_name || 'משתמש'} Welcome!</h2>
                <p>הצלחת להתחבר עם GitHub! מעברים אותך ללוח הניהול...</p>
                <div className="loading-spinner"></div>
              </div>
              <script dangerouslySetInnerHTML={{
                __html: `setTimeout(() => window.location.href = '/dashboard', 2000)`
              }} />
            </div>
          )}

          {/* סטטיסטיקות ציבוריות */}
          <div className="public-stats">
            <h3>📊 סטטיסטיקות קהילת Rene</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">128</span>
                <span className="stat-label">תלמידים פעילים</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">347</span>
                <span className="stat-label">דפי נחיתה נוצרו</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">892</span>
                <span className="stat-label">קלפים נאספו</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">2,154</span>
                <span className="stat-label">נקודות שחולקו</span>
              </div>
            </div>
          </div>

          <footer className="site-footer">
            <div className="footer-content">
              <p>🧩 <strong>רוצים לעזור?</strong> 
              <a href="https://github.com/osifeu-prog/rene/issues" target="_blank" rel="noopener noreferrer">
                דווחו על באגים או הציעו רעיונות
              </a></p>
              <p>📚 <strong>צריכים עזרה?</strong> 
              <a href="https://github.com/osifeu-prog/rene/discussions" target="_blank" rel="noopener noreferrer">
                שאלו בפורום הקהילה
              </a></p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
