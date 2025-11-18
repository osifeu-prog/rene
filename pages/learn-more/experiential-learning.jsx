import Head from 'next/head'
import Link from 'next/link'

export default function ExperientialLearning() {
  return (
    <>
      <Head>
        <title>למידה חווייתית - Rene</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <button className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300">
              ← חזרה לדף הבית
            </button>
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">👨‍💻 למידה חווייתית</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-6">
                ב-Rene שוברים את המוסכמה - לא לומדים <strong>תכנות</strong>, לומדים <strong>דרך תכנות</strong>!
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🎮 משחקי תכנות</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• פאזלים שמלמדים לוגיקה</li>
                    <li>• אתגרי קוד אינטראקטיביים</li>
                    <li>• תחרויות זמן אמיתי</li>
                    <li>• פתרון בעיות בצורה מהנה</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🏆 מערכת הישגים</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• תגים על השלמת אתגרים</li>
                    <li>• דירוגים וטבלאות לידרים</li>
                    <li>• נקודות ונעילות תוכן</li>
                    <li>• התקדמות ויזואלית ברורה</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">מה צפוי בעתיד?</h2>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">🚀 פיצ'רים מתוכננים</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• משחק רב-משתתפים בזמן אמת</li>
                  <li>• אתגרים קהילתיים שבועיים</li>
                  <li>• מערכת תגמולים מתקדמת</li>
                  <li>• אינטגרציה עם פלטפורמות נוספות</li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                    🎯 התחל ללמוד בחווייתית!
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
