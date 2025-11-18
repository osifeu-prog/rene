import Head from 'next/head'
import Link from 'next/link'

export default function CardCollection() {
  return (
    <>
      <Head>
        <title>אוסף קלפים - Rene</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <button className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300">
              ← חזרה לדף הבית
            </button>
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">🃏 אוסף קלפים</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-6">
                אספו קלפים מיוחדים שמספרים את סיפור ההצלחה שלכם - כל קלף הוא הישג חדש!
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🏆 קלפי הישגים</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• קלף על כל משימה שהושלמה</li>
                    <li>• קלפים נדירים לאתגרים מיוחדים</li>
                    <li>• סדרות קלפים נושאיות</li>
                    <li>• קלפי אגדה להישגים יוצאי דופן</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🎨 קלפים אישיים</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• עיצוב קלפים משלכם</li>
                    <li>• הוספת תמונות וטקסטים</li>
                    <li>• שיתוף קלפים עם חברים</li>
                    <li>• מסחר והחלפת קלפים</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">סוגי הקלפים</h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">🥉</div>
                  <h4 className="font-bold text-yellow-300">קלפים נפוצים</h4>
                  <p className="text-white/80 text-sm">למשימות בסיסיות</p>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">🥈</div>
                  <h4 className="font-bold text-blue-300">קלפים נדירים</h4>
                  <p className="text-white/80 text-sm">לאתגרים מורכבים</p>
                </div>
                
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">🥇</div>
                  <h4 className="font-bold text-purple-300">קלפים אגדיים</h4>
                  <p className="text-white/80 text-sm">להישגים יוצאי דופן</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">מה צפוי בעתיד?</h2>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">🚀 פיצ'רים מתוכננים</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• שוק מסחר בקלפים</li>
                  <li>• קלפים אינטראקטיביים</li>
                  <li>• טורנירים ואתגרי קלפים</li>
                  <li>• אינטגרציה עם פלטפורמות נוספות</li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300">
                    🃏 התחל לאסוף קלפים!
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
