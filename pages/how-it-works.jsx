import Head from 'next/head'
import Link from 'next/link'

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>איך Rene עובד? - הסבר מלא</title>
        <meta name="description" content="למד איך מערכת Rene עובדת מקצה לקצה" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/">
              <button className="mb-6 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105">
                ← חזרה לדף הבית
              </button>
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              🎮 איך Rene עובד?
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              המדריך השלם למסע הלימודי שלך - ממשימה ראשונה עד למוצר הראשון
            </p>
          </div>

          {/* Game Flow */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">🚀 זרימת המשחק</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">הרשמה והתחברות</h3>
                <p className="text-white/80">התחבר עם GitHub וקבל 10 נקודות מתנה</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">דף נחיתה ראשון</h3>
                <p className="text-white/80">צור אתר אישי עם קוד מוכן ב-GitHub</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">איסוף קלפים</h3>
                <p className="text-white/80">אסוף קלפים מיוחדים על כל הישג</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">4️⃣</div>
                <h3 className="text-xl font-bold text-white mb-2">מוצרים והכנסות</h3>
                <p className="text-white/80">מכור את הפרויקטים שלך וצמוח כלכלית</p>
              </div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">👨‍💻 למידה חווייתית</h3>
                <p className="text-white/80 mb-4">
                  ב-Rene לא לומדים מתכנות - לומדים דרך תכנות! כל משימה היא הרפתקה חדשה:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• משחקים אינטראקטיביים שמלמדים עקרונות תכנות</li>
                  <li>• אתגרים שמתאימים לרמה האישית שלך</li>
                  <li>• פרויקטים אמיתיים שאפשר להוסיף לתיק העבודות</li>
                  <li>• למידה דרך trial and error - כמו מפתחים אמיתיים</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">🎯 משימות מעשיות</h3>
                <p className="text-white/80 mb-4">
                  כל משימה ב-Rene מייצרת תוצר אמיתי:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• דפי נחיתה אישיים עם GitHub Pages</li>
                  <li>• אפליקציות ווב קטנות ופרקטיות</li>
                  <li>• אוטומציות לשימוש יומיומי</li>
                  <li>• תוספים ושיפורים למערכת Rene עצמה</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">📈 מעקב התקדמות</h3>
                <p className="text-white/80 mb-4">
                  עקבו אחר ההצלחות שלכם בצורה ויזואלית ומספקת:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• לוח ניקוד אישי עם נקודות ורמות</li>
                  <li>• גרפים שמראים את ההתקדמות לאורך זמן</li>
                  <li>• השוואה בריאה עם קהילת הלומדים</li>
                  <li>• משימות מותאמות אישית לפי קצב ההתקדמות</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">🃏 אוסף קלפים</h3>
                <p className="text-white/80 mb-4">
                  אספו קלפים מיוחדים שמספרים את סיפור ההצלחה שלכם:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• קלף על כל משימה שהשלמתם</li>
                  <li>• קלפים נדירים להישגים מיוחדים</li>
                  <li>• אפשרות ליצור קלפים משלכם</li>
                  <li>• אוסף שמתעד את כל הדרך שעברתם</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">🌐 אתר אישי וכלכלה</h3>
                <p className="text-white/80 mb-4">
                  Rene לא מסתיים בלמידה - מתחיל ביצירה:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• כל תלמיד מקבל אתר אישי משלו</li>
                  <li>• אפשרות למכור את הפרויקטים שפיתחתם</li>
                  <li>• מערכת עמלות על מכירות בקהילה</li>
                  <li>• פיתוח כישורים עסקיים alongside טכניים</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">💬 קהילה ושיתוף</h3>
                <p className="text-white/80 mb-4">
                  למדו יחד וצמחו כקבוצה:
                </p>
                <ul className="text-white/80 space-y-2">
                  <li>• פורום דיונים פעיל לעזרה הדדית</li>
                  <li>• שיתוף קוד ופתרונות</li>
                  <li>• תחרויות ואתגרים קהילתיים</li>
                  <li>• אפשרות לשתף את ההצלחות ברשתות החברתיות</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">מוכנים להתחיל?</h3>
              <p className="text-white/90 mb-6 text-lg">
                הצטרפו עכשיו ל-Rene והתחילו את המסע הלימודי הכי מרגש בחייכם!
              </p>
              <Link href="/">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                  🚀 התחל עכשיו - זה חינם!
                </button>
              </Link>
            </div>
          </div>

          {/* Share Section */}
          <div className="text-center mt-8">
            <p className="text-white/60">
              שתפו את Rene עם חברים: <span className="text-white font-bold">https://rene-production.up.railway.app</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
