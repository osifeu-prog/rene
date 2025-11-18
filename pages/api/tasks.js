import supabase from '../../lib/supabaseServer'

// Server-side task API using service role key.
// IMPORTANT: keep SUPABASE_SERVICE_ROLE_KEY secret on the server.
export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    // optional: accept ?user_id=...
    const { user_id } = req.query
    const q = supabase.from('tasks').select('*').order('created_at', { ascending: false })
    if (user_id) q.eq('user_id', user_id)
    const { data, error } = await q
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }

  if (method === 'POST') {
    const { title, description, user_id } = req.body
    if (!title || !user_id) return res.status(400).json({ error: 'title and user_id required' })
    const { data, error } = await supabase.from('tasks').insert({ title, description, user_id }).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
  }

  if (method === 'PUT') {
    const { id, updates } = req.body
    if (!id) return res.status(400).json({ error: 'id required' })
    const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }

  if (method === 'DELETE') {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'id required' })
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.json({ success: true })
  }

  res.setHeader('Allow', ['GET','POST','PUT','DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
