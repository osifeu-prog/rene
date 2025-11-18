import Head from 'next/head'
import Link from 'next/link'

export default function EconomicGrowth() {
  return (
    <>
      <Head>
        <title>צמיחה כלכלית - Rene</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-amber-900 to-orange-900">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <button className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300">
              ← חזרה לדף הבית
            </button>
          </Link>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-6 text-center">💰 צמיחה כלכלית</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/80 mb-6">
                ב-Rene לא רק לומדים - גם מרוויחים! הפוך את הכישורים שלך להכנסה אמיתית.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🛒 מכירת מוצרים</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• מכירת תבניות קוד</li>
                    <li>• מוצרים דיגיטליים</li>
                    <li>• שירותי פיתוח</li>
                    <li>• קורסים והדרכות</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">📈 מודלים עסקיים</h3>
                  <ul className="text-white/80 space-y-2">
                    <li>• Freelancing</li>
                    <li>• Product as a Service</li>
                    <li>• Affiliate Marketing</li>
                    <li>• Digital Products</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">איך מתחילים להרוויח?</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4">
                  <h4 className="text-green-300 font-bold text-lg mb-2">שלב 1: בניית תיק עבודות</h4>
                  <p className="text-white/80">צור פרויקטים איכותיים שמדגימים את היכולות שלך</p>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4">
                  <h4 className="text-blue-300 font-bold text-lg mb-2">שלב 2: שיווק עצמי</h4>
                  <p className="text-white/80">נצל את האתר האישי שלך כדי למשוך לקוחות</p>
                </div>
                
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-4">
                  <h4 className="text-purple-300 font-bold text-lg mb-2">שלב 3: מכירת שירותים</h4>
                  <p className="text-white/80">הצע שירותי פיתוח, ייעוץ או הדרכה</p>
                </div>
                
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4">
                  <h4 className="text-yellow-300 font-bold text-lg mb-2">שלב 4: מוצרים דיגיטליים</h4>
                  <p className="text-white/80">צור ומוכור מוצרים שאחרים יכולים להשתמש בהם</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">מה צפוי בעתיד?</h2>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">🚀 פיצ'רים מתוכננים</h3>
                <ul className="text-white/80 space-y-2">
                  <li>• מערכת תשלומים משולבת</li>
                  <li>• שוק דיגיטלי למוצרים</li>
                  <li>• פלטפורמת Freelancing</li>
                  <li>• מערכת עמלות והפצות</li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300">
                    💰 התחל לצמוח כלכלית!
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
