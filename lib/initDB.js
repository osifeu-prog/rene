import { query } from './database.js'

export async function initDatabase() {
  try {
    console.log('🔍 בודק אם הטבלאות קיימות...')
    
    // בדיקה אם טבלת tasks כבר קיימת
    const checkTable = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'tasks'
      );
    `)
    
    if (!checkTable.rows[0].exists) {
      console.log('🗄️ יוצר טבלאות חדשות...')
      
      // יצירת טבלת משתמשים
      await query(`
        CREATE TABLE users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      
      // יצירת טבלת משימות
      await query(`
        CREATE TABLE tasks (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          difficulty_level TEXT DEFAULT 'beginner',
          code_challenge TEXT,
          expected_output TEXT,
          order_index INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      
      // יצירת טבלת התקדמות
      await query(`
        CREATE TABLE user_progress (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES users(id),
          task_id UUID REFERENCES tasks(id),
          completed BOOLEAN DEFAULT false,
          submission_text TEXT,
          completed_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, task_id)
        )
      `)
      
      // הוספת נתוני דוגמה
      await query(`
        INSERT INTO tasks (title, description, code_challenge, order_index) VALUES
        ('משימת ברוכים הבאים', 'זו המשימה הראשונה שלך! הצג את עצמך.', 'כתוב פונקציית "hello world" בשפה שבחרת', 1),
        ('מחשבון פשוט', 'בנה מחשבון שמחבר שני מספרים', 'function add(a, b) { return a + b; }', 2),
        ('לולאת מספרים', 'צור תוכנית שמדפיסה מספרים מ-1 עד 10', 'for (let i = 1; i <= 10; i++) { console.log(i); }', 3)
      `)
      
      await query(`
        INSERT INTO users (email, name) VALUES 
        ('demo@example.com', 'משתמש לדוגמה')
      `)
      
      console.log('✅ הטבלאות נוצרו בהצלחה!')
    } else {
      console.log('✅ הטבלאות כבר קיימות')
    }
  } catch (error) {
    console.error('❌ שגיאה ביצירת הטבלאות:', error)
  }
}
