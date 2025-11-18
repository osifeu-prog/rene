import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Head from 'next/head';

// אנימציות
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [user, setUser] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    checkUser();
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
    if (isFirstVisit) {
      setShowTutorial(true);
    }
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasVisitedBefore', 'true');
  };

  return (
    <>
      <Head>
        <title>Rene - מערכת לימוד תכנות משחקית</title>
        <meta name="description" content="למד תכנות דרך יצירת דפי נחיתה וקלפים מיוחדים" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        {/* Tutorial Overlay */}
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-5"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-center mb-4">🎯 ברוכים הבאים ל-Rene!</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <h4 className="font-semibold">התחברות עם GitHub</h4>
                    <p className="text-sm text-gray-600">קבלו 10 נקודות על התחברות ראשונה!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <h4 className="font-semibold">יצירת דף נחיתה</h4>
                    <p className="text-sm text-gray-600">המשימה הראשונה - העתיקו קוד ל-GitHub שלכם</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-2xl">3️⃣</span>
                  <div>
                    <h4 className="font-semibold">קבלת קלף מיוחד</h4>
                    <p className="text-sm text-gray-600">כל משימה מקנה קלף ייחודי</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={completeTutorial}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                🚀 הבנתי, בואו נתחיל!
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <motion.header 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center text-white mb-16"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              🎮 Rene - מערכת לימוד תכנות
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl opacity-90 mb-8"
            >
              למדו לתכנת דרך יצירת דפי נחיתה וצבירת קלפים מיוחדים
            </motion.p>
          </motion.header>

          {!user ? (
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="flex justify-center"
            >
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <h2 className="text-2xl font-bold text-center mb-6">🚀 התחברו כדי להתחיל את המסע</h2>
                
                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                  <h4 className="font-semibold mb-2">🤔 למה צריך GitHub?</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center space-x-2 space-x-reverse">
                      <span>💾</span>
                      <span><strong>שימור התקדמות</strong> - כל המשימות נשמרות</span>
                    </li>
                    <li className="flex items-center space-x-2 space-x-reverse">
                      <span>🌐</span>
                      <span><strong>אירוח חינמי</strong> - GitHub Pages נותן לכם אתר</span>
                    </li>
                    <li className="flex items-center space-x-2 space-x-reverse">
                      <span>📚</span>
                      <span><strong>תיק עבודות</strong> - בונים portfolio אמיתי</span>
                    </li>
                    <li className="flex items-center space-x-2 space-x-reverse">
                      <span>👥</span>
                      <span><strong>עבודה בצוות</strong> - לומדים כמו מפתחים אמיתיים</span>
                    </li>
                  </ul>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGitHubLogin}
                  className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 space-x-reverse hover:bg-gray-900 transition duration-300 mb-4"
                >
                  <span>🐙</span>
                  <span>📚 התחבר עם GitHub</span>
                </motion.button>

                <div className="text-center">
                  <h4 className="font-semibold mb-2">🎁 מה תקבלו בהתחברות:</h4>
                  <ul className="text-sm space-y-1">
                    <li>✅ 10 נקודות מתנה</li>
                    <li>✅ גישה למשימה הראשונה</li>
                    <li>✅ קלף מתנה ראשון</li>
                    <li>✅ לוח מעקב אישי</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">👋 שלום {user.user_metadata?.full_name || 'משתמש'}!</h2>
                <p>מעברים אותך ללוח הבקרה...</p>
                <div className="mt-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              </div>
              <script dangerouslySetInnerHTML={{
                __html: `setTimeout(() => window.location.href = '/dashboard', 2000)`
              }} />
            </motion.div>
          )}

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-white mt-16"
          >
            <p>📧 שאלות? <a href="https://github.com/osifeu-prog/rene/discussions" className="underline">פורום הדיונים</a></p>
          </motion.footer>
        </div>
      </div>
    </>
  );
}
