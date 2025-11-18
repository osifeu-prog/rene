import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Head from 'next/head'

export default function Home() {
  const [user, setUser] = useState(null)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    checkUser()
    
    // בדיקה אם המשתמש כבר ראה את ההודעה
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    if (hasSeenWelcome) {
      setShowWelcome(false)
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

  const hideWelcome = () => {
    setShowWelcome(false)
    localStorage.setItem('hasSeenWelcome', 'true')
  }

  return (
    <>
      <Head>
        <title>מערכת לימוד מתכנת - Rene</title>
        <meta name="description" content="למד תכנות דרך משחק ואתגרים" />
      </Head>

      <div className="home-container">
        {showWelcome && (
          <div className="welcome-overlay">
            <div className="welcome-card">
              <h2>🎯 ברוכים הבאים ל-Rene!</h2>
              <p>זו מערכת לימוד תכנות דרך משחק ואתגרים. כאן תלמדו לתכנת בצורה חווייתית:</p>
              
              <div className="features">
                <div className="feature">
                  <span>👨‍💻</span>
                  <p>התחברו עם GitHub כדי לשמור את ההתקדמות שלכם</p>
                </div>
                <div className="feature">
                  <span>🎮</span>
                  <p>פתרו משימות משחקיות וקבלו קלפים מיוחדים</p>
                </div>
                <div className="feature">
                  <span>📈</span>
                  <p>תעקבו אחר ההתקדמות שלכם בלוח אישי</p>
                </div>
                <div className="feature">
                  <span>🌐</span>
                  <p>צרו קוד שירוץ במחשב או בטלפון שלכם</p>
                </div>
              </div>

              <div className="github-explanation">
                <h4>🤔 למה צריך GitHub?</h4>
                <p>GitHub מאפשר לנו:</p>
                <ul>
                  <li>💾 <strong>לשמור את ההתקדמות</strong> - כל המשימות שתפתרו יישמרו</li>
                  <li>🔒 <strong>גישה מאובטחת</strong> - רק אתם יכולים לראות את הנתונים שלכם</li>
                  <li>🚀 <strong>חוויית למידה אמיתית</strong> - כמו שמפתחים אמיתיים עובדים</li>
                  <li>📚 <strong>תיק עבודות</strong> - יוצר לכם תיק פרויקטים אישי</li>
                </ul>
              </div>

              <button onClick={hideWelcome} className="understand-btn">
                👍 הבנתי, בואו נתחיל!
              </button>
            </div>
          </div>
        )}

        <div className="main-content">
          <header className="hero-section">
            <h1>🎮 Rene - מערכת לימוד תכנות</h1>
            <p class="tagline">למדו לתכנת דרך משחק, אתגרים, וקבלת קלפים מיוחדים!</p>
          </header>

          {!user ? (
            <div className="auth-section">
              <div className="login-card">
                <h2>🚀 התחברו כדי להתחיל את המסע</h2>
                <p>התחברו עם GitHub כדי לשמור את ההתקדמות שלכם ולקבל גישה לכל המשימות:</p>
                
                <button onClick={handleGitHubLogin} className="github-login-btn">
                  <span>🐙</span>
                  📚 התחבר עם GitHub
                </button>

                <div className="login-benefits">
                  <h4>🎁 מה תקבלו לאחר ההתחברות:</h4>
                  <ul>
                    <li>✅ גישה למשימה הראשונה - יצירת משחק פשוט</li>
                    <li>✅ קלף מתנה ראשון באוסף האישי</li>
                    <li>✅ לוח מעקב התקדמות אישי</li>
                    <li>✅ אפשרות ליצור קלפים משלכם</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="user-welcome">
              <h2>👋 שלום {user.user_metadata?.full_name || 'משתמש'}!</h2>
              <p>הצלחתם להתחבר! מעבר ללוח הבקרה...</p>
              <script>
                {setTimeout(() => window.location.href = '/dashboard', 2000)}
              </script>
            </div>
          )}

          <footer className="site-footer">
            <p>📧 שאלות? <a href="https://github.com/osifeu-prog/rene/discussions">פורום הדיונים שלנו</a></p>
            <p>🐛 דיווח באגים? <a href="https://github.com/osifeu-prog/rene/issues">דווחו כאן</a></p>
          </footer>
        </div>
      </div>
    </>
  )
}
