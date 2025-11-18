import Head from 'next/head'
import Link from 'next/link'

export default function PersonalWebsite() {
  return (
    <>
      <Head>
        <title>אתר אישי - Rene</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-teal-900 to-green-900">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <button className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300">
              ← חזרה לדף הבית
            </button>
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">🌐 אתר אישי</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-6">
                כל תלמיד ב-Rene מקבל אתר אישי משלו - פלטפורמה להצגת הכישורים והמוצרים שלך לעולם!
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🎨 עיצוב אישי</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• תבניות עיצוב מוכנות</li>
                    <li>• התאמה אישית מלאה</li>
                    <li>• עיצוב רספונסיבי</li>
                    <li>• אינטגרציה עם מדיה חברתית</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🚀 תכונות מתקדמות</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• תיק עבודות אינטראקטיבי</li>
                    <li>• בלוג אישי</li>
                    <li>• טופס יצירת קשר</li>
                    <li>• אינטגרציה עם פרויקטים</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">מה אפשר לעשות עם האתר האישי?</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4">
                  <h4 className="font-bold text-green-300 mb-2">💼 תיק עבודות</h4>
                  <p className="text-white/80 text-sm">הצג את הפרויקטים שלך למעסיקים פוטנציאליים</p>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4">
                  <h4 className="font-bold text-blue-300 mb-2">🛒 חנות דיגיטלית</h4>
                  <p className="text-white/80 text-sm">מכור את המוצרים הדיגיטליים שיצרת</p>
                </div>
                
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-4">
                  <h4 className="font-bold text-purple-300 mb-2">📝 בלוג מקצועי</h4>
                  <p className="text-white/80 text-sm">שתף את הידע שלך ובנה מוניטין</p>
                </div>
                
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4">
                  <h4 className="font-bold text-yellow-300 mb-2">👥 קהילה אישית</h4>
                  <p className="text-white/80 text-sm">בנה קהילה סביב התוכן שלך</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">מה צפוי בעתיד?</h2>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">🚀 פיצ'רים מתוכננים</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• בונה אתרים drag-and-drop</li>
                  <li>• אינטגרציה עם SEO</li>
                  <li>• אנליטיקס מתקדם</li>
                  <li>• מסחר אלקטרוני מלא</li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300">
                    🌐 בנה את האתר האישי שלך!
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
