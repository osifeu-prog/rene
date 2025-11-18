import { query } from '../../lib/database'

export default async function handler(req, res) {
  try {
    const result = await query('SELECT * FROM tasks ORDER BY order_index')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}
