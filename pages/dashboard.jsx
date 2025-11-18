import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const cardAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      window.location.href = '/';
    }
  };

  const handleFirstTask = async () => {
    // משימה ראשונה: יצירת דף נחיתה
    // לאחר השלמה, נוסיף קלף
    const newCard = {
      id: Date.now(),
      title: "🎨 בונה הדפים הראשון",
      description: "קיבלת את הקלף הראשון על יצירת דף הנחיתה שלך!",
      earnedAt: new Date()
    };
    setCards([newCard, ...cards]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl">🔄 טוען...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-2xl"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">🎯 הלוח האישי של {user.user_metadata?.full_name || 'משתמש'}</h1>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              התנתק
            </button>
          </div>
        </motion.header>

        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-2 mb-6 shadow-2xl"
        >
          <div className="flex space-x-2 space-x-reverse">
            {['tasks', 'cards', 'stats'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-lg font-semibold transition duration-300 ${
                  activeTab === tab 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'tasks' && '📋 משימות'}
                {tab === 'cards' && '🃏 קלפים'}
                {tab === 'stats' && '📊 סטטיסטיקות'}
              </button>
            ))}
          </div>
        </motion.nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            className="bg-white rounded-2xl p-6 shadow-2xl"
          >
            {activeTab === 'tasks' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">🎯 המשימות שלך</h2>
                
                <motion.div 
                  variants={cardAnimation}
                  className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-6 border-2 border-blue-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">🚀 משימה 1: צור דף נחיתה משלך!</h3>
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">+50 נקודות</span>
                  </div>
                  
                  <p className="mb-4"><strong>המשימה:</strong> צור דף נחיתה אישי ב-GitHub Pages שיציג את ההתקדמות שלך ב-Rene</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-2xl">1️⃣</span>
                      <p>קבל קוד HTML מוכן</p>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-2xl">2️⃣</span>
                      <p>צור repository חדש ב-GitHub</p>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-2xl">3️⃣</span>
                      <p>העלה את הקוד והפעל GitHub Pages</p>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className="text-2xl">4️⃣</span>
                      <p>קבל קלף מיוחד ו-50 נקודות!</p>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFirstTask}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                  >
                    🚀 התחל משימה
                  </motion.button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-100 rounded-2xl p-6 border-2 border-gray-200"
                >
                  <h3 className="text-xl font-bold mb-2">📝 משימה 2: שפר את הדף שלך</h3>
                  <p className="mb-4">הוסף סגנונות מתקדמים ותכונות אינטראקטיביות</p>
                  <button disabled className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed">
                    🔒 זמין לאחר השלמת משימה 1
                  </button>
                </motion.div>
              </div>
            )}

            {activeTab === 'cards' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">🃏 אוסף הקלפים שלך</h2>
                {cards.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {cards.map(card => (
                        <motion.div
                          key={card.id}
                          initial="initial"
                          animate="animate"
                          variants={cardAnimation}
                          className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-yellow-200 shadow-lg"
                        >
                          <div className="text-4xl text-center mb-4">🎨</div>
                          <h4 className="text-lg font-bold text-center mb-2">{card.title}</h4>
                          <p className="text-center text-gray-700 mb-4">{card.description}</p>
                          <p className="text-center text-sm text-gray-500">
                            {new Date(card.earnedAt).toLocaleDateString('he-IL')}
                          </p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">🤔</div>
                    <p className="text-xl mb-2">עדיין אין לך קלפים...</p>
                    <p>התחל את המשימה הראשונה כדי לקבל את הקלף הראשון!</p>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">📊 הסטטיסטיקות שלך</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-100 rounded-2xl p-6 text-center border-2 border-blue-200"
                  >
                    <div className="text-3xl font-bold text-blue-600">0</div>
                    <div className="text-blue-800">נקודות</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-100 rounded-2xl p-6 text-center border-2 border-green-200"
                  >
                    <div className="text-3xl font-bold text-green-600">1</div>
                    <div className="text-green-800">דרגה</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-purple-100 rounded-2xl p-6 text-center border-2 border-purple-200"
                  >
                    <div className="text-3xl font-bold text-purple-600">{cards.length}</div>
                    <div className="text-purple-800">קלפים</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-orange-100 rounded-2xl p-6 text-center border-2 border-orange-200"
                  >
                    <div className="text-3xl font-bold text-orange-600">0</div>
                    <div className="text-orange-800">דפים</div>
                  </motion.div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-6">
                  <h4 className="font-bold mb-4">התקדמות לרמה הבאה</h4>
                  <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-center text-gray-700">0 נקודות עד לרמה 2</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
