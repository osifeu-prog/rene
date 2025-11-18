import Head from 'next/head'
import Link from 'next/link'

export default function ProgressTracking() {
  return (
    <>
      <Head>
        <title>מעקב התקדמות - Rene</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <button className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300">
              ← חזרה לדף הבית
            </button>
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">📈 מעקב התקדמות</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-6">
                עקבו אחר ההצלחות שלכם בזמן אמת - כל צעד קדימה מתועד ומחובר!
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">📊 דשבורדים אישיים</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• סטטיסטיקות זמן אמת</li>
                    <li>• גרפים והתקדמות ויזואלית</li>
                    <li>• השוואה עם יעדים אישיים</li>
                    <li>• הישגים ותגים</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🎯 יעדים והתקדמות</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• הגדרת יעדים אישיים</li>
                    <li>• מעקב אחר משימות יומיות</li>
                    <li>• תזכורות והתראות</li>
                    <li>• חגיגות על הגעה ליעדים</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">איך המעקב עובד?</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-bold text-lg">רישום אוטומטי</h4>
                    <p className="text-white/80">כל פעולה שלכם נרשמת אוטומטית במערכת</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-bold text-lg">ניתוח נתונים</h4>
                    <p className="text-white/80">המערכת מנתחת את ההתקדמות ומציעה משימות חדשות</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-bold text-lg">התאמה אישית</h4>
                    <p className="text-white/80">המערכת מתאימה את עצמה לרמת הלמידה שלכם</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">מה צפוי בעתיד?</h2>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">🚀 פיצ'רים מתוכננים</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• דשבורדים מתקדמים עם AI</li>
                  <li>• השוואה קהילתית בריאה</li>
                  <li>• המלצות חכמות למשימות</li>
                  <li>• אינטגרציה עם פלטפורמות למידה נוספות</li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300">
                    📊 התחל לעקוב אחר ההצלחות שלך!
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
