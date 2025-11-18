import { createUserProgress, getUserProgress } from '../../lib/database'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, taskId, submission } = req.body
    
    try {
      const progress = await createUserProgress(userId, taskId, submission)
      res.status(200).json(progress)
    } catch (error) {
      res.status(500).json({ error: 'Failed to save progress' })
    }
  } 
  else if (req.method === 'GET') {
    const { userId } = req.query
    try {
      const progress = await getUserProgress(userId)
      res.status(200).json(progress)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch progress' })
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
