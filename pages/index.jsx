import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Head from 'next/head'

export default function Home() {
  const [user, setUser] = useState(null)
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    checkUser()
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore')
    if (isFirstVisit) {
      setShowTutorial(true)
    }
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
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
        {showTutorial && (
          <div className="tutorial-overlay">
            <div className="tutorial-card">
              <h2>🎯 ברוכים הבאים ל-Rene!</h2>
              <div className="tutorial-steps">
                <div className="step">
                  <span>1️⃣</span>
                  <div>
                    <h4>התחברות עם GitHub</h4>
                    <p>קבלו 10 נקודות על התחברות ראשונה!</p>
                  </div>
                </div>
                <div className="step">
                  <span>2️⃣</span>
                  <div>
                    <h4>יצירת דף נחיתה</h4>
                    <p>המשימה הראשונה - העתיקו קוד ל-GitHub שלכם</p>
                  </div>
                </div>
                <div className="step">
                  <span>3️⃣</span>
                  <div>
                    <h4>קבלת קלף מיוחד</h4>
                    <p>כל משימה מקנה קלף ייחודי</p>
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
            <h1>🎮 Rene - מערכת לימוד תכנות</h1>
            <p className="tagline">למדו לתכנת דרך יצירת דפי נחיתה וצבירת קלפים מיוחדים</p>
          </header>

          {!user ? (
            <div className="auth-section">
              <div className="login-card">
                <h2>🚀 התחברו כדי להתחיל את המסע</h2>
                
                <div className="github-explanation">
                  <h4>🤔 למה צריך GitHub?</h4>
                  <ul>
                    <li>💾 <strong>שימור התקדמות</strong> - כל המשימות נשמרות</li>
                    <li>🌐 <strong>אירוח חינמי</strong> - GitHub Pages נותן לכם אתר</li>
                    <li>📚 <strong>תיק עבודות</strong> - בונים portfolio אמיתי</li>
                    <li>👥 <strong>עבודה בצוות</strong> - לומדים כמו מפתחים אמיתיים</li>
                  </ul>
                </div>

                <button onClick={handleGitHubLogin} className="github-login-btn">
                  <span>🐙</span>
                  📚 התחבר עם GitHub
                </button>

                <div className="login-benefits">
                  <h4>🎁 מה תקבלו בהתחברות:</h4>
                  <ul>
                    <li>✅ 10 נקודות מתנה</li>
                    <li>✅ גישה למשימה הראשונה</li>
                    <li>✅ קלף מתנה ראשון</li>
                    <li>✅ לוח מעקב אישי</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="user-welcome">
              <h2>👋 שלום {user.user_metadata?.full_name || 'משתמש'}!</h2>
              <p>מעברים אותך ללוח הבקרה...</p>
              <script dangerouslySetInnerHTML={{
                __html: `setTimeout(() => window.location.href = '/dashboard', 2000)`
              }} />
            </div>
          )}

          <footer className="site-footer">
            <p>📧 שאלות? <a href="https://github.com/osifeu-prog/rene/discussions">פורום הדיונים</a></p>
          </footer>
        </div>
      </div>
    </>
  )
}
