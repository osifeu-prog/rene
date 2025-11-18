import Head from 'next/head'
import Link from 'next/link'

export default function PracticalTasks() {
  return (
    <>
      <Head>
        <title>משימות מעשיות - Rene</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <button className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300">
              ← חזרה לדף הבית
            </button>
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">🎯 משימות מעשיות</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-6">
                ב-Rene כל משימה מייצרת תוצר אמיתי שאפשר להשתמש בו בחיים האמיתיים!
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🌐 דפי נחיתה</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• אתר אישי עם GitHub Pages</li>
                    <li>• דף נחיתה לעסק או פרויקט</li>
                    <li>• תיק עבודות דיגיטלי</li>
                    <li>• בלוג אישי עם תוכן</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🚀 אפליקציות</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• מחשבונים ואוטומציות</li>
                    <li>• כלים לניהול זמן</li>
                    <li>• משחקים אינטראקטיביים</li>
                    <li>• דשבורדים לנתונים</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">דוגמאות למשימות מעשיות</h2>
              
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-300 mb-3">📝 משימה 1: דף נחיתה אישי</h3>
                <p className="text-white/80 mb-3">צור דף נחיתה שמציג את הכישורים שלך:</p>
                <ul className="text-white/80 space-y-1 text-sm">
                  <li>• קוד HTML/CSS בסיסי</li>
                  <li>• עיצוב רספונסיבי</li>
                  <li>• אינטגרציה עם GitHub Pages</li>
                  <li>• טופס יצירת קשר</li>
                </ul>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-green-300 mb-3">🛠️ משימה 2: כלי אוטומציה</h3>
                <p className="text-white/80 mb-3">בנה כלי שמפשט משימות יומיומיות:</p>
                <ul className="text-white/80 space-y-1 text-sm">
                  <li>• מחשבון תקציב אישי</li>
                  <li>• מתכנן לימודים</li>
                  <li>• מערכת ניהול משימות</li>
                  <li>• גנרטור לרשתות חברתיות</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">מה צפוי בעתיד?</h2>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">🚀 פיצ'רים מתוכננים</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• אינטגרציה עם APIs חיצוניים</li>
                  <li>• מסדי נתונים מתקדמים</li>
                  <li>• אימות משתמשים מורכב</li>
                  <li>• תשלומים ואיקומרס</li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                    🎯 התחל לבנות תוצרים אמיתיים!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
