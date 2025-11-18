import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkUser()
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore')
    if (isFirstVisit) {
      setTimeout(() => setShowTutorial(true), 1000)
    }
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const handleGitHubLogin = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
    }
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

      {/* Background Animation */}
      <div className="fixed inset-0 bg-space-gradient animate-pulse-slow"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-900/20 to-purple-900/30"></div>
      
      {/* Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-float opacity-60"></div>
      <div className="fixed top-1/3 right-1/3 w-6 h-6 bg-pink-400 rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
      <div className="fixed bottom-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Tutorial Overlay */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl transform animate-slide-in-up">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce">🎯</div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ברוכים הבאים ל-Rene!
                </h2>
                <p className="text-gray-600 mt-2 text-lg">המסע הלימודי המרהיב שלך מתחיל כאן</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl mb-3">👨‍💻</div>
                  <h3 className="font-bold text-lg mb-2">התחברות חכמה</h3>
                  <p className="text-gray-600">התחבר עם GitHub וקבל 10 נקודות מתנה!</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-100 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl mb-3">🌐</div>
                  <h3 className="font-bold text-lg mb-2">דף נחיתה אישי</h3>
                  <p className="text-gray-600">צור דף אינטרנט משלך עם קוד מוכן</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl mb-3">🃏</div>
                  <h3 className="font-bold text-lg mb-2">קלפים אספניים</h3>
                  <p className="text-gray-600">אסוף קלפים מיוחדים על כל הישג</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100 transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-bold text-lg mb-2">למידה חווייתית</h3>
                  <p className="text-gray-600">למד תכנות דרך משחקים ואתגרים</p>
                </div>
              </div>

              <button 
                onClick={completeTutorial}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-glow"
              >
                🚀 התחל עכשיו את המסע!
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="animate-float">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Rene
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 animate-fade-in-up">
              🎮 <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">מערכת לימוד תכנות</span> דרך משחק
            </p>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              צור דפי נחיתה מדהימים, אסוף קלפים מיוחדים, והפוך למפתח שאתה חולם להיות
            </p>
          </div>

          {!user ? (
            /* Login Section */
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-slide-in-up">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">
                  🚀 הצטרפו למסע!
                </h2>
                <p className="text-white/80 text-lg">התחברו וקבלו מתנות מיוחדות</p>
              </div>

              {/* Features Grid - Updated with more columns */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Link href="/learn-more/experiential-learning">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3 space-x-reverse mb-3">
                      <div className="text-2xl">👨‍💻</div>
                      <h3 className="font-bold text-white text-lg">למידה חווייתית</h3>
                    </div>
                    <p className="text-white/80 text-sm">למדו תכנות דרך משחקים ואתגרים במקום שיעורים משעממים</p>
                    <div className="mt-2 text-blue-300 text-xs">לחץ לפרטים נוספים →</div>
                  </div>
                </Link>
                
                <Link href="/learn-more/practical-tasks">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3 space-x-reverse mb-3">
                      <div className="text-2xl">🎯</div>
                      <h3 className="font-bold text-white text-lg">משימות מעשיות</h3>
                    </div>
                    <p className="text-white/80 text-sm">צרו קוד אמיתי שירוץ במחשב או בטלפון שלכם</p>
                    <div className="mt-2 text-blue-300 text-xs">לחץ לפרטים נוספים →</div>
                  </div>
                </Link>
                
                <Link href="/learn-more/card-collection">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3 space-x-reverse mb-3">
                      <div className="text-2xl">🃏</div>
                      <h3 className="font-bold text-white text-lg">אוסף קלפים</h3>
                    </div>
                    <p className="text-white/80 text-sm">אספו קלפים מיוחדים על כל משימה שתפתרו</p>
                    <div className="mt-2 text-blue-300 text-xs">לחץ לפרטים נוספים →</div>
                  </div>
                </Link>

                <Link href="/learn-more/progress-tracking">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3 space-x-reverse mb-3">
                      <div className="text-2xl">📈</div>
                      <h3 className="font-bold text-white text-lg">מעקב התקדמות</h3>
                    </div>
                    <p className="text-white/80 text-sm">ראו כמה התקדמתם וקבלו משימות חדשות</p>
                    <div className="mt-2 text-blue-300 text-xs">לחץ לפרטים נוספים →</div>
                  </div>
                </Link>

                <Link href="/learn-more/personal-website">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3 space-x-reverse mb-3">
                      <div className="text-2xl">🌐</div>
                      <h3 className="font-bold text-white text-lg">אתר אישי</h3>
                    </div>
                    <p className="text-white/80 text-sm">בנו אתר משלכם ושיווקו את המוצרים שלכם</p>
                    <div className="mt-2 text-blue-300 text-xs">לחץ לפרטים נוספים →</div>
                  </div>
                </Link>

                <Link href="/learn-more/economic-growth">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center space-x-3 space-x-reverse mb-3">
                      <div className="text-2xl">💰</div>
                      <h3 className="font-bold text-white text-lg">צמיחה כלכלית</h3>
                    </div>
                    <p className="text-white/80 text-sm">מכרו את הפרויקטים שלכם וצמחו כלכלית</p>
                    <div className="mt-2 text-blue-300 text-xs">לחץ לפרטים נוספים →</div>
                  </div>
                </Link>
              </div>

              {/* GitHub Explanation */}
              <div className="bg-blue-500/20 rounded-2xl p-6 mb-8 border border-blue-400/30 backdrop-blur-sm">
                <h4 className="font-bold text-white text-lg mb-3 flex items-center space-x-2 space-x-reverse">
                  <span>🤔</span>
                  <span>למה צריך GitHub?</span>
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>תיק עבודות אמיתי למפתחים</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>אירוח חינם לאתרים</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>שיתוף פעולה עם קהילה</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-white/80">
                    <span className="text-green-400">✓</span>
                    <span>כלים מקצועיים לתכנות</span>
                  </div>
                </div>
              </div>

              {/* Community Links */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <a 
                  href="https://github.com/osifeu-prog/rene/discussions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-2xl p-4 text-center transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-2xl mb-2">💬</div>
                  <h4 className="font-bold text-white">פורום דיונים פעיל</h4>
                  <p className="text-white/80 text-sm mt-1">שאל שאלות ושתף רעיונות עם הקהילה</p>
                </a>
                
                <a 
                  href="https://github.com/osifeu-prog/rene/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-2xl p-4 text-center transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-2xl mb-2">🐛</div>
                  <h4 className="font-bold text-white">דיווח באגים</h4>
                  <p className="text-white/80 text-sm mt-1">דווח על תקלות ועזור לנו לשפר</p>
                </a>
              </div>

              {/* Login Button */}
              <button 
                onClick={handleGitHubLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-4 rounded-2xl font-bold text-lg hover:from-gray-900 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>מתחבר...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🐙</span>
                    <span>התחבר עם GitHub וקבל מתנות!</span>
                  </>
                )}
              </button>

              <p className="text-center text-white/60 mt-4 text-sm">
                אין לכם חשבון? <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">צרו אחד חינם כאן</a>
              </p>
            </div>
          ) : (
            /* User Welcome */
            <div className="text-center animate-fade-in">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  {user.user_metadata?.full_name || 'משתמש'} Welcome!
                </h2>
                <p className="text-white/80 text-lg mb-6">מעברים אותך ללוח הניהול המרהיב...</p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              </div>
              <script dangerouslySetInnerHTML={{
                __html: `setTimeout(() => window.location.href = '/dashboard', 3000)`
              }} />
            </div>
          )}

          {/* Game Explanation Section */}
          <div className="mt-12 text-center">
            <Link href="/how-it-works">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <h3 className="text-3xl font-bold text-white mb-4">🎮 איך המשחק עובד?</h3>
                <p className="text-white/80 text-lg mb-4">
                  גלו את כל הסודות של Rene - ממשימה ראשונה עד למוצר הראשון שלכם!
                </p>
                <div className="text-blue-300 font-bold text-lg">
                  לחצו כאן להסבר מלא ←
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Footer */}
          <div className="text-center mt-12 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-white">
                <div className="text-2xl font-bold text-yellow-400">128+</div>
                <div className="text-sm opacity-80">תלמידים פעילים</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold text-green-400">347+</div>
                <div className="text-sm opacity-80">דפים נוצרו</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold text-purple-400">892+</div>
                <div className="text-sm opacity-80">קלפים נאספו</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold text-blue-400">2,154+</div>
                <div className="text-sm opacity-80">נקודות שחולקו</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
