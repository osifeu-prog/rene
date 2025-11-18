import { getTasks } from '../../lib/database'

export default async function handler(req, res) {
  try {
    const tasks = await getTasks()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}
