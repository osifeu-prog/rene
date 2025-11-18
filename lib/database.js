import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

// אתחול טבלאות
export async function initDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS user_stats (
        user_id TEXT PRIMARY KEY,
        points INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        cards_collected INTEGER DEFAULT 0,
        pages_created INTEGER DEFAULT 0,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await query(`
      CREATE TABLE IF NOT EXISTS user_cards (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        card_id TEXT,
        card_name TEXT,
        card_description TEXT,
        earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, card_id)
      )
    `)

    await query(`
      CREATE TABLE IF NOT EXISTS user_pages (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        page_url TEXT,
        page_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('✅ Database initialized successfully')
  } catch (error) {
    console.error('❌ Database initialization error:', error)
  }
}

// פונקציות בסיסיות
export async function query(text, params) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

// פונקציות סטטיסטיקות משתמש
export async function getUserStats(userId) {
  const result = await query(
    'SELECT * FROM user_stats WHERE user_id = $1',
    [userId]
  )
  return result.rows[0] || { points: 0, level: 1, cards_collected: 0, pages_created: 0 }
}

export async function updateUserStats(userId, updates) {
  const currentStats = await getUserStats(userId)
  const newStats = { ...currentStats, ...updates }
  
  const result = await query(`
    INSERT INTO user_stats (user_id, points, level, cards_collected, pages_created, last_activity)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      points = $2,
      level = $3,
      cards_collected = $4,
      pages_created = $5,
      last_activity = $6
    RETURNING *
  `, [userId, newStats.points, newStats.level, newStats.cards_collected, newStats.pages_created, new Date().toISOString()])
  
  return result.rows[0]
}

export async function addUserCard(userId, cardId, cardName, cardDescription) {
  const result = await query(`
    INSERT INTO user_cards (user_id, card_id, card_name, card_description)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id, card_id) DO NOTHING
    RETURNING *
  `, [userId, cardId, cardName, cardDescription])
  
  if (result.rows[0]) {
    // עדכן סטטיסטיקות
    const stats = await getUserStats(userId)
    await updateUserStats(userId, {
      cards_collected: stats.cards_collected + 1
    })
  }
  
  return result.rows[0]
}

export async function getUserCards(userId) {
  const result = await query(
    'SELECT * FROM user_cards WHERE user_id = $1 ORDER BY earned_at DESC',
    [userId]
  )
  return result.rows
}

export async function addUserPage(userId, pageUrl, pageName) {
  const result = await query(`
    INSERT INTO user_pages (user_id, page_url, page_name)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [userId, pageUrl, pageName])
  
  if (result.rows[0]) {
    // עדכן סטטיסטיקות
    const stats = await getUserStats(userId)
    await updateUserStats(userId, {
      pages_created: stats.pages_created + 1,
      points: stats.points + 25 // נקודות על יצירת דף
    })
  }
  
  return result.rows[0]
}

export async function getUserPages(userId) {
  const result = await query(
    'SELECT * FROM user_pages WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )
  return result.rows
}

// פונקציות לקהילה
export async function getCommunityStats() {
  const totalUsers = await query('SELECT COUNT(*) FROM user_stats')
  const totalPoints = await query('SELECT SUM(points) as total_points FROM user_stats')
  const totalCards = await query('SELECT COUNT(*) FROM user_cards')
  const totalPages = await query('SELECT COUNT(*) FROM user_pages')
  
  return {
    totalUsers: parseInt(totalUsers.rows[0].count),
    totalPoints: parseInt(totalPoints.rows[0].total_points) || 0,
    totalCards: parseInt(totalCards.rows[0].count),
    totalPages: parseInt(totalPages.rows[0].count)
  }
}

export default pool
