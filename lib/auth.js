import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { query } from './database'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function createUser(email, name, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await query(
    'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [email, name, hashedPassword]
  )
  return result.rows[0]
}

export async function verifyUser(email, password) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email])
  const user = result.rows[0]
  
  if (user && await bcrypt.compare(password, user.password_hash)) {
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET)
    return { user, token }
  }
  return null
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
