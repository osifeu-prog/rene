import { query } from '../../lib/database'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, taskId, submission } = req.body
    
    try {
      const result = await query(
        `INSERT INTO user_progress (user_id, task_id, submission_text, completed) 
         VALUES ($1, $2, $3, true) RETURNING *`,
        [userId, taskId, submission]
      )
      res.status(200).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: 'Failed to save progress' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
