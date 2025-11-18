import { Pool } from 'pg'
import { initDatabase } from './initDB.js'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// אתחול אוטומטי של ה-Database כאשר המודול נטען
initDatabase()

export async function query(text, params) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

export async function getTasks() {
  const result = await query('SELECT * FROM tasks ORDER BY order_index')
  return result.rows
}

export async function getUserProgress(userId) {
  const result = await query(
    'SELECT * FROM user_progress WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )
  return result.rows
}

export async function createUserProgress(userId, taskId, submission) {
  const result = await query(
    `INSERT INTO user_progress (user_id, task_id, submission_text, completed) 
     VALUES ($1, $2, $3, true) RETURNING *`,
    [userId, taskId, submission]
  )
  return result.rows[0]
}

export default pool
